import { http } from '@/utils/http/axios'
import type { IResultPage } from '@/utils/http/axios/types'
import type { IArticleItem, ISaveArticleParams } from './types'

/**
 * @description: 文章分页
 */
export function queryArticlePage(params: any): Promise<IResultPage<IArticleItem>> {
  return http.request({
    url: 'article/page',
    method: 'get',
    params
  })
}

/**
 * @description: 删除文章
 */
export function deleteArticle(id: number): Promise<void> {
  return http.request({
    url: `article/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 保存文章
 */
export function saveArticle(params: ISaveArticleParams): Promise<void> {
  return http.request({
    url: 'article',
    method: params.id ? 'put' : 'post',
    data: params
  })
}
