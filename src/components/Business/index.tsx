import type { IFormList, IComponentProps } from "@/types/form"
import type { IAllDataType } from "@/types/public"
import GameSelect from './Selects/GameSelect.vue'
import PartnerSelect from './Selects/PartnerSelect.vue'

/**
 * 组件类型
 * @description 每次引入组件时，需要声明类型
 */
export type IBusinessComponentType = 'GameSelect' | 'PartnerSelect'

// 组件数据发送类型
export type IBusinessEmit = (value: IAllDataType) => void

/**
 * 导出业务组件
 */
export function exportBusiness(item: IFormList, value?: IAllDataType, handleEmit?: IBusinessEmit) {
  const { component, componentProps } = item

  // 属性值
  const params = {
    value,
    componentProps: componentProps as IComponentProps,
    handleEmit: handleEmit as IBusinessEmit
  }

  // 获取业务组件
  // const files = import.meta.glob('./**/*.vue');

  // for (let key in files) {
  //   const start = key.lastIndexOf('/') + 1
  //   const end = key.lastIndexOf('.')
  //   const name = key.substring(start, end) // 获取组件名

  //   if (name === component) {
  //     const module = await import(key)
  //     const File = module.default || module
  //     return <File { ...params } />
  //   }
  // }

  switch (component) {
    // 游戏下拉选择
    case 'GameSelect':
      return <GameSelect { ...params } />

    // 合作公司下拉选择
    case 'PartnerSelect':
      return <PartnerSelect { ...params } />
  }
}