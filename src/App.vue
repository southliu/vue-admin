<template>
  <ConfigProvider :locale="zhCN">
    <div class="font-sans">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export default defineComponent({
  components: { ConfigProvider },
  setup() {
    dayjs.locale('zh-cn')
    return { zhCN }
  }
})
</script>