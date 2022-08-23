import type { IComponentType } from '#/form'
import type { Component } from 'vue'
import ApiSelect from '@/components/Selects/ApiSelect.vue'
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue'
import WangEditor from '@/components/WangEditor/index.vue'
import PasswordStrength from '@/components/PasswordStrength/index.vue'
import { createBusinessComp } from '@/components/Business'
import {
  Input,
  InputNumber,
  InputPassword,
  AutoComplete,
  Select,
  TreeSelect,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker,
  Rate,
  Slider,
  Upload
} from 'ant-design-vue'

const componentMap = new Map<IComponentType, Component>()

// antv组件注入
componentMap.set('Input', Input)
componentMap.set('InputNumber', InputNumber)
componentMap.set('InputPassword', InputPassword)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('Select', Select)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', CheckboxGroup)
componentMap.set('RadioGroup', RadioGroup)
componentMap.set('Switch', Switch)
componentMap.set('DatePicker', DatePicker)
componentMap.set('Rate', Rate)
componentMap.set('Slider', Slider)
componentMap.set('Upload', Upload)

// 自定义组件注入
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('ApiTreeSelect', ApiTreeSelect)
componentMap.set('WangEditor', WangEditor)
componentMap.set('PasswordStrength', PasswordStrength)

// 业务组件注入
createBusinessComp()

/**
 * 添加组件
 * @param name - 组件名
 * @param component - 组件
 */
export function addComponent(name: IComponentType, component: Component): void {
  componentMap.set(name, component)
}

/**
 * 删除组件
 * @param name - 组件名
 */
export function deleteComponent(name: IComponentType): void {
  componentMap.delete(name)
}

export { componentMap }