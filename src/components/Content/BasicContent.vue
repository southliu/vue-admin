<template>
  <div v-if="isPermission" class="h-full p-10px box-border">
    <div id="container">
      <div class="h-full relative overflow-auto">
        <div id="top">
          <slot name="top"></slot>
        </div>

        <BasicCard
          id="content"
          class="overflow-auto"
          :isPadding="isPadding"
          :isBg="isBg"
          :isMarginBottom="isMarginBottom"
        >
          <slot></slot>
        </BasicCard>

        <div id="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="h-500px">
    <NotPermission />
  </div>
</template>

<script lang="ts" setup>
import NotPermission from "@/pages/403.vue";
import BasicCard from '../Card/BasicCard.vue';

interface DefineProps {
  isPermission: boolean;
  isPadding?: boolean; // 是否需要填充
  isMarginBottom?: boolean; // 是否需要下间距
  isBg?: boolean; // 是否需要背景色
}

withDefaults(defineProps<DefineProps>(), {
  isPadding: true,
  isBg: true,
  isMarginBottom: false
});
</script>
