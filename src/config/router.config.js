// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index'),
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] }
      },
      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },

      // file
      {
        path: '/file',
        name: 'File',
        component: RouteView,
        redirect: '/file/list',
        meta: { title: 'menu.file', icon: 'file', permission: ['result'] },
        children: [
          {
            path: '/file/add',
            name: 'FileAdd',
            component: () => import(/* webpackChunkName: "result" */ '@/views/file/Add'),
            meta: { title: 'menu.file.add', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/file/list',
            name: 'FileList',
            component: () => import(/* webpackChunkName: "result" */ '@/views/file/List'),
            meta: { title: 'menu.file.list', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/file/edit',
            name: 'FileEdit',
            // hidden: true,
            component: () => import(/* webpackChunkName: "result" */ '@/views/file/Edit'),
            meta: { title: 'menu.file.edit', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/Center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/Setting'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            hideChildrenInMenu: true
          }
        ]
      },

      // system
      {
        path: '/system',
        name: 'System',
        component: BlankLayout,
        redirect: '/system/options',
        meta: { title: 'menu.system', icon: 'setting' },
        children: [
          {
            path: '/system/options',
            name: 'SystemOptions',
            component: () => import('@/views/system/SystemOptions'),
            meta: { title: 'menu.system.options', hiddenHeaderContent: false }
          },
          {
            path: '/system/actionlogs',
            name: 'SystemActionLogs',
            component: () => import('@/views/system/ActionLogs'),
            meta: { title: 'menu.system.actionlogs', hiddenHeaderContent: false }
          },
          {
            path: '/system/about',
            name: 'About',
            component: () => import('@/views/system/About'),
            meta: { title: 'menu.system.about', hiddenHeaderContent: false }
          }
        ]
      },

      // test
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test'),
        meta: { title: 'menu.test', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
