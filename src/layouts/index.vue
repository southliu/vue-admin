<template>
  <div
    class="header flex flex-col"
    :class="{ 'header-close-menu': collapsed }"
  >
    <Header
      :collapsed="collapsed"
      @toggleCollapsed="toggleCollapsed"
    />
    <a-divider class="h-1px m-0" />
    <Tabs />
  </div>
  <Menu
    class="menu"
    :class="{ 'menu-close': collapsed }"
    :collapsed="collapsed"
  />
  <div
    class="con p-4 overflow-y-auto h-full transition-all"
    :class="{ 'con-close-menu': collapsed }"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tabs from './components/Tabs.vue'

export default defineComponent({
  components: { Header, Menu, Tabs },
  setup() {
    const collapsed = ref(false)

    // 收缩菜单
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    return {
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
  background-color: @bg;
}

.con-close-menu {
  left: @layout_left_close;
}
</style>