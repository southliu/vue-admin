import { getPartner } from '@/servers/platform/partner'
import { defineStore } from 'pinia'

interface IGmeList {
  label: string;
  value: string;
}

export const usePartnerStore = defineStore({
  id: 'partner',
  state: () => ({
    partnerList: [] as IGmeList[]
  }),
  actions: {
    /**
     * 获取合作公司列表
     */
    async getPartner() {
      const { data: { data } } = await getPartner()
      const partnerList: IGmeList[] = []

      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        partnerList.push({
          label: element.name,
          value: element.id
        })
      }
      console.log('data:', data)
      this.partnerList = partnerList
    }
  },
})