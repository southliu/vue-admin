<template>
  <a-tabs
    v-model:activeKey="activeKey"
    hide-add
    type="editable-card"
    @edit="onEdit"
  >
    <a-tab-pane
      v-for="item in tabs"
      :key="item.key"
      :tab="item.title"
      :closable="item.closable"
    />
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTabStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const tabStore = useTabStore()
    const { tabs, activeKey } = storeToRefs(tabStore)
    
    // 移除当前标签页
    const remove = (targetKey: string) => {
      tabStore.removeTabs(targetKey)
    };

    const onEdit = (targetKey: string) => {
      remove(targetKey);
    };

    return {
      tabs,
      activeKey,
      onEdit,
    };
  }
})
</script>
