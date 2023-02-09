import { http } from '@/utils/http/axios'
import type { IResultPage } from '@/utils/http/axios/types'
import type { IGoodsCategoryTreeItem, IGoodsItem, IGoodsPageInput } from './types'

/**
 * @description: 商品分页
 */
export function queryGoodsPage(params: any): Promise<IResultPage<IGoodsItem>> {
  return http.request({
    url: 'goods/page',
    method: 'get',
    params
  })
}
/**
 * @description: 商品分类分页
 */
export function queryGoodsCategoryPage(params: any): Promise<IResultPage<IGoodsCategoryTreeItem>> {
  return http.request({
    url: 'category/page',
    method: 'get',
    params
  })
}

/**
 * @description: 删除商品
 */
export function deleteGoods(id: number): Promise<void> {
  return http.request({
    url: `goods/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 保存商品
 */
export function saveGoods(params: IGoodsPageInput): Promise<void> {
  return http.request({
    url: 'goods',
    method: params.id ? 'put' : 'post',
    data: params
  })
}

/**
 * @description: 商品分类
 */
export function queryGoodsCategoryTree(): Promise<{ list: IGoodsCategoryTreeItem[] }> {
  return http.request({
    url: 'category/tree',
    method: 'get'
  })
}
