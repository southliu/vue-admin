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
        <Icon
          class="text-lg text-warm-gray-400"
          icon="ant-design:search-outlined"
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
import { useMenuStore } from '@/stores/menu'
import { useDebounceFn, onKeyStroke } from '@vueuse/core'
import type { IGlobalSearchResult } from './model'
import { storeToRefs } from 'pinia'
import Icon from '@/components/Icon/index.vue';

export default defineComponent({
  name: 'SearchModal',
  components: {
    Modal,
    Input,
    Icon,
    SearchResult,
    SearchFooter
  },
  setup() {
    const router = useRouter()
    const tabStore = useTabStore()
    const menuStore = useMenuStore()
    const { menuArr } = storeToRefs(menuStore)
    const inputRef = ref()
    const visible = ref(false)
    const value = ref('')
    let active = ref<IGlobalSearchResult>({ title: '', key: '', index: 0 })
    const resultList = ref<IGlobalSearchResult[]>([])

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

    /**
     * 更改active值
     * @param item - active值
     */
    const changeActive = (item: IGlobalSearchResult) => {
      const { key, title, index } = item
      active.value = { index, key, title }
    }

    /**
     * 处理搜索
     * @param value - 搜索值
     */
    const handleSearch = (value: string) => {
      let result: IGlobalSearchResult[] = [], index = 0
      for (let i = 0; i < menuArr.value.length; i++) {
        const { title, key } = menuArr.value[i];
        if (title.includes(value)) {
          result.push({ title, key, index }) 
          ++index
        }
      }
      return result
    }

    // 监听变化
    watch(value, useDebounceFn(value => {
      const list = handleSearch(value)
      if (list?.length > 0) {
        resultList.value = list
        active.value = list[0]
      }
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
