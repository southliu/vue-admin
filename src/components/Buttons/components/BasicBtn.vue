<template>
  <Button
    v-bind="attrs"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    <slot />
  </Button>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { Button } from 'ant-design-vue';

interface DefineEmits {
   (e: 'click'): void;
 }
 
 const emit = defineEmits<DefineEmits>();

const attrs = useAttrs();

/** 处理点击事件 */
const onClick = () => {
  emit('click');
};
</script>
