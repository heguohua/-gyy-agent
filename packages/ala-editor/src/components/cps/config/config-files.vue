<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 10:32:19
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/config/config-files.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-files">
        <el-form-item :label="title">
            <img v-if="src" :src="src" class="image" @click="fileClick" />
            <div v-else class="file" @click="fileClick">
                <v-icon class="icon" icon="upload" />
            </div>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ref } from 'vue'
import { useEditorStore } from '@/store/useEditorStore';

const emit = defineEmits(["callback"])

// State
const editorStore = useEditorStore()

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
})


const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue } = data.value.properties[props.viewport]
const src = ref('')

logger.info("config-files组件被渲染, formData :", formData);


watch(() => formData, (form_data) => {

    if (form_data.src?.[props.viewport]) {
        logger.error(`config-files组件 【 监听到 】 editorStore.currentSelect 的 formData 发生变化,即将更新 src 的属性值,src=form_data.src[props.viewport]`, form_data.src?.[props.viewport]);
        src.value = form_data.src?.[props.viewport] || defaultValue
    } else {
        logger.error("config-files组件 【 监听到 】 editorStore.currentSelect 的 formData 发生变化,form_data.src?.[props.viewport]值不存在,不更新 src 属性值");
    }
}, {
    immediate: true
})

watch(() => editorStore.globalParams, () => {

    const form_data = formData
    if (form_data.src?.[props.viewport]) {
        logger.error(`config-files组件 【 监听到 】 editorStore 的 globalParams 发生变化,即将更新 src 的属性值,src=form_data.src[props.viewport]`, form_data.src?.[props.viewport]);
        src.value = form_data.src?.[props.viewport] || defaultValue
    } else {
        logger.error("config-files组件 【 监听到 】 editorStore 的 globalParams 发生变化,form_data.src?.[props.viewport]值不存在,不更新 src 属性值");
    }
}, { deep: true })

watch(src, (value) => {
    let data = {}
    const _value = value || ''
    console.log('value:', value);
    editorStore.currentSelect?.formData
    if (Object.values(editorStore.currentSelect?.formData || {}).length < 1) {
        data = { desktop: _value, mobile: _value }
    } else {
        data = { [props.viewport]: _value }
    }
    logger.info(`config-files组件 src 发生变化,即将调用父组件callback,key[${key}],id[${id}],data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
})


import Image1 from '@/assets/images/p-demo/1.jpeg'
import Image2 from '@/assets/images/p-demo/2.jpeg'
import Image3 from '@/assets/images/p-demo/3.jpeg'
import Image4 from '@/assets/images/p-demo/4.jpeg'

const fileClick = computed(() => {
    const fileList = [Image1, Image2, Image3, Image4]
    const randomIndex = Math.floor(Math.random() * fileList.length)

    src.value = fileList[randomIndex]

    // const file_src = "https://picsum.photos/400/600?t=" + new Date().getMilliseconds()
    // console.log(file_src)
    // src.value = file_src
})

// Methods
onUpdated(() => {
    logger.error("config-files组件被更新");
 
})

</script>

<style scoped lang="scss">
.config-files {

    .file,
    .image {
        width: 80px;
        height: 80px;
        box-shadow: 0 0 0 1px var(--color-border) inset;
        border-radius: var(--border-radius);
        background: var(--color-config-block-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .is-error {

        .file,
        .image {
            box-shadow: 0 0 0 1px var(--el-color-danger) inset;
        }

        :deep(.el-upload--picture-card) {
            border: 1px dashed var(--el-color-danger);
        }
    }

    .image {
        border: 0;
        width: 82px;
        height: 82px;
        object-fit: cover;
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
}
</style>
