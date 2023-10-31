<template>
  <contextHolder />
  <Button
    type="primary"
    danger
    v-bind="attrs"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    删除
  </Button>
</template>

<script lang="ts" setup>
import { createVNode, useAttrs } from 'vue';
import { Button, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

interface DefineEmits {
  (e: 'click'): void;
}

const emit = defineEmits<DefineEmits>();

const attrs = useAttrs();
const [modal, contextHolder] = Modal.useModal();

/** 点击删除 */
const onClick = () => {
  modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除吗?',
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      emit('click');
    }
  });
};
</script>
