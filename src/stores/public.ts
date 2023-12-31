import { defineStore } from 'pinia';

export type ThemeType = 'light' | 'dark';

interface StateData {
  isRefreshPage: boolean;
  themeType: ThemeType;
  version: string;
}

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    isRefreshPage: false,
    themeType: 'light',
    version: ''
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
    /**
     * 设置版本号
     * @param version - 路由数据
     */
    setVersion(version: string) {
      this.version = version;
    },
  },
});