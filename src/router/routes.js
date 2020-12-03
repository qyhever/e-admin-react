import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

import withAuthRouter from '@/hoc/withAuthRouter'
import withNoAuthRouter from '@/hoc/withNoAuthRouter'

import BasicLayout from '@/layouts/basic'
import BlankLayout from '@/layouts/blank'
import Exception404 from '@/views/exception/404'
import Exception403 from '@/views/exception/403'

import Login from '@/views/login'
import Analysis from '@/views/analysis'
import Market from '@/views/market'

function lazyComponent(path) {
  return lazy(() => import(/* webpackChunkName: '[request]' */`@/views/${path}`))
}

export const basicRoutes = [
  {
    path: '/dashboard',
    component: withAuthRouter(lazyComponent('dashboard')),
    exact: true,
    title: '仪表盘',
    icon: 'DesktopOutlined'
    // auth: ['dashboard']
  },
  {
    path: '/base',
    title: '组件',
    icon: 'AppstoreOutlined',
    component: BlankLayout,
    routes: [
      {
        path: '/base/chart',
        component: BlankLayout,
        title: '图表',
        icon: 'LineChartOutlined',
        routes: [
          {
            path: '/base/chart/echarts',
            component: withAuthRouter(lazyComponent('base/chart/Echarts')),
            title: 'echarts'
          },
          {
            path: '/base/chart/highcharts',
            component: withAuthRouter(lazyComponent('base/chart/Highcharts')),
            title: 'highcharts'
          }
        ]
      },
      {
        path: '/base/clipboard',
        component: withAuthRouter(lazyComponent('base/Clipboard')),
        title: '复制',
        auth: ['clipboard']
      },
      {
        path: '/base/qrcode',
        component: withAuthRouter(lazyComponent('base/Qrcode')),
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
    path: '/richtext',
    title: '富文本',
    icon: 'EditOutlined',
    component: BlankLayout,
    routes: [
      {
        path: '/richtext/quill',
        component: withAuthRouter(lazyComponent('richtext/Quill')),
        title: 'quill'
      },
      {
        path: '/richtext/tinymce',
        component: withAuthRouter(lazyComponent('richtext/Tinymce')),
        title: 'tinymce'
      },
      {
        path: '/richtext/braft',
        component: withAuthRouter(lazyComponent('richtext/Braft')),
        title: 'braft'
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
    component: withAuthRouter(lazyComponent('user')),
    exact: true,
    title: '账号管理',
    icon: 'UserOutlined',
    auth: ['user']
  },
  {
    path: '/user/detail',
    component: withAuthRouter(lazyComponent('user/UserDetail')),
    exact: true,
    title: '账号详情',
    hidden: true,
    auth: ['user']
  },
  {
    path: '/role',
    component: withAuthRouter(lazyComponent('role')),
    exact: true,
    title: '角色管理',
    icon: 'icon-role',
    auth: ['role']
  },
  {
    path: '/resource',
    component: withAuthRouter(lazyComponent('resource')),
    exact: true,
    title: '权限管理',
    icon: 'icon-resources',
    auth: ['resource']
  },
  {
    path: '/admin',
    component: withAuthRouter(lazyComponent('permission/Admin')),
    exact: true,
    title: 'admin',
    icon: 'icon-admin',
    auth: ['adminPage']
  },
  {
    path: '/dev',
    component: withAuthRouter(lazyComponent('permission/Dev')),
    exact: true,
    title: 'dev',
    icon: 'icon-dev',
    auth: ['devPage']
  },
  {
    path: '/operation',
    component: withAuthRouter(lazyComponent('permission/Operation')),
    exact: true,
    title: 'operation',
    icon: 'icon-operation',
    auth: ['operationPage']
  },
  {
    path: '/guest',
    component: withAuthRouter(lazyComponent('permission/Guest')),
    exact: true,
    title: 'guest',
    icon: 'icon-guest',
    auth: ['guestPage']
  },
  {
    path: '/test',
    component: withAuthRouter(lazyComponent('permission/Test')),
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
    path: '*',
    component: Exception404,
    hidden: true
  }
]

export const blankRoutes = [
  {
    path: '/login',
    exact: true,
    component: withNoAuthRouter(Login),
    hidden: true
  },
  {
    path: '/analysis',
    exact: true,
    component: Analysis,
    title: '分析页',
    icon: 'SmileOutlined'
  },
  {
    path: '/market',
    exact: true,
    component: Market,
    title: '市场地图',
    icon: 'SmileOutlined'
  }
]

export const routes = basicRoutes.concat(blankRoutes)

export default [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/dashboard"/>
  },
  ...blankRoutes,
  {
    component: BasicLayout,
    routes: basicRoutes
  },
  {
    path: '*',
    component: Exception404,
    hidden: true
  }
]
