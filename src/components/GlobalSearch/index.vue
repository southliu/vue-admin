<template>
  <Tooltip placement="bottom">
    <template #title>搜索</template>
    <Icon
      class="flex items-center justify-center text-lg mr-10px"
      icon="uil-search"
      @click="toggle"
    />
  </Tooltip>

  <SearchModal
    v-if="isOpen"
    :isOpen="isOpen"
    @toggle="toggle"
  />
</template>

<script lang="ts" setup>
/**
 * @description: 顶部全局搜索菜单组件
 */
import { ref } from 'vue';
import { Tooltip } from 'ant-design-vue';
import SearchModal from './components/SearchModal.vue';
import { Icon } from '@iconify/vue';

const isOpen = ref(false);

/** 切换搜索框显示状态 */
const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>