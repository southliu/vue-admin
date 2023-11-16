<template>
  <div
    v-if="url"
    class="overflow-hidden relative box"
    :style="`max-width: ${width}px; max-height: ${height}px`"
  >
    <img
      :src="url || ImgError"
      alt="avatar"
      class="w-full h-full object-contain"
    />
        
    <div class="cover">
      <div class="content">
        <el-icon
          class="icon"
          @click="onPreview"
        >
          <EyeOutlined />
        </el-icon>
        <el-icon
          class="icon"
          @click="onDelete"
        >
          <DeleteOutlined />
        </el-icon>
      </div>
    </div>

    <BasicModal
      :isOpen="isOpen"
      title=""
      centered
      style="top: 10px"
      :footer="null"
      @handleCancel="isOpen = false"
    >
      <img
        :src="url || ImgError"
        alt="avatar"
        class="w-full h-full object-contain"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import ImgError from '@/assets/images/imgError.png';
import BasicModal from '@/components/Modal/BasicModal.vue';

defineOptions({
  name: 'PreviewImage'
});

interface DefineEmits {
  (e: 'handleDelete'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  url: string;
  width?: number;
  height?: number;
}

withDefaults(defineProps<DefineProps>(), {
  width: 128,
  height: 128,
});

const isOpen = ref(false);

/** 点击显示图片 */
const onPreview = () => {
  isOpen.value = true;
};

/** 点击删除 */
const onDelete = () => {
  emit('handleDelete');
};
</script>

<style lang="less" scoped>
.box:hover {
  .cover {
    display: block;
  }
}

.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
}

.content {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.icon {
  color: #fff;
  margin: 0 10px;
  cursor: pointer;
}
</style>