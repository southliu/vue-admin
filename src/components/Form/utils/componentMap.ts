import type { ComponentType } from '#/form';
import type { Component } from 'vue';
import { createBusinessComp } from '@/components/Business';
import {
  Input,
  InputNumber,
  InputPassword,
  AutoComplete,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker,
  RangePicker,
  Rate,
  Slider,
  Textarea
} from 'ant-design-vue';
import BasicSelect from '@/components/Selects/BasicSelect.vue';
import BasicTreeSelect from '@/components/Selects/BasicTreeSelect.vue';
import ApiSelect from '@/components/Selects/ApiSelect.vue';
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue';
import WangEditor from '@/components/WangEditor/index.vue';
import PasswordStrength from '@/components/PasswordStrength/index.vue';
import BasicUploadFile from '@/components/Upload/BasicUploadFile.vue';
import BasicUploadImage from '@/components/Upload/BasicUploadImage.vue';

const componentMap = new Map<ComponentType, Component>();

// antv组件注入
componentMap.set('Input', Input);
componentMap.set('InputNumber', InputNumber);
componentMap.set('InputPassword', InputPassword);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('Select', BasicSelect);
componentMap.set('TreeSelect', BasicTreeSelect);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', CheckboxGroup);
componentMap.set('RadioGroup', RadioGroup);
componentMap.set('Switch', Switch);
componentMap.set('DatePicker', DatePicker);
componentMap.set('RangePicker', RangePicker);
componentMap.set('Rate', Rate);
componentMap.set('Slider', Slider);
componentMap.set('UploadFile', BasicUploadFile);
componentMap.set('UploadImage', BasicUploadImage);
componentMap.set('Textarea', Textarea);

// 自定义组件注入
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('Editor', WangEditor);
componentMap.set('PasswordStrength', PasswordStrength);

// 业务组件注入
createBusinessComp();

/**
 * 添加组件
 * @param name - 组件名
 * @param component - 组件
 */
export function addComponent(name: ComponentType, component: Component): void {
  componentMap.set(name, component);
}

/**
 * 删除组件
 * @param name - 组件名
 */
export function deleteComponent(name: ComponentType): void {
  componentMap.delete(name);
}

export { componentMap };