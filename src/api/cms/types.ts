export interface IArticleItem {
  id: number
  userId: number
  publisher: string
  title: string
  desc: string
  picUrl: string
  isSuperAdmin: number
  praiseCount: number
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: any
}

export interface ISaveArticleParams {
  id?: number
  picUrl?: string
  title: string
  content: string
  desc?: string
}
