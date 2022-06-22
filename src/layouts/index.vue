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
    :collapsed="collapsed"
    :class="{
      'menu-close': collapsed,
      'menu-none': maximize || (isPhone && collapsed),
      'z-1000': isPhone
    }"
    @toggleCollapsed="toggleCollapsed"
  />
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
    <div class="h-full min-w-785px">
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
  <UpdatePassword
    :visible="isUpdatePassword"
    @handleCancel="onUpdatePassword"
    @handleSubmit="onUpdatePassword"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'
import UpdatePassword from '@/components/UpdatePassword/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Menu,
    Tabs,
    UpdatePassword
  },
  setup() {
    const tabStore = useTabStore()
    const menuStore = useMenuStore()
    const { isPhone } = storeToRefs(menuStore)
    const collapsed = ref(false) // 是否收起菜单
    const maximize = ref(false) // 是否窗口最大化
    const isUpdatePassword = ref(false) // 是否显示修改密码

    onMounted(() => {
      startResize()
    })

    onUnmounted(() => {
      stopResize()
    })

    /** 点击修改密码 */
    const onUpdatePassword = () => {
      isUpdatePassword.value = !isUpdatePassword.value
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
      isPhone,
      isUpdatePassword,
      tabStore,
      collapsed,
      maximize,
      onUpdatePassword,
      toggleCollapsed,
      toggleMaximize
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