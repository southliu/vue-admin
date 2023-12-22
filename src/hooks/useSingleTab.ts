import type { SideMenu } from '#/public';
import { onActivated, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { setTitle } from '@/utils/helper';
import { useTabStore } from '@/stores/tabs';
import { useMenuStore } from '@/stores/menu';
import { getMenuName, getOpenMenuByRouter } from '@/utils/menu';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';

/**
 * 单标签设置
 * @param fatherPath - 父级路径
 * @param name - 名称
 */
export function useSingleTab(
  fatherPath: string,
  title?: string,
  name = 'id'
  ) {
  const route = useRoute();
  const menuStore = useMenuStore();
  const tabStore = useTabStore();
  const { menuList } = storeToRefs(menuStore);
  const {
    setActiveKey,
    addTabs,
    setNav
  } = tabStore;
  const {
    setOpenKeys,
    setSelectedKeys
  } = menuStore;
  
  onMounted(() => {
    handleTitleAndTab();
  });

  onActivated(() => {
    handleTitleAndTab();
  });

  watch(() => menuList.value, () => {
    if (!route.fullPath?.includes(fatherPath)) return;
    handleTitleAndTab();
  });

  /** 设置标题 */
  const handleGetTitle = () => {
    let result = '', newUpdateTitle = '', newCreateTitle = '';
    const routeName = (route.query?.[name] || '') as string;

    if (!title) {
      const menuName = getMenuName(menuList.value, fatherPath);
      newCreateTitle = `${title || ADD_TITLE}${menuName}`;
      newUpdateTitle = `${EDIT_TITLE(routeName, menuName)}`;
    } else {
      const label = routeName ? `(${routeName})` : '';
       newCreateTitle = `${title || ADD_TITLE}${label}`;
       newUpdateTitle = `${title}${label}`;
    }
    result = routeName ? newUpdateTitle : newCreateTitle;
    return result;
  };

  /** 获取导航栏 */
  const handleGetNav = () => {
    let result: string[] = [];

    const deepData = (list: SideMenu[], path: string, fatherName: string[] = []) => {
      if (result?.length || !list?.length || !path) return result;
  
      for (let i = 0; i < list?.length; i++) {
        const item = list[i];
        const newNav = fatherName.concat([item.label]);
        item.nav = newNav;
        
        if (item.key === path) {
          result = item.nav;
          return result;
        }
  
        if (item.children?.length) {
          const childResult = deepData(item.children, path, item.nav);
          if (childResult?.length) {
            result = childResult;
            return result;
          }
        }
      }
  
      return result;
    };
    deepData(menuList.value, fatherPath);

    return result;
  };

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleTitleAndTab = (fullPath = route.fullPath) => {
    // 当值为空时匹配路由
    if (fullPath === '/' || !menuList.value?.length) return;

    const nav = handleGetNav();
    const title = handleGetTitle();
    setTitle(title);
    nav.push(title);

    const newTab = {
      label: title,
      url: fullPath,
      key: route.path,
      nav
    };
    // 展开菜单
    const newOpenKey = getOpenMenuByRouter(fatherPath);
    setOpenKeys(newOpenKey);
    setSelectedKeys([fatherPath]);
    setActiveKey(newTab.key);
    setNav(newTab.nav);
    addTabs(newTab);
  };

  return [];
}