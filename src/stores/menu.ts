import { defineStore } from 'pinia'

export interface ISidebar {
  key: string;
  path: string;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

interface IState {
  isPhone: boolean;
  selectedKeys: string[];
  menuArr: ISidebar[],
  menuList: ISidebar[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
    selectedKeys: [],
    menuArr: [],
    menuList: []
  } as IState),
  actions: {
    /**
     * 设置是否是手机
     * @param isPhone - 是否是手机打开
     */
    setPhone(isPhone: boolean) {
      this.isPhone = isPhone
    },

    /**
     * 设置选中的值
     * @param arr - 选中的值
     */
     setSelectedKeys(arr: string[]) {
      this.selectedKeys = arr
    },
    
  }
})