import { ref } from "vue"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useLoading(initValue = false) {
  const loading = ref(Boolean(initValue))

  const startLoading = () => {
    loading.value = true
  }

  const endLoading = () => {
    loading.value = false
  }

  const toggleLoading = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    startLoading,
    endLoading,
    toggleLoading
  }
}
