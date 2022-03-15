import { defineStore } from 'pinia'

interface ITabs {
  title: string;
  key: string;
  closable?: boolean
}

interface IState {
  activeKey: string;
  tabs: ITabs[];
}

export enum TabEnums {
  REFRESH_PAGE, // 刷新当前页
  CLOSE_CURRENT,
  CLOSE_OTHER,
  CLOSE_LEFT,
  CLOSE_RIGHT
}

export const useTabStore = defineStore({
  id: 'tabs',
  state: () => ({
    activeKey: '',
    tabs: []
  } as IState),
  actions: {
    // 点击当前
    clickTabs(targetKey: string) {
      this.activeKey = targetKey
    },
    // 添加标签页
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
    // 移除当前标签页
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
    // 关闭其他
    removeOther(targetKey: string) {
      this.tabs = this.tabs.filter(item => item.key === targetKey)
      this.activeKey = targetKey
    },
    // 关闭左侧
    removeLeft(targetKey: string) {
      let tabs: ITabs[] = [], isCurrent = false

      for (let i = 0; i < this.tabs.length; i++) {
        const element = this.tabs[i];
        // 当前项之后的数据都保存
        if (element.key === targetKey) {
          isCurrent = true
        }
        if (isCurrent) tabs.push(element)
      }

      this.tabs = tabs
      this.activeKey = targetKey
    },
    // 关闭右侧
    removeRight(targetKey: string) {
      let tabs: ITabs[] = [], index = 0

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
  }
})