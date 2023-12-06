<template>
  <div
    id="pagination"
    class="
      w-full
      flex
      items-center
      justify-end
      min-h-40px
      box-border
      z-999
    "
  >
    <Pagination
      showSizeChanger
      showQuickJumper
      size="small"
      :disabled="isLoading"
      :showTotal="() => showTotal(total)"
      v-model:current="currentPage"
      :defaultPageSize="pageSize"
      :total="total"
      :onChange="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { PAGE_SIZE } from '@/utils/config';
import { Pagination } from 'ant-design-vue';

interface DefineEmits {
  (e: 'handleChange', page: number, pageSize: number): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  total?: number;
  page?: number;
  pageSize?: number;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  total: 0,
  page: 1,
  pageSize: PAGE_SIZE,
});

const currentPage = ref(props.page);

watch(() => props.page, value => {
  currentPage.value = value || 1;
});

/**
 * 显示总数
 * @param total - 总数
 */
const showTotal = (total: number): string => {
  return `共 ${total || 0} 条数据`;
};

/**
 * 页数改变
 * @param page - 当前页
 * @param pageSize - 页总数
 */
const onChange = (page: number, pageSize: number) => {
  emit('handleChange', page, pageSize);
};
</script>
