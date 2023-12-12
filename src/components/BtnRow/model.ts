import type { ButtonProps } from "ant-design-vue";

export interface BtnRowList<T = string> {
  label: string;
  value: T;
  permission: string;
  isSlot?: boolean;
  type?: 'default' | 'create' | 'update' | 'delete';
  isIcon?: boolean;
  isDanger?: boolean;
  btnType?: ButtonProps['type'];
}