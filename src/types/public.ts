// 基础类型
export type IBasicData = string | number | boolean | symbol

// 数组
export type IArrayData = string[] | number[] | boolean[] | symbol[]

// 空值
export type IEmptyData = null | undefined

// 全部数据类型
export type IAllDataType = IBasicData | IArrayData | IEmptyData | object