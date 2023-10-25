<template>
  <div :id="id" class="vxe_table">
    <Table
      :maxHeight="tableHeight"
      v-bind="gridOptions"
      :loading="isLoading"
      :data="data"
    >
      <Column
        v-for="item in handleColumns(columns)"
        :key="item.field"
        v-bind="item"
      >
        <template #default="{ row }">
          <template v-if="item.slots">
            <slot
              v-for="slot in slotList"
              :key="slot"
              :name="item.slots?.[slot]"
              :record="row"
            />
          </template>

          <span v-if="!item.slots">
            {{ row?.[item.field as string] || EMPTY_VALUE }}
          </span>
        </template>
      </Column>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TableData, TableProps } from '#/public';
import type { VxeTableProps, VxeColumnPropTypes } from 'vxe-table';
import {
  ref,
  reactive,
  onMounted,
  onUnmounted
} from 'vue';
import { Table, Column } from 'vxe-table';
import { useTableHeight } from './hooks/useTableHeight';
import { useDebounceFn } from '@vueuse/core';
import { EMPTY_VALUE } from '@/utils/config';

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'table'
  },
  data: {
    type: Object as PropType<TableData[]>,
    required: true
  },
  columns: {
    type: Array as PropType<TableProps[]>,
    required: true
  },
  options: {
    type: Object as PropType<VxeTableProps>,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
  // 高度偏移差
  offsetHeight: {
    type: Number,
    required: false,
    default: 0
  },
  // 是否开启监听窗口变化而更改高度
  isResize: {
    type: Boolean,
    required: false,
    default: true
  }
});

type SlotsKey = keyof VxeColumnPropTypes.Slots;

const tableHeight = ref(0);
// 插槽列表
const slotList: SlotsKey[] = [
  'default',
  'header',
  'footer',
  'filter',
  'edit'
];

onMounted(() => {
  getTableHeight();
  if (props.isResize) {
    startResize();
  }
});

onUnmounted(() => {
  if (props.isResize) {
    stopResize();
  }
});

// 表格参数
const gridOptions = reactive<VxeTableProps>({
  border: true, // 边框
  showOverflow: true, // 内容过长时显示为省略号
  showHeaderOverflow: true, // 表头所有内容过长时显示为省略号
  autoResize: true, // 自动监听父元素的变化去重新计算表格
  stripe: true, // 斑马纹
  size: 'small', // 表格尺寸
  rowConfig: {
    useKey: true, // 是否需要为每一行的 VNode 设置 key 属性
    isHover: true, // 当鼠标移到行时，是否要高亮当前行
    isCurrent: true // 当鼠标点击行时，是否要高亮当前行
  },
  sortConfig: {
    trigger: 'cell'
  },
  columnConfig: {
    resizable: true // 每一列是否启用列宽调整
  },
  scrollX: {
    enabled: true // 横向虚拟滚动配置
  },
  scrollY: {
    enabled: true // 纵向虚拟滚动配置
  },
  ...props.options
});

/**
 * 处理表格数据，为空显示'-'
 * @param array - 表格列值
 */
const handleColumns = (array?: TableProps[]) => {
  if (!array) return undefined;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    // 初始化最小宽度70
    item.minWidth = item.minWidth || 50;
  }

  return array;
};

/** 获取表格高度 */
const getTableHeight = () => {
  const [height] = useTableHeight(props.id, props.offsetHeight);
  tableHeight.value = height;
};

// 滚动事件防抖
const handler = () => getTableHeight();
const handleSize = useDebounceFn(handler, 200);

/** 开始监听滚动事件 */
const startResize = () => {
  window.addEventListener('resize', handleSize);
};

/** 结束监听滚动事件 */
const stopResize = () => {
  window.removeEventListener('resize', handleSize);
};
</script>
