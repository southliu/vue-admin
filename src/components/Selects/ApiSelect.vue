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
import type { ApiSelectParam, ApiSelectProps } from '#/form';
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select';
import { onMounted, computed, useAttrs, watch, ref } from 'vue';
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

interface DefineProps extends ApiSelectParam {
  modelValue?: SelectValue;
  value?: SelectValue;
  componentProps?: ApiSelectProps;
  onDropdownVisibleChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<DefineProps>(), {});

const attrs: ApiSelectProps = useAttrs();
const options = ref<DefaultOptionType[]>([]);
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

const optionFilterLabel = computed(() => {
  return props.componentProps?.fieldNames?.label || attrs?.fieldNames?.label || 'label';
});

onMounted(() => {
  // 首次有值获取API接口
  if ((props.value || props.modelValue) && options.value.length === 0) {
    getApiData();
  }
});

watch(() => [props.modelValue, props.value], () => {
  const value = props.modelValue ?? props.value;
  selectValue.value = value !== '' ? value : undefined;

  // 首次有值获取API接口
  if (selectValue.value && options.value?.length === 0) {
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
      result = handleSpliceLabel(result as DefaultOptionType[], props.spliceLabel);
    }

    options.value = (result || []) as DefaultOptionType[];
  } finally {
    isLoading.value = false;
  }
};

/**
 * 处理值变化
 * @param value - 值
 */
const handleChange = (value: SelectValue) => {
  emit('update:modelValue', value);
  emit('update:value', value);
  emit('update', value, options.value);
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
</script>
