<template>
  <ConfigProvider :locale="zhCN">
    <div class="font-sans">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

onMounted(() => {
  // 关闭loading
  if (document?.getElementById('first')) {
    (document.getElementById('first') as HTMLElement).style.display = 'none'
  }
})
</script>