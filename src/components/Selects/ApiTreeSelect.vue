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
      :treeData="options"
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
import type { ApiSelectParam, ApiTreeSelectProps } from '#/form';
import type { TreeSelectProps } from 'ant-design-vue';
import type { SelectValue, DefaultOptionType } from 'ant-design-vue/es/select';
import { onMounted, computed, useAttrs, watch, ref } from 'vue';
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
  (e: 'update', value: SelectValue, list: unknown[]): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps extends ApiSelectParam {
  modelValue?: SelectValue;
  value?: SelectValue;
  componentProps?: ApiTreeSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: ApiTreeSelectProps = useAttrs();
const options = ref<TreeSelectProps['treeData']>([]);
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

onMounted(() => {
  // 首次有值获取API接口
  if ((props.value || props.modelValue) && options.value?.length === 0) {
    getApiData();
  }
});

watch(() => props.value, value => {
  selectValue.value = value;

  // 首次有值获取API接口
  if (value && options.value?.length === 0) {
    getApiData();
  }
});

watch(() => props.modelValue, value => {
  selectValue.value = value;

  // 首次有值获取API接口
  if (value && options.value?.length === 0) {
    getApiData();
  }
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

/** 获取接口数据 */
const getApiData = async () => {
  if (!props.api) return;
  try {
    const { api, params, apiResultKey } = props;
    isLoading.value = true;
    const { code, data } = await api(params);
    if (Number(code) !== 200) return;
    const result = apiResultKey ? (data as { [apiResultKey: string]: unknown })?.[apiResultKey] : data;

    // 如果存在拼接数据
    if (props.spliceLabel?.length) {
      handleSpliceLabel(result as unknown[]);
    }

    options.value = (result || []) as DefaultOptionType[];
  } finally {
    isLoading.value = false;
  }
};

/**
 * 处理下拉显示
 * @param open - 开关
 */
const handleDropdownVisibleChange = async (open: boolean) => {
  if (props?.onDropdownVisibleChange) {
    props.onDropdownVisibleChange?.(open);
  } else if (open) {
    getApiData();
  }
};

/**
 * 处理值变化
 * @param value - 值
 */
const handleChange = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value, options.value as unknown[]);
};
</script>
