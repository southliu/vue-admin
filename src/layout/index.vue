<template>
  <Header :collapsed="collapsed" @toggleCollapsed="toggleCollapsed" />
  <Menu :collapsed="collapsed" />
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

export default defineComponent({
  components: { Header, Menu },
  setup() {
    const collapsed = ref(false)

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