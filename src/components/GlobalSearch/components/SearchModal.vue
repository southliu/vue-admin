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
      @handleClick="handleEnter"
      @handleMouse="changeActive"
    />

    <template #footer>
      <SearchFooter />
    </template>
  </Modal>
</template>

<script lang="ts">
import type { IGlobalSearchResult } from '../model'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Modal, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useDebounceFn, onKeyStroke } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import SearchResult from './SearchResult.vue'
import SearchFooter from './SearchFooter.vue'
import Icon from '@/components/Icon/index.vue';

export default defineComponent({
  name: 'SearchModal',
  emits: ['toggle'],
  components: {
    Modal,
    Input,
    Icon,
    SearchResult,
    SearchFooter
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    const tabStore = useTabStore()
    const menuStore = useMenuStore()
    const { menuArr } = storeToRefs(menuStore)
    const inputRef = ref()
    const value = ref('')
    const resultList = ref<IGlobalSearchResult[]>([])
    let active = ref<IGlobalSearchResult>({
      title: '',
      key: '',
      path: '',
      index: 0
    })

    // 初始化聚焦input框
    onMounted(() => {
      inputRef.value?.focus()
    })

    /** 开关切换 */
    const toggle = () => {
      emit('toggle')
    }

    /** 处理回车事件 */
    const handleEnter = () => {
      if (active.value.key) {
        const { title, key, path } = active.value
        router.push(path)
        tabStore.addTabs({ title, key, path })
        toggle()
      }
    }

    /** 处理鼠标上键 */
    const handleUp = () => {
      // 如果列表值为空直接退出
      if (!props.visible) return
      const value = resultList.value
      const index = active.value.index as number - 1
      if (!value[index]) return
      const { key, title, path } = value[index]
      active.value = { key, path, title, index }
    }

    /** 处理鼠标下键 */
    const handleKeydown = () => {
      // 如果列表值为空直接退出
      if (!props.visible) return
      const value = resultList.value
      const index = active.value.index as number + 1
      if (!value[index]) return
      const { key, title, path } = value[index]
      active.value = { key, path, title, index }
    }

    /**
     * 更改active值
     * @param item - active值
     */
    const changeActive = (item: IGlobalSearchResult) => {
      const { key, title, path, index } = item
      active.value = { index, key, title, path }
    }

    /**
     * 处理搜索
     * @param value - 搜索值
     */
    const handleSearch = (value: string) => {
      if (!value) return []
      let result: IGlobalSearchResult[] = [], index = 0
      for (let i = 0; i < menuArr.value.length; i++) {
        const { title, key, path } = menuArr.value[i];
        if (title.includes(value)) {
          result.push({ title, key, path, index }) 
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
