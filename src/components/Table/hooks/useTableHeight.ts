/**
 * 获取table内高度
 * TODO: 可以优化
 */
export function useTableHeight() {
  const containerHeight = document?.getElementById('container')?.offsetHeight || 0 // 容器高度
  const topHeight = document?.getElementById('top')?.offsetHeight || 0 // 容器内顶部高度
  const footerHeight = document?.getElementById('footer')?.offsetHeight || 0 // 容器底顶部高度

  // 容器高度 - 顶部高度 - 底部高度 = 表格高度
  const containerInnerHeight = containerHeight - footerHeight - topHeight // 表格高度

  return containerInnerHeight - 25
}