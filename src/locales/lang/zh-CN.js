import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'
import global from './zh-CN/global'

import menu from './zh-CN/menu'
import setting from './zh-CN/setting'
import user from './zh-CN/user'

import dashboard from './zh-CN/dashboard'
import form from './zh-CN/form'
import account from './zh-CN/account'
import util from './zh-CN/util'
import exception from './zh-CN/exception'
import test from './zh-CN/test'
import request from './zh-CN/request'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': '信息',
  'layouts.usermenu.dialog.content': '您确定要注销吗？',
  'layouts.userLayout.title': 'Ikaros 是一个开源的专注于 ACGMN 的内容管理系统(CMS)',
  ...components,
  ...global,
  ...menu,
  ...setting,
  ...user,
  ...dashboard,
  ...form,
  ...account,
  ...util,
  ...exception,
  ...test,
  ...request
}
