<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 11:19:24
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/image/ala-image.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-file-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
      </template>
      <div class="ala-files">
        <div v-if="localValues && localValues.length > 0" class="files">
          <div class="one-file" v-for="(item, index) in localValues" :key="u.uuid()">
            <p class="file-name">{{ item.fileName }}</p>
            <i @click="handlePreview(item)" class="button">{{ $t('buttons.download') }}</i>
            <i @click="handleDelete(item)" class="button">{{ $t('buttons.delete') }}</i>
          </div>
        </div>
        <div class="select-file" @click="selectFile">
          <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden-input"
            :multiple="multipleFile" :value="value" />
          <v-icon class="icon" icon="upload" /><i class="button">上传图像</i>
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaDelete, alaDownload, alaPost, alaUpload } from '@/utils/req'
import u from '@/utils/u'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface AFile {
  id: number,
  fid: string,
  fileName: string
  classify: string
  url: string
}

// State
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  position: {
    type: String as () => '' | 'top' | 'left' | 'right',
    default: 'left'
  },
  placeholder: {
    type: String,
    default: ''
  },
  fileTypes: {
    type: Array<string>,
    default: () => []
  },
  width: {
    type: Number,
    default: 100,
  },
  fieldName: {
    type: String,
    default: ''
  },
  help: {
    type: String,
  },
  oneLevel: {
    type: String,
    default: () => 'ala'
  },
  secondLevel: {
    type: String,
    default: () => 'demo'
  },
  multipleFile: {
    type: Boolean,
    default: () => false
  },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
    }
})

const localValues = ref<Array<AFile>>([])


const model = defineModel({
  type: String,
  default: () => '[]'
})
watch(() => model.value, () => {

  if (model && model.value) {
    localValues.value = u.parseJson(model.value)
  } else {
    localValues.value = []
    model.value = '[]'
  }

}, {
  immediate: true,
  deep: true
})


const fileInput = ref();
const value = ref('');

const handleFileChange = async (event: any) => {

  const target = event.target as HTMLInputElement

  const oneLevel = props.oneLevel
  const secondLevel = props.secondLevel

  if (target.files && target.files.length > 0) {
    for (let i = 0; i < target.files.length; i++) {
      const f: File = target.files[i]
      const result = await upload(f, secondLevel, oneLevel)
      if (result.code === 200 && result.data?.id) {
        let m = u.parseJson(model.value)
        if (!Array.isArray(m)) {
          m = []
        }
        m.push(result.data)
        model.value = u.tojson(m)
        target.value = ""
      }
    }
    // 上传文件，并更新 model 值
  }
}

const upload = async (file: File, bizPath: string, classify: string) => {
  // 假设 params 是一个对象：{ file: File, otherField: string }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizPath', bizPath)
  formData.append('classify', classify)
  const result = await alaUpload(u.url('/f/ossfile/upload'), formData, false, 'POST').then((data: any) => {
    const response = data;
    return response
  });

  return result
}

const selectFile = () => {
  fileInput.value.click()
}

const handlePreview = async (file: AFile) => {

  const result = await alaDownload(u.url('/f/ossfile/download'), { fid: file.fid }).then((data: any) => {
    const response = data;
    return response
  });

  const blob = new Blob([result.data]);
  const downloadUrl = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = file.fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl); // 释放内存

}

const deleteContent = (fileName: string) => {
  const content = t('pop_content.delete', { content: fileName + ' 文件' })
  return content
}

const handleDelete = (file: AFile) => {
  ElMessageBox.confirm(
    deleteContent(file.fileName),
    t('pop.warm_title'),
    {
      confirmButtonText: t("buttons.confirm"),
      cancelButtonText: t("buttons.cancel"),
      type: 'warning',
    })
    .then(async () => {
      logger.info("用户选择【确认】按钮，即将删除数据，当前对象id为：", file);
      const result = await alaDelete(u.url('/f/ossfile/delete'), { id: file.id }, false).then((data: any) => {
        const response = data;
        return response
      });
      if (result.code === 200) {

        const fs = u.parseJson(model.value)
        const index = fs.findIndex((item: any) => item.id === file.id)
        if (index !== -1) {
          fs.splice(index, 1)
        }

        model.value = u.tojson(fs)

      }
    })
    .catch(() => {
      logger.info("用户选择【返回】按钮");
    })
}

// Methods
</script>

<style scoped lang="scss">
.ala-file-wrapper {
  .ala-files {

    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .files {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      row-gap: 4px;

      .one-file {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;

        .file-name {
          color: var(--el-color-primary);
        }

        .button {
          margin-left: 1rem;
          /* Safari */
          -webkit-user-select: none;
          /* Firefox */
          -moz-user-select: none;
          /* IE/Edge */
          -ms-user-select: none;
          /* 标准语法 */
          user-select: none;

          &:hover {
            cursor: pointer;
            color: var(--el-color-primary)
          }
        }

      }

    }

    .select-file {
      background: var(--color-config-block-bg);
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      border-radius: 0.2rem;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }


      .hidden-input {
        display: none;
      }

      .button {
        margin-left: 8px;
      }
    }


  }

}
</style>