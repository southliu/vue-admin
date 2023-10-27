<template>
  <Menu>
    <MenuItem
      :key="currentKey"
      :disabled="activeKey !== currentKey"
      @click="handleRefresh()"
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

<script lang="ts" setup>
import type { TabsData } from '@/stores/tabs';
import { TabEnums } from '../model';
import { Menu, MenuItem } from 'ant-design-vue';
import {
  RedoOutlined,
  CloseOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons-vue';

interface DefineEmits {
  (e: 'handleDropdown', type: TabEnums, key: string): void;
  (e: 'handleRefresh'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  currentKey: string;
  activeKey: string;
  index: number;
  list: TabsData[];
}

withDefaults(defineProps<DefineProps>(), {});

/**
 * 处理下拉事件
 * @param type - 下拉类型
 * @param key - 唯一值 
 */
const handleDropdown = (type: TabEnums, key: string) => {
  emit('handleDropdown', type, key);
};

/** 刷新当前页 */
const handleRefresh = () => {
  emit('handleRefresh');
};
</script>
