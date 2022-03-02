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
            class="w-30px h-30px rounded-1/2 overflow-hidden object-cover bg-light-500"
            src="@/assets/logo.png"
            alt="LOGO"
          >
          <span class="ml-2 text-base">South</span>
        </a>
        <template #overlay>
          <a-menu @click="onClickDropdown">
            <a-menu-item :key="Dropdowns.update">
              <form-outlined class="mr-1" />
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-item :key="Dropdowns.logout">
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
import type { MenuProps } from 'ant-design-vue';
import { useRouter } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FormOutlined,
} from '@ant-design/icons-vue';

// 下拉菜单枚举
enum Dropdowns {
  update,
  logout
}

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
    const router = useRouter()

    // 收缩菜单
    const toggleCollapsed = () => {
      context.emit('toggleCollapsed')
    }

    // 点击下拉菜单
    const onClickDropdown: MenuProps['onClick'] = ({ key }) => {
      switch (key) {
        // 修改密码
        case Dropdowns.update:
          break

        // 退出登录
        case Dropdowns.logout:
          router.push('/login')
          break

        default:
          break
      }
    };

    return {
      Dropdowns,
      toggleCollapsed,
      onClickDropdown
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
</style>