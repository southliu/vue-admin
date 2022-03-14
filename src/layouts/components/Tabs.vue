<template>
  <Tabs
    v-model:activeKey="activeKey"
    hide-add
    @change="onChange"
  >
    <TabPane
      class="overflow-auto"
      v-for="item in tabs"
      :key="item.key"
      :closable="item.closable"
    >
      <template #tab>
        <Dropdown :trigger="['contextmenu']">
          <div class="flex w-full p-2 -mt-5px border">
            <div class="mr-2">{{ item.title }}</div>
            <div @click="handleRemove(item.key)">X</div>
          </div>
          <template #overlay>
            <Menu>
              <MenuItem key="1">
                <RedoOutlined class="mr-1 transform rotate-270" />
                <span>重新加载</span>
              </MenuItem>
              <MenuItem key="2">
                <CloseOutlined class="mr-1" />
                <span>关闭标签页</span>
              </MenuItem>
              <MenuItem key="3">
                <VerticalAlignMiddleOutlined class="mr-1 transform rotate-90" />
                <span>关闭其他</span>
              </MenuItem>
              <MenuItem key="4">
                <VerticalAlignTopOutlined class="mr-1 transform rotate-270" />
                <span>关闭左侧</span>
              </MenuItem>
              <MenuItem key="5">
                <VerticalAlignTopOutlined class="mr-1 transform rotate-90" />
                <span>关闭右侧</span>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
    </TabPane>
  </Tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTabStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'
import {
  Tabs,
  TabPane,
  Menu,
  MenuItem,
  Dropdown,
  Button
} from 'ant-design-vue'
import {
  RedoOutlined,
  CloseOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import type { Key } from 'ant-design-vue/lib/_util/type'

export default defineComponent({
  components: {
    RedoOutlined,
    CloseOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignMiddleOutlined,
    Tabs,
    TabPane,
    Menu,
    MenuItem,
    Dropdown,
    Button
  },
  setup() {
    const router = useRouter()
    const tabStore = useTabStore()
    const { tabs, activeKey } = storeToRefs(tabStore)

    // 点击
    const onChange = (activeKey: Key) => {
      router.push(activeKey as string)
    }
    
    // 移除当前标签页
    const handleRemove = (targetKey: string) => {
      tabStore.removeTabs(targetKey)
    };

    return {
      tabs,
      activeKey,
      handleRemove,
      onChange
    };
  }
})
</script>
