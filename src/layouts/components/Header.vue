<template>
  <header
    class="flex items-center justify-between px-6 py-6px box-border transition-all"
  >
    <div class="header-left">
      <div class="text-lg cursor-pointer" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </div>

    <div class="header-right flex items-center">
      <GlobalSearch />
      <Fullscreen />
      <Dropdown class="min-w-50px">
        <div class="ant-dropdown-link flex items-center cursor-pointer" @click.prevent>
          <img
            class="rounded-1/2 overflow-hidden object-cover bg-light-500"
            :src="Avatar"
            :width="27"
            :height="27"
            alt="头像"
          >
          <span class="ml-2 text-15px min-w-50px truncate">{{ username || 'south-admin' }}</span>
        </div>
        <template #overlay>
          <Menu @click="onClickDropdown">
            <MenuItem :key="Dropdowns.update">
              <FormOutlined class="mr-1" />
              <span>修改密码</span>
            </MenuItem>
            <MenuItem :key="Dropdowns.logout">
              <LogoutOutlined class="mr-1" />
              <span>退出登录</span>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, createVNode } from 'vue'
import Fullscreen from '@/components/Fullscreen/index.vue'
import GlobalSearch from '@/components/GlobalSearch/index.vue'
import Avatar from '@/assets/images/avatar.png'
import {
  Menu,
  MenuItem,
  Dropdown,
  MenuProps
} from 'ant-design-vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FormOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useToken } from '@/hooks/useToken'
import { useUserStore } from '@/stores/user'
import { Modal } from 'ant-design-vue'

// 下拉菜单枚举
enum Dropdowns {
  update,
  logout
}

export default defineComponent({
  name: 'HeaderLayout',
  emits: ['toggleCollapsed', 'onUpdatePassword'],
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    FormOutlined,
    ExclamationCircleOutlined,
    Fullscreen,
    GlobalSearch,
    Menu,
    MenuItem,
    Dropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const router = useRouter()
    const userStore = useUserStore()
    const { removeToken } = useToken()
    const { clearInfo } = userStore

    /** 收缩菜单 */
    const toggleCollapsed = () => {
      context.emit('toggleCollapsed')
    }

    /** 退出登录 */
    const handleLogout = () => {
      Modal.confirm({
        title: '温馨提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '是否确定退出系统?',
        onOk() {
          clearInfo()
          removeToken()
          router.push('/login')
        }
      })
    }

    /**
     * 点击下拉菜单
     * @param e - 菜单点击属性
     */
    const onClickDropdown: MenuProps['onClick'] = e => {
      switch ((e as { key: Dropdowns }).key) {
        // 修改密码
        case Dropdowns.update:
          context.emit('onUpdatePassword')
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
      Avatar,
      Dropdowns,
      toggleCollapsed,
      onClickDropdown
    }
  }
})
</script>
