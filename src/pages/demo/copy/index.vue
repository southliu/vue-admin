<template>
  <BasicContent>
    <h1>剪切板：</h1>
    <Copy class="w-300px" />

    <div class="flex items-center mt-50px">
      <span class="text-lg">将“admin”传入复制按钮中：</span>
      <CopyBtn text="复制" value="admin" />
    </div>
  </BasicContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicContent from '@/components/Content/BasicContent.vue'
import Copy from '@/components/Copy/index.vue'
import CopyBtn from '@/components/Copy/CopyBtn.vue'

export default defineComponent({
  name: 'DemoCopy',
  components: {
    BasicContent,
    Copy,
    CopyBtn
  },
  setup() {
    
  },
})
</script>
