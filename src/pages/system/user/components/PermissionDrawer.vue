<template>
  <Drawer
    :open="isOpen"
    :title="title || '权限配置'"
    placement="right"
    @close="onClose"
  >
    <template #extra>
      <Button type="primary" @click="onSubmit">提交</Button>
    </template>
    <Tree
      checkable
      :checkedKeys="treeCheckedKeys"
      :treeData="treeData"
      @check="handleCheck"
    />
  </Drawer>
</template>

<script lang="ts">
import type { DataNode, TreeProps } from 'ant-design-vue/lib/tree';
import type { Key } from 'ant-design-vue/lib/vc-tree/interface';
import type { PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import { Drawer, Tree, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'PermissionDrawer',
  emits: ['onClose', 'onSubmit'],
  props: {
    title: {
      type: String
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    treeData: {
      type: Array as PropType<DataNode[]>,
      required: true
    },
    checkedKeys: {
      type: Array as PropType<Key[]>,
      required: true
    }
  },
  components: {
    Drawer,
    Tree,
    Button
  },
  setup(props, { emit }) {
    const treeCheckedKeys = ref(props.checkedKeys || []);

    // 监听checkedKeys
    watch(() => props.checkedKeys, value => {
      treeCheckedKeys.value = value;
    });

    /** 关闭 */
    const onClose = () => {
      emit('onClose');
    };

    /** 提交 */
    const onSubmit = () => {
      emit('onSubmit', treeCheckedKeys.value);
    };

    /**
     * 处理勾选
     * @param checked - 勾选值
     */
    const handleCheck: TreeProps['onCheck'] = checked => {
      treeCheckedKeys.value = checked as Key[];
    };

    return {
      treeCheckedKeys,
      onClose,
      onSubmit,
      handleCheck
    };
  },
});
</script>
