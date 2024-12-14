<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-12 19:11:45
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-14 18:33:04
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

                <div class="ala-search-base-item" v-for="(item, index) in baseFields"
                    :key="item.fieldName + '-' + index">

                    <component :is="item.componentName" :label="isFormDesign ? parseLabel(item.label) : item.label"
                        :position="item.position" :placeholder="item.placeholder" v-bind="item.other"
                        v-model="params[item.fieldName]" :fieldName="item.fieldName" />

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
    console.log('label', label);
    return t(label);
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