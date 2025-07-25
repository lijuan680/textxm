import { del, get, post, put } from '@/utils/request'
import type {
  getRoleResType,
  getRolePayloadType,
  postRolePayloadType,
  deleteRolePayloadType,
  putRolePayloadType,
} from './type'

export const getRoleResApi = (params: getRolePayloadType) => {
  return get<getRoleResType>('/role/index', params)
}
export const postRoleApi = (data: postRolePayloadType) => {
  return post<Api.ResultType>('/role/create', data)
}
export const deleteRoleApi = (params: deleteRolePayloadType) => {
  return del<Api.ResultType>('/role/delete', params)
}
export const putRoleApi = (data: putRolePayloadType) => {
  return put<Api.ResultType>('/role/update',data)
}
