<template>
  <header
    class="flex items-center justify-between px-6 py-1 box-border transition-all"
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
        <div class="ant-dropdown-link flex items-center cursor-pointer" @click.prevent>
          <img
            class="w-30px h-30px rounded-1/2 overflow-hidden object-cover bg-light-500"
            src="@/assets/images/logo.png"
            alt="LOGO"
          >
          <span class="ml-2 text-base">South</span>
        </div>
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
import { defineComponent, createVNode } from 'vue'
import Fullscreen from '@/components/Fullscreen.vue'
import { useRouter } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FormOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { useToken } from '@/hooks'
import { Modal } from 'ant-design-vue'

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
    ExclamationCircleOutlined
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

    // 退出登录
    const handleLogout = () => {
      Modal.confirm({
        title: '温馨提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '是否确定退出系统?',
        onOk() {
          useToken(null, true)
          router.push('/login')
        }
      })
    }

    // 点击下拉菜单
    const onClickDropdown = (e: MouseEvent) => {
      switch ((e as MouseEvent & { key: Dropdowns }).key) {
        // 修改密码
        case Dropdowns.update:
          break

        // 退出登录
        case Dropdowns.logout:
          handleLogout()
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
