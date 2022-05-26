/**
 * 公用常数
 */

interface IContent {
  value: string | number;
  label: string;
}

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

/**
 * 来源
 */
 export const SOURCE_TYPE: IContent[] = [
  { value: '43', label: '新SDK' },
  { value: '67', label: '旧SDK' }
]