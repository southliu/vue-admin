<template>
  <BasicContent :isPermission="true">
    <template #top>
      <BasicSearch
        :labelCol="70"
        :list="searchList"
        :data="searchData"
        :initSearch="initSearch"
        :isLoading="isLoading"
        @handleFinish="handleSearch"
      />
    </template>

    <Spin :spinning="isLoading">
      <div className='pb-10px'>
        <Block />
      </div>

      <div className='flex justify-between'>
        <Line />
        <Bar />
      </div>
    </Spin>
  </BasicContent>
</template>

<script lang="ts" setup>
import type { DashboardResult } from './model';
import { onActivated, ref } from 'vue';
import { FormData } from '#/form';
import { getDataTrends } from '@/servers/dashboard';
import { DATE_FORMAT } from '@/utils/config';
import { searchList } from './model';
import { Spin } from 'ant-design-vue';
import Line from './components/Line.vue';
import Block from './components/Block.vue';
import Bar from './components/Bar.vue';
import dayjs from 'dayjs';
import BasicSearch from '@/components/Search/BasicSearch.vue';
import BasicContent from '@/components/Content/BasicContent.vue';

defineOptions({
  name: 'DashboardPage'
});

const isLoading = ref(false);

// 数据参数
const datum = ref<DashboardResult>({
  data: {}
});

// 初始化搜索
const initSearch = {
  pay_date: dayjs().format(DATE_FORMAT),
  all_pay: true,
  package_types: [0]
};

// 搜索数据
const searchData = ref<FormData>({ ...initSearch });

onActivated(() => {
  handleSearch(searchData.value);
});

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = async (values: FormData) => {
  try {
    // 单选框数据处理- true：1 false：0
    const { all_pay, register } = values;
    if (values.all_pay) values.all_pay = all_pay ? 1 : 0;
    if (values.register) values.register = register ? 1 : 0;

    // 日期转化
    isLoading.value = true;
    searchData.value = values;
    const query = { ...values };
    const { code, data } = await getDataTrends(query);
    if (Number(code) !== 200) return;
    datum.value = data;
  } finally {
    isLoading.value = false;
  }
};
</script>
