<template>
  <div class="flex items-center justify-between mx-2 transition-all">
    <Tabs
      v-model:activeKey="activeKey"
      hide-add
      class="h-34px py-0"
      :tabBarStyle="{
        height: '34px',
        marginTop: '3px'
      }"
      :tabBarGutter="5"
      @change="onChange"
    >
      <TabPane
        class="overflow-auto"
        v-for="(item, index) in tabs"
        :key="item.key"
      >
        <template #tab>
          <Dropdown :trigger="['contextmenu']">
            <div
              class="flex items-center justify-between w-full px-3 py-1 mr-0 border border-light-900"
              :class="{
                'bg-blue-700': isActive(item.key),
                '!text-white': isActive(item.key)
              }"
            >
              <div class="mr-5px">{{ item.label }}</div>
              <div v-if="tabs.length > 1" @click.stop="handleRemove(item.key)">
                <CloseOutlined
                  class="p-1 rounded-1/2 text-11px"
                  :class="{
                    'hover:bg-light-900': !isActive(item.key),
                    'hover:bg-blue-800': isActive(item.key),
                  }"
                  style="margin-right: 0 !important"
                />
              </div>
            </div>
            <template #overlay>
              <DropdownMenu
                :activeKey="activeKey"
                :currentKey="item.key"
                :index="index"
                :list="tabs"
                @handleDropdown="handleDropdown"
                @handleRefresh="handleRefresh"
              />
            </template>
          </Dropdown>
        </template>
      </TabPane>
    </Tabs>
    
    <div class="flex items-center">
      <div class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center">
        <Tooltip placement="bottom">
          <template #title>
            <span>重新加载</span>
          </template>

          <Icon
            class="flex items-center justify-center change text-lg cursor-pointer"
            :class="{ 'animate-spin': isRefresh }"
            @click="handleRefresh()"
            icon="ant-design:reload-outlined"
          />
        </Tooltip>
      </div>
      <Tooltip
        placement="bottom"
        class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center"
      >
        <template #title>
          <span>更多功能</span>
        </template>

        <Dropdown :trigger="['click']" @visibleChange="handleDropdownChange">
          <div>
            <Icon
              class="flex items-center justify-center change text-lg cursor-pointer transition-all transform "
              :class="{ 'rotate-180': isDropdown, 'rotate-0': !isDropdown }"
              icon="ant-design:down-outlined"
            />
          </div>

          <template #overlay>
            <DropdownMenu
              :currentKey="activeKey"
              :activeKey="activeKey"
              :index="getTabIndex(activeKey)"
              :list="tabs"
              @handleDropdown="handleDropdown"
              @handleRefresh="handleRefresh"
            />
          </template>
        </Dropdown>
      </Tooltip>
      <div class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center">
        <Tooltip placement="bottom">
          <template #title>
            <span>{{ isMaximize ? '退出最大化' : '最大化' }}</span>
          </template>

          <Icon
            class="flex items-center justify-center change text-lg cursor-pointer"
            @click="handleMaximize()"
            :icon="isMaximize ? 'ant-design:compress-outlined' : 'ant-design:expand-outlined'"
          />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Key } from 'ant-design-vue/lib/_util/type'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tabs'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { TabEnums } from '../model'
import { onMounted, reactive, ref, watch } from 'vue'
import {
  Tabs,
  TabPane,
  Dropdown,
  Tooltip,
  message
} from 'ant-design-vue'
import DropdownMenu from './DropdownMenu.vue'
import Icon from '@/components/Icon/index.vue'
import { useUserStore } from '@/stores/user'
import { defaultMenus } from '@/menus'
import { getMenuByKey } from '@/menus/utils/helper'
import { routeToKeepalive } from '@/router/utils/helper'

interface ITimeout {
  icon: null | NodeJS.Timeout;
  refresh: null | NodeJS.Timeout;
}

const emit = defineEmits(['toggleMaximize'])

defineProps({
  isMaximize: {
    type: Boolean,
    required: false,
    defaultValue: false
  }
})

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()
const userStore = useUserStore()
const { permissions } = storeToRefs(userStore)
const {
  tabs,
  prevPath,
  activeKey,
  cacheRoutes
} = storeToRefs(tabStore)
const {
  setActiveKey,
  addTabs,
  setNav,
  addPrevPath,
  closeTabs,
  closeOther,
  closeLeft,
  closeRight
} = tabStore
const isRefresh = ref(false) // 是否刷新
const isDropdown = ref(false) // 是否显示下拉菜单
const timeout = reactive<ITimeout>({
  icon: null,
  refresh: null
})

// 首次进入添加标签
onMounted(() => {
  if (permissions.value?.length) {
    handleAddTab()
  }
})

// 监听路由变化添加标签
watch(() => route.path, value => {
  handleAddTab(value)
})

// 监听权限变化添加标签
watch(() => permissions.value, value => {
  handleAddTab()
})

// 监听选中标签
watch(activeKey, value => {
  // 当选中贴标签不等于当前路由则跳转
  if (value !== route.path) {
    router.push(value)
  }
})

/**
 * 添加标签
 * @param path - 路径
 */
const handleAddTab = (path = route.path) => {
  if (permissions.value?.length > 0) {
    if (path === '/') return
    const menuByKeyProps = {
      menus: defaultMenus,
      permissions: permissions.value,
      key: path
    }
    const newItems = getMenuByKey(menuByKeyProps)
    if (newItems?.key) {
      setActiveKey(newItems.key)
      setNav(newItems.nav)
      addTabs(newItems)
    }
  }
}

/**
 * 是否是选中
 * @param key - 唯一值
 */
const isActive = (key: string) => key === activeKey.value

/**
 * 点击标签
 * @param targetKey - 当前选中唯一值
 */
const onChange = (targetKey: Key) => {
  router.push(targetKey as string)
}

/**
 * 移除当前标签页
 * @param targetKey - 当前选中唯一值
 */
const handleRemove = (targetKey: string) => {
  closeTabs(targetKey)
}

/** 获取tabs下标 */
const getTabIndex = (key: string): number => {
  return tabs.value.findIndex(item => item.key === key)
}

/**
 * 刷新当前页
 */
const handleRefresh = (key = activeKey.value) => {
  // 关闭右键菜单显示
  isDropdown.value = false
  // 缓存上一个路径地址
  addPrevPath(route.path)

  // 当timeout没执行时刷新页面
  if (!timeout.icon) {
    isRefresh.value = true
  
    // 去除缓存路由中当前路由
    const cacheRoute = routeToKeepalive(key)
    cacheRoutes.value = cacheRoutes.value.filter(item => item !== cacheRoute)

    // 调转空白页
    router.push('/loading')
  }

  /** 清除timeout */
  const clearRefresh = () => {
    clearTimeout(timeout.refresh!)
    timeout.refresh = null
  }
  const clearIcon = () => {
    clearTimeout(timeout.icon!)
    timeout.icon = null
  }

  // 200毫秒调转回来
  timeout.refresh = setTimeout(() => {
    router.push(prevPath.value)
    clearRefresh()
    message.success({ content: '刷新成功', key: 'refresh' })
  }, 200)
  // icon 1秒后转回来
  timeout.icon = setTimeout(() => {
    isRefresh.value = false
    clearIcon()
  }, 1000)
}

/**
 * 点击右键功能
 * @param type - 右键下拉选中类型
 * @param key - 标签唯一值，可作为路由
 */
const handleDropdown = useDebounceFn((type: TabEnums, key: string) => {
  // 关闭右键菜单显示
  isDropdown.value = false

  switch (type) {
    // 关闭标签
    case TabEnums.CLOSE_CURRENT:
      closeTabs(key)
      break

    // 关闭其他
    case TabEnums.CLOSE_OTHER:
      closeOther(key)
      break

    // 关闭左侧
    case TabEnums.CLOSE_LEFT:
      closeLeft(key)
      break

    // 关闭右侧
    case TabEnums.CLOSE_RIGHT:
      closeRight(key)
      break

    default:
      break
  }
})

/** 处理最大化 */
const handleMaximize = () => {
  emit('toggleMaximize')
}

/**
 * 监听菜单变化
 * @param isVisible - 是否显示
 */
const handleDropdownChange = (isVisible: boolean) => {
  isDropdown.value = isVisible
}

defineExpose({
  TabEnums
})
</script>

<style lang="less" scoped>
.right-item {
  border-left: 1px solid #d9d9d9;
}
</style>