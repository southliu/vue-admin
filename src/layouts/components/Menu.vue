<template>
  <div class="py-1 box-border transition-all overflow-hidden z-2">
    <div
      class="flex justify-center items-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': isCollapsed }"
      @click="onClickLogo"
    >
      <img
        class="object-contain"
        :width="50"
        :height="30"
        :src="Logo"
        alt="LOGO"
      />
      <span
        class="text-white ml-3 text-xl font-bold truncate"
        :class="{ 'hidden': isCollapsed }"
      >
        后台系统
      </span>
    </div>
    <div class="menu-height overflow-y-auto">
      <Menu
        v-model:selectedKeys="selectedKeys"
        :openKeys="(!isCollapsed && !isPhone) ? currentOpenKeys : undefined"
        class="h-full z-1000"
        mode="inline"
        theme="dark"
        :inlineCollapsed="isCollapsed"
        @openChange="openChange"
      >
        <MenuChildren
          :list="sideMenuList"
          :handleClick="handleClick"
        />
      </Menu>
    </div>

    <div
      v-if="isPhone && !isCollapsed"
      class="cover fixed right-0 top-0 bottom-0 h-full bg-gray-500 bg-opacity-10 z-2"
      @click="hiddenMenu"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SideMenu } from '#/public';
import type { Key } from 'ant-design-vue/lib/_util/type';
import { watch, onMounted, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { Menu } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { setTitle } from '@/utils/helper';
import {
  getFirstMenu,
  getMenuName,
  getOpenMenuByRouter,
  splitPath
} from '@/utils/menu';
import MenuChildren from './MenuChildren.vue';
import Logo from '@/assets/images/logo.png';

interface DefineEmits {
  (e: 'toggleCollapsed'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isCollapsed: boolean;
}

const props = withDefaults(defineProps<DefineProps>(), {});

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const userStore = useUserStore();
const { permissions } = storeToRefs(userStore);
const {
  isPhone,
  openKeys,
  selectedKeys,
  sideMenuList
} = storeToRefs(menuStore);
const {
  setOpenKeys,
  setSelectedKeys
} = menuStore;

// 当前展开项，收缩模式不展开
const currentOpenKeys = ref(openKeys.value);

onMounted(() => {
  handleMenuOpen();
  handleSetTitle(sideMenuList.value, route.path);
});

watch(() => sideMenuList.value, () => {
  handleMenuOpen();
  handleSetTitle(sideMenuList.value, route.path);
});

// 监听路径
watch(() => route.path, value => {
  if (!value || value === '/loading') return;
  handleMenuOpen();
  handleSetTitle(sideMenuList.value, value);
});

// 监听展开
watch(() => openKeys.value, openKeys => {
  if (props.isCollapsed || isPhone.value) {
    currentOpenKeys.value = [];
  } else {
    currentOpenKeys.value = openKeys;
  }
});

/** 处理菜单展开 */
const handleMenuOpen = () => {
  if (permissions.value.length > 0 && sideMenuList.value?.length) {
    // 展开菜单
    const newOpenKey = getOpenMenuByRouter(route.path);
    setOpenKeys(newOpenKey);
    setSelectedKeys([route.path]);
  }
};

/**
 * 设置浏览器标签
 * @param list - 菜单列表
 * @param path - 路径
 */
const handleSetTitle = (list: SideMenu[], path: string) => {
  const title = getMenuName(list, path);
  if (title) setTitle(title);
};

/**
 * 处理跳转
 * @param path - 路径
 */
const goPath = (path: string) => {
  router.push(path);
};

/** 点击logo */
const onClickLogo = () => {
  const firstMenu = getFirstMenu(sideMenuList.value, permissions.value);
  goPath(firstMenu || '/');
};

/**
 * 对比当前展开目录是否是同一层级
 * @param arr - 当前展开目录
 * @param lastArr - 最后展开的目录
 */
const diffOpenMenu = (arr: string[], lastArr: string[]) => {
  let result = true;

  for (let j = 0; j < arr.length; j++) {
    if (arr[j] !== lastArr[j]) {
      result = false;
      break;
    }
  }

  return result;
};

/**
 * 菜单展开事件
 * @param openKeys - 展开下标
 */
const openChange = (openKeys: Key[]) => {
  const newOpenKey: string[] = [];
  let last = ''; // 最后一个目录结构

  // 当目录有展开值
  if (openKeys.length > 0) {
    last = openKeys[openKeys.length - 1].toString();
    const lastArr: string[] = splitPath(last);
    newOpenKey.push(last);

    // 对比当前展开目录是否是同一层级
    for (let i = openKeys.length - 2; i >= 0; i--) {
      const arr = splitPath(openKeys[i].toString());
      const hasOpenKey = diffOpenMenu(arr, lastArr);
      if (hasOpenKey) newOpenKey.unshift(openKeys[i].toString());
    }
  }

  setOpenKeys(newOpenKey);
};

/**
 * 点击菜单
 * @param key - 唯一值
 */
const handleClick = (key: string) => {
  goPath(key);
  
  // 手机端点击隐藏菜单
  if (isPhone.value) emit('toggleCollapsed');
};

/** 隐藏菜单 */
const hiddenMenu = () => {
  emit('toggleCollapsed');
};
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.menu-height {
  height: calc(100% - 50px);
}

.cover {
  left: @layoutLeft;
}
</style>@/menus/utils/menu