import { del, get, post, put } from '@/utils/request'
import type { CreateUser, DeleteUser, PutUser, UserParams, UserType } from './type'

export const getUserResApi = (params?: UserParams) => {
  return get<UserType>('/user/index', params)
}

export const postCreatePayloadApi = (data: CreateUser) => {
  return post<Api.ResultType>('/user/create', data)
}

export const delUserResApi = (data: DeleteUser) => {
  return del<Api.ResultType>('/user/delete',data)
}

export const putUserPayloadApi = (data: PutUser)=>{
  return put('/user/update',data)
}
