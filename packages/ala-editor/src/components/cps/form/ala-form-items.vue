<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-07 19:31:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-form-items.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-add-form">
        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose" class="ala-drawer"
            :size="drawerWidth" :with-header="!useFormTitle()">
            <template #header v-if="!useFormTitle()">
                <h4>【 {{ operationType }} 】{{ moduleName }}</h4>
            </template>
            <template #default>

                <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index"
                    :style="columnWidth(item)">
                    <component :is="item.componentName" :label="item.label" :position="labelPosition"
                        :placeholder="item.placeholder" v-bind="item.other" v-model="data[item.fieldName]"
                        :fieldName="item.fieldName" :data="data" @formItemChangeCallback="formItemChangeCallback" />
                </div>

            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick" v-if="cancelButton">
                        {{ $t('buttons.cancel') }}
                    </el-button>
                    <el-button type="primary" @click="confirmClick" v-if="saveButton">
                        {{ $t('buttons.save') }}
                    </el-button>
                    <el-button type="primary" @click="confirmClick" v-if="initiateButton()">
                        {{ $t('buttons.form_initiate') }}
                    </el-button>
                    <!-- <el-button type="primary" @click="confirmClick">{{ $t('button.error') }}</el-button> -->
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
    tipTitle: {
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
    },
    operationType: {
        type: String,
        default: ''
    },
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 500,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'left',
            useFormTitle: false,
        })
    },
    showSaveButton: {
        type: Boolean,
        default: true
    },
    showCancelButton: {
        type: Boolean,
        default: true
    },
    showInitiateButton: {
        type: Boolean,
        default: false
    }
})

const saveButton = computed(() => {
    return props.showSaveButton;
})
const cancelButton = computed(() => {
    return props.showCancelButton;
})
const initiateButton = () => {    
    return props.showInitiateButton;
}

const useFormTitle = () => {
    return props.formAttr.useFormTitle
}

const isHidden = (item: { componentName: string, other?: any }) => {

    if (item.componentName === 'AlaHidden') {
        return 'ala-form-base-item-hidden'
    } else if (item.other && item.other.fullWidth) {
        return 'ala-form-base-item-full-width'
    } else {
        return 'ala-form-base-item'
    }
}

const showDrawer = defineModel({
    type: Boolean,
    default: false
})


const emit = defineEmits(["confirm", "formItemChangeCallback"])
const formItemChangeCallback = (data: any) => {
    console.log('data:', data);

    emit("formItemChangeCallback", data)
}

const direction = ref<DrawerProps['direction']>('rtl')


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const handleClose = (done: () => void) => {
    ElMessageBox.confirm(
        props.closeContent,
        props.tipTitle,
        {
            confirmButtonText: t("buttons.confirm"),
            cancelButtonText: t("buttons.cancel"),
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

// 解构 formAttr，同时保持 formAttr 的响应式
const { formWidth, labelWidth, labelPosition, columnNum } = toRefs(props.formAttr)


// 计算css宽度
// 1、动态计算 drawer 宽度
const drawerWidth = computed((): string => {
    const paddingWidth = 66
    let width = (formWidth.value + paddingWidth) + 'px'
    return width
})


const columnWidth = (item: any) => {

    const paddingWidth = 0

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth.value} ]，form labelWidth[ ${labelWidth.value} ]，form columnNum[ ${columnNum.value} ]，form paddingWidth[ ${paddingWidth} ]`);

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth.value - paddingWidth) / columnNum.value)

    const occupiedColumnNum = item.columnNum || 1
    columnWidth = columnWidth * occupiedColumnNum

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}



</script>
<style scoped lang="scss">
.ala-add-form {
    .ala-drawer {
        width: 500px !important;


        .ala-form-base-item {
            display: inline-block;
        }

        .ala-form-base-item-full-width {
            width: 100%;
        }

        .ala-form-base-item-hidden {
            display: none;
        }

    }
}
</style>
<style lang="scss">
.ala-add-form {

    .ala-drawer {

        .el-drawer__header {
            display: flex;
            padding: 0px !important;
            margin: 0px !important;
            color: #3d446e !important;
            font-size: 1.1rem !important;
            background: #F9F9FA !important;
            padding: 4px 0px !important;
        }

        .el-drawer__body {
            text-align: left;
            display: flex;
            overflow-y: auto;
            flex-wrap: wrap;
            padding: 20px 26px;
            align-items: flex-start;
            align-content: flex-start;
            padding-bottom: 30px;
        }

        .el-drawer__footer {
            padding-bottom: 6px;
        }

        .el-form-item__label {
            color: var(--el-text-color-regular);
            font-size: 0.9rem;
            font-weight: bold;
            justify-content: right;
            text-align: right;
        }

        .el-drawer__footer {
            position: absolute;
            bottom: 0px;
            right: 0px;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__wrapper {
            width: 100% !important;
        }
    }
}
</style>