import { ref } from "vue"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useLoading(initValue = false) {
  const isLoading = ref(Boolean(initValue))

  const startLoading = () => {
    isLoading.value = true
  }

  const endLoading = () => {
    isLoading.value = false
  }

  const toggleLoading = () => {
    isLoading.value = !isLoading.value
  }

  return {
    isLoading,
    startLoading,
    endLoading,
    toggleLoading
  }
}
