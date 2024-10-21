<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-21 21:21:22
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

const emit = defineEmits(["callback"])

// State


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


watch(() => formData, (value) => {
    logger.info(`config-files组件监听到 baseBlock 的 formData 发生变化,即将更新 src 的属性值,src=value?.[props.viewport]`, value?.[props.viewport]);
    src.value = value?.[props.viewport] || defaultValue
}, {
    immediate: true
})

watch(src, (value) => {
    let data = {}
    const _value = value || ''
    if (Object.values(formData || {}).length < 2) {
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



const fileClick = computed(() => {
    // const fileList = [""]
    // const randomIndex = Math.floor(Math.random() * fileList.length)
    const file_src = "https://picsum.photos/400/600?t=" + new Date().getMilliseconds()
    console.log(file_src)
    src.value = file_src
})

// Methods

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
