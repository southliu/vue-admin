<template>
  <BasicContent :isPermission="isPermission">
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
import type { FormData } from '#/form';
import type { BasicFormProps } from '@/components/Form/model';
import { onMounted, ref } from 'vue';
import { checkPermission } from '@/utils/permissions';
import { useRoute, useRouter } from 'vue-router';
import { createList, pagePermission } from './model';
import { useTabStore } from '@/stores/tabs';
import { usePublicStore } from '@/stores/public';
import { message, Spin } from 'ant-design-vue';
import {
 getArticleById,
 createArticle,
 updateArticle
} from '@/servers/content/article';
import BasicForm from '@/components/Form/BasicForm.vue';
import BasicContent from '@/components/Content/BasicContent.vue';
import SubmitBottom from '@/components/Bottom/SubmitBottom.vue';
import { useSingleTab } from '@/hooks/useSingleTab';

// 初始化新增数据
const initCreate = {
  content: '<h4>初始化内容</h4>',
  user: {
    name: {
      test: ''
    }
  }
};

const router = useRouter();
const tabStore = useTabStore();
const { setRefreshPage } = usePublicStore();
const { query, fullPath } = useRoute();
const { closeTabGoNext } = tabStore;
const createFormRef = ref<BasicFormProps>();
const isLoading = ref(false);
const createData = ref<FormData>(initCreate);

const fatherPath = '/content/article'; // 父路径
const id = query?.id as string || '';
const isPermission = checkPermission(id ? pagePermission.update : pagePermission.create);
useSingleTab(fatherPath, id);

/** 处理新增 */
const handleCreate = () => {
  createData.value = initCreate;
};

/**
 * 处理编辑
 * @param id - 唯一值
 */
 const handleUpdate = async (id: string) => {
  try {
    isLoading.value = true;
    const { code, data } = await getArticleById(id);
    if (Number(code) !== 200) return;
    createData.value = (data || {}) as FormData;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  id ? handleUpdate(id) : handleCreate();
});

/** 表格提交 */
const handleSubmit = () => {
  createFormRef.value?.handleSubmit();
};

/** 返回主页 */
const goBack = (isRefresh?: boolean) => {
  if (isRefresh) setRefreshPage(true);
  router.push(fatherPath);
  closeTabGoNext(fullPath, fatherPath);
};

/**
 * 新增/编辑提交
 * @param values - 表单返回数据
 */
const handleFinish = async (values: FormData) => {
  try {
    isLoading.value = true;
    const functions = () => id ? updateArticle(id, values) : createArticle(values);
    const { code, message: resultMessage } = await functions();
    if (Number(code) !== 200) return;
    message.success(resultMessage || '操作成功');
    createFormRef.value?.handleReset();
    createData.value = initCreate;
    goBack(true);
  } finally {
    isLoading.value = false;
  }
};
</script>