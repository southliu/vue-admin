import type { SideMenu } from '#/public';
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useTitle } from './useTitle';
import { useTabStore } from '@/stores/tabs';
import { useMenuStore } from '@/stores/menu';
import { getMenuName } from '@/menus/utils/helper';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';

/**
 * 单标签设置
 * @param fatherPath - 父级路径
 * @param name - 唯一标识
 */
export function useSingleTab(
  fatherPath: string,
  name?: string,
  title?: string
) {
  const menuStore = useMenuStore();
  const tabStore = useTabStore();
  const { path, fullPath } = useRoute();
  const { menuList } = storeToRefs(menuStore);
  const routePath = fatherPath || path;
  const menuName = ref(getMenuName(menuList.value, routePath));
  const {
    setActiveKey,
    addTabs,
    setNav
  } = tabStore;

  onMounted(() => {
    handleTitleAndTab();
  });

  watch(() => menuList.value, () => {
    menuName.value = getMenuName(menuList.value, routePath);
    handleTitleAndTab();
  });

  /** 设置标题 */
  const handleGetTitle = () => {
    const newCreateTitle = `${title || ADD_TITLE}${menuName.value}`;
    const newUpdateTitle = title ? `${title}${menuName.value}(${name})` : `${EDIT_TITLE(name || '', menuName.value)}`;
    const result = name ? newUpdateTitle : newCreateTitle;
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
          if (childResult) {
            result = childResult;
            return result;
          }
        }
      }
  
      return result;
    };
    deepData(menuList.value, routePath);

    return result;
  };

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleTitleAndTab = (path = fullPath) => {
    // 当值为空时匹配路由
    if (path === '/' || !menuList.value?.length) return;

    const nav = handleGetNav();
    const title = handleGetTitle();
    useTitle(title);
    nav.push(title);

    const newTab = {
      label: title,
      key: fullPath,
      nav
    };
    setActiveKey(newTab.key);
    setNav(newTab.nav);
    addTabs(newTab);
  };

  return [menuName.value];
}