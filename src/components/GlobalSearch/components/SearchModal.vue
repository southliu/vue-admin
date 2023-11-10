<template>
  <Modal
    class="rounded-100px"
    :open="isOpen"
    :closable="false"
    @cancel="toggle"
  >
    <Input
      ref="inputRef"
      v-model:value="inputValue"
      placeholder="请输入关键词搜索"
      allowClear
      @pressEnter="onPressEnter"
    >
      <template #prefix>
        <Icon
          class="text-lg text-warm-gray-400"
          icon="ant-design:search-outlined"
        />
      </template>
    </Input>

    <SearchResult
      :list="list"
      :active="active"
      @handleClick="onPressEnter"
      @handleMouse="onChangeActive"
    />

    <template #footer>
      <SearchFooter />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { SideMenu } from '#/public';
import { Modal, Input } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useTabStore } from '@/stores/tabs';
import { useMenuStore } from '@/stores/menu';
import { useDebounceFn, onKeyStroke } from '@vueuse/core';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';
import { onMounted, ref, watch } from 'vue';
import {
  getMenuByKey,
  getOpenMenuByRouter,
  searchMenuValue
} from '@/utils/menu';
import SearchResult from './SearchResult.vue';
import SearchFooter from './SearchFooter.vue';

interface DefineEmits {
  (e: 'toggle'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isOpen: boolean;
}

withDefaults(defineProps<DefineProps>(), {});

const router = useRouter();
const tabStore = useTabStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { permissions } = storeToRefs(userStore);
const { menuList } = storeToRefs(menuStore);
const inputRef = ref();
const inputValue = ref('');
const active = ref('');
const list = ref<SideMenu[]>([]);
const { setOpenKeys } = menuStore;
const { setActiveKey, addTabs } = tabStore;

// 初始化聚焦input框
onMounted(() => {
  inputRef.value?.focus();
});

/** 开关切换 */
const toggle = () => {
  emit('toggle');
};

/** 关闭模态框 */
const onClose = () => {
  emit('toggle');
};

/** 处理回车事件 */
const onPressEnter = () => {
  if (active.value) {
    router.push(active.value);
    // 添加标签
    const menuByKeyProps = {
      menus: menuList.value,
      permissions: permissions.value,
      key: active.value
    };
    const newTab = getMenuByKey(menuByKeyProps);
    if (newTab?.key) {
      addTabs(newTab);
      setActiveKey(active.value);
      // 处理菜单展开
      const openKeys = getOpenMenuByRouter(active.value);
      setOpenKeys(openKeys);
      // 关闭
      onClose();
    }
  }
};

/** 处理鼠标上键 */
const onArrowUp = () => {
  // 列表为空则退出
  if (!list.value.length) return null;
  const index = list.value.findIndex(item => item.key === active.value);
  // 最上层则不操作
  if (index === 0) return null;
  const newActive = list.value[index - 1].key;
  active.value = newActive;
};

/** 处理鼠标下键 */
const onArrowDown = () => {
  // 列表为空则退出
  if (!list.value.length) return null;
  const len = list.value.length - 1;
  const index = list.value.findIndex(item => item.key === active.value);
  // 最下层则不操作
  if (index === len) return null;
  const newActive = list.value[index + 1].key;
  active.value = newActive;
};

/**
 * 更改active值
 * @param value - 输入值
 */
const onChangeActive = (value: string) => {
  active.value = value;
};

// 监听变化
watch(() => inputValue.value, useDebounceFn((value: string) => {
  const searchProps = {
    menus: menuList.value,
    permissions: permissions.value,
    value
  };
  const searchValue = searchMenuValue(searchProps);
  if (searchValue?.length) {
    active.value = (searchValue as SideMenu[])?.[0]?.key || '';
    list.value = searchValue as SideMenu[];
  } else {
    active.value = '';
    list.value = [];
  }
}, 200));

// 键盘事件
onKeyStroke('Escape', toggle);
onKeyStroke('Enter', onPressEnter);
onKeyStroke('ArrowUp', onArrowUp);
onKeyStroke('ArrowDown', onArrowDown);
</script>
