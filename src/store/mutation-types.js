export const ACCESS_TOKEN = 'Authorization'
export const TOKEN_PREFIX = 'Bearer '

// export const SERVER_IS_INIT = 'server_is_init'

export const SIDEBAR_TYPE = 'sidebar_type'
export const TOGGLE_MOBILE_TYPE = 'is_mobile'
export const TOGGLE_NAV_THEME = 'nav_theme'
export const TOGGLE_LAYOUT = 'layout'
export const TOGGLE_FIXED_HEADER = 'fixed_header'
export const TOGGLE_FIXED_SIDEBAR = 'fixed_sidebar'
export const TOGGLE_CONTENT_WIDTH = 'content_width'
export const TOGGLE_HIDE_HEADER = 'auto_hide_header'
export const TOGGLE_COLOR = 'color'
export const TOGGLE_WEAK = 'weak'
export const TOGGLE_MULTI_TAB = 'multi_tab'
export const APP_LANGUAGE = 'app_language'

export const CONTENT_WIDTH_TYPE = {
  Fluid: 'Fluid',
  Fixed: 'Fixed'
}

export const NAV_THEME = {
  LIGHT: 'light',
  DARK: 'dark'
}

/**
 * 对应服务端 季度的所有类型
 */
export const ANIME_SEASON_TYPE_MAP = new Map([
  ['FIRST', '正篇第一季'],
  ['SECOND', '正篇第二季'],
  ['THIRD', '正篇第三季'],
  ['FOUR', '正篇第四季'],
  ['FIFTH', '正篇第五季'],
  ['SIXTH', '正篇第六季'],

  ['SPECIAL_FIRST', '特别篇 其一'],
  ['SPECIAL_SECOND', '特别篇 其二'],
  ['SPECIAL_THIRD', '特别篇 其三'],

  ['PROMOTION_VIDEO', '宣传短片 (PV)'],

  ['OPENING_SONG', '片头曲 (OP)'],
  ['ENDING_SONG', '片尾曲 (ED)'],

  ['SPECIAL_PROMOTION', 'SP'],
  ['SMALL_THEATER', '小剧场'],
  ['LIVE', 'LIVE'],
  ['CM', 'CM'],

  ['OTHER', '其它']
])

/**
 * 对应服务端用户订阅的进度
 * see run.ikaros.server.enums.SubscribeProgress
 */
export const USER_SUB_PROGRESS_MAP = new Map([
  ['', '未订阅'],
  ['WISH', '想看'],
  ['DONE', '看过'],
  ['DOING', '在看'],
  ['SHELVE', '搁置'],
  ['DISCARD', '抛弃']
])
