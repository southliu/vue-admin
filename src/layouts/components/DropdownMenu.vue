<template>
  <Menu>
    <MenuItem
      :key="currentKey"
      :disabled="activeKey !== currentKey"
      @click="handleRefresh"
    >
      <RedoOutlined class="mr-5px transform rotate-270" />
      <span>重新加载</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_CURRENT"
      :disabled="list.length < 2"
      @click="handleDropdown(TabEnums.CLOSE_CURRENT, currentKey)"
    >
      <CloseOutlined class="mr-5px" />
      <span>关闭标签</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_OTHER"
      :disabled="list.length < 2"
      @click="handleDropdown(TabEnums.CLOSE_OTHER, currentKey)"
    >
      <VerticalAlignMiddleOutlined class="mr-5px transform rotate-90" />
      <span>关闭其他</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_LEFT"
      :disabled="index === 0"
      @click="handleDropdown(TabEnums.CLOSE_LEFT, currentKey)"
    >
      <VerticalAlignTopOutlined class="mr-5px transform rotate-270" />
      <span>关闭左侧</span>
    </MenuItem>
    <MenuItem
      :key="TabEnums.CLOSE_RIGHT"
      :disabled="index === list.length - 1"
      @click="handleDropdown(TabEnums.CLOSE_RIGHT, currentKey)"
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
  emits: ['handleDropdown', 'handleRefresh'],
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
  setup(props, { emit }) {
    /**
     * 处理下拉事件
     * @param type - 下拉类型
     * @param key - 唯一值 
     */
    const handleDropdown = (type: TabEnums, key: string) => {
      emit('handleDropdown', type, key)
    }

    /** 刷新当前页 */
    const handleRefresh = () => {
      emit('handleRefresh', props.pathName)
    }
    
    return {
      TabEnums,
      handleDropdown,
      handleRefresh
    }
  }
})
</script>
