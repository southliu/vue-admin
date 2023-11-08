import type { SideMenu } from '#/public';
import { defineStore } from 'pinia';
import { useTabStore } from './tabs';

// 菜单项
export interface MenuItem {
  key: string;
  path: string;
  top: string;
  topTitle: string;
  title: string;
  rule?: string;
  icon?: string;
}

interface StateData {
  isPhone: boolean;
  topMenuKey: string;
  firstMenu: MenuItem;
  openKeys: string[];
  selectedKeys: string[];
  menuList: SideMenu[],
  sideMenuList: SideMenu[],
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
    topMenuKey: '',
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
    menuList: [],
    sideMenuList: []
  } as StateData),
  actions: {
    /**
     * 设置菜单
     * @param menus - 菜单值
     */
    setMenus(menus: SideMenu[]) {
      this.menuList = menus;
    },
    /**
     * 设置侧边菜单
     * @param menus - 菜单值
     */
    setSideMenu(menus: SideMenu[]) {
      this.sideMenuList = menus;
    },
    /**
     * 设备顶部菜单选中
     * @param key - 选中的值
     */
    setTopMenuKey(key: string) {
      this.topMenuKey = key;

      // 标签分割
      const { cacheTabs, setTabs } = useTabStore();
      setTabs(cacheTabs?.[key] || []);
    },
    /**
     * 设置是否是手机
     * @param isPhone - 是否是手机打开
     */
    setPhone(isPhone: boolean) {
      this.isPhone = isPhone;
    },
    /**
     * 设置展开值
     * @param arr - 展开值
     */
     setOpenKeys(arr: string[]) {
      this.openKeys = arr;
    },
    /**
     * 设置选中的值
     * @param arr - 选中的值
     */
     setSelectedKeys(arr: string[]) {
      this.selectedKeys = arr;
    },
    /**
     * 设置第一个菜单
     * @param obj - 菜单值
     */
    setFirstMenu(obj: MenuItem) {
      this.firstMenu = obj;
    }
  }
});