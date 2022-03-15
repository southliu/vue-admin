<template>

  <Tabs
    v-model:activeKey="activeKey"
    hide-add
    :tabBarGutter="12"
    @change="onChange"
  >
    <TabPane
      class="overflow-auto"
      v-for="item in tabs"
      :key="item.key"
    >
      <template #tab>
        <Dropdown :trigger="['contextmenu']">
          <div
            class="flex items-center w-full px-3 py-1 -mt-5px mr-0 border border-light-900"
            :class="{
              'bg-blue-600': isActive(item.key),
              'text-white': isActive(item.key)
            }"
          >
            <div class="mr-5px">{{ item.title }}</div>
            <div @click.stop="handleRemove(item.key)">
              <CloseOutlined
                class="p-1 rounded-1/2 text-10px"
                :class="{
                  'hover:bg-light-600': !isActive(item.key),
                  'hover:bg-blue-800': isActive(item.key),
                }"
                style="margin-right: 0 !important"
              />
            </div>
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
    const isActive = (key: string) => key === activeKey.value

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
      isActive,
      handleRemove,
      onChange
    };
  }
})
</script>
