<template>
  <div class="p-10">
    <Spin :spinning="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useToken } from '@/hooks/useToken';
import { handleFilterApiMenu, getFirstMenu, getMenuByKey } from '@/utils/menu';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Spin } from 'ant-design-vue';
import { useTabStore } from '@/stores/tabs';
import { useMenuStore } from '@/stores/menu';
import { getPermissions } from '@/servers/permission';
import { permissionsToArray } from '@/utils/permissions';
import { getSystemMenuTree } from '@/servers/system/menu';

const { getToken } = useToken();
const tabStore = useTabStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);
const { permissions } = storeToRefs(userStore);
const { setMenus, setSideMenu, setTopMenuKey } = menuStore;
const { setUserInfo, setPermissions } = userStore;
const {
  setActiveKey,
  addTabs,
} = tabStore;
const router = useRouter();
const token = getToken();

onMounted(() => {
  if (!token) return router.push('/login');

  // 跳转第一个有效的菜单路径
  goFirstMenu();
});

const isLoading = ref(false);

/** 获取用户信息和权限 */
const getUserInfo = async () => {
  try {
    const { code, data } = await getPermissions({ refresh_cache: false });
    if (Number(code) !== 200) return;
    const { user, permissions } = data;
    const newPermissions = permissionsToArray(permissions);

    setUserInfo(user);
    setPermissions(newPermissions);
    return newPermissions;
  } catch(err) {
    console.error(err);
  }
};

/** 获取用户菜单 */
const getUserMenu = async (permissions: string[]) => {
  try {
    isLoading.value = true;
    const { code, data } = await getSystemMenuTree({ isFirst: true });
    if (Number(code) !== 200) return;
    const menuData = handleFilterApiMenu(data, permissions);
    setMenus(menuData);
    return menuData;
  } finally {
    isLoading.value = false;
  }
};

/** 获取路径相匹配的菜单 */
const getMatchMenu = (path: string) => {
  for (let i = 0; i < menuList.value?.length; i++) {
    const item = menuList.value[i];
    if (path.includes(item.key)) {
      return {
        path: item.key,
        list: item.children || [],
      };
    }
  }

  return {};
};

// 跳转第一个有效的菜单路径
const goFirstMenu = async () => {
  let currentMenuList = menuList.value;
  let currentPermissions = permissions.value;

  if (!currentMenuList?.length || !currentPermissions?.length) {
    const permissions = await getUserInfo();
    const menuList = await getUserMenu(permissions || []);
    currentPermissions = permissions || [];
    currentMenuList = menuList || [];
  }

  const firstMenu = getFirstMenu(currentMenuList, currentPermissions);
  router.push(firstMenu);
  const menuByKeyProps = {
    menus: currentMenuList,
    permissions: currentPermissions,
    key: firstMenu
  };
  const newItems = getMenuByKey(menuByKeyProps);
  if (newItems) {
    setActiveKey(newItems.key);
    addTabs(newItems);
  }

  const { path, list } = getMatchMenu(firstMenu);
  if (path) {
    setTopMenuKey(path);
    setSideMenu(list || []);
  }
};
</script>
