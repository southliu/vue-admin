import type { FormData } from "#/form";
import type { IConstant } from "./constants";
import type { ArrayData, TableData } from "#/public";
import type { DefaultOptionType } from "ant-design-vue/es/select";
import { TITLE_SUFFIX } from "./config";
import dayjs from "dayjs";

/**
 * 首字母大写
 * @param str - 传入英文字符串
 */
export function firstCapitalize(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 金额格式化3000->3,000
 * @param amount - 金额
 */
export function amountFormatter(amount: number) {
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 过滤空数据
 * @param obj - 传入对象
 */
type EmptyData = Record<string, unknown>
export function filterEmptyValue(obj: EmptyData): EmptyData {
  const res: EmptyData = {};

  for (let key in obj) {
    // 去除key中多余的空格
    key = key.trim();

    // undefined过滤
    if (obj[key] === undefined) continue;

    // null过滤
    if (obj[key] === null) continue;

    // 空数组过滤
    if (
      obj[key]?.constructor === Array &&
      (obj[key] as ArrayData).length === 0
    ) continue;

    // 空字符串过滤
    if (
      obj[key]?.constructor === String &&
      (obj[key] as string).length === 0
    ) continue;

    // 空对象过滤
    if (
      obj[key]?.constructor === Object &&
      Object.keys(obj[key] as object).length === 0
    ) continue;

    // 去除字符串多余空格
    if (obj[key]?.constructor === String) {
      res[key] = (obj[key] as string).trim();
    } else {
      res[key] = obj[key];
    }
  }

  return res;
}

/**
 * 递归数据
 * @param data - 数据源
 */
interface IRecursiveChildren<T> { children?: T[] }
export function recursiveData<T extends IRecursiveChildren<T>, U>(
  data: T[],
  callback: (data: T) => U
): U[] {
  if (data. length === 0) return [];
  const res: U[] = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const filterData = callback(element);
    const children = element.children ? recursiveData(element.children, callback) : undefined;
    res.push({ ...filterData, children });
  }

  return res;
}

/**
 * 处理回显数据
 * @param arr - 数组
 */
export const handleEchoArr = (
  data: unknown,
  arr: IConstant[] | DefaultOptionType[],
  options?: { label: string, value: string }
) => {
  if ([undefined, null, ''].includes(data as undefined)) return;
  const label = options?.label || 'label';
  const value = options?.value || 'value';

  if (Array.isArray(data)) {
    const result: string[] = [];

    for (let i = 0; i < data?.length; i++) {
      const item = data[i];

      for (let j = 0; j < arr?.length; j++) {
        const arrItem = arr[j];
        
        if (String(arrItem[value]) === String(item)) {
          result.push(arrItem[label]);
        }
      }
    }

    return result?.join(',');
  }
};

/**
 * 处理回显颜色
 * @param arr - 数组
 */
export function handleEchoColor(value: unknown, arr: IConstant[] | DefaultOptionType[]) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.value === value) {
      return item.color;
    }
  }

  return '';
}

/**
 * 过滤前后空格
 * @param value - 值
 */
export const handleFilterTrim = (value: string | string[]): string | string[] => {
  if (!value) return '';

  // 如果是数组
  if (Array.isArray(value)) {
    const result: string[] = [];
    
    for (let i = 0; i < value?.length; i++) {
      result.push(value[i]?.trim());
    }

    return result;
  }

  return (value as string)?.trim();
};

/**
 * 单选框组过滤
 * @param list - 列表
 * @param label - 名称
 * @param value - 值
 */
export const handleRadioGroup = (list: FormData[], label: string, value = 'id'): DefaultOptionType[] => {
  const result: DefaultOptionType[] = [];

  for (let i = 0; i < list?.length; i++) {
    const item = list[i];
    result.push({
      label: item?.[label],
      value: item?.[value] as string,
    });
  }

  return result;
};

/**
 * 设置标题
 * @param title - 标题
 */
export function setTitle(title: string) {
  const value = `${title ? title + '-' : ''}${TITLE_SUFFIX}`;
  document.title = value;
}

/**
 * 获取字符串UTF-16码元总和
 * @param data - 表格字段值
 */
const getStrCodeNum = (data: string) => {
  let result = 0;
  if ([undefined, null, ''].includes(data)) return result;

  if (typeof data !== 'string') {
    data = (data as Number)?.toString?.();
  }

  for (let i = 0; i < data?.length; i++) {
    const item = data[i];
    result += item?.charCodeAt?.(0) || 0;
  }

  return result;
};

/**
 * 时间转时间戳
 * @param data - 表格字段值
 */
const handleDateToNum = (data: string) => {
  if (data) {
    return dayjs(data as string).valueOf() || 0;
  }

  return 0;
};

/**
 * 处理表格排序
 * @param key - 表格字段名
 * @param directions - 升序降序
 */
interface TableSorterProps {
  a: TableData;
  b: TableData;
  key: string | string[];
  directions?: 'ascend' | 'descend';
  type?: 'date';
}
export const handleTableSorter = ({
  a,
  b,
  key,
  directions = 'ascend',
  type
}: TableSorterProps) => {
  let result = 0;
  let aNum = 0, bNum = 0;

  // 如果是时间类型
  if (type === 'date') {
    aNum = handleDateToNum(getDeepNestedObj(key, a) as string);
    bNum = handleDateToNum(getDeepNestedObj(key, b) as string);
  } else {
    aNum = getStrCodeNum(getDeepNestedObj(key, a) as string);
    bNum = getStrCodeNum(getDeepNestedObj(key, b) as string);
  }
  if (directions === 'ascend') {
    result = aNum - bNum;
  } else {
    result = bNum - aNum;
  }

  return result;
};

/**
 * 获取嵌套数据
 * @param keys - 键值数组
 * @param obj - 表单数据对象
 */
export const getDeepNestedObj = (keys: string[] | string, obj: Record<string, unknown>) => {
  if (!Array.isArray(keys)) return obj?.[keys] ?? '';

  try {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]?.trim();
      const errorData = [undefined, null, ''];
      if (
        !obj ||
        errorData.includes(key) ||
        errorData.includes(obj[key] as undefined)
      ) return '';
      if (keys.length - 1 === i) return obj[key];
      obj = obj[key] as Record<string, unknown>;
    }
    return '';
  } catch(e) {
    console.warn('嵌套数据解析异常:', e);
  }
};