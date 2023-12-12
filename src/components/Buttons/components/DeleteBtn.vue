<template>
  <contextHolder />
  <Button
    :loading="isLoading"
    :danger="isDanger"
    v-bind="attrs"
    :type="type || 'primary'"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    <template v-if="isIcon" #icon>
      <DeleteOutlined />
    </template>

    <slot v-if="slots.default" />
    <span v-else>{{ content }}</span>
  </Button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { createVNode, useAttrs, useSlots } from 'vue';
import { Button, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue';

interface DefineEmits {
  (e: 'click'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps extends ButtonProps {
  isLoading?: boolean;
  isIcon?: boolean;
  content?: string;
  message?: string; // 删除提示语
  isDanger?: boolean;
  type?: ButtonProps['type']
}

const props = withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  isDanger: true,
  content: '删除'
});

const slots = useSlots();
const attrs = useAttrs();
const [modal, contextHolder] = Modal.useModal();

/** 点击删除 */
const onClick = () => {
  modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: props.message || `确定要${props.content}吗?`,
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      emit('click');
    }
  });
};
</script>
