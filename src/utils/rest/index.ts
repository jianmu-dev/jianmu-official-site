import axios, { AxiosTransformer, Method } from 'axios';
import qs from 'qs';
import { HttpError, TimeoutError } from '@/utils/rest/error';

const instance = axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // baseURL: 'http://xxx.xxx.xxx.xxx/',
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL as string | undefined,
  // default is `0` (no timeout)
  // timeout: 10 * 1000,
});

type PayloadType = 'form-data' | 'json' | 'file';

export interface IRequest {
  url: string;
  method: Method;
  payload?: any;
  payloadType?: PayloadType;
  auth?: boolean;
  onDownloadProgress?: () => void;
  timeout?: number;
}

export default async function rest({
  url,
  method,
  payload = {},
  payloadType = 'json',
  auth = false,
  onDownloadProgress,
  timeout,
}: IRequest): Promise<any> {
  const m = method.toLocaleLowerCase();
  let contentType: string | undefined;
  let transformRequest: AxiosTransformer | undefined;
  let params: object | undefined;
  let data: object | undefined;
  if (m === 'get' || m === 'delete' || m === 'head') {
    params = payload;
  } else if (m === 'post' || m === 'put' || m === 'patch') {
    switch (payloadType) {
      case 'form-data':
        contentType = 'application/x-www-form-urlencoded';
        transformRequest = data => qs.stringify(data, { indices: false });
        break;
      case 'file':
        contentType = 'multipart/form-data';
        break;
      default:
        contentType = 'application/json; charset=utf-8';
        break;
    }

    data = payload;
  } else {
    throw new Error(`Invalid supported method (value: ${method})`);
  }

  const headers: {
    [key: string]: string;
  } = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  let res;

  try {
    res = await instance.request({
      url,
      method: m,
      headers,
      params,
      paramsSerializer: (params: any) =>
        qs.stringify(params, { indices: false }),
      data,
      transformRequest,
      onDownloadProgress,
      // 设置10秒超时
      timeout: onDownloadProgress ? 0 : timeout || 10 * 1000,
    });
  } catch (err: any) {
    if (err.message.startsWith('timeout of')) {
      throw new TimeoutError(err.message);
    }

    throw new HttpError(err.response, err.message);
  }

  const newToken = res.headers['x-authorization-token'];

  return m === 'head' ? res.headers : res.data;
}
