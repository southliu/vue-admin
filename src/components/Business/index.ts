import type { IFormList } from "@/types/form";
import type { IBasicData } from "@/types/public";
import GameSelect from './Select/GameSelect.vue'
import { h } from "vue";

// 组件类型
export type IBusinessComponentType = 'GameSelect'

/**
 * 导出业务组件
 */
export type IBusinessValue = string | number | boolean | object
export function exportBusiness(item: IFormList, value: IBasicData | undefined) {
  const { component, componentProps } = item

  switch (component) {
    // 游戏下拉选择
    case 'GameSelect':
      return (
        h(GameSelect, { value, componentProps })
      )

  }
}