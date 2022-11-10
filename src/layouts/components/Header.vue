<template>
  <header
    class="flex items-center justify-between px-6 py-6px box-border transition-all"
  >
    <div class="flex items-center">
      <div class="text-lg cursor-pointer" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="isCollapsed" />
        <MenuFoldOutlined v-else />
      </div>

      <Nav
        className="ml-15px"
        :list="nav"
      />
    </div>

    <div class="flex items-center">
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

<script lang="ts" setup>
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { useToken } from '@/hooks/useToken'
import { useTabStore } from '@/stores/tabs'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { Modal } from 'ant-design-vue'
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
import Fullscreen from '@/components/Fullscreen/index.vue'
import GlobalSearch from '@/components/GlobalSearch/index.vue'
import Avatar from '@/assets/images/avatar.png'
import Nav from './Nav.vue'

// 下拉菜单枚举
enum Dropdowns {
  update,
  logout
}

const emit = defineEmits(['toggleCollapsed', 'onUpdatePassword'])

defineProps({
  isCollapsed: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const router = useRouter()
const tabStore = useTabStore()
const userStore = useUserStore()
const { removeToken } = useToken()
const { clearInfo } = userStore
const { closeAllTab, clearCacheRoutes } = tabStore
const { nav } = storeToRefs(tabStore)

/** 收缩菜单 */
const toggleCollapsed = () => {
  emit('toggleCollapsed')
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
      closeAllTab()
      clearCacheRoutes()
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
      emit('onUpdatePassword')
      break

    // 退出登录
    case Dropdowns.logout:
      handleLogout()
      break

    default:
      break
  }
}
</script>
