<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 18:54:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/drawer/ala-add-form.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-add-form">
        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose">
            <template #header>
                <h4>这里是标题区域</h4>
            </template>
            <template #default>

                <div class="ala-search-base-item" v-for="(item, index) in fields" :key="item.fieldName + '-' + index">
                    <component :is="item.componentName" :label="item.label" :position="item.position"
                        :placeholder="item.placeholder" v-bind="item.other" v-model="data[item.fieldName]"
                        :fieldName="item.fieldName" />
                </div>

            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">cancel</el-button>
                    <el-button type="primary" @click="confirmClick">confirm</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import { DrawerProps, ElMessageBox } from 'element-plus';
import { ref } from 'vue'

// State

const props = defineProps({
    closeTitle: {
        type: String,
        default: '温馨提示：'
    },
    closeContent: {
        type: String,
        default: '您确定要关闭新增页面吗？'
    },
    moduleName: {
        type: String,
        default: ''
    },
    fields: {
        type: Array<AlaField>,
        default: []
    },
    data: {
        type: Object,
        default: {}
    }
})

const showDrawer = defineModel({
    type: Boolean,
    default: false
})


const emit = defineEmits(["confirm"])

const direction = ref<DrawerProps['direction']>('rtl')



// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const handleClose = (done: () => void) => {
    ElMessageBox.confirm(
        props.closeContent,
        props.closeTitle,
        {
            confirmButtonText: '确认关闭',
            cancelButtonText: '取消关闭',
            type: 'warning',
        })
        .then(() => {
            done()
        })
        .catch(() => {
            logger.info("点击右上角关闭按钮，弹出取消提示信息框，用户选择【取消关闭】");
        })
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    showDrawer.value = false
}

/**
 * 点击确认按钮，弹窗消息提示框
 */
function confirmClick() {
    emit("confirm", {
        // data: {
        //     [key]: data
        // },
        // id
        abc: 123
    })
}


</script>

<style scoped lang="scss"></style>