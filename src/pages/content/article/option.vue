<template>
  <BasicContent v-if="pagePermission.create">
    <Spin class='mb-50px' :spinning="isLoading">
      <BasicForm
        ref="createFormRef"
        :list="createList"
        :labelCol="{ span: 5 }"
        :data="createData"
        @handleFinish="handleFinish"
      />
    </Spin>

    <SubmitBottom
      :isLoading="isLoading"
      :goBack="() => goBack()"
      :handleSubmit="handleSubmit"
    />
  </BasicContent>
</template>

<script lang="ts" setup>
import type { IFormData } from '#/form'
import type { IBasicForm } from '@/components/Form/model'
import { onMounted, reactive, ref } from 'vue'
import { checkPermission } from '@/utils/permissions'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { createList } from './model'
import { useTabStore } from '@/stores/tabs'
import { usePublicStore } from '@/stores/public'
import { useTitle } from '@/hooks/useTitle'
import { useUserStore } from '@/stores/user'
import { message, Spin } from 'ant-design-vue'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import {
 getArticleById,
 createArticle,
 updateArticle
} from '@/servers/content/article'
import BasicForm from '@/components/Form/BasicForm.vue'
import BasicContent from '@/components/Content/BasicContent.vue'
import SubmitBottom from '@/components/Bottom/SubmitBottom.vue'

// 初始化新增数据
const initCreate = {
  content: '<h4>初始化内容</h4>',
  user: {
    name: {
      test: ''
    }
  }
}

const router = useRouter()
const tabStore = useTabStore()
const userStore = useUserStore()
const { setRefreshPage } = usePublicStore()
const { query, fullPath } = useRoute()
const { permissions } = storeToRefs(userStore)
const {
  setActiveKey,
  addTabs,
  setNav,
  closeTabGoNext
} = tabStore
const createFormRef = ref<IBasicForm>()
const isLoading = ref(false)
const createData = ref<IFormData>(initCreate)

const title = '文章管理'
const id = query?.id as string || ''
const createTitle = `${ADD_TITLE}${title}`
const updateTitle = `${EDIT_TITLE(id, title)}`
useTitle(id ? updateTitle : createTitle)

// 父路径
const fatherPath = '/content/article'

// 权限前缀
const permissionPrefix = '/content/article'

// 权限
const pagePermission = reactive({
  create: checkPermission(`${permissionPrefix}/create`, permissions.value),
  update: checkPermission(`${permissionPrefix}/update`, permissions.value),
})

/** 处理新增 */
const handleCreate = () => {
  createData.value = initCreate
}

/**
 * 处理编辑
 * @param id - 唯一值
 */
 const handleUpdate = async (id: string) => {
  try {
    isLoading.value = true
    const { data: { data } } = await getArticleById(id)
    createData.value = data
  } finally {
    isLoading.value = false
  }
}

/**
 * 添加标签
 * @param path - 路径
 */
  const handleAddTab = (path = fullPath) => {
  // 当值为空时匹配路由
  if (path === '/') return

  const title = id ? updateTitle : createTitle
  const newTab = {
    label: title,
    key: fullPath,
    nav: ['内容管理', '文章管理', title]
  }
  setActiveKey(newTab.key)
  setNav(newTab.nav)
  addTabs(newTab)
}

onMounted(() => {
  id ? handleUpdate(id) : handleCreate()

  // 添加标签
  handleAddTab()
})

/** 表格提交 */
const handleSubmit = () => {
  createFormRef.value?.handleSubmit()
}

/** 返回主页 */
const goBack = (isRefresh?: boolean) => {
  if (isRefresh) setRefreshPage(true)
  router.push(fatherPath)
  closeTabGoNext(fullPath, fatherPath)
}

/**
 * 新增/编辑提交
 * @param values - 表单返回数据
 */
const handleFinish = async (values: IFormData) => {
  try {
    isLoading.value = true
    const functions = () => id ? updateArticle(id, values) : createArticle(values)
    const { data } = await functions()
    message.success(data?.message || '操作成功')
    createFormRef.value?.handleReset()
    createData.value = initCreate
    goBack(true)
  } finally {
    isLoading.value = false
  }
}
</script>