import { h } from 'vue'
import { NImage, NTag } from 'naive-ui'
import type { IArticleItem } from '@/api/cms/types'

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '标题',
    key: 'title',
    width: 160
  },
  {
    title: '封面图',
    key: 'picUrl',
    width: 140,
    render(row: IArticleItem) {
      return h(NImage, {
        src: row.picUrl,
        width: 100,
        height: 80
      })
    }
  },
  {
    title: '摘要',
    key: 'desc',
    width: 120
  },
  {
    title: '发布者',
    key: 'publisher',
    width: 120
  },
  {
    title: '点赞数',
    key: 'praiseCount',
    width: 120
  },
  {
    title: '是否是超管',
    key: 'isSuperAdmin',
    width: 120,
    render(row: IArticleItem) {
      return h(
        NTag,
        {
          type: row.isSuperAdmin ? 'success' : 'error'
        },
        {
          default: () => (row.isSuperAdmin ? '是' : '否')
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
