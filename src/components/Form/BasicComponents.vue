<template>
  <component
    :is="Comp"
    class="min-w-100px"
    :placeholder="placeholder"
    allowClear
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
import type { FormData, FormList } from '#/form';
import { defineComponent, watch } from 'vue';
import { componentMap } from './utils/componentMap';
import { createPlaceholder, getComponentProps } from './utils/helper';

defineOptions({
  name: 'BasicComponents'
});

interface DefineProps {
  item: FormList;
  data: FormData;
  setData: (key: string | string[], value: unknown) => void;
}

const props = withDefaults(defineProps<DefineProps>(), {});

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