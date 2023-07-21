import { mergeQueryInUrl } from './url';
import { checkError, ErrorCode } from './error';

const API_TIMEOUT = 10000;
const isDev = process.env.NODE_ENV === 'development';
// const HOST = '';
const HOST = 'http://localhost:3001';
const BASE_URL = `${HOST}/api`;

export interface Options {
  query?: Record<string, any>;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, any>;
  useFormData?: boolean;
  useDefaultErrorToast?: boolean;
  signal?: AbortSignal | number;
  useDefaultTimeout?: boolean;
}

interface FetchOptType {
  method: string;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}

export default (url: string, options: Options = {}): Promise<any> => {
  const {
    query = {},
    method = 'GET',
    body = {},
    headers = {},
    useFormData = false,
    useDefaultErrorToast = true,
    useDefaultTimeout = true,
    ...rest
  } = options;
  const endpoint = mergeQueryInUrl(`${BASE_URL}${url}`, query);
  const opts: FetchOptType = {
    method: method.toUpperCase()
  };
  if (body && opts.method !== 'GET') {
    opts.body = useFormData ? body : JSON.stringify(body);
  }

  if (!useFormData) {
    opts.headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  } else {
    opts.headers = {
      ...headers
    };
  }

  /**
   * https://jira.shopee.io/browse/SPQCP-2334
   * 针对某些接口去掉默认超时
   */
  let requestTimeout: any = null;
  const race = [
    fetch(endpoint, {
      ...rest,
      ...opts
    } as RequestInit)
  ];
  if (useDefaultTimeout) {
    race.push(
      new Promise((resolve, reject) => {
        requestTimeout = setTimeout(() => {
          const error = new Error('request time out, please try again!');
          (error as any).code = ErrorCode.REQUEST_TIMEOUT;
          reject(error);
        }, API_TIMEOUT);
      })
    );
  }
  return Promise.race(race)
    .then(async (res: Response) => {
      // window.clearTimeout(requestTimeout);
      const r = await res.json()
      return r
      const isJson =
        res.headers &&
        (res.headers.get('Content-Type') || '').includes('application/json');
      if (res.ok && isJson) {
        return res.json();
      } else if (res.headers.get('Content-Type') === 'text/csv') {
        // 下载文件类型
        return res.blob();
      } else if (res.ok && res.text) {
        return res.text();
      }

      throw Object.assign(new Error(res.statusText), {
        status: res.status,
        response: isJson ? res.json() : res.text(),
        message: res.statusText
      });
    })
    .then(res => {
      if (res.type === 'text/csv') {
        // 直接返回
        return [undefined, res];
      }

      if (res.code) {
        // 这个code应该是对应业务error code
        // checkError(res, useDefaultErrorToast);
        // if (res.code === ErrorCode.QC_ROUND_CLOSED) {
        //   afterEndRound(RoundEndType.NORMAL_END);
        // }
        // 加上 res.data 的返回是特殊处理在 round task 已经被权限更高的人提交这种情况
        return [{ ...res, message: res.message || res.msg }, res.data];
      }
      return [undefined, res.data];
    })
    .catch(e => {
      if (e.response) {
        return e.response.then((res: any) => {
          if (e.status === 401 && res.soup_login_url) {
            // checkError({ code: ErrorCode.NOT_LOGIN }, false);
            const msg = isDev ? e.message || 'User not login' : 'redirect';
            window.location.href = res.soup_login_url;
            return [{ message: msg, code: ErrorCode.NOT_LOGIN }];
          }

          // checkError(res, useDefaultErrorToast);
          return [res];
        });
      }
      if (e.message && e.message.includes('abort')) {
        // 中断请求
      } else {
        // checkError(e, useDefaultErrorToast);
      }
      return [e];
    });
};
