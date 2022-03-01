<template>
  <header
    class="header flex items-center justify-between px-6 box-border transition-all"
    :class="{ 'header-close-menu': collapsed }"
  >
    <div class="header-left">
      <div class="text-lg cursor-pointer" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </div>

    <div class="header-right flex items-center">
      <Fullscreen />
      <a-dropdown class="min-w-100px">
        <a class="ant-dropdown-link flex items-center" @click.prevent>
          <img
            class="avatar rounded-1/2 overflow-hidden object-cover"
            src="@/assets/logo.png"
          >
          <span class="ml-2 text-base">South</span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <form-outlined class="mr-1" />
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-item>
              <logout-outlined class="mr-1" />
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Fullscreen from '@/components/Fullscreen.vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FormOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    Fullscreen,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    FormOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const toggleCollapsed = () => {
      context.emit('toggleCollapsed')
    }

    return {
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

.avatar {
  width: 30px;
  height: 30px;
  background-color: #e2e2e2;
}
</style>