<template>
  <Modal
    class="rounded-100px"
    :visible="visible"
    :closable="false"
    @cancel="toggle"
  >
    <Input
      ref="inputRef"
      v-model:value="value"
      placeholder="请输入关键词搜索"
      :allow-clear="true"
      @pressEnter="handleEnter"
    >
      <template #prefix>
        <span
          class="iconify text-lg text-warm-gray-400"
          data-icon="ant-design:search-outlined"
        />
      </template>
    </Input>

    <SearchResult
      :list="resultList"
      :active="active.key"
      @handleMouse="changeActive"
    />

    <template #footer>
      <SearchFooter />
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Modal, Input } from 'ant-design-vue'
import SearchResult from './SearchResult.vue'
import SearchFooter from './SearchFooter.vue'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tabs'
import { useDebounceFn, onKeyStroke } from '@vueuse/core'
import type { IGlobalSearchResult } from './model'

export default defineComponent({
  name: 'SearchModal',
  components: {
    Modal,
    Input,
    SearchResult,
    SearchFooter
  },
  setup() {
    const router = useRouter()
    const tabStore = useTabStore()
    const inputRef = ref()
    const visible = ref(false)
    const value = ref('')
    let active = ref<IGlobalSearchResult>({ title: '用户管理', key: '/system/user', index: 0 })
    const resultList = ref<IGlobalSearchResult[]>([
      { title: '用户管理', key: '/system/user', index: 0 },
      { title: '角色管理', key: '/system/role', index: 1 },
      { title: '菜单管理', key: '/system/menu', index: 2 },
    ])

    // 初始化聚焦input框
    onMounted(() => {
      inputRef.value?.focus()
    })

    /** 开关切换 */
    const toggle = () => {
      visible.value = !visible.value
    }

    /** 处理回车事件 */
    const handleEnter = () => {
      if (active.value.key) {
        const { title, key } = active.value
        router.push(key)
        tabStore.addTabs({ title, key })
        toggle()
      }
    }

    /** 处理鼠标上键 */
    const handleUp = () => {
      // 如果列表值为空直接退出
      if (!visible.value) return
      const value = resultList.value
      const index = active.value.index as number - 1
      if (!value[index]) return
      const { key, title } = value[index]
      active.value = { key, title, index }
    }

    /** 处理鼠标下键 */
    const handleKeydown = () => {
      // 如果列表值为空直接退出
      if (!visible.value) return
      const value = resultList.value
      const index = active.value.index as number + 1
      if (!value[index]) return
      const { key, title } = value[index]
      active.value = { key, title, index }
    }

    /** 更改active值 */
    const changeActive = (item: IGlobalSearchResult) => {
      const { key, title, index } = item
      active.value = { index, key, title }
    }

    /**
     * 处理搜索
     * @param value 搜索值
     */
    const handleSearch = (value: string) => {
      console.log('value:', value)
    }

    // 监听变化
    watch(value, useDebounceFn(value => {
      handleSearch(value)
    }))

    // 键盘事件
    onKeyStroke('Escape', toggle);
    onKeyStroke('Enter', handleEnter);
    onKeyStroke('ArrowUp', handleUp);
    onKeyStroke('ArrowDown', handleKeydown);

    return {
      inputRef,
      visible,
      value,
      active,
      resultList,
      toggle,
      changeActive,
      handleEnter,
      handleKeydown
    }
  }
})
</script>
