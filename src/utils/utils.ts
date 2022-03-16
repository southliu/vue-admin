/**
 * 首字母大写
 * @param str 传入英文字符串
 */
export function firstCapitalize(str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}