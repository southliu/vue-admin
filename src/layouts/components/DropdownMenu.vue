<template>
  <Menu>
    <MenuItem
      :key="TabEnums.REFRESH_PAGE"
      :disabled="activeKey !== currentKey"
      @click="handleDropdown(TabEnums.REFRESH_PAGE, pathName)"
    >
      <RedoOutlined class="mr-5px transform rotate-270" />
      <span>重新加载</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_CURRENT"
      :disabled="list.length < 2"
      @click="handleDropdown(TabEnums.CLOSE_CURRENT, pathName)"
    >
      <CloseOutlined class="mr-5px" />
      <span>关闭标签</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_OTHER"
      :disabled="list.length < 2"
      @click="handleDropdown(TabEnums.CLOSE_OTHER, pathName)"
    >
      <VerticalAlignMiddleOutlined class="mr-5px transform rotate-90" />
      <span>关闭其他</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_LEFT"
      :disabled="index === 0"
      @click="handleDropdown(TabEnums.CLOSE_LEFT, pathName)"
    >
      <VerticalAlignTopOutlined class="mr-5px transform rotate-270" />
      <span>关闭左侧</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_RIGHT"
      :disabled="index === list.length - 1"
      @click="handleDropdown(TabEnums.CLOSE_RIGHT, pathName)"
    >
      <VerticalAlignTopOutlined class="mr-5px transform rotate-90" />
      <span>关闭右侧</span>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TabEnums } from './Tabs.vue'
import type { ITabs } from '@/stores/tabs'
import { Menu, MenuItem } from 'ant-design-vue'
import {
  RedoOutlined,
  CloseOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'DropdownMenu',
  emits: ['handleDropdown'],
  components: {
    RedoOutlined,
    CloseOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignMiddleOutlined,
    Menu,
    MenuItem
  },
  props: {
    currentKey: {
      type: String,
      required: true
    },
    activeKey: {
      type: String,
      required: true
    },
    pathName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    list: {
      type: Array as PropType<ITabs[]>,
      required: true
    },
  },
  setup(props, context) {
    const handleDropdown = (type: TabEnums, pathName: string) => {
      context.emit('handleDropdown', type, pathName)
    }
    
    return {
      TabEnums,
      handleDropdown
    }
  }
})
</script>
