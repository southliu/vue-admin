<template>
  <div
    class="layout-header flex flex-col box-border overflow-hidden"
    :class="{
      'header-close-menu': isCollapsed,
      'header-none': isMaximize,
      'header-phone z-999': isPhone
    }"
  >
    <Header
      class="header-driver box-border"
      :class="{ 'none': isMaximize }"
      :username="username"
      :isCollapsed="isCollapsed"
      @toggleCollapsed="toggleCollapsed"
      @onUpdatePassword="onUpdatePassword"
    />
    <div class="px-2px">
      <Tabs
        :isMaximize="isMaximize"
        @toggleMaximize="toggleMaximize"
      />
    </div>
  </div>
  <Menu
    v-if="permissions.length > 0"
    class="menu transition-all"
    :isCollapsed="isCollapsed"
    :class="{
      'menu-close': isCollapsed,
      'menu-none': isMaximize || (isPhone && isCollapsed),
      'z-1000': isPhone
    }"
    @toggleCollapsed="toggleCollapsed"
  />
  <div
    v-else
    :class="{
      'fixed top-0 bottom-0 left-0 right-0 z-1000': !isCollapsed
    }"
    @click="toggleCollapsed"
  >
    <Skeleton
      active
      class="menu h-100vh transition-all"
      :paragraph="{ rows: 10 }"
      :class="{
        'p-2': !isCollapsed,
        'menu-close': isCollapsed,
        'menu-none': isMaximize || (isPhone && isCollapsed),
        'z-1000': isPhone
      }"
    />
  </div>
  <div
    id="layoutContent"
    class="con transition-all overflow-auto"
    :class="{ 
      'con-close-menu': isCollapsed, 
      'con-maximize': isMaximize,
      'con-phone': isPhone,
      'z-1': isPhone && !isCollapsed
    }"
  >

    <div v-if="permissions.length > 0" class="h-full min-w-1024px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cacheRoutes">
          <component
            :is="Component"
            :key="$route.name"
          />
        </keep-alive>
      </router-view>
    </div>
    <Skeleton
      v-else
      active
      class="h-full min-w-1024px p-5 transition-all"
      :paragraph="{ rows: 12 }"
    />
  </div>

  <!-- 修改密码 -->
  <UpdatePassword
    ref="updatePasswordRef"
    :isLoading="isLoading"
    :isOpen="isUpdatePassword"
    @handleCancel="onUpdatePassword"
    @handleSubmit="handleUpdatePassword"
  />
</template>

<script lang="ts" setup>
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import { useTabStore } from '@/stores/tabs';
import { useMenuStore } from '@/stores/menu';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import { getPermissions } from '@/servers/permission';
import { permissionsToArray } from '@/utils/permissions';
import { message, Skeleton } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { updatePassword } from '@/servers/login';
import { getSystemMenuTree } from '@/servers/system/menu';
import { handleFilterApiMenu } from '@/utils/menu';
import { routeToKeepalive } from '@/router/utils/helper';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Tabs from './components/Tabs.vue';
import UpdatePassword from '@/components/UpdatePassword/index.vue';

const route = useRoute();
const tabStore = useTabStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const { setUserInfo, setPermissions } = userStore;
const { userInfo, permissions } = storeToRefs(userStore);
const { cacheRoutes } = storeToRefs(tabStore);
const { isPhone } = storeToRefs(menuStore);
const { addCacheRoutes } = tabStore;
const { setMenus } = menuStore;

const username = ref(userInfo.value?.username || ''); // 用户名
const isLoading = ref(false);
const isCollapsed = ref(false); // 是否收起菜单
const isMaximize = ref(false); // 是否窗口最大化
const isUpdatePassword = ref(false); // 是否显示修改密码
const updatePasswordRef = shallowRef<{ handleInit: () => void }>();

onMounted(() => {
  handleIsPhone();
  startResize();

  // 转为keepalive形式
  const cacheRoute = routeToKeepalive(route.path);
  addCacheRoutes(cacheRoute); // 添加keepalive缓存

  // 如果用户id不存在则重新获取
  if (!userInfo.value?.id) {
    getUserInfo();
  }
});

onUnmounted(() => {
  stopResize();
});

/** 获取用户信息和权限 */
const getUserInfo = async () => {
  try {
    const { code, data } = await getPermissions({ refresh_cache: false });
    if (Number(code) !== 200) return;
    const { user, permissions } = data;
    const newPermissions = permissionsToArray(permissions);
    username.value = user.username;

    setUserInfo(user);
    setPermissions(newPermissions);
    getUserMenu(newPermissions);
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
  } finally {
    isLoading.value = false;
  }
};

/** 点击修改密码 */
const onUpdatePassword = () => {
    isUpdatePassword.value = !isUpdatePassword.value;
};

/**
 * 修改密码
 * @param data - 密码参数
 */
const handleUpdatePassword = async (params: unknown) => {
  try {
    isLoading.value = true;
    const data = await updatePassword(params);
    if (Number(data.code) === 200) {
      message.success(data.message || '修改成功');
      isUpdatePassword.value = !isUpdatePassword.value;
      updatePasswordRef.value?.handleInit?.();
    }
  } finally {
    isLoading.value = false;
  }
};

/** 收缩菜单 */
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value;
};

/** 窗口最大化 */
const toggleMaximize = () => {
  isMaximize.value = !isMaximize.value;
};

/** 判断是否是手机端 */
const handleIsPhone = useDebounceFn(() => {
  const isPhone = window.innerWidth <= 768;
  // 手机首次进来收缩菜单
  if (isPhone) isCollapsed.value = true;
  menuStore.setPhone(isPhone);
}, 500);

/** 滚动事件防抖 */
const handler = () => handleIsPhone();
const handleSize = useDebounceFn(handler, 200);

/** 开始监听滚动事件 */
const startResize = () => {
  window.addEventListener('resize', handleSize);
};

/** 结束监听滚动事件 */
const stopResize = () => {
  window.removeEventListener('resize', handleSize);
};

defineExpose({
  cacheRoutes
});
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.layout-header {
  position: fixed;
  top: 0;
  left: @layoutLeft;
  right: 0;
  height: @layoutTop;
  border-bottom: 1px solid #eee;
  z-index: 100;
}

.header-close-menu {
  width: calc(100% - @layoutLeftClose);
  left: @layoutLeftClose !important;
}

.header-driver {
  border-bottom: 1px solid #eee;
}

.theme-dark {
  .header-driver, .layout-header {
    border-bottom-color: #414141 !important;
  }
}

.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #000;
  width: @layoutLeft;
  z-index: 101;
}

.menu-close {
  width: @layoutLeftClose !important;
}

.con {
  width: calc(100% - @layoutLeft);
  min-height: calc(100vh - @layoutTop);
  position: relative;
  left: @layoutLeft;
  top: @layoutTop;
  right: 0;
  bottom: 0;
}

.con-close-menu {
  width: calc(100% - @layoutLeftClose);
  left: @layoutLeftClose;
}

.con-maximize {
  width: 100% !important;
  min-height: calc(100vh - 40px);
  left: 0 !important;
  top: calc(@layoutTop / 2);
}

.header-none {
  left: 0 !important;
  height: calc(@layoutTop / 2)
}

.none {
  display: none !important;
}

.menu-none {
  width: 0 !important;
}

.con-phone {
  width: 100%;
  left: 0 !important;
}

.header-phone {
  left: 0 !important;
}
</style>