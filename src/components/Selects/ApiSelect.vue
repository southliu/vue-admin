<template>
  <Select
    :allowClear="true"
    :maxTagCount="MAX_TAG_COUNT"
    :placeholder="PLEASE_SELECT"
    optionFilterProp="label"
    :value="selectValue"
    v-bind="{ ...attrs, ...componentProps }"
    :options="options"
    @update:value="handleUpdateValue"
    @dropdownVisibleChange="handleDropdownVisibleChange"
  >
    <template v-if="isLoading" #notFoundContent>
      <span>
        <BasicLoading />
      </span>
    </template>
  </Select>
</template>

<script lang="ts" setup>
/**
 * @description: 根据API获取数据下拉组件
 */
import type { PropType } from 'vue';
import type { ApiFun, ApiSelectProps } from '#/form';
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select';
import { onMounted, useAttrs, watch, ref } from 'vue';
import { Select } from 'ant-design-vue';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

defineOptions({
  name: 'ApiSelect'
});

const emit = defineEmits(['update:modelValue', 'update:value']);

const props = defineProps({
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue>,
    required: false
  },
  value: {
    type: [String, Number, Array] as PropType<SelectValue>,
    required: false
  },
  componentProps: {
    type: Object as PropType<ApiSelectProps>,
    required: false
  },
  api: {
    type: Function as PropType<ApiFun>,
    required: true
  },
  params: {
    type: Object,
    required: false
  },
  onDropdownVisibleChange: {
    type: Function as PropType<(open: boolean) => void>,
    required: false
  }
});

const attrs = useAttrs();
const options = ref<DefaultOptionType[]>([]);
const selectValue = ref(props.value || props.modelValue);
const isLoading = ref(false);

onMounted(() => {
  // 首次有值获取API接口
  if ((props.value || props.modelValue) && options.value.length === 0) {
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
    isLoading.value = true;
    const { code, data } = await props.api(props?.params);
    if (Number(code) !== 200) return;
    options.value = (data || []) as DefaultOptionType[];
  } finally {
    isLoading.value = false;
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
