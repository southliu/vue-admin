import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core';

type IFn<T> =  (...arg: T[]) => void

/**
 * 监听滚动事件
 * @param fn - 函数
 * @param wait - 防抖事件
 */
export function useWindowResize<T>(fn: IFn<T>, wait = 150) {
  const handler = () => { fn() }
  const handleSize = useDebounceFn(handler, wait)

  // 开始监听滚动事件
  const start = () => {
    window.addEventListener('resize', handleSize)
  }

  // 结束监听滚动事件
  const stop = () => {
    window.removeEventListener('resize', handleSize)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })

  return [start, stop]
}
