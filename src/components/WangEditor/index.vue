<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="overflow-y: hidden;"
      :style="`height: ${ height || 300 }px`"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * @description: 富文本组件
 */
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { FILE_API } from '@/utils/config';

interface DefineEmits {
  (e: 'update:modelValue', value: string): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  modelValue?: string;
  height?: number;
}

const props = withDefaults(defineProps<DefineProps>(), {});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref(props.modelValue || '');
// 工具栏配置
const toolbarConfig = {};
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 上传图片地址
      server: FILE_API
    },
    uploadVideo: {
      // 上传视频地址
      server: FILE_API
    }
  }
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;
  editor.destroy();
});

// 监听组件值变化
watch(() => props.modelValue, value => {
  const content = isHtml(value as string) ? value : `<p>${value}</p>`;
  valueHtml.value = content as string;
});

/** 判断最外层是否有标签 */
const isHtml = (text: string) => {
  const reg = /^<([a-zA-Z]+)[^>]*>(.*)<\/\1>$/;
  return reg.test(text);
};

/** 记录editor实例 */
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

/** 处理变更 */
const handleChange = (editor: IDomEditor) => {
  emit('update:modelValue', editor.getHtml());
};
</script>