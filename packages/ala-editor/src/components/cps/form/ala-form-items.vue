<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-18 19:29:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-form-items.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-add-form" ref="alaAddForm">
        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose" class="ala-drawer"
            :size="drawerWidth()">
            <template #header>
                <h4>【 {{ operationType }} 】{{ moduleName }}</h4>
            </template>
            <template #default>

                <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index">
                    <component :is="item.componentName" :label="item.label"
                        :position="item.position ? item.position : labelPosition" :placeholder="item.placeholder"
                        v-bind="item.other" v-model="data[item.fieldName]" :fieldName="item.fieldName" />
                </div>

            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                    <el-button type="primary" @click="confirmClick">{{ $t('buttons.save') }}</el-button>
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
        default: {}
    },
    labelWidth: {
        type: Number,
        default: 120
    },
    columnWidth: {
        type: Number,
        default: 300
    },
    columnNum: {
        type: Number,
        default: 1
    },
    labelPosition: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    operationType: {
        type: String,
        default: ''
    }
})


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


const emit = defineEmits(["confirm"])

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

// 计算css宽度
// 1、动态计算 drawer 宽度
const paddingSize = 20 * 2
// const marginRightSize = 20
const drawerWidth = (): string => {

    let width = ''
    // 需要考虑 labelPosition 的位置
    if (props.labelPosition === 'left') {
        // (标签宽度 + 表单组件宽度) * 列数 + 最外层元素左右padding的宽度
        width = (props.labelWidth + props.columnWidth) * props.columnNum + paddingSize + 8 + 'px'
        logger.info(`标签宽度[ ${props.labelWidth} ]，列宽度[ ${props.columnWidth} ]，列数量[ ${props.columnNum} ]，总宽度[ (标签宽度 + 表单组件宽度) * 列数 + 最外层元素左右padding的宽度 = ${width} ]`);

    } else if (props.labelPosition === 'top') {
        // (表单组件宽度) * 列数 + 最外层元素左右padding的宽度
        width = (props.columnWidth) * props.columnNum + paddingSize + 8 + 'px'
        logger.info(`列宽度[ ${props.columnWidth} ]，列数量[ ${props.columnNum} ]，总宽度[ (表单组件宽度) * 列数 + 最外层元素左右padding的宽度 = ${width} ]`);
    }
    return width
}

// 2、动态计算 form 表单列内容（ class ： ala-form-base-item ） 宽度 
const alaAddForm = ref<HTMLElement>()
onMounted(() => {
    const columnGapWidth = 16
    const dynamicWidth = computed(() => {

        let width = 0
        if (props.labelPosition === 'left') {
            width = Math.floor(props.labelWidth + props.columnWidth - (props.columnNum - 1) * columnGapWidth / props.columnNum)
        } else if (props.labelPosition === 'top') {
            width = Math.floor(props.columnWidth - (props.columnNum - 1) * columnGapWidth / props.columnNum)
        }

        return width + 'px'
    })

    alaAddForm.value?.style.setProperty('--ala-form-base-item-width', dynamicWidth.value);
})
</script>
<style scoped lang="scss">
.ala-add-form {
    .ala-drawer {
        width: 500px !important;


        .ala-form-base-item {
            display: inline-block;
            width: var(--ala-form-base-item-width);
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
            column-gap: 16px;
            padding-right: 10px;
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