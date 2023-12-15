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
        class="text-14px"
        :class="{
          'opacity-60': index < list.length - 1
        }"
      >
        {{ item }}
      </span>
      <span
        v-if="index < list.length - 1"
        class="px-3px text-#8b8b8b"
      >
        /
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const { isPhone } = storeToRefs(menuStore);

interface DefineProps {
  list: string[];
}

withDefaults(defineProps<DefineProps>(), {});
</script>
