<template>
  <div class="h-full px-2 py-3 box-border">
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
</template>
