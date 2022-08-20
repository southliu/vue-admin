<template>
  <Tooltip>
    <template #title>搜索</template>
    <SearchOutlined
      class="text-lg mr-3"
      @click="toggle"
    />
  </Tooltip>

  <SearchModal
    v-if="visible"
    :visible="visible"
    @toggle="toggle"
  />
</template>

<script lang="ts">
/**
 * @description: 顶部全局搜索菜单组件
 */
import { defineComponent, ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
import SearchModal from './components/SearchModal.vue'

export default defineComponent({
  name: 'GlobalSearch',
  components: {
    SearchOutlined,
    Tooltip,
    SearchModal
  },
  setup() {
    const visible = ref(false)

    /** 切换搜索框显示状态 */
    const toggle = () => {
      visible.value = !visible.value
    }

    return {
      visible,
      toggle
    }
  },
})
</script>