<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :labelCol="70"
        :list="searchList"
        :data="searches.data"
        :loading="loading"
        :isSearch="true"
        :isCreate="false"
        @handleFinish="handleSearch"
      />
    </template>

    <Spin :spinning="loading">
      <Line :items="datum.items" />
      <Pie :data="datum.game_data" />
      <Descriptions :data="datum.rows" />
    </Spin>
  </BasicContent>
</template>

<script lang="ts">
import type { IDashboardResult } from './model'
import type { ISearchData } from '@/types/global'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useLoading } from '@/hooks/useLoading'
import { IFormData } from '@/types/form'
import { getDataTrends } from '@/servers/dashboard'
import { DATE_FORMAT } from '@/utils/constants'
import { searchList } from './data'
import { Spin } from 'ant-design-vue'
import Pie from './components/Pie.vue'
import Line from './components/Line.vue'
import Descriptions from './components/Descriptions.vue'
import dayjs from 'dayjs'
import BasicSearch from '@/components/Search/BasicSearch.vue'
import BasicContent from '@/components/Content/BasicContent.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    Pie,
    Line,
    Spin,
    Descriptions,
    BasicSearch,
    BasicContent
  },
  setup() {
    const { loading, startLoading, endLoading } = useLoading()

    // 数据参数
    const datum = ref<IDashboardResult>({
      game_data: [],
      rows: {
        cost: {},
        pay: {},
        reg: {},
      },
      items: {
        hash: [],
        legend: {},
      },
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
        const { all_pay, new_pay, register, active, active_total } = values
        if (values.all_pay) values.all_pay = all_pay ? 1 : 0
        if (values.new_pay) values.new_pay = new_pay ? 1 : 0
        if (values.register) values.register = register ? 1 : 0
        if (values.active) values.active = active ? 1 : 0
        if (values.active_total) values.active_total = active_total ? 1 : 0

        // 日期转化
        startLoading()
        searches.data = values
        const query = { ...values }
        const { data: { data } } = await getDataTrends(query)
        datum.value = data
        endLoading()
      } catch(err) {
        endLoading()
        console.error(err)
      }
    }

    return {
      datum,
      loading,
      searches,
      searchList,
      handleSearch
    }
  }
})
</script>
