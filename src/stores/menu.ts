import { defineStore } from 'pinia'

// 菜单
export interface ISidebar {
  key: string;
  path: string;
  top: string;
  topTitle: string;
  rule: string;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

interface IState {
  isPhone: boolean;
  openKeys: string[];
  selectedKeys: string[];
  menuList: ISidebar[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
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
    
  }
})