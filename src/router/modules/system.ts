import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { SettingsRound } from '@vicons/material'
import { renderIcon } from '@/utils/index'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: renderIcon(SettingsRound),
      permissions: ['system'],
      sort: 2
    },
    children: [
      {
        path: 'menu',
        name: 'system_menu',
        meta: {
          title: '菜单权限管理',
          permissions: ['system_menu']
        },
        component: () => import('@/views/system/menu/menu.vue')
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: '角色权限管理',
          permissions: ['system_role']
        },
        component: () => import('@/views/system/role/role.vue')
      },
      {
        path: 'user',
        name: 'system_user',
        meta: {
          title: '用户管理',
          permissions: ['system_user']
        },
        component: () => import('@/views/system/user/user.vue')
      },
      {
        path: 'account',
        name: 'setting-account',
        meta: {
          title: '个人设置'
        },
        component: () => import('@/views/setting/account/account.vue')
      },
      {
        path: 'system',
        name: 'setting-system',
        meta: {
          title: '系统设置'
        },
        component: () => import('@/views/setting/system/system.vue')
      }
    ]
  }
]

export default routes
