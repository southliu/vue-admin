<template>
  <div class="flex flex-col items-center p-30px">
    <Icon
      icon="mdi:archive-cancel-outline"
      class="text-50px text-#b1b1b1"
    />
    <span class="text-#b1b1b1">
      暂无数据
    </span>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'EmptyContent'
});
</script>