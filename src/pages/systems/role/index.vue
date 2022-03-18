<template>
  <BasicContent>
    <BasicForm
      type="search"
      class="mb-20px"
      :list="searches.list"
      :data="searches.data"
      :is-search="true"
      :is-create="true"
      @onCreate="onCreate"
      @handleFinish="handleSearch"
    />
  </BasicContent>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Button } from 'ant-design-vue'
import BasicContent from '@/components/Basics/BasicContent.vue'
import BasicTable from '@/components/Basics/BasicTable.vue'
import BasicPagination from '@/components/Basics/BasicPagination.vue'
import BasicForm from '@/components/Basics/BasicForm.vue'
import BasicModal from '@/components/Basics/BasicModal.vue'
import DeleteBtn from '@/components/Buttons/DeleteBtn.vue'
import type { IFormData } from '@/types/form'
import type { IBasicForm } from '@/components/Basics/model'

export default defineComponent({
  name: 'SystemRole',
  components: {
    BasicContent,
    BasicTable,
    BasicPagination,
    BasicForm,
    BasicModal,
    DeleteBtn,
    Button
  },
  setup() {
    const createFormRef = ref<IBasicForm>()

    // 搜索数据
    const searches = reactive<ISearchData>({
      data: {
        age: 0,
        name: ''
      },
      list: [
        { title: '年龄', key: 'age', component: 'InputNumber' },
        { title: '名字', key: 'name', component: 'Input' }
      ]
    })

    /** 点击新增  */
    const onCreate = () => {
    }

    /**
     * 新增/编辑提交
     * @param values - 表单数据
     */
    const handleSearch = (values: IFormData) => {
      console.log('handleSearch:', values)
    }


    return {
      createFormRef,
      searches,
      onCreate,
      handleSearch
    }
  }
})
</script>
