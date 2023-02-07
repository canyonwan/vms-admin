import type { IGoodsItem } from '@/api/goods/types'
import { NTag } from 'naive-ui'

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '名称',
    key: 'name',
    width: 140
  },
  {
    title: '描述',
    key: 'desc',
    width: 140
  },
  {
    title: '价格',
    key: 'price',
    width: 140
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(row: IGoodsItem) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error'
        },
        {
          default: () => (row.status ? '正常' : '下架')
        }
      )
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 140
  }
]
