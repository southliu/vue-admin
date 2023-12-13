<template>
  <div class="w-full px-5 py-10px flex items-center justify-between b-b border-#ececec">
    <div class="flex items-center">
      <div v-if="isBack" class="flex items-center">
        <Button
          class="mr-15px"
          size="small"
          @click="onBack"
        >
          <div class="flex items-center text-#999">
            <Icon icon="lets-icons:refund-back" />
            <span class="ml-3px">返回</span>
          </div>
        </Button>
        <span class="w-1px h-14px mr-15px bg-#ddd" />
      </div>

      <slot v-if="slots.title" name="title" />

      <span v-else class="text-15px">
        {{ title ?? handleInitTitle() }}
      </span>
    </div>

    <slot name="right" />
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from 'ant-design-vue';
import { useRoute, useRouter } from "vue-router";
import { useTabStore } from "@/stores/tabs";

defineOptions({
  name: 'BasicBar'
});

interface DefineEmits {
  (e: 'back'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isBack?: boolean;
  title?: string;
  prevUrl?: string; // 上级链接
}

const props = withDefaults(defineProps<DefineProps>(), {
  isBack: true
});

const slots = useSlots();
const router = useRouter();
const route = useRoute();
const tabStore = useTabStore();
const { closeTabs } = tabStore;

/** 点击返回 */
const onBack = () => {
  emit('back');

  if (props.prevUrl) {
    closeTabs(route.fullPath);
    router.push(props.prevUrl as string);
  }
};

/** 初始化标题 */
const handleInitTitle = () => {
  return route.query?.id ? '编辑' : '新增';
};
</script>