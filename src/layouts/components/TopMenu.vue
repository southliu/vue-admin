<template>
  <div class="flex items-center ml-50px">
    <template
      v-for="item in menuList"
      :key="item.id"
    >
      <div
        v-if="item.menuType === 0"
        class="h-40px leading-40px flex flex-col items-center cursor-pointer relative mr-30px"
        :class="{ 'text-#1d4ed8': topMenuKey === item.key }"
        @click="handleClick(item.key, item.children)"
      >
        <span class="text-15px">{{ item.label }}</span>
        <div
          v-if="topMenuKey === item.key"
          class="absolute bottom-0 h-4px w-40px rounded-4px bg-#1d4ed8"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { SideMenu } from "#/public";
import { watch, onUnmounted, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { getFirstTab } from '@/utils/menu';
import { useMenuStore } from '@/stores/menu';
import { useTabStore } from "@/stores/tabs";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { setSideMenu, setTopMenuKey } = menuStore;
const { permissions } = storeToRefs(userStore);
const { menuList, topMenuKey } = storeToRefs(menuStore);
const { cacheTabs } = storeToRefs(tabStore);

onMounted(() => {
  handleInit();
});

onUnmounted(() => {
  setTopMenuKey('');
});

watch(() => menuList.value, () => {
  handleInit();
});

watch(() => route.path, value => {
  if (!value.includes(topMenuKey.value)) {
    const { path, list } = getMatchMenu();
    if (path) {
      setTopMenuKey(path);
      setSideMenu(list || []);
    }
  }
});

/** 初始化 */
const handleInit = () => {
  if (!topMenuKey.value && menuList.value?.length) {
    for (let i = 0; i < menuList.value.length; i++) {
      const item = menuList.value[i];
      if (item.menuType === 0 && route.path.includes(item.key)) {
        setTopMenuKey(item.key);
        setSideMenu(item.children || []);
        return;
      }
    }
  }
};

/** 获取路径相匹配的菜单 */
const getMatchMenu = () => {
  for (let i = 0; i < menuList.value?.length; i++) {
    const item = menuList.value[i];
    if (route.path.includes(item.key)) {
      return {
        path: item.key,
        list: item.children || [],
      };
    }
  }

  return {};
};

/**
 * 获取列表第一个有效路由
 * @param list - 菜单列表
 */
const getFirstMenu = (list: SideMenu[]) => {
  let result = '';

  const deepData = (list: SideMenu[]) => {
    if (result) return result;

    for (let i = 0; i < list?.length; i++) {
      const item = list[i];
      if (item.children?.length && item.menuType !== 1) {
        const childResult = deepData(item.children);
        if (childResult) {
          result = childResult;
          return result;
        }
      } else {
        result = item.key;
        return result;
      }
    }
  };
  deepData(list);

  return result;
};

/**
 * 处理点击事件
 * @param key - 唯一标识
 * @param list - 菜单列表
 */
const handleClick = (key: string, list?: SideMenu[]) => {
  setTopMenuKey(key);
  setSideMenu(list || []);

  const firstTab = getFirstTab(key);

  if (firstTab) {
    const firstTabRoute = cacheTabs.value?.[`/${firstTab}`]?.[0]?.key;
    if (firstTabRoute) return router.push(firstTabRoute);

    for (let i = 0; i < cacheTabs.value?.[`/${firstTab}`]?.length; i++) {
      const item = cacheTabs.value[`/${firstTab}`][i];
      if (permissions.value?.includes(item.key)) {
        if (item.key) return router.push(item.key);
      }
    }
  }

  const firstPath = getFirstMenu(list || []);
  if (firstPath) router.push(firstPath);
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  height: 38px;
  line-height: 38px;
  margin-right: 10px;
  font-size: 15px;
  cursor: pointer;
}

.active {
  border-bottom: 2px solid #000;
}
</style>