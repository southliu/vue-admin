<template>
  <ApiTreeSelect
    multiple
    :api="getPartner"
    :fieldNames="{ label: 'name', value: 'id' }"
    @update="handleUpdate"
  />
</template>

<script lang="ts" setup>
/**
 * @description: 合作公司下拉组件
 */
import type { SelectValue } from 'ant-design-vue/es/select';
import { getPartner } from '@/servers/platform/partner';
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue';

defineOptions({
  name: 'PartnerSelect'
});

interface DefineEmits {
  (e: 'update:value', value: SelectValue): void;
}

const emit = defineEmits<DefineEmits>();

/**
 * 处理更改
 * @param value - 值
 */
const handleUpdate = (value: SelectValue) => {
  emit('update:value', value);
};
</script>
