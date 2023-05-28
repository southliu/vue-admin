import { defineStore } from 'pinia';

interface StateData {
  isRefreshPage: boolean;
}

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    isRefreshPage: false
  } as StateData),
  actions: {
    /**
     * 设置刷新页面
     * @param isRefresh - 是否刷新
     */
    setRefreshPage(isRefresh: boolean) {
      this.isRefreshPage = isRefresh;
    },
  },
});