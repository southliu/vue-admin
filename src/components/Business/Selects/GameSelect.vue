<template>
  <ApiTreeSelect
    multiple
    :api="getGames"
    :fieldNames="{ label: 'name', value: 'id' }"
    @update="handleUpdate"
  />
</template>

<script lang="ts" setup>
/**
 * @description: 游戏下拉组件
 */
import type { AllDataType } from '#/public';
import { getGames } from '@/servers/platform/game';
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue';

defineOptions({
  name: 'GameSelect'
});

const emit = defineEmits(['update:value']);

/**
 * 处理更改
 * @param value - 值
 */
const handleUpdate = (value: AllDataType) => {
  emit('update:value', value);
};
</script>
