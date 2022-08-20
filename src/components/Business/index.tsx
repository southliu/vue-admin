import { addComponent } from "../Form/utils/componentMap"
import GameSelect from './Selects/GameSelect.vue'
import PartnerSelect from './Selects/PartnerSelect.vue'

/**
 * 组件类型
 * @description 每次引入组件时，需要声明类型
 */
export type IBusinessComponentType = 'GameSelect' | 'PartnerSelect'

/** 生成业务组件 */
export function createBusinessComp() {
  addComponent('GameSelect', GameSelect)
  addComponent('PartnerSelect', PartnerSelect)
}
