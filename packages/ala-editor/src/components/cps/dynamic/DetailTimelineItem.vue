<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-25 09:44:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTimelineItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>


    <el-timeline-item :timestamp="formTimestamp(timestamp)" placement="top" :color="color" :hollow="hollow"
        :center="center" :type="type">
        <el-card>
            <h4 class="title">{{ title }}<i v-if="showDetail" @click="handleShowDetail"
                    class="showDetailButton">查看明细</i></h4>
            <p class="content"><i v-html="content"></i>{{ formContentTimestamp(timestamp) }}</p>
        </el-card>
    </el-timeline-item>


</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import u from '@/utils/u';
import { PropType } from 'vue';

interface Item {
    title: string,
    content: string,
    timestamp: string,
}

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
    placement: {
        type: String,
        default: 'top'
    },
    timestamp: {
        type: Number,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    },
    showDetail: {
        type: Boolean,
        default: () => false
    }
})

// Methods

const formTimestamp = (time: any) => {
    if (time) {
        const format = props.formItem.formData.timestampFormat?.desktop ? props.formItem.formData.format.desktop : 'YYYY-MM-DD'
        return date.formatDateTime(Number.parseInt(time), format)
    }

}

const formContentTimestamp = (time: any) => {
    if (time) {
        const format = props.formItem.formData.contentTimestampFormat?.desktop ? props.formItem.formData.format.desktop : '"YYYY-MM-DD HH:mm:ss"'
        const t = date.formatDateTime(Number.parseInt(time), format)
        return t.replaceAll('"', '')
    }
}

const type = computed(() => {
    const value = props.formItem.formData.type?.desktop ? props.formItem.formData.type.desktop : 'primary'
    return value
})

const color = computed(() => {
    const value = props.formItem.formData.color?.desktop ? props.formItem.formData.color.desktop : ''
    return value
})

const hollow = computed(() => {
    const value = props.formItem.formData.hollow?.desktop ? props.formItem.formData.hollow.desktop : false
    return value
})
const center = computed(() => {
    const value = props.formItem.formData.center?.desktop ? props.formItem.formData.center.desktop : false
    return value
})


const emit = defineEmits(['handleShowDetail'])
const handleShowDetail = () => {
    emit('handleShowDetail')
}

</script>

<style scoped lang="scss">
.title {
    .showDetailButton {
        color: #aaa;
        margin-left: 10px;
        display: inline;
        font-style: italic !important;
        font-family: "Times New Roman", serif;
        &:hover{
            color:#409eff;
            cursor: pointer;
        }
    }
}

.content {
    margin-top: 4px;

    i {}
}

:deep(.el-card__body) {
    padding: 14px 20px;
}
</style>
