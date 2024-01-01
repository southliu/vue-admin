import type { Router } from "vue-router";
import { useToken } from '@/hooks/useToken';
import { message } from "ant-design-vue";
import { useTabStore } from '@/stores/tabs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useMenuStore } from "@/stores/menu";
import { usePublicStore } from "@/stores/public";
import { getFirstMenu, getMenuByKey } from '@/utils/menu';
import { versionCheck } from "./helper";
import NProgress from 'nprogress';
import pinia from '../../stores';

NProgress.configure({ showSpinner: false });

/**
 * 路由拦截处理
 * @param router - 路由对象
 */
export function routerIntercept(router: Router) {
  const publicStore = usePublicStore();
  const userStore = useUserStore(pinia);
  const tabStore = useTabStore(pinia);
  const menuStore = useMenuStore();
  const { version } = storeToRefs(publicStore);
  const { menuList } = storeToRefs(menuStore);
  const { permissions } = storeToRefs(userStore);
  const { setVersion } = publicStore;
  const {
    addCacheRoutes,
    setActiveKey,
    setNav,
    addTabs
  } = tabStore;

  // 路由拦截
  router.beforeEach(async (to, from, next) => {
    await versionCheck(version.value, setVersion);
    const { getToken } = useToken();
    const token = getToken();
    NProgress.start();

    // 转为keepalive形式
    addCacheRoutes(to.path);

    const menuByKeyProps = {
      menus: menuList.value,
      permissions: permissions.value,
      key: to.path
    };
    const newItems = getMenuByKey(menuByKeyProps);
    if (newItems?.key) {
      setActiveKey(newItems.key);
      setNav(newItems.nav);
      addTabs(newItems);
    }

    // 无token返回登录页
    if (!token && to.path !== '/login') {
      message.error({ content: '用户授权过期，请重新登录', key: 'not_token' });
      next({ path: `/login?redirect=${to.path}` });
    } else if (token && to.path === '/login') {
      // 有token且在登录页跳转第一个有效菜单
      const firstMenu = getFirstMenu(menuList.value, permissions.value);
      next(firstMenu);
    } else next();
  });

  // 路由结束处理
  router.afterEach((to) => {
    NProgress.done();
  });
}