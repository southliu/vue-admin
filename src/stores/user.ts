import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    userInfos: []
  }),
  actions: {
    /**
     * 设置token
     * @param value - token值
     */
    setToken(value: string) {
      this.token = value
    },
  },
})