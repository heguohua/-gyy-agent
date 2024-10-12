<template>
  <el-upload
    :file-list="modelList"
    :list-type="listType"
    :http-request="handleFileUpload"
    :limit="1"
    :on-remove="handleRemove"
    :on-change="handleChange"
    style="width: 100%"
    :class="{ 'is-hidden': modelList.length }"
  >
    <template #trigger>
      <el-button v-if="isVideo" plain>上传</el-button>
      <v-icon v-else icon="upload" class="icon" />
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { UploadUserFile } from 'element-plus'
import { mediaUploadAsync } from '@/api/media'
import { ElMessage } from 'element-plus'

const props = defineProps({
  type: {
    type: String,
    default: 'image',
    validator(val: string) {
      return ['image', 'video'].includes(val)
    },
  },
})

const model = defineModel({ type: String, default: '' })
const isVideo = computed(() => props.type === 'video')
const listType = computed(() => (isVideo.value ? 'text' : 'picture-card'))
const modelList = ref([])

watch(
  model,
  (value) => {
    modelList.value = value
      ? [
          {
            name: 'file',
            url: value,
          },
        ]
      : []
  },
  {
    immediate: true,
  },
)

const handleFileUpload = async (e) => {
  const formData = new FormData()
  formData.append('file', e.file)
  const { status, data, message } = await mediaUploadAsync(formData)
  if (!status) {
    return ElMessage.error('上传失败！' + message)
  }
  if (data.url) {
    model.value = data.url
  }
}

const handleRemove = (uploadFile, uploadFiles) => {
  model.value = ''
}
const handleChange = (uploadFile, uploadFiles) => {
  console.warn(uploadFile, uploadFiles)
}
</script>

<style lang="scss" scoped>
.is-error {
  :deep(.el-upload--picture-card) {
    border: 1px dashed var(--el-color-danger);
  }
}
.icon {
  width: 26px;
  height: 26px;
}
.is-hidden {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
