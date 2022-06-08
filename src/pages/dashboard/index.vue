<template>
  <BasicSearch
    :labelCol="70"
    :list="searches.list"
    :data="searches.data"
    :loading="loading"
    :is-search="true"
    :is-create="false"
    @handleFinish="handleSearch"
  />
  <div class="align-center">
    <Line
      :items="datum.items"
    />
    <Pie
      :data="datum.game_data"
    />
    <Descriptions
      :data="datum.rows"
    />
  </div>
</template>

<script lang="ts">
import type { IDashboardResult } from './model'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useLoading } from '@/hooks'
import { IFormData } from '@/types/form'
import { getDataTrends } from '@/servers/dashboard'
import { GAME_PACKAGE_TYPE, SOURCE_TYPE, DATE_FORMAT } from '@/utils/constants'
import Pie from './components/Pie.vue'
import Line from './components/Line.vue'
import Descriptions from './components/Descriptions.vue'
import dayjs from 'dayjs'
import BasicSearch from '@/components/Search/BasicSearch.vue'

export default defineComponent({
  components: {
    Pie,
    Line,
    Descriptions,
    BasicSearch
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
      },
      list: [
        {
          title: '日期',
          key: 'pay_date',
          component: 'DatePicker',
          componentProps: {
            allowClear: false,
            format: DATE_FORMAT
          }
        },
        {
          title: '游戏ID',
          key: 'game_ids',
          wrapperCol: 250,
          component: 'GameSelect',
        },
        {
          title: '包类型',
          key: 'package_types',
          wrapperCol: 150,
          component: 'Select',
          componentProps: {
            mode: 'multiple',
            options: GAME_PACKAGE_TYPE
          }
        },
        {
          title: '合作公司',
          key: 'partners',
          wrapperCol: 300,
          component: 'PartnerSelect'
        },
        {
          title: '来源',
          key: 'source',
          component: 'Select',
          componentProps: {
            options: SOURCE_TYPE
          }
        },
        {
          title: '全服充值',
          key: 'all_pay',
          wrapperCol: 15,
          component: 'Checkbox'
        },
        {
          title: '新增充值',
          key: 'new_pay',
          wrapperCol: 15,
          component: 'Checkbox'
        },
        {
          title: '注册',
          key: 'register',
          wrapperCol: 15,
          component: 'Checkbox'
        },
        {
          title: '登录',
          key: 'active',
          wrapperCol: 15,
          component: 'Checkbox'
        },
        {
          title: '累积登录',
          key: 'active_total',
          wrapperCol: 15,
          component: 'Checkbox'
        }
      ]
    })
    
    /**
     * 搜索提交
     * @param values - 表单返回数据
     */
    const handleSearch = async (values: IFormData) => {
      // 单选框数据处理- true：1 false：0
      const { all_pay, new_pay, register, active, active_total } = values
      if (values.all_pay) values.all_pay = all_pay ? 1 : 0
      if (values.new_pay) values.new_pay = new_pay ? 1 : 0
      if (values.register) values.register = register ? 1 : 0
      if (values.active) values.active = active ? 1 : 0
      if (values.active_total) values.active_total = active_total ? 1 : 0

      // 日期转化
      // if (values.pay_date) values.pay_date = (values.pay_date as dayjs.Dayjs).format('YYYY-MM-DD')
      startLoading()
      searches.data = values
      const query = { ...values }
      const { data: { data } } = await getDataTrends(query)
      datum.value = data as IDashboardResult
      endLoading()
    }

    onMounted(() => {
      handleSearch(searches.data)
    })

    return {
      datum,
      loading,
      searches,
      handleSearch
    }
  }
})
</script>
