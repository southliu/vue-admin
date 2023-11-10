<template>
  <Tooltip placement="bottom">
    <template #title>{{ !isFullscreen ? '全屏' : '退出全屏' }}</template>
    <div
      class="flex items-center justify-center text-lg mr-10px cursor-pointer"
      @click="toggle"
    >
      <Icon icon="gridicons-fullscreen-exit" v-if="isFullscreen" />
      <Icon icon="gridicons-fullscreen" v-else />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
/**
 * @description: 全屏组件
 */
import { useFullscreen } from '@vueuse/core';
import { Tooltip } from 'ant-design-vue';
import { Icon } from '@iconify/vue';

const { isFullscreen, toggle } = useFullscreen();
</script>
