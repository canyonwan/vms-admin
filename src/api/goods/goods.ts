import { http } from '@/utils/http/axios'
import type { IResultPage } from '@/utils/http/axios/types'
import type { IGoodsItem, IGoodsPageInput } from './types'

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
