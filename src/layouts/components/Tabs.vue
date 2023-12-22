<template>
  <div class="flex items-center justify-between mx-2 transition-all">
    <Tabs
      v-model:activeKey="activeKey"
      hide-add
      class="tabs"
      :tabBarStyle="{
        height: '34px',
        marginTop: '3px'
      }"
      :tabBarGutter="5"
    >
      <TabPane
        class="overflow-auto"
        v-for="(item, index) in tabs"
        :key="item.key"
      >
        <template #tab>
          <Dropdown :trigger="['contextmenu']" @click="onChange(item.url)">
            <div
              class="dropdown-item flex items-center justify-between w-full px-3 py-1 mr-0 border border-light-900"
              :class="{
                'bg-blue-700': isActive(item.key),
                '!text-white': isActive(item.key)
              }"
            >
              <div>{{ item.label }}</div>
              <div v-if="tabs.length > 1" @click.stop="handleRemove(item.key)">
                <CloseOutlined
                  class="p-1 rounded-1/2 text-11px ml-10px"
                  :class="{
                    'hover:bg-light-900': !isActive(item.key),
                    'hover:bg-blue-800': isActive(item.key),
                  }"
                  style="margin-right: 0px !important"
                />
              </div>
            </div>
            <template #overlay>
              <DropdownMenu
                :activeKey="activeKey"
                :currentKey="item.key"
                :index="index"
                :list="tabs"
                @handleDropdown="handleDropdown"
                @handleRefresh="handleRefresh"
              />
            </template>
          </Dropdown>
        </template>
      </TabPane>
    </Tabs>
    
    <div class="flex items-center">
      <div class="w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center b-l b-#d9d9d9">
        <Tooltip placement="bottom">
          <template #title>
            <span>重新加载</span>
          </template>

          <div class="w-full h-full flex items-center justify-center">
            <Icon
              class="flex items-center justify-center change-icon text-lg cursor-pointer"
              :class="{ 'animate-spin': isRefresh }"
              icon="ant-design:reload-outlined"
              @click="handleRefresh()"
            />
          </div>
        </Tooltip>
      </div>
      <Tooltip
        placement="bottom"
        class="w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center b-l b-#d9d9d9"
      >
        <template #title>
          <span>更多功能</span>
        </template>

        <Dropdown :trigger="['click']" @openChange="handleDropdownChange">
          <div class="w-36px h-36px flex items-center justify-center">
            <Icon
              class="flex items-center justify-center change-icon text-lg cursor-pointer transition-all transform "
              :class="{ 'rotate-180': isDropdown, 'rotate-0': !isDropdown }"
              icon="ant-design:down-outlined"
            />
          </div>

          <template #overlay>
            <DropdownMenu
              :currentKey="activeKey"
              :activeKey="activeKey"
              :index="getTabIndex(activeKey)"
              :list="tabs"
              @handleDropdown="handleDropdown"
              @handleRefresh="handleRefresh"
            />
          </template>
        </Dropdown>
      </Tooltip>
      <div class="w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center b-l b-#d9d9d9">
        <Tooltip placement="bottom">
          <template #title>
            <span>{{ isMaximize ? '退出最大化' : '最大化' }}</span>
          </template>

          <div class="w-full h-full flex items-center justify-center">
            <Icon
              v-show="isMaximize"
              class="flex items-center justify-center change-icon text-lg cursor-pointer"
              icon="ant-design:compress-outlined"
              @click="handleMaximize()"
            />
            <Icon
              v-show="!isMaximize"
              class="flex items-center justify-center change-icon text-lg cursor-pointer"
              icon="ant-design:expand-outlined"
              @click="handleMaximize()"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Key } from 'ant-design-vue/lib/_util/type';
import { storeToRefs } from 'pinia';
import { useTabStore } from '@/stores/tabs';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import { TabEnums } from '../model';
import { Icon } from '@iconify/vue';
import { onMounted, reactive, ref, watch } from 'vue';
import {
  Tabs,
  TabPane,
  Dropdown,
  Tooltip,
  message
} from 'ant-design-vue';
import DropdownMenu from './DropdownMenu.vue';
import { useUserStore } from '@/stores/user';
import { getMenuByKey } from '@/utils/menu';
import { routeToKeepalive } from '@/router/utils/helper';
import { useMenuStore } from '@/stores/menu';

interface TimeoutData {
  icon: null | NodeJS.Timeout;
  refresh: null | NodeJS.Timeout;
}

interface DefineEmits {
  (e: 'toggleMaximize'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isMaximize?: boolean;
}

withDefaults(defineProps<DefineProps>(), {
  isMaximize: false
});

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const { menuList } = storeToRefs(menuStore);
const { permissions } = storeToRefs(userStore);
const {
  tabs,
  prevPath,
  activeKey,
  cacheRoutes
} = storeToRefs(tabStore);
const {
  setActiveKey,
  addTabs,
  setNav,
  addPrevPath,
  closeTabs,
  closeOther,
  closeLeft,
  closeRight
} = tabStore;
const isRefresh = ref(false); // 是否刷新
const isDropdown = ref(false); // 是否显示下拉菜单
const timeout = reactive<TimeoutData>({
  icon: null,
  refresh: null
});

// 首次进入添加标签
onMounted(() => {
  if (permissions.value?.length) {
    handleAddTab();
  }
});

// 监听路由变化添加标签
watch(() => route.fullPath, value => {
  handleAddTab(value);
});

// 监听菜单
watch(() => menuList.value, () => {
  if (tabs.value?.length === 0) {
    handleAddTab();
  }
});

/**
 * 添加标签
 * @param path - 路径
 */
const handleAddTab = (path = route.fullPath) => {
  if (permissions.value?.length > 0) {
    if (path === '/') return;
    const menuByKeyProps = {
      menus: menuList.value,
      permissions: permissions.value,
      key: path
    };
    const newItems = getMenuByKey(menuByKeyProps);
    if (newItems?.key) {
      setActiveKey(newItems.key);
      setNav(newItems.nav);
      addTabs(newItems);
    }
  }
};

/**
 * 是否是选中
 * @param key - 唯一值
 */
const isActive = (key: string) => key === activeKey.value;

/**
 * 点击标签
 * @param targetKey - 当前选中唯一值
 */
const onChange = (targetKey: Key) => {
  router.push(targetKey as string);
};

/**
 * 移除当前标签页
 * @param targetKey - 当前选中唯一值
 */
const handleRemove = (targetKey: string) => {
  closeTabs(targetKey);
};

/** 获取tabs下标 */
const getTabIndex = (key: string): number => {
  return tabs.value.findIndex(item => item.key === key);
};

/**
 * 刷新当前页
 */
const handleRefresh = (key = activeKey.value) => {
  // 关闭右键菜单显示
  isDropdown.value = false;
  // 缓存上一个路径地址
  addPrevPath(route.fullPath);

  // 当timeout没执行时刷新页面
  if (!timeout.icon) {
    isRefresh.value = true;
  
    // 去除缓存路由中当前路由
    const cacheRoute = routeToKeepalive(key);
    cacheRoutes.value = cacheRoutes.value.filter(item => item !== cacheRoute);

    // 调转空白页
    router.push('/loading');
  }

  /** 清除timeout */
  const clearRefresh = () => {
    clearTimeout(timeout.refresh!);
    timeout.refresh = null;
  };
  const clearIcon = () => {
    clearTimeout(timeout.icon!);
    timeout.icon = null;
  };

  // 200毫秒调转回来
  timeout.refresh = setTimeout(() => {
    router.push(prevPath.value);
    clearRefresh();
    message.success({ content: '刷新成功', key: 'refresh' });
  }, 200);
  // icon 1秒后转回来
  timeout.icon = setTimeout(() => {
    isRefresh.value = false;
    clearIcon();
  }, 1000);
};

/**
 * 点击右键功能
 * @param type - 右键下拉选中类型
 * @param key - 标签唯一值，可作为路由
 */
const handleDropdown = useDebounceFn((type: TabEnums, key: string) => {
  // 关闭右键菜单显示
  isDropdown.value = false;

  switch (type) {
    // 关闭标签
    case TabEnums.CLOSE_CURRENT:
      closeTabs(key);
      break;

    // 关闭其他
    case TabEnums.CLOSE_OTHER:
      closeOther(key);
      break;

    // 关闭左侧
    case TabEnums.CLOSE_LEFT:
      closeLeft(key);
      break;

    // 关闭右侧
    case TabEnums.CLOSE_RIGHT:
      closeRight(key);
      break;

    default:
      break;
  }
});

/** 处理最大化 */
const handleMaximize = () => {
  emit('toggleMaximize');
};

/**
 * 监听菜单变化
 * @param isOpen - 是否显示
 */
const handleDropdownChange = (isOpen: boolean) => {
  isDropdown.value = isOpen;
};

defineExpose({
  TabEnums
});
</script>

<style lang="less" scoped>
.tabs {
  width: calc(100% - 110px);
  height: 34px;
  padding-bottom: 0;
}

.theme-dark {
  .dropdown-item {
    border-color: #414141 !important;
    color: #FFFFFFD9 !important;
  }
}
</style>