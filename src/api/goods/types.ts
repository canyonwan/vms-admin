export interface IGoodsItem {
  id?: number
  name: string
  desc: string
  price: number
  status: number
  cover: string
  sort: number
  userId: number
  oneLevelId: number
  twoLevelId: number
  threeLevelId: number
  createAt: string
  updateAt: string
}

export interface IGoodsPageInput {
  id?: number
  name: string
  price: number
  status: number
  threeLevelId: number
  oneLevelId: number
  sort: number
  twoLevelId: number
  cover: string
  desc: string
}
