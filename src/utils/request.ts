import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: '/ftyyptapi',
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.token = JSON.parse(localStorage.getItem('userinfo') as string)?.token
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => Promise.reject(error),
)

const post = <R = any>(
  url: string = '',
  data: object = {},
  options: AxiosRequestConfig = {},
): Promise<R> => {
  return instance.post(url, data, options) as Promise<R>
}
const put = <R = any>(
  url: string = '',
  data: object = {},
  options: AxiosRequestConfig = {},
): Promise<R> => {
  return instance.put(url, data, options) as Promise<R>
}

const get = <R = any>(
  url: string = '',
  params: object = {},
  options: AxiosRequestConfig = {},
): Promise<R> => {
  return instance.get(url, { params, ...options }) as Promise<R>
}
const del = <R = any>(
  url: string = '',
  params: object = {},
  options: AxiosRequestConfig = {},
): Promise<R> => {
  return instance.delete(url, { params, ...options }) as Promise<R>
}
export { post, get, del, put }
