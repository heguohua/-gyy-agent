<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-17 11:13:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-form">

        <AlaDrawer v-model="showDrawer" :title="'【 详情 】' + getModuleName()" :width="drawerWidth()"
            :direction="direction" @beforeClose="handleClose">
            <template #content>
                <div :class="isHidden(item)" v-for="(item, index) in fields" :key="index" :style="columnWidth(item)">
                    <template v-if="item.formItem.code === 'dateRange'">
                        <component :is="getComponent(item.formItem.code)"
                            :value="{ start: data.item[item.formItem.formData.startFieldName.desktop], end: data.item[item.formItem.formData.endFieldName.desktop] }"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" />
                    </template>

                    <template v-else>
                        <component :is="getComponent(item.formItem.code)"
                            :value="item.formItem.formData.fieldName?.desktop ? data.item[item.formItem.formData.fieldName.desktop] : ''"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" />
                    </template>

                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                </div>
            </template>
        </AlaDrawer>

    </div>

</template>

<script setup lang="ts">
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
        type: Array<any>,
        default: []
    },
    data: {
        type: Object,
        default: {}
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


const isHidden = (item: { componentName: string, other?: any }) => {

    if (item.componentName === 'AlaHidden') {
        return 'ala-detail-item-hidden'
    } else if (item.other && item.other.fullWidth) {
        return 'ala-detail-item-full-width'
    } else {
        return 'ala-detail-item'
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

const { formWidth, labelPosition, labelWidth: lp, columnNum } = toRefs(props.formAttr)

// 计算css宽度
// 1、动态计算 drawer 宽度
const drawerWidth = (): string => {
    const paddingWidth = 66
    let width = (formWidth.value + paddingWidth) + 'px'
    return width
}




const columnWidth = (item: any) => {
    let labelWidth = lp

    const paddingWidth = 14

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth.value - paddingWidth) / columnNum.value)

    const occupiedColumnNum = item.formItem.formData.columnNum.desktop || 1
    columnWidth = columnWidth * occupiedColumnNum

    if (occupiedColumnNum > 1) {
        // 列宽度 需要加上 (occupiedColumnNum-1) * paddingWidth
        columnWidth += (occupiedColumnNum - 1) * paddingWidth
    }

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth.value} ]，form labelWidth[ ${labelWidth.value} ]，form columnNum[ ${columnNum.value} ]，form paddingWidth[ ${paddingWidth} ]，当前组件[ ${item.formItem.code} ]，当前组件列数[ ${occupiedColumnNum} ]`);

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

const getComponent = ((code: string) => {
    const component = 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column'
    return component
})
const labelWidth = () => {
    return (lp.value || '120') + 'px'
}

const getModuleName = () => {
    return props.data?.moduleName ? props.data?.moduleName : props.moduleName
}

</script>
<style scoped lang="scss">
.ala-detail-form {
    .ala-drawer {
        width: 500px !important;


        .ala-detail-item {
            display: flex;
            margin-bottom: 12px;
            margin-right: 7px;

            :deep(.title) {
                text-align: right;
                padding: 8px 0px 8px 0px;
                background: rgb(249 249 250 / 1);
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: right;
                border-radius: 2px;
            }

            :deep(.value) {
                // background: #F9F9FA;
                background: #f3f7fa;
                flex: 1;
                padding: 8px 0px 8px 8px;
                margin-left: 4px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: left;
                border-radius: 2px;

            }

            :deep(.value svg) {
                color: var(--el-input-icon-color, var(--el-text-color-placeholder));
                display: inline-flex;
                flex-shrink: 0;
                flex-wrap: nowrap;
                pointer-events: none;
                text-align: center;
                transition: all var(--el-transition-duration);
                white-space: nowrap;
                margin-right: 2px;
                max-height: 21px;
            }

        }

        .ala-detail-item-full-width {
            width: 100%;
        }

        .ala-detail-item-hidden {
            display: none;
        }

    }
}
</style>
<style lang="scss">
.ala-detail-form {

    .ala-drawer {

        .el-form-item__label {
            color: var(--el-text-color-regular);
            font-size: 0.9rem;
            font-weight: bold;
            justify-content: right;
            text-align: right;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__wrapper {
            width: 100% !important;
        }
    }
}
</style>