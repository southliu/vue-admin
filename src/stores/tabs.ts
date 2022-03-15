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
    removeTabs(targetKey: string) {
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
  },
})