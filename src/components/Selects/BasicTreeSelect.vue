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
import { computed, useAttrs, watch, ref } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

const SHOW_ALL = TreeSelect.SHOW_ALL;

defineOptions({
  name: 'ApiTreeSelect'
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
  componentProps?: BasicTreeSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: BasicTreeSelectProps = useAttrs();
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
 * 处理拼接名称
 * @param list - 列表
 */
const handleSpliceLabel = (data: unknown[]) => {
  const { spliceLabel } = props;
  if (spliceLabel?.length !== 2) return [];

  for (let i = 0; i < data?.length; i++) {
    const item = data[i] as { [key: string]: unknown };
    const value = item[spliceLabel[1]] ? `(${item[spliceLabel[1]]})` : '';
    item.label = `${item[spliceLabel[0]]}${value}`;

    if ((item.children as unknown[])?.length) {
      item.children = handleSpliceLabel(item.children as unknown[]);
    }
  }

  return data;
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

/**
 * 处理值变化
 * @param value - 值
 */
const handleChange = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value);
};
</script>
