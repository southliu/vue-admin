<template>
  <div
    class="header flex flex-col box-border overflow-hidden"
    :class="{ 'header-close-menu': collapsed, 'header-none': maximize }"
  >
    <Header
      class="header-driver box-border"
      :class="{ 'none': maximize }"
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
    class="menu"
    :class="{ 'menu-close': collapsed, 'menu-none': maximize }"
    :collapsed="collapsed"
  />
  <div
    id="con"
    class="con transition-all overflow-auto"
    :class="{ 'con-close-menu': collapsed, 'con-maximize': maximize }"
  >
    <div class="min-w-785px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="tabStore.cacheRoutes">
          <component
            v-if="$route.meta.keepAlive"
            :is="Component"
            :key="$route.path"
          />
        </keep-alive>
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
    </div>
  </div>

  <!-- 修改密码 -->
  <UpdatePassword ref="updatePasswordRef" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, onMounted } from 'vue'
import { useTabStore } from '@/stores/tabs'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'
import type { IUpdatePassword } from '@/components/UpdatePassword/model'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Menu,
    Tabs,
    // 异步组件，需要时才加载
    UpdatePassword: defineAsyncComponent(() => (
      import('@/components/UpdatePassword/index.vue')
    ))
  },
  setup() {
    const tabStore = useTabStore()
    const collapsed = ref(false) // 是否收起菜单
    const maximize = ref(false) // 是否窗口最大化
    // 修改密码组件ref
    const updatePasswordRef = ref<IUpdatePassword>()

    /** 点击修改密码 */
    const onUpdatePassword = () => {
      updatePasswordRef.value?.toggle()
    }

    /** 收缩菜单 */
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    /** 窗口最大化 */
    const toggleMaximize = () => {
      maximize.value = !maximize.value
    }
    
    onMounted(() => {
      // 手机首次进来收缩菜单
      if (window.innerWidth <= 768) collapsed.value = true
    })

    return {
      tabStore,
      collapsed,
      maximize,
      onUpdatePassword,
      toggleCollapsed,
      toggleMaximize,
      updatePasswordRef
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

.none {
  display: none;
}

.header-none {
  left: 0 !important;
  height: calc(@layout_top / 2)
}

.menu-none {
  width: 0 !important;
}

</style>