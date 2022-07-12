import { defineStore } from 'pinia'

// 菜单项
export interface IMenuItem {
  key: string;
  path: string;
  top: string;
  topTitle: string;
  title: string;
  rule?: string;
  icon?: string;
}

// 菜单
export interface ISidebar extends IMenuItem {
  children?: ISidebar[]
}

interface IState {
  isPhone: boolean;
  firstMenu: IMenuItem;
  openKeys: string[];
  selectedKeys: string[];
  menuList: ISidebar[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
    firstMenu: {
      key: '',
      path: '',
      top: '',
      topTitle: '',
      rule: '',
      title: ''
    },
    openKeys: [],
    selectedKeys: [],
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
     * 设置展开值
     * @param arr - 展开值
     */
     setOpenKeys(arr: string[]) {
      this.openKeys = arr
    },
    /**
     * 设置选中的值
     * @param arr - 选中的值
     */
     setSelectedKeys(arr: string[]) {
      this.selectedKeys = arr
    },
    /**
     * 设置第一个菜单
     * @param obj - 菜单值
     */
    setFirstMenu(obj: IMenuItem) {
      this.firstMenu = obj
    }
  }
})