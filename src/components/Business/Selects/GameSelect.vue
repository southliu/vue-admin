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
import { getGames } from '@/servers/platform/game';
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue';

defineOptions({
  name: 'GameSelect'
});

interface DefineEmits {
  (e: 'update:value', value: FormData): void;
}

const emit = defineEmits<DefineEmits>();

/**
 * 处理更改
 * @param value - 值
 */
const handleUpdate = (value: FormData) => {
  emit('update:value', value);
};
</script>
