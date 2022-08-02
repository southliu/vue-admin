import { VueWrapper } from "@vue/test-utils"

/**
 * 获取属性名
 * @param wrapper - 容器
 * @param name - 属性名
 */
export function findTestWrapper(wrapper: VueWrapper, name: string) {
  return wrapper.find(`[data-test="${name}"]`)
}