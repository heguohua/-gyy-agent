<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 11:04:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/file/ala-file.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <div class="ala-files">
        <div v-if="model && model.length > 0" class="files">
          <div class="one-file" v-for="(item, index) in model" :key="u.uuid()">
            <p>{{ item.fieldName }}</p>
            <i @click="handleDelete(item)" class="button">{{ $t('buttons.preview') }}</i>
            <i @click="handleDelete(item)" class="button">{{ $t('buttons.delete') }}</i>
          </div>
        </div>
        <div class="select-file" @click="selectFile">
          <input type="file" ref="fileInput" @change="handleFileChange" accept="*" class="hidden-input"
            multiple></input>
          <v-icon class="icon" icon="upload" /><i class="button">上传文件</i>
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { alaPost } from '@/utils/req'
import u from '@/utils/u'


interface AFile {
  fid: string,
  fieldName: string
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
  files: {
    type: Array<AFile>,
    default: []
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
  }
})

const model = defineModel({
  type: Array<AFile>
})

model.value = [
  {
    fid: '1',
    fieldName: '11',
    classify: 'user',
    url: 'url',
  },
  {
    fid: '2',
    fieldName: '22',
    classify: 'dept',
    url: 'dept',
  }
]

const styles = computed(() => ({ minWidth: props.width + 'px' }))

const handleChange = (value: any) => {
  model.value = value
}


const fileInput = ref();
const selectedFile = ref<Array<File>>([])

const handleFileChange = (event: any) => {

  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {

    for (let i = 0; i < target.files.length; i++) {
      const f: File = target.files[i]
      selectedFile.value.push(f)
    }

    // 上传文件，并更新 model 值

    // 假设 params 是一个对象：{ file: File, otherField: string }
    const formData = new FormData()
    // selectedFile.value.forEach((file: File) => {
    //   // formData.append(key, value as any)
    //   console.log('file:', file);

    // })
    formData.append('file', selectedFile.value[0])
    formData.append('bizPath', '11211')
    formData.append('classify', '11233')

    alaPost(u.url('/f/ossfile/upload'), formData, false, 'POST').then((data: any) => {
      const response = data;
      if (response.code === 200) {
        console.log('response:', response);

      }

    });

  }

}


const selectFile = () => {
  fileInput.value.click()
}

const handleDelete = (item: AFile) => {
  console.log('file : ----->', item);
}

// Methods

</script>

<style scoped lang="scss">
.ala-select-wrapper {
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

        .button {
          margin-left: 10px;
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


      .hidden-input {
        display: none;
      }

      .button {
        margin-left: 8px;
      }
    }


  }

  div {
    .icon {}
  }
}
</style>