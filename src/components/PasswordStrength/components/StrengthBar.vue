<template>
  <div class="flex items-center">
    <div
      v-for="item in arr"
      :key="item"
      class="w-19% h-5px mt-5px mr-1% rounded-10px bg-light-900"
      :class="{
        '!bg-green-400': item <= strength && strength > 3,
        '!bg-yellow-400': item <= strength && strength === 3,
        '!bg-red-400': item <= strength && strength < 3,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
interface DefineProps {
  strength: number;
}

withDefaults(defineProps<DefineProps>(), {});

const arr = new Array(5).fill(0).map((_, index) => index + 1);
</script>
