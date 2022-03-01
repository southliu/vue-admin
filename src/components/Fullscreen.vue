<template>
  <a-tooltip>
    <template #title>{{ !isFullscreen ? '全屏' : '退出全屏' }}</template>
    <div class="text-lg mr-4 cursor-pointer" @click="toggle">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useFullscreen } from '@vueuse/core';
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  setup() {
    const el = ref<HTMLElement | null>(null)
    const { isFullscreen, toggle } = useFullscreen(el)

    return {
      isFullscreen,
      toggle
    }
  }
})
</script>
