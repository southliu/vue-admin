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
  <Line
    :hash="datum.items.hash"
    :legend="datum.items.legend"
  />
  <Pie />
</template>

<script lang="ts">
import type { IDashboardResult } from './model';
import { defineComponent, reactive, ref } from 'vue'
import { useLoading } from '@/hooks'
import { IFormData } from '@/types/form'
import { getDataTrends } from '@/servers/dashboard'
import Pie from './components/Pie.vue'
import Line from './components/Line.vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    Pie,
    Line,
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
        pay_date: dayjs()
      },
      list: [
        {
          title: '来源',
          key: 'source',
          component: 'Select',
          componentProps: {
            options: []
          }
        },
        {
          title: '日期',
          key: 'pay_date',
          component: 'DatePicker',
          componentProps: {
            allowClear: false
          }
        },
        {
          title: '游戏ID',
          key: 'game_ids',
          wrapperCol: 200,
          component: 'Select',
          componentProps: {
            options: [
            ]
          }
        },
        {
          title: '包类型',
          key: 'package_types',
          wrapperCol: 140,
          component: 'Select',
          componentProps: {
            options: []
          }
        },
        {
          title: '合作公司',
          key: 'partners',
          wrapperCol: 220,
          component: 'Select',
          componentProps: {
            options: []
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
      // 日期转化
      if (values.pay_date) values.pay_date = (values.pay_date as dayjs.Dayjs).format('YYYY-MM-DD')
      startLoading()
      searches.data = values
      const query = { ...values }
      const { data: { data } } = await getDataTrends(query)
      datum.value = data as IDashboardResult
      endLoading()
    }

    return {
      datum,
      loading,
      searches,
      handleSearch
    }
  }
})
</script>
