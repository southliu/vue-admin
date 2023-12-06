<template>
  <Spin :spinning="isLoading">
    <div
      v-if="fileInfo.id"
      class="flex mt-5px"
    >
      <span>
        {{ fileInfo.name || '-' }}
      </span>
      <div
        class="ml-10px p-3px cursor-pointer"
        @click="handleDelete"
      >
        <Icon icon="material-symbols:delete-outline" />
      </div>
    </div>
    <Upload
      v-else
      v-model:file-list="fileList"
      name="files"
      :show-upload-list="false"
      :accept="accept"
      :data="{ source }"
      :action="!isFileStream ? uploadFileUrl : ''"
      :headers="headers"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <Button>
        <UploadOutlined />
        {{ text || '点击上传' }}
      </Button>
    </Upload>
  </Spin>
</template>

<script lang="ts" setup>
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { onMounted, watch, ref } from 'vue';
import { Button, Spin, Upload, message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { getLocalInfo } from '@/utils/local';
import { TOKEN } from '@/utils/config';
import { getAuthorizationUrl, uploadFileUrl } from '@/servers/public/file';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'BasicUploadFile'
});

interface DefineEmits {
  (e: 'update:modelValue', value: string | Blob): void;
  (e: 'update:value', value: string | Blob): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  modelValue?: string;
  value?: string | Blob;
  text?: string;
  accept?: string;
  isFileStream?: boolean; // 是否是文件流
  source?: number; // 来源
  fileSize?: number; // 限制上传文件大小(MB)
}

const props = withDefaults(defineProps<DefineProps>(), {
  source: 1,
  accept: 'image/png,image/jpeg',
  fileSize: 5,
  isFileStream: false
});

const isLoading = ref(false);
const fileList = ref([]);
const fileInfo = ref({
  id: '',
  name: ''
});
const headers = {
  authorization: (getLocalInfo(TOKEN) || '') as string,
};

onMounted(() => {
  fileInfo.value.id = String(props.modelValue || props.value || '');
  if (fileInfo.value.id && !fileInfo.value.name && !props.isFileStream) getImgUrl(fileInfo.value.id);
});

watch(() => [props.modelValue, props.value], () => {
  fileInfo.value.id = String(props.modelValue || props.value || '');
  if (fileInfo.value.id && !fileInfo.value.name && !props.isFileStream) getImgUrl(fileInfo.value.id);
});

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const acceptArr = props.accept?.split(',');
  acceptArr.forEach((item) => item?.trim());
  const isMaxFileSize = file.size / 1024 / 1024 < props.fileSize;
  if (!isMaxFileSize) {
    message.error(`文件不能大于${props.fileSize}MB!`);
  }

  if (props.isFileStream) {
    fileInfo.value.name = file?.name || '';
    emit('update:value', file);
    emit('update:modelValue', file);
    return false;
  }

  return isMaxFileSize;
};

/**
 * 获取url中的图片名
 * @param url - 链接
 */
const getImgNameByUrl = (url: string) => {
  if (!url) return '';

  const uri = url?.split('?')?.[0] || url;
  let lastIndex = uri?.lastIndexOf('/') + 1;
  let name = uri?.substring(lastIndex, uri?.length);
  lastIndex = name?.lastIndexOf('.');
  const suffix = name?.substring(lastIndex, name?.length) || '';
  lastIndex = name?.lastIndexOf('_');
  name = name?.substring(0, lastIndex) || '';
  return name + suffix;
};

/** 获取图片对应的url */
const getImgUrl = async (url: string) => {
  if (!url && fileInfo.value.name && !props.isFileStream) return;

  try {
    isLoading.value = true;
    const { code, data } = await getAuthorizationUrl(url);
    if (Number(code) !== 200) return;
    fileInfo.value.name = getImgNameByUrl(data) || '';
  } finally {
    isLoading.value = false;
  }
};

const handleChange = (info: UploadChangeParam) => {
  // 如果是文件流
  if (props.isFileStream) return;

  const { response } = info.file;
  if (response?.length) {
    isLoading.value = false;
    const { code, value } = response[0];
    if (Number(code) === 200) {
      fileInfo.value.id = value;
      fileInfo.value.name = info.file?.name || '';
      emit('update:modelValue', fileInfo.value.id);
      emit('update:value', fileInfo.value.id);
    }
  }
};

/** 点击删除文件 */
const handleDelete = () => {
  fileInfo.value.id = '';
  fileInfo.value.name = '';
  emit('update:modelValue', fileInfo.value.id);
  emit('update:value', fileInfo.value.id);
};
</script>