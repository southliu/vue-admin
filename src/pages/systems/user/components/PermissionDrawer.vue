<template>
  <Drawer
    :visible="visible"
    :title="title || '权限配置'"
    placement="right"
    @close="onClose"
  >
    <Tree
      checkable
      :tree-data="treeData"
    />
  </Drawer>
</template>

<script lang="ts">
import type { DataNode } from 'ant-design-vue/lib/tree'
import { defineComponent, PropType } from 'vue'
import { Drawer, Tree } from 'ant-design-vue'

export default defineComponent({
  name: 'PermissionDrawer',
  emits: ['onClose'],
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      required: true
    },
    treeData: {
      type: Array as PropType<DataNode[]>,
      required: true
    }
  },
  components: {
    Drawer,
    Tree
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('onClose')
    }

    return {
      onClose
    }
  },
})
</script>
