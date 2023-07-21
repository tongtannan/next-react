/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 
 */
import URL from 'url';
import qs from 'qs';

export const mergeQueryInUrl = (url: string, query: any): string => {
  if (!(query && String(query))) return url;

  const urlObject = URL.parse(url);
  const queryObject = qs.parse(urlObject.query);

  Object.assign(queryObject, query);
  Object.keys(queryObject).forEach(key => {
    if (queryObject[key] === null) {
      delete queryObject[key];
    }
  });

  urlObject.search = `?${qs.stringify(queryObject)}`;

  return URL.format(urlObject);
};

export const urlQueryToObject = (url = window.location.href) => {
  const urlObject = URL.parse(url);
  return qs.parse(urlObject.query);
};
