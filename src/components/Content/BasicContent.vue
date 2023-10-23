<template>
  <div v-if="isPermission" class="h-full px-2 py-3 box-border">
    <div id="container" class="h-full relative overflow-auto">
      <div id="top">
        <slot name="top"></slot>
      </div>

      <div id="content" class="p-5 overflow-auto">
        <slot></slot>
      </div>

      <div id="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>

  <div v-else class="h-500px">
    <NotPermission />
  </div>
</template>

<script lang="ts" setup>
import NotPermission from "@/pages/403.vue";

defineProps({
  isPermission: {
    type: Boolean,
    required: true
  }
});
</script>
