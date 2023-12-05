<template>
  <Table
    :id="id"
    :size="size"
    :rowKey="rowKey"
    :loading="isLoading"
    :rowSelection="rowSelection"
    bordered
    :pagination="false"
    :columns="(handleColumns(columns) as ColumnsType)"
    :dataSource="tableData"
    :scroll="{ y: tableHeight }"
    @resizeColumn="handleResizeColumn"
  >
    <template #bodyCell="{ column, record, index }">
      <span v-if="(column as TableColumnsProps)?.type === 'index'">
        {{ index + 1 }}
      </span>

      <span
        v-else-if="(column as TableColumnsProps).echoArr"
        :title="getEchoContent(record, column)"
        :style="getEchoStyle(record, column)"
      >
        {{ getEchoContent(record, column, EMPTY_VALUE) }}
      </span>

      <TooltipText
        v-else-if="(column as TableColumnsProps).tooltipKey"
        :text="record?.[column.dataIndex as string]"
        :tooltipText="record?.[(column as TableColumnsProps).tooltipKey as string]"
      />

      <slot
        v-else
        :name="column.dataIndex"
        :record="record"
        :rowIndex="index"
      />
    </template>
  </Table>
</template>

<script lang="ts" setup>
import type { ColumnsType } from 'ant-design-vue/es/table';
import type { TableData, TableColumnsProps } from '#/public';
import type { DefaultOptionType } from 'ant-design-vue/es/select';
import type { TableProps } from 'ant-design-vue';
import {
  ref,
  watch,
  onMounted,
  onUnmounted
} from 'vue';
import { Table } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import { useTableHeight } from './hooks/useTableHeight';
import { handleEchoArr, handleEchoColor } from '@/utils/helper';
import { EMPTY_VALUE } from '@/utils/config';
import TooltipText from '../TooltipText/index.vue';

defineOptions({
  name: 'BasicTable'
});

interface DefineProps extends Omit<TableProps, 'columns'> {
  id?: string;
  rowKey?: string;
  data: TableData[];
  columns: ColumnsType;
  isLoading?: boolean;
  offsetHeight?: number;
  isResize?: boolean;
  rowSelection?: TableProps['rowSelection'];
}

const props = withDefaults(defineProps<DefineProps>(), {
  isResize: true,
  isLoading: false,
  offsetHeight: 0,
  id: 'table',
  rowKey: 'id',
  size: 'middle'
});

const tableHeight = ref(0);
const tableData = ref(props.data || []);

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

watch(() => props.data, value => {
  tableData.value = value || [];
});

/** 获取表格高度 */
const getTableHeight = () => {
  const [height] = useTableHeight(props.id, props.offsetHeight);
  tableHeight.value = height;
};

// 滚动事件防抖
const handler = () => getTableHeight();
const handleSize = useDebounceFn(handler, 200);

/**
 * 获取回显内容
 * @param record - 当前行数据
 * @param column - 表格列的配置
 */
const getEchoContent = (
  record: Record<string, unknown>,
  column: TableColumnsProps,
  empty = ''
) => {
  return handleEchoArr(
    record?.[column.dataIndex as string] ?? '',
    (column as TableColumnsProps)?.echoArr as DefaultOptionType[]
  ) ?? empty;
};

/**
 * 获取回显样式
 * @param record - 当前行数据
 * @param column - 表格列的配置
 */
const getEchoStyle = (record: Record<string, unknown>, column: TableColumnsProps) => {
  return `color: ${handleEchoColor(
    record?.[column.dataIndex as string] ?? '',
    (column as TableColumnsProps)?.echoArr as DefaultOptionType[]
  )}`;
};

/** 开始监听滚动事件 */
const startResize = () => {
  window.addEventListener('resize', handleSize);
};

/** 结束监听滚动事件 */
const stopResize = () => {
  window.removeEventListener('resize', handleSize);
};

/** 列拖拽 */
const handleResizeColumn: TableProps['onResizeColumn'] = (w, col) => {
  col.width = w;
  const newTableData = [...tableData.value];

  for (let i = 0; i < newTableData?.length; i++) {
    const item = newTableData[i];
    if (item.dataIndex === col.dataIndex) {
      item.width = w;
      break;
    }
  }
  
  tableData.value = newTableData;
};

/**
 * 处理表格数据，为空显示'-'
 * @param array - 表格列值
 */
const handleColumns = (array?: ColumnsType) => {
  if (!array) return undefined;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    item.key = item.key?.toString()?.trim() || '';
    // 初始化最小宽度70
    item.width = item.width || 50;
    // 列拖拽
    item.resizable = item.resizable ?? true;
    // 是否自动省略
    item.ellipsis = item.ellipsis ?? true;
  }

  return array;
};
</script>