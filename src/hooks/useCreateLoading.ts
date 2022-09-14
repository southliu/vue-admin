import { ref } from "vue"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useCreateLoading(initValue = false) {
  const isCreateLoading = ref(Boolean(initValue))

  const startCreateLoading = () => {
    isCreateLoading.value = true
  }

  const endCreateLoading = () => {
    isCreateLoading.value = false
  }

  const toggleCreateLoading = () => {
    isCreateLoading.value = !isCreateLoading.value
  }

  return {
    isCreateLoading,
    startCreateLoading,
    endCreateLoading,
    toggleCreateLoading
  }
}
