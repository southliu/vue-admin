/**
 * 获取table内高度
 * @param id - 唯一标识
 * @param offsetHeight - 高度偏移量
 */
 export function useTableHeight(id = 'table', offsetHeight = 0) {
  const height = document.documentElement.clientHeight || 0; // 屏幕可见区域高度
  const tableHeight = document?.getElementById(id)?.getBoundingClientRect()?.top || 0; // 容器高度
  const footerHeight = document?.getElementById('footer')?.offsetHeight || 0; // 容器底顶部高度

  // 屏幕可见区域高度 - 内容高度 - 底部高度 - 高度偏移量 = 表格高度
  const containerInnerHeight = height - tableHeight - footerHeight - offsetHeight; // 表格高度

  return containerInnerHeight - 35;
}