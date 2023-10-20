<template>
  <component
    :is="Comp"
    class="min-w-70px"
    :placeholder="placeholder"
    :allowClear="true"
    v-bind="{
      ...getComponentProps(
          props.item,
          props.data,
          props.setData
        ),
        ...props.item.componentProps
    }"
  />
</template>

<script lang="ts" setup>
import type { FormList } from '#/form';
import type { AllDataType } from '#/public';
import type { PropType } from 'vue';
import { defineComponent, watch } from 'vue';
import { componentMap } from './utils/componentMap';
import { createPlaceholder, getComponentProps } from './utils/helper';

defineOptions({
  name: 'BasicComponents'
});

const props = defineProps({
  item: {
    type: Object as PropType<FormList>,
    required: true
  },
  data: {
    type: Object as PropType<Record<string, AllDataType>>,
    required: true
  },
  setData: {
    type: Function as PropType<(key: string | string[], value: AllDataType) => void>,
    required: true
  }
});

let Comp: ReturnType<typeof defineComponent>;

// 组件
if (props.item.component !== 'customize') {
  Comp = componentMap.get(props.item.component);
} else {
  Comp = props.item.render;
}

watch(() => props.item, () => {
  if (props.item.component === 'customize') {
    Comp = props.item.render;
  }
});

// 占位符
const placeholder = props.item.placeholder || createPlaceholder(props.item.component);
</script>