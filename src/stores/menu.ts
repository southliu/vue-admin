import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    token: ''
  }),
  actions: {
    /**
     * 设置token
     * @param value - token值
     */
    setToken(value: string) {
      this.token = value
    }
  },
})