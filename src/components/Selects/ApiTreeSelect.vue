<template>
  <TreeSelect
      v-model="selectValue"
      allowClear
      :maxTagCount="MAX_TAG_COUNT"
      :placeholder="PLEASE_SELECT"
      treeNodeFilterProp="label"
      :showSearch="true"
      :showCheckedStrategy="SHOW_ALL"
      v-bind="{ ...attrs, ...componentProps }"
      :treeData="options"
      @update:value="handleUpdateValue"
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
import type { ApiFun, ApiTreeSelectProps } from '#/form';
import type { TreeSelectProps } from 'ant-design-vue';
import type { SelectValue } from 'ant-design-vue/lib/select';
import type { DefaultOptionType } from 'ant-design-vue/es/select';
import { onMounted, useAttrs, watch, ref } from 'vue';
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
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  modelValue?: SelectValue;
  value?: SelectValue;
  params?: object;
  apiResultKey?: string; // 接口返回值的key值，枚举接口特殊处理
  componentProps?: ApiTreeSelectProps;
  api: ApiFun;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs = useAttrs();
const options = ref<TreeSelectProps['treeData']>([]);
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

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

/** 获取接口数据 */
const getApiData = async () => {
  if (!props.api) return;
  try {
    const { api, params, apiResultKey } = props;
    isLoading.value = true;
    const { code, data } = await api(params);
    if (Number(code) !== 200) return;
    const result = apiResultKey ? (data as { [apiResultKey: string]: unknown })?.[apiResultKey] : data;
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
const handleUpdateValue = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
};
</script>
