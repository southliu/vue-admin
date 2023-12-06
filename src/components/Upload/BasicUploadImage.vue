<template>
  <div>
    <PreviewImage
      v-if="imageUrl"
      :url="imageUrl"
      @handleDelete="handleDelete"
    />
    <Upload
      v-else
      v-model:file-list="fileList"
      name="avatar"
      :accept="accept"
      :headers="headers"
      list-type="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      :action="uploadFileUrl"
      @change="handleChange"
    >
      <div>
        <LoadingOutlined v-if="isLoading" />
        <PlusOutlined v-else />
        <div class="ant-upload-text">
          {{ text || '上传' }}
        </div>
        </div>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { onMounted, watch, ref } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { Upload, message } from 'ant-design-vue';
import { getLocalInfo } from '@/utils/local';
import { TOKEN } from '@/utils/config';
import { uploadFileUrl } from '@/servers/public/file';
import PreviewImage from './components/PreviewImage.vue';

defineOptions({
  name: 'UploadImage'
});

interface DefineEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'update:value', value: string): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  modelValue?: string;
  value?: string;
  width?: number;
  height?: number;
  text?: string;
  accept?: string;
  fileSize?: number; // 限制上传文件大小(MB)
}

const props = withDefaults(defineProps<DefineProps>(), {
  width: 128,
  height: 128,
  accept: 'image/png,image/jpeg',
  fileSize: 2
});

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const isLoading = ref<boolean>(false);
const imageUrl = ref<string>('');

const headers = {
  authorization: (getLocalInfo(TOKEN) || '') as string,
};

onMounted(() => {
  imageUrl.value = props.modelValue || props.value || '';
});

watch(() => [props.modelValue, props.value], () => {
  imageUrl.value = props.modelValue || props.value || '';
});

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    isLoading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
      imageUrl.value = base64Url;
      isLoading.value = false;
      emit('update:modelValue', imageUrl.value);
      emit('update:value', imageUrl.value);
    });
  }
  if (info.file.status === 'error') {
    isLoading.value = false;
    message.error('upload error');
  }
};

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const acceptArr = props.accept?.split(',');
  acceptArr.forEach((item) => item?.trim());
  let isFileOrPng = acceptArr.includes(file.type);
  if (!isFileOrPng) {
    for (let i = 0; i < acceptArr?.length; i++) {
      const item = acceptArr[i];
      if (item.includes('.')) {
        const newArr = item?.split('.');
        const newType = newArr?.[newArr?.length - 1] || '';
        if (file.type.includes(newType)) {
          isFileOrPng = true;
          break;
        }
      }
    }
    if (!isFileOrPng) {
      message.error('只能上传图片格式文件!');
      return false;
    }
  }
  const isMaxFileSize = file.size / 1024 / 1024 < props.fileSize;
  if (!isMaxFileSize) {
    message.error(`图片不能大于${props.fileSize}MB!`);
  }
  return isFileOrPng && isMaxFileSize;
};

/** 处理删除 */
const handleDelete = () => {
  imageUrl.value = '';
  emit('update:modelValue', '');
  emit('update:value', '');
};
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>