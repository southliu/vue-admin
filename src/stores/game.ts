import { getGames } from '@/servers/platform/game'
import { defineStore } from 'pinia'

interface IGmeList {
  label: string;
  value: string;
}

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    gameList: [] as IGmeList[]
  }),
  actions: {
    /**
     * 获取游戏列表
     */
    async getGame() {
      const { data: { data } } = await getGames()
      const gameList: IGmeList[] = []

      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        gameList.push({
          label: element.name,
          value: element.id
        })
      }
      console.log('data:', data)
      this.gameList = gameList
    }
  },
})