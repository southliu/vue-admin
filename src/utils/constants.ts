/**
 * 公用常数
 */

/**
 * 颜色
 */
export enum colors {
  success = 'green',
  primary = '#409EFF',
  warning = '#E6A23C',
  danger = 'red',
  info = '#909399'
}

interface IContent {
  value: string | number;
  label: string;
  color?: colors;
}

// 日期格式化
export const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 来源
 */
 export const SOURCE_TYPE: IContent[] = [
  { value: '43', label: '新SDK' },
  { value: '67', label: '旧SDK' }
]


/**
 * 游戏包类型
 */
 export const GAME_PACKAGE_TYPE: IContent[] = [
  { value: 0, label: '自投' },
  { value: 1, label: 'CPS' },
  { value: 2, label: '联运' }
]