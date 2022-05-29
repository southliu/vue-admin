import { defineStore } from 'pinia'

export interface ISidebar {
  key: string;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

interface IState {
  isPhone: boolean;
  menuArr: ISidebar[],
  menuList: ISidebar[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
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
    }
  }
})