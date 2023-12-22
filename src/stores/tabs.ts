import type { TabPaneProps } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { useMenuStore } from './menu';
import { getFirstTab } from '@/utils/menu';
import { router } from '@/router';
import { routeToKeepalive } from '@/router/utils/helper';

export interface TabsData extends Omit<TabPaneProps, 'tab'> {
  key: string;
  url: string;
  label: string;
}

interface TabsState {
  // 缓存一次关闭标签键值
  cacheCloseTabKey: string;
  // 当前选中的标签
  activeKey: string;
  // 上一个路径
  prevPath: string;
  // 标签栏数据
  tabs: TabsData[];
  // 导航数据
  nav: string[];
  // 缓存的标签
  cacheTabs: Record<string, TabsData[]>;
  // 缓存的路由名称
  cacheRoutes: string[];
}

export const useTabStore = defineStore({
  id: 'tabs',
  state: () => ({
    activeKey: '',
    prevPath: '',
    cacheCloseTabKey: '',
    tabs: [],
    nav: [],
    cacheTabs: {},
    cacheRoutes: []
  } as TabsState),
  actions: {
    /** 
     * 添加缓存路由
     * @param key - 路由值
     */
    addCacheRoutes(key: string) {
      const value = routeToKeepalive(key);
      if (!this.cacheRoutes.includes(value)) {
        this.cacheRoutes.push(value);
      }
    },
    /** 
     * 删除缓存路由
     * @param key - 路由值
     */
    removeCacheRoutes(key: string) {
      const value = routeToKeepalive(key);
      const index = this.cacheRoutes.findIndex(item => item === value);
      if (index >= 0) this.cacheRoutes.splice(index, 1);
    },
    /** 清空缓存路由 */
    clearCacheRoutes() {
      this.cacheRoutes = [];
    },
    /**
     * 添加上一个路径地址
     * @param path - 路径
     */
    addPrevPath(path: string) {
      this.prevPath = path;
    },
    /**
     * 设置导航
     * @param nav - 导航数据
     */
    setNav(nav: string[]) {
      this.nav = nav;
    },
    /**
     * 设置选中的标签
     * @param targetKey - 当前选中唯一值
     */
    setActiveKey(targetKey: string) {
      this.activeKey = targetKey;
    },
    /**
     * 设置标签栏
     * @param tabs - 标签栏数据
     */
    setTabs(tabs: TabsData[]) {
      this.tabs = tabs;
    },
    /**
     * 添加标签页
     * @param tab - 标签数据
     */
    addTabs(tab: TabsData) {
      const key = getFirstTab(tab.key);
      // 判断是否存在相同的路由，不存在则累加
      const hasIndex = this.tabs.findIndex(item => item.key === tab.key);
      if (hasIndex === -1) {
        this.tabs.push(tab);

        // 如果存在缓存的删除标签
        if (this.cacheCloseTabKey) {
          this.closeTabs(this.cacheCloseTabKey);
          this.cacheCloseTabKey = '';
        }
      } else if (tab.url !== this.tabs[hasIndex].url) {
        this.closeTabs(tab.key);

        let timer: NodeJS.Timeout | null = setTimeout(() => {
          clearTimeout(timer as NodeJS.Timeout);
          timer = null;
          this.addTabs(tab);
          router.push(tab.url);
        }, 100);
      }
      this.cacheTabs[`/${key}`] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = this.tabs?.length > 1;
    },
    /**
     * 移除当前标签页
     * @param targetKey - 标签唯一值
     */
    closeTabs(targetKey: string) {
      // 当数组为空，首次进入需要关闭且异步未获取标签数据时，记录事件
      if (!this.tabs?.length) {
        this.cacheCloseTabKey = targetKey;
        return;
      }

      // 发现下标并从数组中删除
      const index = this.tabs.findIndex(item => item.key === targetKey);
      if (index >= 0) this.tabs.splice(index, 1);
      this.removeCacheRoutes(targetKey); // 清除当前页面keepalive缓存

      // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
      if (targetKey === this.activeKey) {
        let target = '', nextUrl = '';
        if (index === 0) {
          target = this.tabs[index]?.key;
          nextUrl = this.tabs[index]?.url;
        } else {
          target = this.tabs[index - 1]?.key;
          nextUrl = this.tabs[index - 1]?.url;
        }
        this.activeKey = target;
        nextUrl && router.push(nextUrl);
      }

      const { topMenuKey } = useMenuStore();
      this.cacheTabs[topMenuKey] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = this.tabs?.length > 1;
    },
    /**
     * 关闭标签并跳转新的页面
     * @param targetKey - 关闭的key
     * @param nextPath - 跳转下一个路径
     */
    closeTabGoNext(targetKey: string, nextPath: string) {
      // 发现下标并从数组中删除
      const index = this.tabs.findIndex(item => item.key === targetKey);
      if (index >= 0) this.tabs.splice(index, 1);
      this.removeCacheRoutes(targetKey); // 清除当前页面keepalive缓存

      // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
      if (targetKey === this.activeKey) {
        router.push(nextPath);
      }

      const { topMenuKey } = useMenuStore();
      this.cacheTabs[topMenuKey] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = this.tabs?.length > 1;
    },
    /**
     * 移除其他标签页
     * @param targetKey - 标签唯一值
     */
    closeOther(targetKey: string) {
      // 发现下标并从数组中删除
      let tab: TabsData = {
        label: '',
        key: '',
        url: '',
      };

      for (let i = 0; i < this.tabs?.length; i++) {
        const item = this.tabs[i];
        
        if (item.key === targetKey) {
          tab = item;
        } else {
          this.removeCacheRoutes(item.key); // 清除当前页面keepalive缓存
        }
      }

      if (tab) {
        this.tabs = [tab];
        this.activeKey = tab.key;
      }
      
      const { topMenuKey } = useMenuStore();
      this.cacheTabs[topMenuKey] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = false;
    },
    /**
     * 关闭左侧
     * @param targetKey - 标签唯一值
     */
    closeLeft(targetKey: string) {
      // 发现下标并从数组中删除
      const index = this.tabs.findIndex(item => item.key === targetKey);

      // 清除左侧标签keepalive缓存
      for (let i = 0; i < index; i++) {
        const item = this.tabs[i];
        this.removeCacheRoutes(item.key); // 清除当前页面keepalive缓存
      }

      if (index >= 0) this.tabs.splice(0, index);
      this.activeKey = this.tabs[0].key;
      
      const { topMenuKey } = useMenuStore();
      this.cacheTabs[topMenuKey] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = this.tabs?.length > 1;
    },
    /**
     * 关闭右侧
     * @param targetKey - 标签唯一值
     */
    closeRight(targetKey: string) {
      // 发现下标并从数组中删除
      const index = this.tabs.findIndex(item => item.key === targetKey);

      // 清除右侧标签keepalive缓存
      for (let i = index; i < this.tabs.length; i++) {
        const item = this.tabs[i];
        this.removeCacheRoutes(item.key); // 清除当前页面keepalive缓存
      }

      if (index >= 0) this.tabs.splice(index + 1, this.tabs.length - index - 1);
      this.activeKey = this.tabs[this.tabs.length - 1].key;

      const { topMenuKey } = useMenuStore();
      this.cacheTabs[topMenuKey] = this.tabs;

      // 如果只剩一个则无法关闭
      if (this.tabs?.length) this.tabs[0].closable = this.tabs?.length > 1;
    },
    /** 关闭全部 */
    closeAllTab() {
      this.tabs = [];
      this.cacheRoutes = [];
      this.cacheTabs = {};
    }
  }
});