<template>
  <Tabs
    v-model:activeKey="activeKey"
    hide-add
    type="editable-card"
    @edit="onEdit"
  >
    <TabPane
      v-for="item in tabs"
      :key="item.key"
      :tab="item.title"
      :closable="item.closable"
    />
  </Tabs>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTabStore } from '@/stores/tabs'
  import { storeToRefs } from 'pinia'
  import { Tabs, TabPane } from 'ant-design-vue'
  import type { Key } from 'ant-design-vue/lib/_util/type'

  export default defineComponent({
    components: { Tabs, TabPane },
    setup() {
      const tabStore = useTabStore()
      const { tabs, activeKey } = storeToRefs(tabStore)
      
      // 移除当前标签页
      const remove = (targetKey: string) => {
        tabStore.removeTabs(targetKey)
      };

      const onEdit = (targetKey: string | MouseEvent | Key | KeyboardEvent) => {
        remove(targetKey as string);
      };

      return {
        tabs,
        activeKey,
        onEdit,
      };
    }
  })
</script>
