<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useToken } from '@/hooks/useToken';
import { getFirstMenu } from '@/menus/utils/helper';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';

const { getToken } = useToken();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);
const { permissions } = storeToRefs(userStore);
const router = useRouter();
const token = getToken();

onMounted(() => {
  if (!token) return router.push('/login');

  // 跳转第一个有效的菜单路径
  goFirstMenu();
});

// 跳转第一个有效的菜单路径
const goFirstMenu = () => {
  const firstMenu = getFirstMenu(menuList.value, permissions.value);
  router.push(firstMenu);
};
</script>
