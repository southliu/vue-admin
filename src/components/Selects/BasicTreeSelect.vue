<template>
  <TreeSelect
    v-model:value="selectValue"
    allowClear
    showSearch
    :maxTagCount="MAX_TAG_COUNT"
    :placeholder="PLEASE_SELECT"
    :treeNodeFilterProp="optionFilterLabel"
    :showCheckedStrategy="SHOW_ALL"
    v-bind="{ ...attrs, ...componentProps }"
    :treeData="treeData"
    @change="handleChange"
    @dropdownVisibleChange="handleDropdownVisibleChange"
  >
    <template v-if="isLoading" #notFoundContent>
      <BasicLoading />
    </template>
  </TreeSelect>
</template>

<script lang="ts" setup>
/**
 * @description: 根据API获取数据树形下拉组件
 */
import type { BasicSelectParam, BasicTreeSelectProps } from '#/form';
import type { SelectValue } from 'ant-design-vue/lib/select';
import type { TreeSelectProps } from 'ant-design-vue/es/vc-tree-select/TreeSelect';
import { computed, useAttrs, watch, ref } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import { handleSpliceTreeLabel } from './utils/helper';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

const SHOW_ALL = TreeSelect.SHOW_ALL;

defineOptions({
  name: 'ApiTreeSelect'
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
  componentProps?: BasicTreeSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: BasicTreeSelectProps = useAttrs();
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);
const treeData = ref<TreeSelectProps['treeData']>(attrs.treeData || props.componentProps?.treeData || []);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

watch(() => [props.modelValue, props.value], () => {
  const value = props.modelValue ?? props.value;
  selectValue.value = value !== '' ? value : undefined;
});

watch(() => [
  props.spliceLabel,
  props.componentProps?.treeData,
  attrs?.treeData
], () => {
  if (attrs.treeData) {
    treeData.value = attrs.treeData || [];
  }
  if (props.componentProps?.treeData) {
    treeData.value = props.componentProps?.treeData || [];
  }

  if (props.spliceLabel?.length === 2 && props.componentProps?.treeData?.length) {
    treeData.value = handleSpliceTreeLabel(props.componentProps.treeData, props.spliceLabel);
    return;
  }
  if (props.spliceLabel?.length === 2 && attrs?.treeData?.length) {
    treeData.value = handleSpliceTreeLabel(attrs.treeData, props.spliceLabel);
  }
});

/**
 * 处理下拉显示
 * @param open - 开关
 */
const handleDropdownVisibleChange = async (open: boolean) => {
  if (props?.onDropdownVisibleChange) {
    props.onDropdownVisibleChange?.(open);
  }
};

/**
 * 处理值变化
 * @param value - 值
 */
const handleChange = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value, treeData.value as unknown[]);
};
</script>
