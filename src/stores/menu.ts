import { defineStore } from 'pinia'

export interface ISidebar {
  key: string;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

interface IState {
  menuArr: ISidebar[],
  menuList: ISidebar[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menuArr: [],
    menuList: []
  } as IState),
  actions: {
  }
})