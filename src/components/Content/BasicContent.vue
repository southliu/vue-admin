<template>
  <div v-if="isPermission" class="h-full p-10px box-border">
    <div id="container" class=" rounded-2">
      <slot name="tabs" />

      <div
        class="h-full relative overflow-auto"
        :class="{ 'px-5 py-3': isPadding }"
      >
        <div id="top">
          <slot name="top"></slot>
        </div>

        <div
          id="content"
          class="overflow-auto"
        :class="{ 'py-5': isPadding }"
        >
          <slot></slot>
        </div>

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

interface DefineProps {
  isPermission: boolean;
  isPadding?: boolean;
}

withDefaults(defineProps<DefineProps>(), {
  isPadding: true
});
</script>
