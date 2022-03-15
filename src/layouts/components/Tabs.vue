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
    >
      <template #tab>
        <Dropdown :trigger="['contextmenu']">
          <div class="flex w-full p-2 -mt-5px border">
            <div class="mr-2">{{ item.title }}</div>
            <div @click.stop="handleRemove(item.key)">X</div>
          </div>
          <template #overlay>
            <Menu>
              <MenuItem key="1">
                <RedoOutlined class="mr-1 transform rotate-270" />
                <span>重新加载</span>
              </MenuItem>
              <MenuItem key="2">
                <CloseOutlined class="mr-1" />
                <span>关闭标签</span>
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
import { defineComponent, watch } from 'vue'
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
import { useRoute, useRouter } from 'vue-router'
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
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()
    const { tabs, activeKey } = storeToRefs(tabStore)
    const { clickTabs, removeTabs } = tabStore

    // 点击
    const onChange = (targetKey: Key) => {
      clickTabs(targetKey as string)
    }
    
    // 移除当前标签页
    const handleRemove = (targetKey: string) => {
      removeTabs(targetKey)
    }

    // 监听所选向变化，标签页跟随变化
    watch(() => activeKey.value, value => {
      if (value !== route.path) {
        router.push(value)
      }
    })

    return {
      tabs,
      activeKey,
      handleRemove,
      onChange
    };
  }
})
</script>
