import { defineStore } from 'pinia';

export type ThemeType = 'light' | 'dark';

interface StateData {
  isRefreshPage: boolean;
  themeType: ThemeType;
}

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    isRefreshPage: false,
    themeType: 'light',
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
     * 设置主题
     * @param themeType - 路由数据
     */
    setTheme(themeType: ThemeType) {
      this.themeType = themeType;
    },
  },
});