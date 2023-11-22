import type { TabPaneProps } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { useMenuStore } from './menu';
import { getFirstTab } from '@/utils/menu';

export interface TabsData extends Omit<TabPaneProps, 'tab'> {
  key: string;
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
      if (!this.cacheRoutes.includes(key)) {
        this.cacheRoutes.push(key);
      }
    },
    /** 
     * 删除缓存路由
     * @param key - 路由值
     */
    removeCacheRoutes(key: string) {
      const index = this.cacheRoutes.findIndex(item => item === key);
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
      // 判断是否存在相同的路由，不存在则累加
      const has = this.tabs.find(item => item.key === tab.key);
      if (!has) {
        const key = getFirstTab(tab.key);
        this.tabs.push(tab);

        // 如果存在缓存的删除标签
        if (this.cacheCloseTabKey) {
          this.closeTabs(this.cacheCloseTabKey);
          this.cacheCloseTabKey = '';
        }

        this.cacheTabs[`/${key}`] = this.tabs;
      }

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

      // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
      if (targetKey === this.activeKey) {
        let target = '';
        if (index === 0) {
          target = this.tabs[index]?.key;
        } else {
          target = this.tabs[index - 1]?.key;
        }
        this.activeKey = target;
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

      // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
      if (targetKey === this.activeKey) {
        this.activeKey = nextPath;
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
      const tab = this.tabs.find(item => item.key === targetKey);
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
      this.cacheTabs = {};
    }
  }
});