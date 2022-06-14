import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
  id: 'globalLoading',
  state: () => ({
    globalLoading: false
  }),
  actions: {
    /**
     * 设置token
     * @param value - token值
     */
    setLoading(value: boolean): void {
      this.globalLoading = value
    },
  },
})