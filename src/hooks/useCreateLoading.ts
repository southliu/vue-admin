import { ref } from "vue"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useCreateLoading(initValue = false) {
  const createLoading = ref(Boolean(initValue))

  const startCreateLoading = () => {
    createLoading.value = true
  }

  const endCreateLoading = () => {
    createLoading.value = false
  }

  const toggleCreateLoading = () => {
    createLoading.value = !createLoading.value
  }

  return {
    createLoading,
    startCreateLoading,
    endCreateLoading,
    toggleCreateLoading
  }
}
