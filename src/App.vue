<template>
  <ConfigProvider
    :locale="zhCN"
    :theme="{
      algorithm: [themeType === 'dark' ? darkAlgorithm : defaultAlgorithm]
    }"
  >
    <div class="font-sans">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { VERSION } from './utils/config';
import { usePublicStore } from '@/stores/public';
import { ConfigProvider, theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// antd主题
const { defaultAlgorithm, darkAlgorithm } = theme;

const publicStore = usePublicStore();
const { themeType } = storeToRefs(publicStore);

onMounted(() => {
  // 关闭loading
  if (document?.getElementById('first')) {
    (document.getElementById('first') as HTMLElement).style.display = 'none';
  }

  // 关闭时去除版本信息
  window.addEventListener('unload', handleClearVersion);
});

onUnmounted(() => {
  window.removeEventListener('unload', handleClearVersion);
});

/** 清空版本 */
const handleClearVersion = () => {
  localStorage.removeItem(VERSION);
};
</script>
