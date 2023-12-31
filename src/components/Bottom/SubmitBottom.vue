<template>
  <div class='
    submit-bottom
    theme-bg
    bg-white
    absolute
    flex
    left-0
    right-0
    bottom-0
    py-5px
    px-30px
    box-border
    b-t
    b-#ececec
    rounded-b-2
    z-999
  '>
    <Button
      type="primary"
      class="mr-10px"
      @click="handleSubmit"
    >
      提交
    </Button>
    <Button
      v-if="isRefresh"
      @click="handleRefresh"
    >
      重置
    </Button>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { Button, message } from 'ant-design-vue';
import { useTabStore } from '@/stores/tabs';
import { storeToRefs } from 'pinia';
import { routeToKeepalive } from '@/router/utils/helper';

interface DefineEmits {
  (e: 'submit'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isLoading?: boolean;
  isRefresh?: boolean; // 是否显示重置
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
  isRefresh: true
});

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const { addPrevPath } = tabStore;
const { cacheRoutes, prevPath } = storeToRefs(tabStore);

/**
 * 刷新当前页
 */
 const handleRefresh = () => {
  // 缓存上一个路径地址
  addPrevPath(route.fullPath);
  
  // 去除缓存路由中当前路由
  const cacheRoute = routeToKeepalive(route.path);
  cacheRoutes.value = cacheRoutes.value.filter(item => item !== cacheRoute);

  // 调转空白页
  router.push('/loading');

  // 200毫秒调转回来
  let timer: NodeJS.Timeout | null = setTimeout(() => {
    clearTimeout(timer as NodeJS.Timeout);
    timer = null;
    router.push(prevPath.value);
    message.success({ content: '重置成功', key: 'refresh' });
  }, 200);
};

/** 点击提交 */
const handleSubmit = () => {
  emit('submit');
};
</script>

<style lang="less" scoped>
.theme-dark {
  .submit-bottom {
    border-top-color: #414141 !important;
  }
}
</style>