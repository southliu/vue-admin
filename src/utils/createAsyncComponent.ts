/**
 * @description: 创建异步组件
 */
import type { AsyncComponentOptions } from "vue"
import { defineAsyncComponent, h } from "vue"
import { Spin } from 'ant-design-vue'

interface Options {
  size?: 'default' | 'small' | 'large';
  delay?: number;
  timeout?: number;
  isLoading?: boolean;
  retry?: boolean;
}
/**
 * 创建异步组件
 * @param loader - 异步组件加载器
 * @param options - 异步组件加载器配置
 */
export function createAsyncComponent(
  loader: AsyncComponentOptions['loader'],
  options: Options = {}
): AsyncComponentOptions {
  const {
    size = 'small',
    delay = 200,
    timeout = 30000,
    isLoading = false,
    retry = true
  } = options

  return defineAsyncComponent({
    loader, // 需要加载的组件
    loadingComponent: isLoading ? h(Spin, { spinning: true, size }) : undefined, // 在加载时显示
    timeout, // 超时时间
    delay, // 在显⽰加载组件之前延迟毫秒
    onError: !retry
      ? undefined
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry()
          } else {
            fail()
          }
        },
  })
}