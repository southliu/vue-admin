import { defineStore } from 'pinia'

export const useMenuStore = defineStore('user', {
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(value: string) {
      this.token = value
    }
  },
})