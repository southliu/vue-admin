<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :labelCol="70"
        :list="searchList"
        :data="searches.data"
        :isLoading="isLoading"
        :isSearch="true"
        :isCreate="false"
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage'
})
</script>

<script lang="ts" setup>
import type { IDashboardResult } from './model'
import type { ISearchData } from '#/public'
import { onMounted, reactive, ref } from 'vue'
import { useTitle } from '@/hooks/useTitle'
import { IFormData } from '#/form'
import { getDataTrends } from '@/servers/dashboard'
import { DATE_FORMAT } from '@/utils/constants'
import { searchList } from './model'
import { Spin } from 'ant-design-vue'
import Line from './components/Line.vue'
import Block from './components/Block.vue'
import Bar from './components/Bar.vue'
import dayjs from 'dayjs'
import BasicSearch from '@/components/Search/BasicSearch.vue'
import BasicContent from '@/components/Content/BasicContent.vue'

useTitle('数据总览')

const isLoading = ref(false)

// 数据参数
const datum = ref<IDashboardResult>({
  data: {}
})

// 搜索数据
const searches = reactive<ISearchData>({
  data: {
    pay_date: dayjs().format(DATE_FORMAT),
    all_pay: true,
    package_types: [0]
  }
})

onMounted(() => {
  handleSearch(searches.data)
})

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = async (values: IFormData) => {
  try {
    // 单选框数据处理- true：1 false：0
    const { all_pay, register } = values
    if (values.all_pay) values.all_pay = all_pay ? 1 : 0
    if (values.register) values.register = register ? 1 : 0

    // 日期转化
    isLoading.value = true
    searches.data = values
    const query = { ...values }
    const { data: { data } } = await getDataTrends(query)
    datum.value = data
  } finally {
    isLoading.value = false
  }
}
</script>
