<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-09-01 20:30:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-01 20:57:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dialog/ala-dialog.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-dialog">
        <el-dialog v-model="visible" :title="title" :width="width" @closed="closeDialog">

            <slot name="body"></slot>

            <template #footer>
                <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
                <el-button type="primary" @click="handleSubmit">{{ confirmButtonText }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
const visible = ref(false)

const props = defineProps({
    title: {
        type: String
    },
    width: {
        type: String,
        default: () => '400px'
    },
    cancelButtonText: {
        type: String,
        default: () => '取消'
    },
    confirmButtonText: {
        type: String,
        default: () => '确定'
    },
    showDialog: {
        type: Boolean,
        default: () => false
    }
})


watch(() => props.showDialog, (v) => {
    visible.value = v
}, {
    immediate: true
})


const open = () => {
    visible.value = true
}

const close = () => {
    visible.value = false
}

const handleCancel = () => {
    emit("cancel")
    close()
}

const closeDialog = () => {
    emit("close")
}
const emit = defineEmits(['confirm', "cancel", "close"])

const handleSubmit = () => {
    emit("confirm")
}

// 对外暴露方法
defineExpose({ open })

</script>
<style scoped lang="scss">
.ala-dialog {
    :deep(.el-dialog__title) {
        display: flex;
        align-items: center;
    }
}
</style>