<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-25 11:30:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/ai/ala-ai.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-ai-wrapper">

        <el-input type="textarea" autosize :model-value="model" @input="handleChange" :placeholder="placeholder"
            :id="fieldName" class="ala-ai-textarea">

            <template #prefix v-if="icon">
                <v-icon class="icon" :icon="icon" :width="iconWidth" :height="iconHeight" />
            </template>

        </el-input>

        <div class="icons">
            <div class="icon-btn online">
                <v-icon icon="f_earth" width="23" height="23" />
            </div>
            <div class="icon-btn attachment">
                <v-icon icon="f_attachment" width="24" height="24" />
            </div>
            <div class="vertical-line"></div>
            <div class="icon-send" :style="styles" @click="">
                <v-icon icon="f_arrow_up" width="26" height="26" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">


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



</script>

<style scoped lang="scss">
.ala-ai-wrapper {

    position: relative;
    margin-top: 40px;
    border: 1px solid #ef4d4b;
    border-radius: 12px;
    padding-top: 6px;

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
        }

        .online {
            :deep(path) {
                stroke: #737373;
            }
        }

        .attachment {
            :deep(path) {
                stroke: #737373;
            }
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