<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:23:35
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTextareaColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <template v-if="isDetailColumn">


        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <div class="value detail-link" @click="showDetail">
            <div class="omit">
                <el-tooltip effect="light" :content="value" :hide-after="0" v-if="!isDetailPage">
                    {{ showValue }}
                </el-tooltip>
                <template v-else>
                    {{ showValue }}
                </template>
            </div>
        </div>

    </template>
    <template v-else>
        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <div class="value">
            <div class="omit">
                <el-tooltip effect="light" :content="value" :hide-after="0" v-if="!isDetailPage">
                    {{ showValue }}
                </el-tooltip>
                <template v-else>
                    {{ showValue }}
                </template>
            </div>
        </div>
    </template>


</template>

<script setup lang="ts">

// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

// Methods

const showValue = computed(() => {
    if (props.isDetailPage) {
        return props.value
    }
    const maxlength = props.formItem.formData.pageMax?.desktop || 6
    let value = props.value

    // value = value.replaceAll('；', '；\n')
    if (value && value.length > maxlength) {
        value = value.slice(0, maxlength) + '...'
    }
    return value
})

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

const emit = defineEmits(['showDetail', 'refresh'])
const showDetail = () => {
    emit('showDetail', props.data)
}


</script>

<style scoped lang="scss">
.omit {
    background: #f3f7fa;
    border-radius: 4px;
    padding: 4px;
    white-space: pre-line;
    width: 100%;
    word-break: break-all;
    line-height: 1.7rem;
}

.detail-link {
    color: var(--el-menu-active-color);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        font-weight: 500;
    }
}
</style>
