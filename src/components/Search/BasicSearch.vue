<template>
  <BasicCard
    v-if="!!list?.length"
    id="searches"
    :isMarginBottom="!!list?.length"
  >
    <Form
      ref="formRef"
      labelAlign="left"
      scrollToFirstError
      layout="inline"
      :model="formState"
      :wrapperCol="{...wrapperCol}"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        v-for="item in list"
        :key="`${item.name}`"
        :name="handleFilterTrim(item.name)"
        :label="item.label"
        :rules="item.rules"
        :labelCol="handleLabelCol(item.labelCol)"
        :wrapperCol="handleWrapperCol(item.wrapperCol)"
      >
        <BasicComponents
          v-if="item.component !== 'slot'"
          class="min-w-100px"
          :item="item"
          :data="formState"
          :setData="setFromState"
          @pressEnter="onFinish"
        />

        <slot v-else :name="item.name" />
      </FormItem>

      <template v-if="isSearch && list?.length">
        <Button
          type="primary"
          htmlType="submit"
          class="btn-space"
          :loading="isLoading"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          <span>{{ searchText }}</span>
        </Button>
      </template>

      <template v-if="isClear && list?.length">
        <Button
          v-if="isClear"
          class="btn-space"
          :loading="isLoading"
          @click="onClear"
        >
          <template #icon>
            <ClearOutlined />
          </template>
          <span>{{ clearText }}</span>
        </Button>
      </template>

      <slot name="other"></slot>
    </Form>
  </BasicCard>
</template>

<script lang="ts" setup>
/**
 * @description: 搜索组件
 */
import type { FormInstance } from 'ant-design-vue';
import type { FormData, FormList } from '#/form';
import type { ColProps } from 'ant-design-vue';
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
import { watch, ref } from 'vue';
import { Form, FormItem, Button } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import { filterEmptyValue, handleFilterTrim } from '@/utils/helper';
import { handleLabelCol, handleWrapperCol } from './utils/helper';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import BasicComponents from '../Form/BasicComponents.vue';
import BasicCard from '../Card/BasicCard.vue';

type FinishFun = (values: FormData) => void

interface DefineEmits {
  (e: 'handleFinish', params: FormData): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  data: FormData;
  list: FormList[];
  wrapperCol?: Partial<ColProps>;
  isLoading?: boolean;
  isSearch?: boolean;
  isClear?: boolean;
  initSearch?: FormData; // 初始化搜索
  searchText?: string; // 搜索文本
  clearText?: string; // 清除文本
}

const props = withDefaults(defineProps<DefineProps>(), {
  isSearch: true,
  isClear: true,
  clearText: '清除',
  searchText: '搜索',
});

const formRef = ref<FormInstance>();
const formState = ref(props.data);

// 监听表单数据变化
watch(() => props.data, value => {
  formState.value = value;
});

/** 外部调内部提交方法 */
const handleSubmit = useDebounceFn(() => {
  formRef.value
    ?.validateFields()
    .then(values => {
      const params = filterEmptyValue(values);
      emit('handleFinish', params);
    })
    .catch(info => {
      console.error('错误信息:', info);
    });
});

/** 外部调内部重置方法 */
const handleReset = () => {
  formRef.value?.resetFields();
};

/**
 * 处理嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 * @param value - 修改值
 */
const deepNested = (arr: string[], obj: Record<string, unknown>, value: unknown) => {
  const key = arr.shift()?.trim();
  if (!obj) obj = {};
  if (key) {
    if (!obj[key]) obj[key] = {};
    if (arr.length) {
      obj[key] = deepNested(arr, obj[key] as Record<string, unknown>, value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
};

/**
 * 修改formState值
 * @param key - 键值
 * @param value - 修改值
 */
const setFromState = (key: string | string[], value: unknown) => {
  if (Array.isArray(key)) {
    const arr = JSON.parse(JSON.stringify(key));
    deepNested(arr, formState.value, value);
  } else {
    formState.value[key?.trim()] = value;
  }
};

/** 点击清除 */
const onClear = () => {
  const value = props.initSearch ? { ...props.initSearch } : {};
  emit('handleFinish', value);
};

/**
 * 提交处理
 * @param values - 表单数据
 */
const onFinish: FinishFun = useDebounceFn(values => {
  const params = filterEmptyValue(values);
  emit('handleFinish', params);
});

/**
 * 错误处理
 * @param errorInfo - 错误信息
 */
const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
  console.error('错误信息:', errorInfo);
};

defineExpose({
  handleSubmit,
  handleReset
});
</script>

<style>
#searches .ant-form-inline .ant-form-item {
  padding-bottom: 4px !important;
}

@media (max-width: 575px) {
  #searches .ant-form-item .ant-form-item-label > label {
    margin-right: 5px !important;
  }
}
</style>