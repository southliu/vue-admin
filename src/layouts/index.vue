<template>
  <div
    class="header flex flex-col box-border overflow-hidden"
    :class="{ 'header-close-menu': collapsed }"
  >
    <Header
      class="border-b-1 border-b-light-700  box-border"
      :collapsed="collapsed"
      @toggleCollapsed="toggleCollapsed"
    />
    <div class="px-2px">
      <Tabs />
    </div>
  </div>
  <Menu
    class="menu"
    :class="{ 'menu-close': collapsed }"
    :collapsed="collapsed"
  />
  <div
    class="con transition-all overflow-hidden"
    :class="{ 'con-close-menu': collapsed }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive :include="tabStore.cacheRoutes">
        <component
          v-if="$route.meta.isKeepAlive"
          :is="Component"
          :key="$route.path"
        />
      </keep-alive>
      <component
        :is="Component"
        v-if="!$route.meta.isKeepAlive"
      />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTabStore } from '@/stores/tabs'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'

export default defineComponent({
  components: { Header, Menu, Tabs },
  setup() {
    const tabStore = useTabStore()
    const collapsed = ref(false)

    // 收缩菜单
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    return {
      tabStore,
      collapsed,
      toggleCollapsed
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
</style>