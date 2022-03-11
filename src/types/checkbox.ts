import type { CheckboxOptionType } from "ant-design-vue";

export interface ICheckboxData {
  checkboxName?: string;
  checkboxList?: (string | CheckboxOptionType)[]
}