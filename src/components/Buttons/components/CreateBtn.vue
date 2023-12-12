<template>
  <Button
    :loading="isLoading"
    v-bind="attrs"
    :type="type || 'primary'"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    <template v-if="isIcon" #icon>
      <PlusOutlined />
    </template>

    <slot v-if="slots.default" />
    <span v-else>{{ content }}</span>
  </Button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { useAttrs, useSlots } from 'vue';
import { Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

interface DefineEmits {
  (e: 'click'): void;
}
 
const emit = defineEmits<DefineEmits>();

interface DefineProps extends ButtonProps {
  isLoading?: boolean;
  content?: string;
  isIcon?: boolean;
  type?: ButtonProps['type']
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  isIcon: true,
  content: '新增'
});

const slots = useSlots();
const attrs = useAttrs();

/** 点击编辑 */
const onClick = () => {
  emit('click');
};
</script>
