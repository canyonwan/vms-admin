import { http } from '@/utils/http/axios'
import type { IRoleItem } from './types'
import { BasicPageInput } from '../types/common'

/**
 * @description: 角色列表
 */
export function getRoleList(params: BasicPageInput): Promise<{ list: IRoleItem[] }> {
  return http.request({
    url: 'role',
    method: 'GET',
    params
  })
}

/**
 * @description: 删除角色
 */
export function deleteRole(id: number): Promise<void> {
  return http.request({
    url: `role/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 保存角色
 */
export function saveRole(params) {
  return http.request({
    url: 'role',
    method: params.id ? 'put' : 'post',
    data: params
  })
}

/**
 * @description: 保存角色权限
 */
export function bindRolePermissions(params): Promise<void> {
  return http.request({
    url: 'role/permission',
    method: 'post',
    data: params
  })
}

/**
 * @description: 移除角色权限
 */
export function removeRolePermissions(params): Promise<void> {
  return http.request({
    url: 'role/permission',
    method: 'delete',
    data: params
  })
}
