<template>
  <Modal
    :open="isOpen"
    :width="isFullscreen ? '100%' : width"
    :layout="layout"
    :maskClosable="false"
    :loading="isLoading"
    v-bind="attrs"
    :wrapClassName="isFullscreen ? 'full-modal' : ''"
    @cancel="onCancel"
  >
    <template #closeIcon>
      <div class="">
        <div class="h-full flex items-center justify-center :hover:text-white text-#000">
          <Tooltip
            class="min-w-30px p-5px font-16px text-#00000073 hover:text-#404040"
            placement="bottom"
            @click.stop="onFullscreen"
          >
            <template #title>
              <span>{{ isFullscreen ? '退出最大化' : '最大化' }}</span>
            </template>
            <Icon
              v-show="!isFullscreen"
              class="text-lg"
              icon="ant-design:fullscreen-outlined"
            />
            <Icon
              v-show="isFullscreen"
              class="text-lg"
              icon="ant-design:fullscreen-exit-outlined"
            />
          </Tooltip>

          <Tooltip
            class="min-w-30px p-5px font-16px text-#00000073 hover:text-#404040"
            placement="bottom"
            @click="onCancel"
          >
            <template #title>
              <span>关闭</span>
            </template>
            <Icon class="text-27px mb-5px" icon="ant-design:close-outlined" />
          </Tooltip>
        </div>
      </div>
    </template>

    <template #title>
      <span class="select-none text-lg">
        {{ title }}
      </span>
    </template>

    <Spin :spinning="isLoading">
      <div class="pt-20px">
        <slot></slot>
      </div>
    </Spin>

    <template #footer>
      <Button @click="onCancel">取消</Button>
      <Button
        v-if="isPermission"
        type="primary"
        :loading="isLoading"
        @click="onFinish"
      >
        确认
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { ModalProps } from 'ant-design-vue';
import { nextTick, ref, watch, useAttrs } from 'vue';
import { Modal, Tooltip, Button, Spin } from 'ant-design-vue';
import { useModalDragMove } from './hooks/useModalDrag';
import { useDebounceFn } from '@vueuse/core';
import { Icon } from '@iconify/vue';

interface DefineEmits {
  (e: 'handleCancel'): void;
  (e: 'handleFinish'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isOpen: boolean;
  width?: string | number;
  modelStyle?: string;
  layout?: 'horizontal'|'vertical'|'inline';
  title: string;
  isPermission?: boolean; // 权限控制
  isLoading?: boolean;
}

const props = withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  isPermission: true,
  width: 520,
  layout: 'horizontal'
});

const attrs: ModalProps = useAttrs();

// 是否最大化
const isFullscreen = ref(false);

/** 点击关闭 */
const onCancel = () => {
  emit('handleCancel');
};

/** 点击确认 */
const onFinish = useDebounceFn(() => {
  emit('handleFinish');
}, 500);

/** 最大化 */
const onFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// 监听显示开启拖拽
watch(() => props.isOpen, async (value) => {
  if (value) {
    await nextTick();
    useModalDragMove();
  } else {
    isFullscreen.value = false;
  }
});
</script>

<style lang="less">
.full-modal {
  .ant-modal {
    position: absolute;
    max-width: 100%;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>