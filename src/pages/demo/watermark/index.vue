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

<script lang="ts" setup>
import { useTitle } from '@/hooks/useTitle'
import { useWatermark } from '@/hooks/useWatermark'
import { Button } from 'ant-design-vue'
import BasicContent from '@/components/Content/BasicContent.vue'

useTitle('水印')
const { Watermark, RemoveWatermark } = useWatermark()

const openWatermark = () => {
  Watermark({
    content: '这是水印',
    height: 300,
    width: 350,
    rotate: -20,
    color: '#000',
    fontSize: 30,
    opacity: .07
  })
}
const hidWatermark = () => {
  RemoveWatermark()
}
</script>
