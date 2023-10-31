<template>
  <div v-if="isPermission" class="h-full p-10px box-border">
    <div id="container" class="h-full px-5 py-3 relative overflow-auto rounded-2">
      <div id="top">
        <slot name="top"></slot>
      </div>

      <div id="content" class="py-5 overflow-auto">
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

interface DefineProps {
  isPermission: boolean;
}

withDefaults(defineProps<DefineProps>(), {});
</script>
