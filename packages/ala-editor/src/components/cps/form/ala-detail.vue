<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 12:46:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-form">

        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose" class="ala-drawer"
            :size="drawerWidth()" :with-header="!useFormTitle()">

            <template #header v-if="!useFormTitle()">
                <h4>{{ moduleName }}</h4>
            </template>

            <template #default>

                <!-- <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index" -->
                <div v-for="(column, index) in fields">
                    <!-- <template v-if="formItem.code === 'dateRange'">
                        <component :is="getComponent(formItem.code)"
                            :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                            :formItem="formItem" />
                    </template>
<template v-else> -->
                    <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                    <!-- <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" />
                    </template> -->

                    <template>
                        <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                        <!-- <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" /> -->
                        222
                    </template>

                </div>

            </template>

            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                </div>
            </template>

        </el-drawer>

    </div>

</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import { DrawerProps } from 'element-plus';
import { ref } from 'vue'

// State

const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
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
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 400,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'left',
            useFormTitle: false,
        })
    }
})

const useFormTitle = () => {
    return props.formAttr.value.useFormTitle
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


const direction = ref<DrawerProps['direction']>('rtl')


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const handleClose = (done: () => void) => {
    done()
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    showDrawer.value = false
}



// 计算css宽度
// 1、动态计算 drawer 宽度
const drawerWidth = (): string => {
    const paddingWidth = 66
    let width = (props.formAttr.value.formWidth + paddingWidth) + 'px'
    return width
}

const labelPosition = () => {
    return props.formAttr.value.labelPosition
}



const columnWidth = (item: any) => {
    let formWidth = props.formAttr.value.formWidth
    let labelWidth = props.formAttr.value.labelWidth
    let columnNum = props.formAttr.value.columnNum

    const paddingWidth = 0

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth} ]，form labelWidth[ ${labelWidth} ]，form columnNum[ ${columnNum} ]，form paddingWidth[ ${paddingWidth} ]`);

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth - paddingWidth) / columnNum)

    const occupiedColumnNum = item.columnNum || 1
    columnWidth = columnWidth * occupiedColumnNum

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})

</script>
<style scoped lang="scss">
.ala-detail-form {
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
.ala-detail-form {

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