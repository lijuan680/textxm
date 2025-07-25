import { post } from '@/utils/request'
import type { postLoginType, postLoginResType } from './type'

export const postLoginApi = (data: postLoginType) => {
  return post<Api.ResultType<postLoginResType>>('/user/login', data)
}
 