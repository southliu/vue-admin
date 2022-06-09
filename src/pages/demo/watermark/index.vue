<template>
  <BasicContent>
    <Button primary @click="openWatermark">
      打开水印
    </Button>
    <Button danger @click="hidWatermark">
      隐藏水印
    </Button>
  </BasicContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicContent from '@/components/Content/BasicContent.vue'
import { Watermark, RemoveWatermark } from '@/utils/watermark'
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'DemoWatermark',
  components: {
    BasicContent,
    Button
  },
  setup() {
    const openWatermark = () => {
      Watermark()
    }
    const hidWatermark = () => {
      RemoveWatermark()
    }

    return { openWatermark, hidWatermark }
  },
})
</script>
