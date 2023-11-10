<template>
  <div class="p-10">
    <Spin :spinning="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useToken } from '@/hooks/useToken';
import { handleFilterApiMenu, getFirstMenu } from '@/utils/menu';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import { Spin } from 'ant-design-vue';
import { getPermissions } from '@/servers/permission';
import { permissionsToArray } from '@/utils/permissions';
import { getSystemMenuTree } from '@/servers/system/menu';

const { getToken } = useToken();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);
const { permissions } = storeToRefs(userStore);
const { setMenus } = menuStore;
const { setUserInfo, setPermissions } = userStore;
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
    getUserMenu(newPermissions);
    return newPermissions;
  } catch(err) {
    console.error(err);
  }
};

/** 获取用户菜单 */
const getUserMenu = async (permissions: string[]) => {
  try {
    isLoading.value = true;
    const { code, data } = await getSystemMenuTree({ isLayout: true });
    if (Number(code) !== 200) return;
    const menuData = handleFilterApiMenu(data, permissions);
    setMenus(menuData);
    return menuData;
  } finally {
    isLoading.value = false;
  }
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
};
</script>
