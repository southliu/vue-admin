import type { DefaultOptionType } from 'ant-design-vue/lib/select';

/**
 * 处理拼接名称
 * @param list - 列表
 * @param spliceLabel - 分割数组
 */
export const handleSpliceLabel = (data: DefaultOptionType[], spliceLabel: [string, string]) => {
  if (spliceLabel?.length !== 2) return [];

  for (let i = 0; i < data?.length; i++) {
    const item = data[i];
    const value = item[spliceLabel[1]] ? `(${item[spliceLabel[1]]})` : '';
    item.label = `${item[spliceLabel[0]]}${value}`;
  }

  return data;
};
/**
 * 处理拼接树形名称
 * @param list - 列表
 * @param spliceLabel - 分割数组
 */
export const handleSpliceTreeLabel = (data: DefaultOptionType[], spliceLabel: [string, string]) => {
  if (spliceLabel?.length !== 2) return [];

  for (let i = 0; i < data?.length; i++) {
    const item = data[i];
    const value = item[spliceLabel[1]] ? `(${item[spliceLabel[1]]})` : '';
    item.label = `${item[spliceLabel[0]]}${value}`;

    if ((item.children as unknown[])?.length) {
      item.children = handleSpliceTreeLabel(item.children as DefaultOptionType[], spliceLabel);
    }
  }

  return data;
};