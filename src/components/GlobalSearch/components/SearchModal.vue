<template>
  <Modal
    class="rounded-100px"
    :visible="isVisible"
    :closable="false"
    @cancel="toggle"
  >
    <Input
      ref="inputRef"
      v-model:value="inputValue"
      placeholder="请输入关键词搜索"
      :allowClear="true"
      @pressEnter="onPressEnter"
    >
      <template #prefix>
        <Icon
          class="text-lg text-warm-gray-400"
          icon="ant-design:search-outlined"
        />
      </template>
    </Input>

    <SearchResult
      :list="resultList"
      :active="active"
      @handleClick="onPressEnter"
      @handleMouse="onChange"
    />

    <template #footer>
      <SearchFooter />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { IGlobalSearchResult } from '../model'
import type { ISideMenu } from '#/public'
import { defineEmits, onMounted, ref } from 'vue'
import { Modal, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useDebounceFn, onKeyStroke } from '@vueuse/core'
import { defaultMenus } from '@/menus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import {
  getMenuByKey,
  getOpenMenuByRouter,
  searchMenuValue
} from '@/menus/utils/helper'
import SearchResult from './SearchResult.vue'
import SearchFooter from './SearchFooter.vue'
import Icon from '@/components/Icon/index.vue'

const emit = defineEmits(['toggle'])

const router = useRouter()
const tabStore = useTabStore()
const userStore = useUserStore()
const menuStore = useMenuStore()
const { permissions } = storeToRefs(userStore)
const inputRef = ref()
const inputValue = ref('')
const resultList = ref<IGlobalSearchResult[]>([])
const isVisible = ref(false)
const active = ref('')
const list = ref<ISideMenu[]>([])
const { setOpenKey } = menuStore
const {
  setActiveKey,
  addCacheRoutes,
  addTabs
} = tabStore

// 初始化聚焦input框
onMounted(() => {
  inputRef.value?.focus()
})

/** 开关切换 */
const toggle = () => {
  emit('toggle')
}

/** 关闭模态框 */
const onClose = () => {
  isVisible.value = false
}

/** 处理回车事件 */
const onPressEnter = () => {
  if (active.value) {
    router.push(active.value)
    // 添加标签
    const menuByKeyProps = {
      menus: defaultMenus,
      permissions: permissions.value,
      key: active.value
    }
    const newTab = getMenuByKey(menuByKeyProps)
    if (newTab) {
      addTabs(newTab)
      setActiveKey(active.value)
      addCacheRoutes(active.value)
      // 处理菜单展开
      const openKey = getOpenMenuByRouter(active.value)
      setOpenKey(openKey)
      // 关闭
      onClose()
    }
  }
}

/** 处理鼠标上键 */
const onArrowUp = () => {
  // 列表为空则退出
  if (!list.value.length) return null
  const index = list.value.findIndex(item => item.key === active.value)
  // 最上层则不操作
  if (index === 0) return null
  const newActive = list.value[index - 1].key
  active.value = newActive
}

/** 处理鼠标下键 */
const onArrowDown = () => {
  // 列表为空则退出
  if (!list.value.length) return null
  const len = list.value.length - 1
  const index = list.value.findIndex(item => item.key === active.value)
  // 最下层则不操作
  if (index === len) return null
  const newActive = list.value[index + 1].key
  active.value = newActive
}

/**
 * 防抖处理搜索结果
 * @param value - 搜索值
 */
const debounceSearch = useDebounceFn((value: string) => {
  const searchProps = {
    menus: defaultMenus,
    permissions: permissions.value,
    value
  }
  const searchValue = searchMenuValue(searchProps)
  if (searchValue?.length) {
    active.value = (searchValue as ISideMenu[])?.[0]?.key || ''
    list.value = searchValue as ISideMenu[]
  } else {
    active.value = ''
    list.value = []
  }
}, 200)

/**
 * 更改active值
 * @param value - active值
 */
const onChange = (value: string) => {
  inputValue.value = value
  debounceSearch(value)
}

// 键盘事件
onKeyStroke('Escape', toggle)
onKeyStroke('Enter', onPressEnter)
onKeyStroke('ArrowUp', onArrowUp)
onKeyStroke('ArrowDown', onArrowDown)
</script>
