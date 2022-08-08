<template>
  <div
    class="header flex flex-col box-border overflow-hidden"
    :class="{
      'header-close-menu': collapsed,
      'header-none': maximize,
      'header-phone z-999': isPhone
    }"
  >
    <Header
      class="header-driver box-border"
      :class="{ 'none': maximize }"
      :username="username"
      :collapsed="collapsed"
      @toggleCollapsed="toggleCollapsed"
      @onUpdatePassword="onUpdatePassword"
    />
    <div class="px-2px">
      <Tabs
        :maximize="maximize"
        @toggleMaximize="toggleMaximize"
      />
    </div>
  </div>
  <Menu
    v-if="permissions.length > 0"
    class="menu transition-all"
    :collapsed="collapsed"
    :class="{
      'menu-close': collapsed,
      'menu-none': maximize || (isPhone && collapsed),
      'z-1000': isPhone
    }"
    @toggleCollapsed="toggleCollapsed"
  />
  <div
    v-else
    :class="{
      'fixed top-0 bottom-0 left-0 right-0 z-1000': !collapsed
    }"
    @click="toggleCollapsed"
  >
    <Skeleton
      active
      class="menu h-100vh transition-all"
      :paragraph="{ rows: 10 }"
      :class="{
        'p-2': !collapsed,
        'menu-close': collapsed,
        'menu-none': maximize || (isPhone && collapsed),
        'z-1000': isPhone
      }"
    />
  </div>
  <div
    id="con"
    class="con transition-all overflow-auto"
    :class="{ 
      'con-close-menu': collapsed, 
      'con-maximize': maximize,
      'con-phone': isPhone,
      'z-1': isPhone && !collapsed
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
    :loading="loading"
    :visible="isUpdatePassword"
    @handleCancel="onUpdatePassword"
    @handleSubmit="handleUpdatePassword"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
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
import { getMenus, getCurrentMenuByRoute } from '@/utils/menus'
import { useLoading } from '@/hooks/useLoading'
import { updatePassword } from '@/servers/login'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'
import UpdatePassword from '@/components/UpdatePassword/index.vue'

export default defineComponent({
  name: 'LayoutComponent',
  components: {
    Header,
    Menu,
    Tabs,
    Skeleton,
    UpdatePassword
  },
  setup() {
    const route = useRoute()
    const tabStore = useTabStore()
    const menuStore = useMenuStore()
    const userStore = useUserStore()
    const { addTabs, setPathName } = tabStore
    const { setSelectedKeys } = menuStore
    const { setUserInfo, setPermissions } = userStore
    const { userInfo, permissions } = storeToRefs(userStore)
    const username = ref(userInfo.value?.username || '') // 用户名
    const collapsed = ref(false) // 是否收起菜单
    const maximize = ref(false) // 是否窗口最大化
    const isUpdatePassword = ref(false) // 是否显示修改密码
    const {
      isPhone,
      openKeys,
      menuList,
    } = storeToRefs(menuStore)
    const { loading, startLoading, endLoading } = useLoading()

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
        endLoading()
      } catch(err) {
        endLoading()
        console.log(err)
      }
    }

    /** 收缩菜单 */
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    /** 窗口最大化 */
    const toggleMaximize = () => {
      maximize.value = !maximize.value
    }

    /** 判断是否是手机端 */
    const handleIsPhone = useDebounceFn(() => {
      const isPhone = window.innerWidth <= 768
      // 手机首次进来收缩菜单
      if (isPhone) collapsed.value = true
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

    return {
      loading,
      isPhone,
      isUpdatePassword,
      username,
      tabStore,
      collapsed,
      maximize,
      permissions,
      toggleMaximize,
      toggleCollapsed,
      onUpdatePassword,
      handleUpdatePassword
    }
  }
})
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

.con-maximize {
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