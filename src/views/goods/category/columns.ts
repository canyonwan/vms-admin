import type { IGoodsCategoryTreeItem } from '@/api/goods/types'
import { NImage } from 'naive-ui'

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '名称',
    key: 'categoryName',
    width: 140
  },
  {
    title: '排序',
    key: 'sort',
    width: 140
  },
  {
    title: '级别',
    key: 'level',
    width: 140
  },
  {
    title: '状态',
    key: 'picUrl',
    width: 100,
    render(row: IGoodsCategoryTreeItem) {
      return h(NImage, {
        src: row.picUrl,
        width: 100,
        height: 80
      })
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 140
  }
]
