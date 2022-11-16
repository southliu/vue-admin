<template>
  <Tooltip>
    <template #title>搜索</template>
    <Icon
      class="flex items-center justify-center text-lg mr-3"
      icon="uil-search"
      @click="toggle"
    />
  </Tooltip>

  <SearchModal
    v-if="isVisible"
    :isVisible="isVisible"
    @toggle="toggle"
  />
</template>

<script lang="ts" setup>
/**
 * @description: 顶部全局搜索菜单组件
 */
import { ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import SearchModal from './components/SearchModal.vue'
import Icon from '@/components/Icon/index.vue'

const isVisible = ref(false)

/** 切换搜索框显示状态 */
const toggle = () => {
  isVisible.value = !isVisible.value
}
</script>