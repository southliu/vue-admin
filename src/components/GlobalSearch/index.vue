<template>
  <Tooltip>
    <template #title>搜索</template>
    <SearchOutlined
      class="text-lg mr-3"
      @click="toggle"
    />
  </Tooltip>

  <SearchModal ref="modalRef" />
</template>


<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
import type { IGlobalSearchModal } from './components/model'

export default defineComponent({
  name: 'GlobalSearch',
  components: {
    SearchOutlined,
    Tooltip,
    SearchModal: defineAsyncComponent(() => import('./components/SearchModal.vue'))
  },
  setup() {
    const modalRef = ref<IGlobalSearchModal>()

    /** 切换搜索框显示状态 */
    const toggle = () => {
      modalRef.value?.toggle()
    }

    return {
      modalRef,
      toggle
    }
  },
})
</script>