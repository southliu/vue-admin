<template>
  <div
    class="header flex flex-col box-border overflow-hidden"
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
    id="con"
    class="con transition-all overflow-auto"
    :class="{ 
      'con-close-menu': isCollapsed, 
      'con-isMaximize': isMaximize,
      'con-phone': isPhone,
      'z-1': isPhone && !isCollapsed
    }"
  >
    <div v-if="permissions.length > 0" class="h-full min-w-1024px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="tabStore.cacheRoutes">
          <component
            v-if="$route.meta.keepAlive"
            :is="Component"
            :key="$route.name"
          />
        </keep-alive>
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
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
    :isLoading="isLoading"
    :isVisible="isUpdatePassword"
    @handleCancel="onUpdatePassword"
    @handleSubmit="handleUpdatePassword"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { getPermissions } from '@/servers/permissions'
import { permissionsToArray } from '@/utils/permissions'
import { message, Skeleton } from 'ant-design-vue'
import { menus } from '@/menus'
import { useRoute } from 'vue-router'
import { getMenus, getCurrentMenuByRoute } from '@/menus/utils/helper'
import { useLoading } from '@/hooks/useLoading'
import { updatePassword } from '@/servers/login'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'
import UpdatePassword from '@/components/UpdatePassword/index.vue'

const route = useRoute()
const tabStore = useTabStore()
const menuStore = useMenuStore()
const userStore = useUserStore()
const { addTabs, setPathName, addCacheRoutes } = tabStore
const { setSelectedKeys } = menuStore
const { setUserInfo, setPermissions } = userStore
const { userInfo, permissions } = storeToRefs(userStore)
const username = ref(userInfo.value?.username || '') // 用户名
const isCollapsed = ref(false) // 是否收起菜单
const isMaximize = ref(false) // 是否窗口最大化
const isUpdatePassword = ref(false) // 是否显示修改密码
const {
  isPhone,
  openKeys,
  menuList,
} = storeToRefs(menuStore)
const { isLoading, startLoading, endLoading } = useLoading()

onMounted(() => {
  handleIsPhone()
  startResize()

  // 如果用户id不存在则重新获取
  if (!userInfo.value?.id) {
    getUserInfo()
  }
})

onUnmounted(() => {
  stopResize()
})

/** 获取用户信息和权限 */
const getUserInfo = async () => {
  try {
    const { data } = await getPermissions({ refresh_cache: false })
    if (data) {
      const { data: { user, permissions } } = data
      const newPermissions = permissionsToArray(permissions)
      username.value = user.username
      setUserInfo(user)
      setPermissions(newPermissions)

      // 菜单处理
      const newMenus = getMenus(menus, newPermissions)
      const { key, path, title, top } = getCurrentMenuByRoute(route.path, newMenus)
      menuList.value = newMenus
      // 菜单展开，添加标签
      if (top) openKeys.value = [top]
      if (key) {
        addTabs({ key, path, title })
        setSelectedKeys([route.path])
        setPathName(key)
        addCacheRoutes(key)
      }
    }
  } catch(err) {
    console.error(err)
  }
}

/** 点击修改密码 */
const onUpdatePassword = () => {
    isUpdatePassword.value = !isUpdatePassword.value
}

/**
 * 修改密码
 * @param data - 密码参数
 */
const handleUpdatePassword = async (params: unknown) => {
  try {
    startLoading()
    const { data } = await updatePassword(params)
    message.success(data.message || '修改成功')
    isUpdatePassword.value = !isUpdatePassword.value
  } finally {
    endLoading()
  }
}

/** 收缩菜单 */
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

/** 窗口最大化 */
const toggleMaximize = () => {
  isMaximize.value = !isMaximize.value
}

/** 判断是否是手机端 */
const handleIsPhone = useDebounceFn(() => {
  const isPhone = window.innerWidth <= 768
  // 手机首次进来收缩菜单
  if (isPhone) isCollapsed.value = true
  menuStore.setPhone(isPhone)
}, 500)

/** 滚动事件防抖 */
const handler = () => handleIsPhone()
const handleSize = useDebounceFn(handler, 200)

/** 开始监听滚动事件 */
const startResize = () => {
  window.addEventListener('resize', handleSize)
}

/** 结束监听滚动事件 */
const stopResize = () => {
  window.removeEventListener('resize', handleSize)
}
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.header {
  position: fixed;
  top: 0;
  left: @layout_left;
  right: 0;
  height: @layout_top;
  border-bottom: 1px solid #eee;
}

.header-close-menu {
  left: @layout_left_close !important;
}

.header-driver {
  border-bottom: 1px solid #eee;
}

.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #000;
  width: @layout_left;
}

.menu-close {
  width: @layout_left_close !important;
}

.con {
  position: fixed;
  left: @layout_left;
  top: @layout_top;
  right: 0;
  bottom: 0;
}

.con-close-menu {
  left: @layout_left_close;
}

.con-isMaximize {
  left: 0 !important;
  top: calc(@layout_top / 2);
}
.header-none {
  left: 0 !important;
  height: calc(@layout_top / 2)
}

.none {
  display: none !important;
}

.menu-none {
  width: 0 !important;
}

.con-phone {
  left: 0 !important;
}

.header-phone {
  left: 0 !important;
}
</style>