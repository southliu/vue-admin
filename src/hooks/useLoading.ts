import { ref } from "vue"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
function useLoading(initValue: boolean = false) {
  const loading = ref(Boolean(initValue))

  const startLoading = () => {
    loading.value = true
  }

  const endLoading = () => {
    loading.value = false
  }

  return {
    loading,
    startLoading,
    endLoading
  }
}

export default useLoading