import request, { Options } from '../utils/request';

export const getQARules = (opts: Options): Promise<any> =>
  request('/blog/selectHomeBlogList', { ...opts });

export const getArticleDetail = (opts?: Options): Promise<any> =>
  request(`/blog/getBlogDetail`, { ...opts });

export const createBlog = (opts: Options): Promise<any> =>
  request('/blog/create', {
    ...opts,
    method: 'POST'
  });

export const updateQARule = (id: number, opts: Options): Promise<any> =>
  request(`/v1/settings/qa_selection_rule_templates/${id}`, {
    ...opts,
    method: 'PUT'
  });

export const login = (opts: Options): Promise<any> =>
  request(`/user/login`, {
    ...opts,
    method: 'POST'
  });

export const createQA = (opts: Options): Promise<any> =>
  request('/v1/settings/qa_selection_records', { ...opts, method: 'POST' });

export const getQAList = (opts: Options): Promise<any> =>
  request('/v1/settings/qa_selection_records', { ...opts });

export const getQATask = (opts: Options): Promise<any> =>
  request('/v1/qa/start', { ...opts, method: 'POST' });

export const submitQATask = (opts: Options): Promise<any> =>
  request('/v1/qa/task/result', { ...opts, method: 'POST' });

export const getQAStat = (opts: Options): Promise<any> =>
  request('/v1/qa/end', { ...opts, method: 'POST' });

export const getQAProgress = (opts: Options): Promise<any> =>
  request('/v1/dashboard/agent_performance/qa_process', { ...opts });

export const exportQARecords = (opts: Options): Promise<any> =>
  request('/v1/export/agent_qa_stats/records', { ...opts });

export const downloadQARecord = (opts: Options): Promise<any> =>
  request('/v1/download/agent_qa_stats/record', { ...opts });

export const exportQAStats = (opts: Options): Promise<any> =>
  request('/v1/export/agent_qa_stats', { ...opts, method: 'POST' });
