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
