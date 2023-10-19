import { defineStore } from 'pinia';

interface StateData {
  isRefreshPage: boolean;
  routerList: Record<string, { name?: string }>;
}

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    isRefreshPage: false,
    routerList: import.meta.glob('../pages/**/*.vue', { import: 'default', eager: true }) as Record<string, { name?: string }>
  } as StateData),
  actions: {
    /**
     * 设置刷新页面
     * @param isRefresh - 是否刷新
     */
    setRefreshPage(isRefresh: boolean) {
      this.isRefreshPage = isRefresh;
    },
    /**
     * 设置路由列表数据
     * @param data - 路由数据
     */
    setRouterList(data: Record<string, { name?: string }>) {
      this.routerList = data;
    },
  },
});