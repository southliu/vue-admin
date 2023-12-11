<template>
  <Select
    v-model:value="selectValue"
    allowClear
    showSearch
    :maxTagCount="MAX_TAG_COUNT"
    :placeholder="PLEASE_SELECT"
    :optionFilterProp="optionFilterLabel"
    v-bind="{ ...attrs, ...componentProps }"
    :options="options"
    @change="handleChange"
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
import type { SelectValue, SelectProps } from 'ant-design-vue/lib/select';
import { computed, useAttrs, watch, ref } from 'vue';
import { Select } from 'ant-design-vue';
import { handleSpliceLabel } from './utils/helper';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

defineOptions({
  name: 'ApiSelect'
});

interface DefineEmits {
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:value', value: SelectValue): void;
  (e: 'update', value: SelectValue, list: unknown[]): void;
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
const options = ref<SelectProps['options']>(attrs.options || props.componentProps?.options || []);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

watch(() => [props.modelValue, props.value], () => {
  const value = props.modelValue ?? props.value;
  selectValue.value = value !== '' ? value : undefined;
});

watch(() => [
  props.spliceLabel,
  props.componentProps?.options,
  attrs?.options
], () => {
  if (attrs.options) {
    options.value = attrs.options || [];
  }
  if (props.componentProps?.options) {
    options.value = props.componentProps?.options || [];
  }

  if (props.spliceLabel?.length === 2 && props.componentProps?.options?.length) {
    options.value = handleSpliceLabel(props.componentProps.options, props.spliceLabel);
    return;
  }
  if (props.spliceLabel?.length === 2 && attrs?.options?.length) {
    options.value = handleSpliceLabel(attrs.options, props.spliceLabel);
  }
});

/**
 * 处理值变化
 * @param value - 值
 */
const handleChange = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value, options.value as unknown[]);
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
