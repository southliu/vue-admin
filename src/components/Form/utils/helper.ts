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
 * 获取嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 */
const getDeepNested = (arr: string[], obj: Record<string, IAllDataType>) => {
  try {
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]?.trim()
      if (!key || !obj || !obj[key]) return ''
      if (arr.length - 1 === i) return obj[key]
      obj = obj[key] as Record<string, IAllDataType>
    }
    return ''
  } catch(e) {
    console.error('嵌套数据解析异常:', e)
  }
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
  setData: (key: string | string[], value: IAllDataType) => void
) {
  const key = item.name
  let compData: IAllDataType

  // 当key存在逗号时，分割数据
  if (Array.isArray(key)) {
    compData = getDeepNested(key, data)
  } else {
    compData = data[key]
  }

  switch (item.component) {
    // 富文本
    case 'WangEditor':
      return {
        modelValue: compData as string,
        height: (compData as IWangEditorProps)?.height || 300,
        'onUpdate:modelValue': (value: string) => setData(key, value)
      }

    // 复选框
    case 'Checkbox':
      return {
        checked: !!compData,
        innerHTML: data?.name || '',
        'onChange': (value: CheckboxChangeEvent) => {
          setData(key, value.target.checked)
        },
        'onUpdate:value': (value: CheckboxChangeEvent) => {
          setData(key, value)
        }
      }

    // 时间
    case 'DatePicker': {
      const dateValue = compData ? dayjs(compData as string) : undefined
      return {
        defaultValue: dateValue,
        value: dateValue,
        'onUpdate:value': (value: Dayjs | string) => {
          const format = (data?.format || DATE_FORMAT) as string
          setData(key, (value as Dayjs).format(format))
        }
      }
    }

    // 时间区间
    case 'RangePicker': {
      const rangeValue: [Dayjs, Dayjs] | undefined = (compData as [string, string])?.length > 1 && (compData as [string, string])?.[0] ?
                [dayjs((compData as [string, string])[0]), dayjs((compData as [string, string])[1])] : undefined
      return {
        defaultValue: rangeValue,
        value: rangeValue,
        'onUpdate:value': (value: [Dayjs, Dayjs] | [string, string]) => {
          const format = ((data as DatePickerProps)?.format || DATE_FORMAT) as string
          const newValue = [
            (value as [Dayjs, Dayjs])[0].format(format),
            (value as [Dayjs, Dayjs])[1].format(format)
          ]
          setData(key, newValue)
        }
      }
    }

    default:
      return {
        value: compData,
        'onUpdate:value': (value: IAllDataType) => {
          setData(key, value)
        }
      }
  }
}
