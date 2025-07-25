export interface listItem {
  role_id: number
  role_name: string
  state: number
  avatar: string
  wx_state: number
  user_id: number
  email: string
  username: string
  passwd_question: string
  passwd_answer: string
  sex: string
  mobile: string
  created_at: string
  updated_at: string
  last_time: string
  auth_ids: string
}

export interface UserType {
  state: number
  msg: string
  total: number
  list: listItem[]
}

export interface UserParams {
  pagenum: number
  pagesize: number
  username: string
  mobile: string
  role_name: string
  created_at: string
  updated_at: string
}

export interface CreateUser {
  user_id:number
  username: string
  password: string
  mobile?: string | undefined
  avatar?: string
}

export interface DeleteUser {
  user_id: number
}

export interface PutUser{
  user_id:number
  username?: string
  password?: string
  mobile?: string | undefined
  avatar?: string
}
