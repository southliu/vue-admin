<template>
  <Tooltip>
    <template #title>{{ !isFullscreen ? '全屏' : '退出全屏' }}</template>
    <div class="text-lg mr-4 cursor-pointer" @click="toggle">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
/**
 * @description: 全屏组件
 */
import { useFullscreen } from '@vueuse/core'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'

const { isFullscreen, toggle } = useFullscreen()
</script>
