// 用户item
export interface IUserItem {
  id: number
  phone: string
  realName: string
  avatar: string
  gender: number
  platform: number
  status: number
  isSuperAdmin: number
  roleIds: string
  userSalt: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface IPermissionItem {
  id?: number
  parentId: number
  name: string
  status?: number
  code: string
  path: string
  children?: IPermissionItem[]
}
export interface IRoleItem {
  id?: number
  roleName: string
  roleDesc: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
