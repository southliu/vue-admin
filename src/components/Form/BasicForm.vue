<template>
  <div>
    <Form
      ref="formRef"
      scrollToFirstError
      :layout="layout"
      :model="formState"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :labelAlign="labelAlign"
      :validateMessages="validateMessages"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        v-for="item in list"
        v-bind="(item as FormItemProps)"
        :key="`${item.name}`"
        :name="handleFilterTrim(item.name)"
        :label="item.label"
        :rules="!item.hidden ? item.rules : []"
        :class="{ '!hidden': item.hidden }"
      >
        <BasicComponents
          v-if="item.component !== 'slot'"
          :item="item"
          v-model:data="formState"
          :setData="setFromState"
          @pressEnter="onFinish"
        />

        <slot v-else :name="item.name" />
      </FormItem>

      <slot name="otherBtn"></slot>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemProps, FormProps } from 'ant-design-vue';
import type { FormData, FormList } from '#/form';
import { ref, watch } from 'vue';
import { Form, FormItem } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import { filterEmptyValue, handleFilterTrim } from '@/utils/helper';
import BasicComponents from './BasicComponents.vue';

interface DefineEmits {
  (e: 'handleFinish', params: FormData): void;
}
 
const emit = defineEmits<DefineEmits>();

interface DefineProps extends FormProps {
  isLoading?: boolean;
  data: FormData;
  list: FormList[];
  layout?: 'inline' | 'horizontal';
  labelCol?: Partial<FormProps['labelCol']>;
  wrapperCol?: Partial<FormProps['wrapperCol']>;
  labelAlign?: 'left' | 'right',
}

const props = withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  layout: 'horizontal',
  labelAlign: 'right',
  labelCol: () => ({ span: 5 }),
  wrapperCol: () => ({ span: 16 }),
});

const formRef = ref<FormInstance>();
const formState = ref<FormData>(props.data);

const validateMessages = {
  required: '${label}为必填项！',
  types: {
    email: '${label}不是邮箱格式！',
    number: '${label}不是数字格式！',
  },
  number: {
    range: '${label}必须大于${min}且小于${max}',
  },
};

// 监听表单数据变化
watch(() => props.data, value => {
  formState.value = value;
  // 清除表单验证结果
  formRef.value?.clearValidate();
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
  formRef.value?.clearValidate();
};

/** 外部调用校验方法 */
const handleValidate = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      ?.validateFields()
      .then(values => {
        resolve(true);
      })
      .catch(info => {
        console.error('错误信息:', info);
        reject(false);
      });
  });
};

/**
 * 处理嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 * @param value - 修改值
 */
const deepNested = (arr: string[], obj: FormData, value: unknown) => {
  const key = arr.shift()?.trim();
  if (!obj) obj = {};
  if (key) {
    if (!obj[key]) obj[key] = {};
    if (arr.length) {
      obj[key] = deepNested(arr, obj[key] as FormData, value);
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

/**
 * 提交处理
 * @param values - 表单数据
 */
const onFinish: FormProps['onFinish'] = useDebounceFn(values => {
  const params = filterEmptyValue(values);
  emit('handleFinish', params);
});

/**
 * 错误处理
 * @param errorInfo - 错误信息
 */
const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
  console.error('错误信息:', errorInfo);
  return !!errorInfo;
};

defineExpose({
  handleSubmit,
  handleReset,
  handleValidate
});
</script>
