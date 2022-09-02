import type { IComponentType, IFormList } from '#/form'
import type { IAllDataType } from '#/public'
import type { IWangEditorProps } from '@/components/WangEditor/model'
import type { DatePickerProps } from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import type { Dayjs } from 'dayjs'
import { PLEASE_ENTER, PLEASE_SELECT } from '@/utils/config'
import { DATE_FORMAT } from '@/utils/constants'
import dayjs from 'dayjs'

/**
 * 生成占位符
 */
export function createPlaceholder(component: IComponentType): string {
  if (component.includes('Select') || component.includes('Picker')) {
    return PLEASE_SELECT
  }
  return PLEASE_ENTER
}

/**
 * 获取组件属性
 * @param item - 组件项
 * @param data - 数据对象
 * @param setData - 修改数据
 */
export function getComponentProps(
  item: IFormList,
  data: Record<string, IAllDataType>,
  setData: (key: string, value: IAllDataType) => void
) {
  switch (item.component) {
    // 富文本
    case 'WangEditor':
      return {
        modelValue: data[item.name] as string,
        height: (data[item.name] as IWangEditorProps)?.height || 300,
        'onUpdate:modelValue': (value: string) => setData(item.name, value)
      }

    // 复选框
    case 'Checkbox':
      return {
        checked: !!data[item.name],
        innerHTML: data?.name || '',
        'onChange': (value: CheckboxChangeEvent) => {
          setData(item.name, value.target.checked)
        },
        'onUpdate:value': (value: CheckboxChangeEvent) => {
          setData(item.name, value)
        }
      }

    // 时间
    case 'DatePicker': {
      const dateValue = data[item.name] ? dayjs(data[item.name] as string) : undefined
      return {
        defaultValue: dateValue,
        value: dateValue,
        'onUpdate:value': (value: Dayjs | string) => {
          const format = (data?.format || DATE_FORMAT) as string
          setData(item.name, (value as Dayjs).format(format))
        }
      }
    }

    // 时间区间
    case 'RangePicker': {
      const rangeValue: [Dayjs, Dayjs] | undefined = (data[item.name] as [string, string])?.length > 1 && (data[item.name] as [string, string])?.[0] ?
                [dayjs((data[item.name] as [string, string])[0]), dayjs((data[item.name] as [string, string])[1])] : undefined
      return {
        defaultValue: rangeValue,
        value: rangeValue,
        'onUpdate:value': (value: [Dayjs, Dayjs] | [string, string]) => {
          const format = ((data as DatePickerProps)?.format || DATE_FORMAT) as string
          const newValue = [
            (value as [Dayjs, Dayjs])[0].format(format),
            (value as [Dayjs, Dayjs])[1].format(format)
          ]
          setData(item.name, newValue)
        }
      }
    }

    default:
      return {
        value: data[item.name],
        'onUpdate:value': (value: IAllDataType) => {
          setData(item.name, value)
        }
      }
  }
}
