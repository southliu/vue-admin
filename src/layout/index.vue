<template>
  <Header />
  <Menu />
  <div class="con">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'

export default defineComponent({
  components: { Header, Menu },
  setup() {
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
}
</style>