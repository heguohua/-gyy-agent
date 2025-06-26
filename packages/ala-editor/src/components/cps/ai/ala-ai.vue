<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-26 21:35:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/ai/ala-ai.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-ai-wrapper" :style="oStyle">

        <el-input type="textarea" autosize :model-value="model" @input="handleChange" :placeholder="placeholder"
            :id="fieldName" class="ala-ai-textarea" :style="opacityStyle">

            <template #prefix v-if="icon">
                <v-icon class="icon" :icon="icon" :width="iconWidth" :height="iconHeight" />
            </template>

        </el-input>

        <div class="icons" :style="opacityStyle">
            <div class="icon-btn">
                <v-icon icon="f_earth" width="23" height="23" />
            </div>
            <div class="icon-btn" v-if="showImageIcon" @click="identifyImage">
                <v-icon icon="f_image" width="22" height="22" />
                <input type="file" ref="fileInput" @change="handleFileChange" :accept="acceptFileTypes"
                    class="hidden-input" :multiple="true" :value="value" />
            </div>
            <div class="icon-btn" v-if="showFileIcon">
                <v-icon icon="f_attachment" width="24" height="24" />
            </div>
            <div class="icon-btn" v-if="showListenIcon">
                <v-icon icon="f_audio" width="24" height="24" />
            </div>
            <div class="vertical-line"></div>
            <div class="icon-send" :style="styles" @click="handleClick">
                <v-icon icon="f_arrow_up" width="26" height="26" />
            </div>
        </div>

        <AlaProcessing title="正在努力识别中。。。" v-if="showLoading" />

    </div>
</template>

<script setup lang="ts">
import { alaPost, alaUpload } from '@/utils/req'
import u from '@/utils/u'



// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    data: {
        type: Object,
        default: () => { }
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    cleanNewlineCharacter: {
        type: Boolean,
        default: false
    },
    showImageIcon: {
        type: Boolean,
        default: false
    },
    showFileIcon: {
        type: Boolean,
        default: false
    },
    showListenIcon: {
        type: Boolean,
        default: false
    }
})

const model = ref("")

const handleChange = (value: string) => {
    model.value = value
}

const styles = computed(() => {

    const style: { [key: string]: any } = {}
    const v = model.value

    if (v && v.trim()) {
        style.background = '#ef4d4b'
    }

    return style
})

// Methods
// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    module: '',
    moduleName: '',
});

const handleClick = () => {

    if (!model.value) {
        return
    }
    const params = {
        className: baseInfo.module,
        content: model.value,
    }

    showLoading.value = true

    try {
        alaPost(u.url('/ai/form/parse'), params, false, '').then((data: any) => {
            const response = data;
            if (response.data?.content) {
                u.merged(props.data, response.data.content)
            }
        }).finally(() => {
            showLoading.value = false
        });

    } catch (err) {
        console.error("图片读取失败：", err);
    } finally {
        // 可选：清空 input，以便再次选择同一文件触发 change
    }
}

const fileInput = ref();
const value = ref('');
const identifyImage = () => {
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

        const params = {
            className: baseInfo.module,
            imageBase64: base64List,
        }

        showLoading.value = true

        alaPost(u.url('/ai/form/images'), params, false, '', 30 * 1000).then((data: any) => {
            const response = data;
            target.value = ""
            if (response.data?.content) {
                model.value = response.data.identifiedText
                u.merged(props.data, response.data.content)
            }
        }).finally(() => {
            showLoading.value = false
        });

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


const showLoading = ref(false)

const opacityStyle = computed(() => {
    const style: { [key: string]: any } = { opacity: 1 }
    if (showLoading.value) {
        style.opacity = 0.1
    }
    return style
})
const oStyle = computed(() => {
    const style: { [key: string]: any } = { borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgb(239,77,75,0.8)' }
    if (showLoading.value) {
        style.borderColor = 'rgb(239,77,75,0.1)'
    }
    return style
})


</script>

<style scoped lang="scss">
.ala-ai-wrapper {

    position: relative;
    margin-top: 40px;
    border-radius: 12px;
    padding-top: 6px;
    min-height: 140px;

    .icons {
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        padding-right: 12px;
        margin-bottom: 8px;

        .icon-btn {
            display: inline-flex;
            padding: 6px;
            border-radius: 16px;
            width: 38px;
            height: 38px;
            align-items: center;
            justify-content: center;
            margin-right: 4px;

            &:hover {
                background: rgb(204, 204, 204, 0.3);
                cursor: pointer;
            }

            .hidden-input {
                display: none;
            }
        }

        :deep(path) {
            stroke: #737373;
            color: #737373;
        }

        :deep(circle) {
            stroke: #737373;
            color: #737373;
        }

        .vertical-line {
            width: 2px;
            border-radius: 1px;
            height: 24px;
            margin-left: 6px;
            margin-right: 16px;
            background-color: rgb(192, 192, 192);
        }

        .icon-send {
            display: inline-flex;
            background: rgb(239, 77, 75, 20%);
            border-radius: 12px;
            width: 36px;
            height: 36px;
            align-items: center;
            justify-content: center;

            :deep(path) {
                stroke: #fff;
                fill: #fff;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    :deep(.el-form-item__content) {
        margin-left: 0px !important;
    }

    :deep(.el-textarea__inner) {
        min-height: 110px !important;
        box-shadow: none;
        padding-bottom: 60px;
        border-radius: 12px;

    }
}
</style>