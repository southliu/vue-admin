<template>
  <Upload
    v-model:file-list="fileList"
    name="file"
    :accept="accept"
    :action="uploadFileUrl"
    :headers="headers"
    @change="handleChange"
  >
    <Button>
      <UploadOutlined />
      {{ text || '点击上传' }}
    </Button>
  </Upload>
</template>

<script lang="ts" setup>
import type { UploadChangeParam } from 'ant-design-vue';
import { onMounted, watch, ref } from 'vue';
import { Button, Upload, message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { getLocalInfo } from '@/utils/local';
import { TOKEN } from '@/utils/config';
import { uploadFileUrl } from '@/servers/public/file';

defineOptions({
  name: 'UploadFile'
});

interface DefineEmits {
  (e: 'update:modelValue', value: string[]): void;
  (e: 'update:value', value: string[]): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  modelValue?: unknown[];
  value?: unknown[];
  text?: string;
  accept?: string;
}

const props = withDefaults(defineProps<DefineProps>(), {});

const fileList = ref([]);
const headers = {
  authorization: (getLocalInfo(TOKEN) || '') as string,
};

onMounted(() => {
  fileList.value = (props.modelValue || props.value || []) as never[];
});

watch(() => [props.modelValue, props.value], () => {
  fileList.value = (props.modelValue || props.value || []) as never[];
});

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
    emit('update:modelValue', []);
    emit('update:value', []);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name}上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name}上传失败`);
  }
};
</script>