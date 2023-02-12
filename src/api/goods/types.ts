export interface IGoodsItem {
  id?: number
  categoryIds: number[] | string
  name: string
  desc: string
  price: number
  status: number
  cover: string
  sort: number
  // oneLevelId: number
  // twoLevelId?: number
  // threeLevelId?: number
}

export interface IGoodsCategoryTreeItem {
  id?: number
  parentId: number
  picUrl?: string
  categoryName: string
  sort: string
  children?: IGoodsCategoryTreeItem[]
}
