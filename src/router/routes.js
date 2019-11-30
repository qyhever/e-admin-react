import { lazy } from 'react'
import withAuthRouter from './withAuthRouter'

import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'
import Exception404 from '@/views/exception/404'
import Exception403 from '@/views/exception/403'

export default [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/dashboard',
        component: withAuthRouter(lazy(() => import('@/views/dashboard'))),
        exact: true,
        title: '仪表盘',
        icon: 'desktop'
        // auth: ['dashboard']
      },
      {
        path: '/base',
        title: '组件',
        icon: 'appstore-o',
        component: BlankLayout,
        routes: [
          {
            path: '/base/clipboard',
            component: withAuthRouter(lazy(() => import('@/views/base/clipboard'))),
            title: '复制',
            auth: ['clipboard']
          },
          {
            path: '/base/qrcode',
            component: withAuthRouter(lazy(() => import('@/views/base/qrcode'))),
            title: '二维码',
            auth: ['qrcode']
          },
          {
            path: '*',
            component: Exception404,
            hidden: true
          }
        ]
      },
      {
        path: '/user',
        component: withAuthRouter(lazy(() => import('@/views/user'))),
        exact: true,
        title: '账号管理',
        icon: 'user',
        auth: ['user']
      },
      {
        path: '/role',
        component: withAuthRouter(lazy(() => import('@/views/role'))),
        exact: true,
        title: '角色管理',
        icon: 'icon-role',
        auth: ['role']
      },
      {
        path: '/resource',
        component: withAuthRouter(lazy(() => import('@/views/resource'))),
        exact: true,
        title: '权限管理',
        icon: 'icon-resources',
        auth: ['resource']
      },
      {
        path: '/admin',
        component: withAuthRouter(lazy(() => import('@/views/permission/Admin'))),
        exact: true,
        title: 'admin',
        icon: 'icon-admin',
        auth: ['adminPage']
      },
      {
        path: '/dev',
        component: withAuthRouter(lazy(() => import('@/views/permission/Dev'))),
        exact: true,
        title: 'dev',
        icon: 'icon-dev',
        auth: ['devPage']
      },
      {
        path: '/guest',
        component: withAuthRouter(lazy(() => import('@/views/permission/Guest'))),
        exact: true,
        title: 'guest',
        icon: 'icon-guest',
        auth: ['guestPage']
      },
      {
        path: '/operation',
        component: withAuthRouter(lazy(() => import('@/views/permission/Operation'))),
        exact: true,
        title: 'operation',
        icon: 'icon-operation',
        auth: ['operationPage']
      },
      {
        path: '/test',
        component: withAuthRouter(lazy(() => import('@/views/permission/Test'))),
        exact: true,
        title: 'test',
        icon: 'icon-test',
        auth: ['testPage']
      },
      {
        path: '/403',
        component: Exception403,
        exact: true,
        title: '403',
        hidden: true
      },
      {
        path: '/404',
        component: Exception404,
        exact: true,
        title: '404',
        hidden: true
      },
      {
        path: '*',
        component: Exception404,
        hidden: true
      }
    ]
  }
]
