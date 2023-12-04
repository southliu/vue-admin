<template>
  <Button
    :loading="isLoading"
    v-bind="attrs"
    :type="type || 'primary'"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>

    <span>{{ content || '编辑' }}</span>
  </Button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { useAttrs } from 'vue';
import { Button } from 'ant-design-vue';

interface DefineEmits {
  (e: 'click'): void;
}
 
const emit = defineEmits<DefineEmits>();

interface DefineProps extends ButtonProps {
  isLoading?: boolean;
  content?: string;
  type?: ButtonProps['type']
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});

const attrs = useAttrs();

/** 点击编辑 */
const onClick = () => {
  emit('click');
};
</script>
