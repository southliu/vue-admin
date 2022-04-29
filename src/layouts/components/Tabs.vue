<template>
  <div class="flex items-center justify-between mx-2 transition-all">
    <Tabs
      v-model:activeKey="activeKey"
      hide-add
      class="h-34px py-0"
      :tabBarStyle="{
        height: '34px',
        marginTop: '3px'
      }"
      :tabBarGutter="5"
      @change="onChange"
    >
      <TabPane
        class="overflow-auto"
        v-for="(item, index) in tabs"
        :key="item.key"
      >
        <template #tab>
          <Dropdown :trigger="['contextmenu']">
            <div
              class="flex items-center w-full px-3 py-1 mr-0 border border-light-900"
              :class="{
                'bg-blue-700': isActive(item.key),
                'text-white': isActive(item.key)
              }"
            >
              <div class="mr-5px">{{ item.title }}</div>
              <div v-if="tabs.length > 1" @click.stop="handleRemove(item.key)">
                <CloseOutlined
                  class="p-1 rounded-1/2 text-11px"
                  :class="{
                    'hover:bg-light-900': !isActive(item.key),
                    'hover:bg-blue-800': isActive(item.key),
                  }"
                  style="margin-right: 0 !important"
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
              />
            </template>
          </Dropdown>
        </template>
      </TabPane>
    </Tabs>
    
    <div class="flex items-center">
      <div class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center">
        <Tooltip placement="bottom">
          <template #title>
            <span>重新加载</span>
          </template>

          <Icon
            class="flex items-center justify-center text-lg cursor-pointer"
            :class="{ 'animate-spin': isRefresh }"
            @click="handleDropdown(TabEnums.REFRESH_PAGE, activeKey)"
            icon="ant-design:reload-outlined"
          />
        </Tooltip>
      </div>
      <Tooltip
        placement="bottom"
        class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center"
      >
        <template #title>
          <span>更多功能</span>
        </template>

        <Dropdown :trigger="['click']" @visibleChange="handleDropdownChange">
          <div>
            <Icon
              class="flex items-center justify-center text-lg cursor-pointer transition-all transform "
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
            />
          </template>
        </Dropdown>
      </Tooltip>
      <div class="right-item w-36px h-36px leading-36px text-#00000073 hover:text-#404040 flex place-content-center">
        <Tooltip placement="bottom">
          <template #title>
            <span>{{ maximize ? '退出最大化' : '最大化' }}</span>
          </template>

          <Icon
            class="flex items-center justify-center text-lg cursor-pointer"
            @click="handleMaximize()"
            :icon="maximize ? 'ant-design:compress-outlined' : 'ant-design:expand-outlined'"
          />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tabs'
import Icon from '@/components/Icon/index.vue'
import {
  Tabs,
  TabPane,
  Dropdown,
  Button,
  Tooltip,
  message
} from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import type { Key } from 'ant-design-vue/lib/_util/type'
import { firstCapitalize } from '@/utils/utils'
import { useDebounceFn } from '@vueuse/core'
import DropdownMenu from './DropdownMenu.vue'

export enum TabEnums {
  REFRESH_PAGE, // 刷新当前页
  CLOSE_CURRENT, // 关闭当前
  CLOSE_OTHER, // 关闭其他
  CLOSE_LEFT, // 关闭左侧
  CLOSE_RIGHT // 关闭右侧
}

interface ITimeout {
  icon: null | NodeJS.Timeout;
  refresh: null | NodeJS.Timeout;
}

export default defineComponent({
  name: 'TabsLayout',
  emits: ['toggleMaximize'],
  components: {
    CloseOutlined,
    Icon,
    Tabs,
    TabPane,
    Dropdown,
    Button,
    Tooltip,
    DropdownMenu
  },
  props: {
    maximize: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()
    const isRefresh = ref(false) // 是否刷新
    const isDropdown = ref(false) // 是否显示下拉菜单
    const timeout = reactive<ITimeout>({
      icon: null,
      refresh: null
    })
    const { tabs, activeKey, cacheRoutes } = storeToRefs(tabStore)
    const {
      initCacheRoutes,
      clickTabs,
      removeCurrent,
      removeOther,
      removeLeft,
      removeRight
    } = tabStore

    /**
     * 是否是选中
     * @param key - 唯一值
     */
    const isActive = (key: string) => key === activeKey.value

    onMounted(() => {
      // 初始化路由缓存
      initCacheRoutes()
    })

    // 监听所选向变化，标签页跟随变化
    watch(() => activeKey.value, value => {
      console.log('activeKey:', activeKey.value)
      if (value !== route.path) {
        router.push(value)
      }
    })

    /**
     * 点击标签
     * @param targetKey - 当前选中唯一值
     */
    const onChange = (targetKey: Key) => {
      clickTabs(targetKey as string)
    }

    /**
     * 移除当前标签页
     * @param targetKey - 当前选中唯一值
     */
    const handleRemove = (targetKey: string) => {
      removeCurrent(targetKey)
    }

    /**
     * 将路由转化为首字母大写字符串，/asd/zxc => AsdZxc
     * @param str - 路由参数值
     */
    const filterRouterName = (str: string): string => {
      // 分割斜线
      const arr = str.split('/')
      let res = ''

      arr.forEach(item => {
        res += firstCapitalize(item)
      })

      return res
    }

    /** 获取tabs下标 */
    const getTabIndex = (key: string): number => {
      return tabs.value.findIndex(item => item.key === key)
    }

    /**
     * 点击右键功能
     * @param type - 右键下拉选中类型
     * @param key - 标签唯一值，可作为路由
     */
    const handleDropdown = useDebounceFn((type: TabEnums, key: string) => {
      isDropdown.value = false

      switch (type) {
        // 刷新当前页
        case TabEnums.REFRESH_PAGE:
          // 获取当前路由名称
          const routerName = filterRouterName(key)
          // 当timeout没执行时刷新页面
          if (!timeout.icon) {
            isRefresh.value = true
          
            // 去除缓存路由中当前路由
            cacheRoutes.value = cacheRoutes.value.filter(item => item !== routerName)

            // 调转空白页
            router.push('/empty')
          }

          /** 清除timeout */
          const clearRefresh = () => {
            clearTimeout(timeout.refresh!)
            timeout.refresh = null
          }
          const clearIcon = () => {
            clearTimeout(timeout.icon!)
            timeout.icon = null
          }

          // 200毫秒调转回来
          timeout.refresh = setTimeout(() => {
            router.push(activeKey.value)
            cacheRoutes.value.push(routerName)
            clearRefresh()
            message.success({ content: '刷新成功!', key: 'refresh' })
          }, 200)
          // icon 1秒后转回来
          timeout.icon = setTimeout(() => {
            isRefresh.value = false
            clearIcon()
          }, 1000)
          break

        // 关闭标签
        case TabEnums.CLOSE_CURRENT:
          removeCurrent(key)
          break

        // 关闭其他
        case TabEnums.CLOSE_OTHER:
          removeOther(key)
          break

        // 关闭左侧
        case TabEnums.CLOSE_LEFT:
          removeLeft(key)
          break

        // 关闭右侧
        case TabEnums.CLOSE_RIGHT:
          removeRight(key)
          break
      }
    })

    /** 处理最大化 */
    const handleMaximize = () => {
      context.emit('toggleMaximize')
    }

    /**
     * 监听菜单变化
     * @param visible - 是否显示
     */
    const handleDropdownChange = (visible: boolean) => {
      isDropdown.value = visible
    }

    return {
      isRefresh,
      isDropdown,
      tabs,
      activeKey,
      TabEnums,
      isActive,
      onChange,
      getTabIndex,
      handleRemove,
      handleDropdown,
      handleMaximize,
      handleDropdownChange
    };
  }
})
</script>

<style lang="less" scoped>
.right-item {
  border-left: 1px solid #d9d9d9;
}
</style>