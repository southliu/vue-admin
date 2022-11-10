<template>
  <div class="flex items-center">
    <span
      v-for="(item, index) in list"
      :key="index"
      class="whitespace-nowrap"
    >
      <span
        class="#000000d9 text-14px"
        :class="{ '!text-#00000073': index < list.length - 1 }"
      >
        {{ item }}
      </span>
      <span
        v-if="index < list.length - 1"
        class="px-3px"
      >
        /
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  list: {
    type: Array as PropType<string[]>,
    required: true
  }
})
</script>
