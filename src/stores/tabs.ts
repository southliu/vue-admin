import { defineStore } from 'pinia'
import type { Router } from 'vue-router';
import { menus } from '@/router/menus'
import { getCacheRoutes } from '@/utils/menus';

interface ITabs {
  title: string;
  key: string;
  closable?: boolean
}

interface IState {
  // 当前选中的标签
  activeKey: string;
  // 标签栏数据
  tabs: ITabs[];
  // 缓存的路由名称
  cacheRoutes: string[];
}

export const useTabStore = defineStore({
  id: 'tabs',
  state: () => ({
    activeKey: '',
    tabs: [],
    cacheRoutes: []
  } as IState),
  actions: {
    /** 初始化路由缓存 */
    initCacheRoutes() {
      this.cacheRoutes = getCacheRoutes(menus)
    },

    /**
     * 点击标签
     * @param targetKey - 当前选中唯一值
     */
    clickTabs(targetKey: string) {
      this.activeKey = targetKey
    },

    /**
     * 添加标签页
     * @param tab - 标签数据
     */
    addTabs(tab: ITabs) {
      this.activeKey = tab.key
      // 查询是否有重复的标签页
      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i];
        if (element.key === tab.key) {
          return
        }
      }
      this.tabs.push(tab)
    },

    /**
     * 移除当前标签页
     * @param targetKey - 标签唯一值
     */
    removeCurrent(targetKey: string) {
      // 获取当前key的最后一位位置
      let lastIndex = 0
      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i];
        if (element.key === targetKey) {
          lastIndex = i - 1
          break
        }
      }
      // 过滤数据中当前key的数据
      this.tabs = this.tabs.filter(item => item.key !== targetKey)
      // 如果当前key是选中的key
      if (this.tabs.length && this.activeKey === targetKey) {
        if (lastIndex >= 0) {
          this.activeKey = this.tabs[lastIndex].key
        } else {
          this.activeKey = this.tabs[0].key
        }
      }
    },

    /**
     * 移除其他标签页
     * @param targetKey - 标签唯一值
     */
    removeOther(targetKey: string) {
      this.tabs = this.tabs.filter(item => item.key === targetKey)
      this.activeKey = targetKey
    },

    /**
     * 关闭左侧
     * @param targetKey - 标签唯一值
     */
    removeLeft(targetKey: string) {
      let isCurrent = false, tabs: ITabs[] = []

      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i];
        // 当前项之后的数据都保存
        if (element.key === targetKey) {
          isCurrent = true
        }
        if (isCurrent) {
          tabs.push(element)
        }
      }

      this.tabs = tabs
      this.activeKey = targetKey
    },

    /**
     * 关闭右侧
     * @param targetKey - 标签唯一值
     */
    removeRight(targetKey: string) {
      let index = 0, tabs: ITabs[] = []

      // 获取下标
      for (let i = this.tabs.length - 1; i >= 0; i--) {
        const element = this.tabs[i];
        if (element.key === targetKey) {
          index = i
        }
      }

      // 重构数据
      for (let i = 0; i <= index; i++) {
        const element = this.tabs[i];
        tabs.push(element)
      }
      
      this.tabs = tabs
      this.activeKey = targetKey
    },

    /**
     * 刷新当前页
     * @param router - 路由
     */
    refreshPage(router: Router) {
      this.cacheRoutes = getCacheRoutes(menus)
      // const { currentRoute } = router;
      // const route = unref(currentRoute);
      // const name = route.name;

      // const findTab = this.getCachedTabList.find((item) => item === name);
      // if (findTab) {
      //   this.cacheTabList.delete(findTab);
      // }
      // const redo = useRedo(router);
      // await redo();
    }
  }
})