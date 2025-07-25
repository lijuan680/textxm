export interface getRolePayloadType {
  pagenum: number
  pagesize: number
  role_name: string
}

export interface roleItem {
  role_id: number
  role_name: string
  action_list: string
  role_desc: string
  created_at: string
  updated_at: string
  auth_ids: string
  auth_ids_son: string
}

export interface getRoleResType {
  state: number
  msg: string
  total: number
  list: roleItem[]
}
//  添加
export interface postRolePayloadType {
  role_name: string
  role_desc: string
}
// 删除
export interface deleteRolePayloadType {
  role_id: string | number
}
//更新
export interface putRolePayloadType {
  role_id: number
  role_name: string
  role_desc: string
}

