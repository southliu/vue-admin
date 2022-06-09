import type { IFormList, IComponentProps } from "@/types/form"
import type { IBasicData } from "@/types/public"
import GameSelect from './Select/GameSelect.vue'
import PartnerSelect from './Select/PartnerSelect.vue'

// 组件类型
export type IBusinessComponentType = 'GameSelect' | 'PartnerSelect'
// 组件数据发送类型
export type IBusinessEmit = (value: IBasicData) => void

/**
 * 导出业务组件
 */
export function exportBusiness(item: IFormList, value?: IBasicData, handleEmit?: IBusinessEmit) {
  const { component, componentProps } = item

  // 属性值
  const params = {
    value,
    componentProps: componentProps as IComponentProps,
    handleEmit: handleEmit as IBusinessEmit
  }

  switch (component) {
    // 游戏下拉选择
    case 'GameSelect':
      return <GameSelect { ...params } />

    // 合作公司下拉选择
    case 'PartnerSelect':
      return <PartnerSelect { ...params } />
  }
}