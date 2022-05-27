import type { DefaultOptionType } from 'ant-design-vue/lib/select';
import { getGames } from '@/servers/platform/game'
import { defineStore } from 'pinia'

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    gameList: [] as DefaultOptionType[]
  }),
  actions: {
    /**
     * 获取游戏列表
     */
    async getGame() {
      const data = await getGames()
      this.gameList = data
    }
  },
})