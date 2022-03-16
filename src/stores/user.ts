import { defineStore } from 'pinia'

export const useMenuStore = defineStore('user', {
  state: () => ({
    token: ''
  }),
  actions: {
    /**
     * 设置token
     * @param value token值
     */
    setToken(value: string) {
      this.token = value
    }
  },
})