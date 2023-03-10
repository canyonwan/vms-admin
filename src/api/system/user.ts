import { http } from '@/utils/http/axios'
import type { IUserItem } from './types'
import type { IResultPage } from '@/utils/http/axios/types'
import { BasicPageInput } from '../types/common'

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  data: T
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: 'user/info',
    method: 'get'
  })
}

/**
 * @description: 获取用户列表
 */
export function getUserList(params: BasicPageInput): Promise<IResultPage<IUserItem[]>> {
  return http.request({
    url: 'user/page',
    method: 'get',
    params
  })
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel>(
    {
      url: 'login',
      method: 'post',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params
  })
}
