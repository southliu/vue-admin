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
import type { ApiSelectParam, ApiTreeSelectProps } from '#/form';
import type { TreeSelectProps } from 'ant-design-vue';
import type { SelectValue, DefaultOptionType } from 'ant-design-vue/es/select';
import { onMounted, computed, useAttrs, watch, ref } from 'vue';
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

interface DefineProps extends ApiSelectParam {
  modelValue?: SelectValue;
  value?: SelectValue;
  componentProps?: ApiTreeSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: ApiTreeSelectProps = useAttrs();
const treeData = ref<TreeSelectProps['treeData']>([]);
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

onMounted(() => {
  // 首次有值获取API接口
  if ((props.value || props.modelValue) && treeData.value?.length === 0) {
    getApiData();
  }
});

watch(() => [props.modelValue, props.value], () => {
  const value = props.modelValue ?? props.value;
  selectValue.value = value !== '' ? value : undefined;

  // 首次有值获取API接口
  if ((selectValue.value) && treeData.value?.length === 0) {
    getApiData();
  }
});

/** 获取接口数据 */
const getApiData = async () => {
  if (!props.api) return;
  try {
    const { api, params, apiResultKey } = props;
    isLoading.value = true;
    const { code, data } = await api(params);
    if (Number(code) !== 200) return;
    let result = apiResultKey ? (data as { [apiResultKey: string]: unknown })?.[apiResultKey] : data;

    // 如果存在拼接数据
    if (props.spliceLabel?.length) {
      result = handleSpliceTreeLabel(result as DefaultOptionType[], props.spliceLabel);
    }

    treeData.value = (result || []) as DefaultOptionType[];
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
  emit('update', value, treeData.value as unknown[]);
};
</script>
