import { http } from '@/utils/http/axios'
import { IPermissionItem } from './types'

/**
 * @description: 权限菜单列表
 */
export function queryPermissionList(): Promise<{ list: IPermissionItem[] }> {
  return http.request({
    url: 'permission/tree',
    method: 'GET'
  })
}

/**
 * @description: 编辑权限菜单列表
 */
export function savePermission(params: IPermissionItem): Promise<{ id: number }> {
  return http.request({
    url: 'permission',
    method: params.id ? 'put' : 'post',
    data: params
  })
}

/**
 * @description: 删除权限菜单列表
 */
export function deletePermission(id: number): Promise<void> {
  return http.request({
    url: `permission/${id}`,
    method: 'delete'
  })
}
