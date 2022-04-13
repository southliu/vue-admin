export function useTableHeight() {
  const height = document.documentElement.clientHeight || document.body.clientHeight // 屏幕的高度
  const conHeight = document?.getElementById('con')?.offsetHeight || 0
  const contentHeight = document?.getElementById('content')?.offsetHeight || 0

  console.log('height:', height)
  console.log('conHeight:', conHeight)
  console.log('contentHeight:', contentHeight)
  console.log('height - conHeight - contentHeight:', height - conHeight - contentHeight)

  return 500
}