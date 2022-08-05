import { defineStore } from 'pinia'
import { router } from '@/router'

export interface ITabs {
  title: string;
  key: string;
  path: string;
  closable?: boolean
}

interface ITabsState {
  // 当前选中的标签
  activeKey: string;
  // 路由名称
  pathName: string;
  // 上一个路径
  prevPath: string;
  // 标签栏数据
  tabs: ITabs[];
  // 缓存的路由名称
  cacheRoutes: string[];
}

export const useTabStore = defineStore({
  id: 'tabs',
  state: () => ({
    activeKey: '',
    pathName: '',
    prevPath: '',
    tabs: [],
    cacheRoutes: []
  } as ITabsState),
  actions: {
    /** 
     * 添加缓存路由
     * @param key - 路由值
     */
    addCacheRoutes(key: string) {
      if (!this.cacheRoutes.includes(key)) {
        this.cacheRoutes.push(key)
      }
    },

    /**
     * 添加上一个路径地址
     * @param path - 路径
     */
    addPrevPath(path: string) {
      this.prevPath = path
    },

    /**
     * 设置选中的标签
     * @param targetKey - 当前选中唯一值
     */
    setActiveKey(targetKey: string) {
      this.activeKey = targetKey
    },

    /**
     * 设置路由名称
     * @param name - 路由名称
     */
    setPathName(name: string) {
      this.pathName = name
    },

    /**
     * 添加标签页
     * @param tab - 标签数据
     */
    addTabs(tab: ITabs) {
      this.activeKey = tab.path
      // 查询是否有重复的标签页
      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i]
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
        const element = this.tabs[i]
        if (element.path === targetKey) {
          lastIndex = i - 1
          break
        }
      }
      // 过滤数据中当前路径的数据
      this.tabs = this.tabs.filter(item => item.path !== targetKey)
      // 如果当前是选中状态
      if (this.tabs.length && this.activeKey === targetKey) {
        if (lastIndex >= 0) {
          this.activeKey = this.tabs[lastIndex].path
        } else {
          this.activeKey = this.tabs[0].path
        }
        // 跳转页面
        router.push(this.activeKey)
      }
    },

    /**
     * 移除其他标签页
     * @param targetKey - 标签唯一值
     */
    removeOther(targetKey: string) {
      this.tabs = this.tabs.filter(item => item.path === targetKey)
      this.activeKey = targetKey
      router.push(this.activeKey)
    },

    /**
     * 关闭左侧
     * @param targetKey - 标签唯一值
     */
    removeLeft(targetKey: string) {
      let isCurrent = false
      const tabs: ITabs[] = []

      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i]
        // 当前项之后的数据都保存
        if (element.path === targetKey) isCurrent = true
        if (isCurrent) tabs.push(element)
      }

      this.tabs = tabs
      this.activeKey = targetKey
      router.push(this.activeKey)
    },

    /**
     * 关闭右侧
     * @param targetKey - 标签唯一值
     */
    removeRight(targetKey: string) {
      let index = 0
      const tabs: ITabs[] = []

      // 获取下标
      for (let i = this.tabs.length - 1; i >= 0; i--) {
        const element = this.tabs[i]
        if (element.path === targetKey) {
          index = i
        }
      }

      // 重构数据
      for (let i = 0; i <= index; i++) {
        const element = this.tabs[i]
        tabs.push(element)
      }
      
      this.tabs = tabs
      this.activeKey = targetKey
      router.push(this.activeKey)
    }
  }
})