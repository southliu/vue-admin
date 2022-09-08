<template>
  <Modal
    :visible="visible"
    :width="isFullscreen ? '100%' : width"
    :layout="layout"
    :mask-closable="false"
    :loading="loading"
    :wrap-class-name="isFullscreen ? 'full-modal' : ''"
  >
    <template #closeIcon>
      <div class="mt-7px">
        <div class="h-full flex items-center justify-center :hover:text-white">
          <Tooltip
            class="p-10px font-16px text-#00000073 hover:text-#404040"
            placement="bottom"
            @click="onFullscreen"
          >
            <template #title>
              <span>{{ isFullscreen ? '退出最大化' : '最大化' }}</span>
            </template>
            <Icon
              class="text-lg"
              :icon="!isFullscreen ? 'ant-design:fullscreen-outlined' : 'ant-design:fullscreen-exit-outlined'"
            />
          </Tooltip>

          <Tooltip
            class="p-10px font-16px text-#00000073 hover:text-#404040"
            placement="bottom"
            @click="onCancel"
          >
            <template #title>
              <span>关闭</span>
            </template>
            <Icon class="text-lg" icon="ant-design:close-outlined" />
          </Tooltip>
        </div>
      </div>
    </template>

    <template #title>
      <span class="select-none text-lg">
        {{ title }}
      </span>
    </template>

    <Spin :spinning="loading">
      <slot></slot>
    </Spin>

    <template #footer>
      <Button @click="onCancel">取消</Button>
      <Button
        v-if="isPermission"
        type="primary"
        :loading="loading"
        @click="onFinish"
      >
        确认
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, nextTick, PropType, ref, watch } from 'vue'
import { Modal, Tooltip, Button, Spin } from 'ant-design-vue'
import { useModalDragMove } from './hooks/useModalDrag'
import { useDebounceFn } from '@vueuse/core'
import Icon from '../Icon/index.vue'

const emit = defineEmits(['handleCancel', 'handleFinish'])

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  width: {
    type: [String, Number],
    default: 520
  },
  layout: {
    type: String as PropType<'horizontal'|'vertical'|'inline'>,
    required: false,
    default: 'horizontal'
  },
  title: {
    type: String,
    required: true
  },
  // 权限控制
  isPermission: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

// 是否最大化
const isFullscreen = ref(false)

/** 点击关闭 */
const onCancel = () => {
  emit('handleCancel')
}

/** 点击确认 */
const onFinish = useDebounceFn(() => {
  emit('handleFinish')
}, 500)

/** 最大化 */
const onFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// 监听显示开启拖拽
watch(() => props.visible, async (value) => {
  if (value) {
    await nextTick()
    useModalDragMove()
  } else {
    isFullscreen.value = false
  }
})
</script>

<style lang="less">
.ant-modal-close-x {
  width: 100px !important;
}

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