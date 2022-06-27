/**
 * 获取table内高度
 * TODO: 可以优化
 */
 export function useTableHeight(id: string = 'table') {
  const height = document.documentElement.clientHeight || 0 // 屏幕可见区域高度
  const tableHeight = document?.getElementById(id)?.getBoundingClientRect()?.top || 0 // 容器高度
  const footerHeight = document?.getElementById('footer')?.offsetHeight || 0 // 容器底顶部高度

  // 屏幕可见区域高度 - 内容高度 - 底部高度 = 表格高度
  const containerInnerHeight = height - tableHeight - footerHeight // 表格高度

  return containerInnerHeight - 35
}