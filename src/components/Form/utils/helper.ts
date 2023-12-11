import type { ComponentType, FormData, FormList } from '#/form';
import type { WangEditorProps } from '@/components/WangEditor/model';
import type { DatePickerProps } from 'ant-design-vue';
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface';
import type { Dayjs } from 'dayjs';
import { PLEASE_ENTER, PLEASE_SELECT, DATE_FORMAT } from '@/utils/config';
import dayjs from 'dayjs';

/**
 * 生成占位符
 * @param component - 组件名
 */
export function createPlaceholder(component: ComponentType): string | string[] {
  if (component.includes('RangePicker')) {
    return ['开始日期', '结束日期'];
  }
  if (component.includes('Select') || component.includes('Picker')) {
    return PLEASE_SELECT;
  }
  return PLEASE_ENTER;
}

/**
 * 获取嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 */
const getDeepNested = (arr: string[], obj: Record<string, unknown>) => {
  try {
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]?.trim();
      if (!key || !obj || !obj[key]) return '';
      if (arr.length - 1 === i) return obj[key];
      obj = obj[key] as Record<string, unknown>;
    }
    return '';
  } catch(e) {
    console.warn('嵌套数据解析异常:', e);
  }
};

/**
 * 获取组件属性
 * @param item - 组件项
 * @param data - 数据对象
 * @param setData - 修改数据
 */
export function getComponentProps(
  item: FormList,
  data: FormData,
  setData: (key: string | string[], value: unknown) => void
) {
  const key = item.name;
  let compData: unknown;

  // 当key存在逗号时，分割数据
  if (Array.isArray(key)) {
    compData = getDeepNested(key, data);
  } else {
    compData = data[key];
  }

  switch (item.component) {
    // 富文本
    case 'Editor':
      return {
        modelValue: compData as string,
        height: (compData as WangEditorProps)?.height || 300,
        'onUpdate:modelValue': (value: string) => setData(key, value)
      };

    // 复选框
    case 'Checkbox':
      return {
        checked: !!compData,
        innerHTML: data?.name || '',
        'onChange': (value: CheckboxChangeEvent) => {
          setData(key, value.target.checked);
        },
        'onUpdate:value': (value: CheckboxChangeEvent) => {
          setData(key, value);
        }
      };

    // 复选框组
    case 'CheckboxGroup':
      return {
        value: Array.isArray(compData) ? compData : [],
        'onUpdate:value': (value: Record<string, unknown>) => {
          setData(key, value);
        }
      };

    // 开关
    case 'Switch':
      return {
        checked: !!compData,
        'onChange': (value: boolean) => {
          setData(key, value);
        }
      };

    // 时间
    case 'DatePicker': {
      const dateValue = compData ? dayjs(compData as string) : undefined;
      return {
        value: dateValue,
        defaultValue: dateValue,
        'onUpdate:value': (value: Dayjs | string) => {
          const format = ((item?.componentProps as DatePickerProps)?.format || DATE_FORMAT) as string;
          setData(key, (value as Dayjs).format(format));
        }
      };
    }

    // 时间区间
    case 'RangePicker': {
      const rangeValue: [Dayjs, Dayjs] | undefined = (compData as [string, string])?.length > 1 && (compData as [string, string])?.[0] ?
        [dayjs((compData as [string, string])[0]), dayjs((compData as [string, string])[1])] : undefined;
      return {
        value: rangeValue,
        defaultValue: rangeValue,
        format: [DATE_FORMAT, DATE_FORMAT],
        'onUpdate:value': (value: [Dayjs, Dayjs] | [string, string]) => {
          if (value?.length < 2) return setData(key, []);

          const format = ((item?.componentProps as DatePickerProps)?.format || DATE_FORMAT) as string;
          const newValue = [
            (value as [Dayjs, Dayjs])?.[0]?.format(format),
            (value as [Dayjs, Dayjs])?.[1]?.format(format)
          ];
          setData(key, newValue);
        }
      };
    }

    default:
      return {
        value: compData,
        'onUpdate:value': (value: Record<string, unknown>) => {
          setData(key, value);
        }
      };
  }
}
