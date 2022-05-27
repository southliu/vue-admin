import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import { getPartner } from '@/servers/platform/partner'
import { defineStore } from 'pinia'

export const usePartnerStore = defineStore({
  id: 'partner',
  state: () => ({
    partnerList: [] as DefaultOptionType[]
  }),
  actions: {
    /**
     * 获取合作公司列表
     */
    async getPartner() {
      const data = await getPartner()
      this.partnerList = data
    }
  },
})