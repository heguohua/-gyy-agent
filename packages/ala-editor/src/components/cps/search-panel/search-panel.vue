<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-12 19:11:45
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-22 07:12:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/search-panel/search-panel.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-form-wrapper">
        <el-form ref="formRef" :model="params" class="ala-form">

            <!-- 基础查询条件 -->
            <div class="ala-search-base">

                <div class="ala-search-base-item" v-for="(item, index) in bFields" :key="item.fieldName + '-' + index">

                    <!-- <component :is="item.componentName" :label="isFormDesign ? parseLabel(item.label) : item.label"
                        :position="item.position" :placeholder="item.placeholder" v-bind="item.other"
                        v-model="params[item.fieldName]" :fieldName="item.fieldName" /> -->

                    <component :is="item.componentName" :label="item.label" :item="item" :placeholder="item.placeholder"
                        v-bind="item.other" v-model="params[item.fieldName]" :fieldName="item.fieldName" :data="params"
                        @formItemChangeCallback="(val: any) => formItemChangeCallback(item, val)" />


                </div>

            </div>

            <!-- 高级查询条件 -->
            <div class="ala-search-advanced animate__animated animate__fadeIn " v-if="advanced">

                <div class="ala-search-base-item" v-for="(item, index) in advancedFields"
                    :key="item.fieldName + '-' + index">

                    <component :is="item.componentName" :label="isFormDesign ? parseLabel(item.label) : item.label"
                        :position="item.position" :placeholder="item.placeholder" v-bind="item.other"
                        v-model="params[item.fieldName]" :fieldName="item.fieldName" />

                </div>

            </div>

            <div class="buttons">

                <!-- 高级查询条件 -->
                <el-button type="primary" @click="toggleAdvanced" class="button-more"
                    v-if="advancedFields && advancedFields.length > 0">
                    <v-icon v-if="advanced" icon="up" />
                    <v-icon v-else icon="down" />
                    {{ advanced ? $t('buttons.less') : $t('buttons.more') }}
                </el-button>

                <AlaButton :showButton="showQueryButton" name="query" @query="emit('refresh')" size="default"
                    buttonType="primary" />

                <AlaButton :showButton="showResetButton" name="reset" @reset="clear" size="default"
                    buttonType="primary" />

                <AlaButton :showButton="displayAddButton()" name="add" @add="showAdd()" size="default"
                    buttonType="primary" />

            </div>

        </el-form>
    </div>

</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


// State
const props = defineProps({
    baseFields: {
        type: Array<AlaField>,
        default: []
    },
    advancedFields: {
        type: Array<AlaField>,
        default: []
    },
    params: {
        type: Object,
        default: {}
    },
    showAddForm: {
        type: Boolean,
        default: false
    },
    labelWidth: {
        type: String,
        default: '130px'
    },
    showQueryButton: {
        type: Boolean,
        default: true
    },
    showResetButton: {
        type: Boolean,
        default: true
    },
    showAddButton: {
        type: Boolean,
        default: false
    },
    isFormDesign: {
        type: Boolean,
        default: false
    }
})

const displayAddButton = () => {
    return props.showAddButton;
}
// 高级查询条件控制状态
const advanced = ref(false)

// 触发父节点刷新事件
const emit = defineEmits(['refresh', 'showAdd'])


// 切换高级查询条件按钮
const toggleAdvanced = () => {
    advanced.value = !advanced.value;
}

// 清空表单
const formRef = ref()
const clear = () => {

    // 重置表单数据
    formRef.value.resetFields();

    // 清除 AlaDateRange 类型组件表单数据
    u.clear(props.params)

    // 刷新分页列表数据
    emit('refresh')
}

const showAdd = () => {
    emit('showAdd')
}

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label);
}


const bFields = ref<Array<AlaField>>([])

watch(() => props.baseFields, (baseFields) => {
    const baseSearchFields: Array<AlaField> = []

    if (baseFields && baseFields.length > 0) {

        baseFields.forEach(baseField => {

            if (baseField.componentName === 'AlaInput') {
                baseSearchFields.push(baseField)
            } else if (baseField.componentName === 'AlaDate') {

                // {"componentName":"AlaDate","label":"权益日期","placeholder":"请选择权益日期","fieldName":"time","other":{"dateType":"datetime","format":"YYYY-MM-DD HH:mm","daysBefore":-1,"daysAfter":0},"rules":[{"required":true,"trigger":"change","message":"不能为空"}],"columnNum":1}

                /**
                 * 1）将 AlaDate 类型转换成 时间范围 AlaDateRange ；
                 * 2）dateType 转换成 date ；
                 * 3）将 format 转换成 YYYY-MM-DD ；
                 * 4）将 daysBefore 和 daysAfter 均设置成 -1 ；
                 * 5）清除所有的 rules ；
                 */

                baseField.componentName = 'AlaDateRange'
                const other = baseField.other!
                other.dateType = 'daterange'
                other.format = 'YYYY-MM-DD'
                other.daysBefore = -1
                other.daysAfter = -1
                baseField.rules = []
                other['startFieldName'] = baseField.fieldName + '_start'
                other['endFieldName'] = baseField.fieldName + '_end'
                other['placeholder'] = '请选择'

                baseSearchFields.push(baseField)
            }else if (baseField.componentName === 'AlaSelectTable') {
                baseSearchFields.push(baseField)
            }

        })
    }

    bFields.value = baseSearchFields

}, {
    immediate: true
})


const formItemChangeCallback = (item: any, value: any) => {

    props.params[item.fieldName] = value
    props.params[item.other.startFieldName] = value[item.other.startFieldName]
    props.params[item.other.endFieldName] = value[item.other.endFieldName]

}


defineExpose({ clear })

</script>

<style scoped lang="scss">
.ala-form-wrapper {
    background: #fff;
    margin: 4px 0px;
    border-radius: var(--border-radius);
    padding: 8px 20px;

    .ala-form {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;


        :deep .el-form-item {
            margin-bottom: 12px;
        }

        :deep .el-form-item__label {
            font-size: 0.9rem;
            font-weight: bold;
            padding-right: 6px;
        }

        .buttons {
            display: inline-flex;
            column-gap: 8px;
            padding-left: 8px;

            .button-more {
                background: none;
                border: 0px;
                color: var(--el-button-bg-color);
                font-size: 0.8rem;
                padding: 0px;
                vertical-align: top;
                align-items: baseline;
            }

            :deep(.ala-button-wrapper) {
                align-items: baseline;
            }
        }

        :deep .el-button+.el-button {
            margin: 0px;
        }


        .ala-input-wrapper {
            min-width: 300px;
        }

        .ala-rating-wrapper {
            min-width: 300px;
        }

        .ala-radio-wrapper {
            min-width: 160px;
        }

        .ala-search-base {
            display: inline-flex;
            flex-wrap: wrap;
            column-gap: 16px;

        }

        .ala-search-advanced {
            display: inline-flex;
            flex-wrap: wrap;
            column-gap: 16px;


        }

    }
}
</style>