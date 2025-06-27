<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-27 19:09:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-image.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-select">
        <el-form-item :label="title" :class="isRequired()">
            <el-input v-model="input" :placeholder="placeholder" class="input" readonly type="textarea" autosize />

            <div class="select-file" @click="selectFile">
                <input type="file" ref="fileInput" @change="handleFileChange" :accept="acceptFileTypes"
                    class="hidden-input" :multiple="false" :value="value" />
                <v-icon class="icon" icon="upload" /><i class="button">选择图片</i>
            </div>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { ref } from 'vue'
const editorStore = useEditorStore()

const emit = defineEmits(["callback"])

// State


interface Item {
    name: string,
    value: string
}

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
    bType: {
        type: String,
        default: 'page'
    },
    width: {
        type: Number,
        default: 100,
    },
    clearable: {
        type: Boolean,
        default: false,
    }
})

const bType = props.bType

const { data } = toRefs(props)

const { formData, parentKey, key, id, properties } = data.value

const { title, default: defaultValue, options, placeholder, required, rules } = data.value.properties[props.viewport]
const input = ref('')

const isRequired = () => {
    return required ? 'is-required' : ''
}


logger.info(`bType[ ${bType} ],config-select组件被渲染, options :`, options);
logger.info(`bType[ ${bType} ],config-select组件被渲染, defaultValue :`, defaultValue);

if (defaultValue) {
    input.value = defaultValue
}

watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        input.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(input, (value) => {
    if (!value) return;
    value = u.trim(value)
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
    } else {
        data = { [props.viewport]: _value, required: required ? required : false, title, rules }
    }
    logger.info(`config-select组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
}, {
    immediate: true
})


watch(() => editorStore.globalParams[bType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })


const fileInput = ref()
const value = ref('');
const selectFile = () => {
    fileInput.value.click()
}
const handleFileChange = async (event: any) => {

    const target = event.target as HTMLInputElement
    if (!target.files || target.files.length === 0) return;
    // 支持多选：将 FileList 转成数组便于遍历与过滤
    const files = Array.from(target.files);
    // 1️⃣ 过滤非法类型
    const validFiles = files.filter((f: any) => ALLOWED_TYPES.includes(f.type));
    if (validFiles.length === 0) {
        console.warn("未选择允许的图片类型！");
        return;
    }

    try {
        // 2️⃣ 并行读取：Promise.all 可同时读取多张图片
        const base64List = await Promise.all(
            validFiles.map(u.readFileAsBase64)
        );

        // 3️⃣ 这里将获取到的 base64 列表交给后续逻辑（例如上传 / 预览）

        if (!base64List || base64List.length === 0) {
            return
        }

        console.log('base64List:', base64List);



    } catch (err) {
        console.error("图片读取失败：", err);
    } finally {
        // 可选：清空 input，以便再次选择同一文件触发 change
        target.value = ""
    }

}


const acceptFileTypes = computed(() => {
    return '.jpg, .jpeg, .png, .bmp'
})

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/bmp"] as const;




</script>

<style scoped lang="scss">
.config-select {
    .input {}

    .select-file {
        .hidden-input {
            display: none;
        }

        .icon {}

        .button {}
    }

    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
