<template>
  <div :class="`flex items-center ${attrs.class || ''}`">
    <component
      :is="Comp"
      :placeholder="placeholder"
      allowClear
      v-bind="{
        ...getComponentProps(
            item,
            data,
            setData
          ),
          ...item.componentProps
      }"
    />
    <span v-if="item.unit" class="ml-5px whitespace-nowrap">
      {{ item.unit }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { FormData, FormList } from '#/form';
import { defineComponent, useAttrs, watch } from 'vue';
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

const attrs = useAttrs();
let Comp: ReturnType<typeof defineComponent>;

// 组件
if (props.item.component !== 'customize') {
  Comp = componentMap.get(props.item.component);
} else {
  Comp = props.item.render;
}

watch(() => props.item, () => {
  // 组件
  if (props.item.component !== 'customize') {
    Comp = componentMap.get(props.item.component);
  } else {
    Comp = props.item.render;
  }
}, { deep: true });

// 占位符
const placeholder = props.item.placeholder || createPlaceholder(props.item.component);
</script>