import type { DefaultOptionType } from "ant-design-vue/es/select";
/**
 * @description: 公用常量
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

export interface IConstant extends Omit<DefaultOptionType, 'value'> {
  value: string | number | boolean;
  label: string;
  color?: colors;
}

/**
 * 开启状态
 */
 export const OPEN_CLOSE: IConstant[] = [
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
];

/**
 * 菜单状态
 */
 export const MENU_STATUS: IConstant[] = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 0 }
];

/**
 * 菜单类型
 */
export const MENU_TYPE: IConstant[] = [
  { label: '目录', value: 0 },
  { label: '菜单', value: 1 },
  { label: '按钮', value: 2 },
];
