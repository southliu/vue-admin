<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="overflow-y: hidden;"
      :style="`height: ${ height || 300 }px`"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import type { IDomEditor } from '@wangeditor/editor'
import { defineComponent, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default defineComponent({
  components: { Editor, Toolbar },
  props: {
    modelValue: {
      type: String,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    const { modelValue } = props
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref(modelValue || '')
    // 工具栏配置
    const toolbarConfig = {}
    // 编辑器配置
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    /** 记录editor实例 */
    const handleCreated = (editor: IDomEditor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    /** 监听值变化 */
    const handleChange = (editor: IDomEditor) => {
      emit('update:modelValue', editor.getHtml())
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange
    };
  }
})
</script>    