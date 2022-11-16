<template>
  <div
    v-if="!isPhone"
    class="flex items-center"
  >
    <span
      v-for="(item, index) in list"
      :key="index"
      class="whitespace-nowrap"
    >
      <span
        class="#000000d9 text-14px"
        :class="{
          'opacity-60': index < list.length - 1
        }"
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
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const { isPhone } = storeToRefs(menuStore)

defineProps({
  list: {
    type: Array as PropType<string[]>,
    required: true
  }
})
</script>
