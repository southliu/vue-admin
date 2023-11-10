<template>
  <Select
    allowClear
    showSearch
    :maxTagCount="MAX_TAG_COUNT"
    :placeholder="PLEASE_SELECT"
    :optionFilterProp="optionFilterLabel"
    :value="selectValue"
    v-bind="{ ...attrs, ...componentProps }"
    @update:value="handleUpdateValue"
    @dropdownVisibleChange="handleDropdownVisibleChange"
  >
    <template v-if="isLoading" #notFoundContent>
      <BasicLoading />
    </template>
  </Select>
</template>

<script lang="ts" setup>
/**
 * @description: 根据API获取数据下拉组件
 */
import type { BasicSelectParam, BasicSelectProps } from '#/form';
import type { SelectValue } from 'ant-design-vue/lib/select';
import { computed, useAttrs, watch, ref } from 'vue';
import { Select } from 'ant-design-vue';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

defineOptions({
  name: 'ApiSelect'
});

interface DefineEmits {
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:value', value: SelectValue): void;
  (e: 'update', value: SelectValue): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps extends BasicSelectParam {
  modelValue?: SelectValue;
  value?: SelectValue;
  componentProps?: BasicSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: BasicSelectProps = useAttrs();
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

watch(() => props.value, value => {
  selectValue.value = value;
});

watch(() => props.modelValue, value => {
  selectValue.value = value;
});

/**
 * 处理值变化
 * @param value - 值
 */
const handleUpdateValue = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value);
};

/**
 * 处理下拉显示
 * @param open - 开关
 */
const handleDropdownVisibleChange = async (open: boolean) => {
  if (props?.onDropdownVisibleChange) {
    props.onDropdownVisibleChange?.(open);
  }
};
</script>
