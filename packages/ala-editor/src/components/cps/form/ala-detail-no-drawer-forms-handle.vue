<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-08 18:29:57
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-no-drawer-forms-handle.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-form">

        <template class="" v-for="(form, index) in fds" :key="index">

            <div class="ala-form-detail-one">
                <div :class="isHidden(item)" v-for="(item, index) in form.fields" :key="index"
                    :style="columnWidth(item)">

                    <template v-if="item.formItem.code === 'dateRange'">
                        <component :is="getComponent(item.formItem.code)"
                            :value="{ start: form.data[item.formItem.formData.startFieldName.desktop], end: form.data[item.formItem.formData.endFieldName.desktop] }"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" />
                    </template>

                    <template v-else>
                        <component :is="getComponent(item.formItem.code)"
                            :value="item.formItem.formData.fieldName?.desktop ? form.data[item.formItem.formData.fieldName.desktop] : ''"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" />
                    </template>

                </div>
            </div>


        </template>


    </div>
    <div class="ala-detail-form-handle">
        <el-form :model="formData" :label-width="labelWidth()" :rules="rules" ref="formRef">
            <div :class="isHidden(item)" v-for="(item, index) in formFields" :key="item.fieldName + '-' + index"
                :style="formFieldsColumnWidth(item)">
                <component :is="item.componentName" :label="item.label" :position="labelPosition"
                    :placeholder="item.placeholder" v-bind="item.other" v-model="formData[item.fieldName]"
                    :fieldName="item.fieldName" :data="formData" @formItemChangeCallback="formItemChangeCallback" />
            </div>

        </el-form>

    </div>

</template>

<script setup lang="ts">
import { alaBuildHidden, alaBuildInput, alaBuildSelectDict, alaBuildTextarea } from '@/config/alaBuilders';
import { alaRequired } from '@/config/alaRules';
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
interface Form {
    id: number,
    tableName: string,
    className?: string,
}
const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    moduleName: {
        type: String,
        default: ''
    },
    forms: {
        type: Array<Form>,
        default: []
    },
    data: {
        type: Object,
        default: { item: {} }
    },
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 400,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'right',
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


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const columnWidth = (item: any) => {

    let formWidth = props.formAttr.formWidth
    let labelWidth = props.formAttr.labelWidth
    // let columnNum = 3
    let columnNum = props.formAttr.columnNum

    const paddingWidth = 80

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth - paddingWidth) / columnNum)

    let occupiedColumnNum = item.formItem.formData.columnNum.desktop || 1

    if (occupiedColumnNum > columnNum) {
        occupiedColumnNum = columnNum
    }

    columnWidth = columnWidth * occupiedColumnNum

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth} ]，form labelWidth[ ${labelWidth} ]，form columnNum[ ${columnNum} ]，form paddingWidth[ ${paddingWidth} ]，当前组件[ ${item.formItem.code} ]，当前组件列数[ ${occupiedColumnNum} ]`);

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

const getComponent = ((code: string) => {
    const component = 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column'
    return component
})

const labelWidth = () => {
    return props.formAttr?.labelWidth + 'px' || '120px'
}

interface FormData {
    data: { [key: string]: any },
    fields: Array<any>
}

const fds = reactive<Array<FormData>>([])

if (props.forms && props.forms.length > 0) {

    props.forms.forEach(async (form: Form) => {

        const fd: FormData = { data: {}, fields: [] }

        // 查询表单配置信息

        const lowcodingConfigUrl = '/l/lowcodingConfig/list'
        const lowcodingConfigParams = { className: form.tableName }

        await alaPost(u.url(lowcodingConfigUrl || ''), lowcodingConfigParams, false, '').then((data: any) => {
            const response = data;

            const config = u.parseJson(response.data[0].config)
            config.blockConfig?.form.forEach((item: { code: string, formData: any }) => {

                const code = item.code
                const formData = item.formData
                // 组装详情页面字段
                // 注意，注意，注意！这里需要保持和列表字段解析一致
                if (code === 'dateRange') {
                    const column = { prop: 'dateRange' + date.formatDateTime(new Date().getTime(), 'YYYYMMDDHHmmss'), label: formData.label.desktop, formItem: item }
                    fd.fields.push(column)
                } else {
                    const column = { prop: formData.fieldName?.desktop, label: formData.label?.desktop, formItem: item }
                    fd.fields.push(column)
                }

            })

        });

        // 查询数据
        const dynamicTableUrl = '/l/dynamic/get'
        const dynamicTableParams = { tableName: form.tableName, id: form.id }

        await get(u.url(dynamicTableUrl || ''), dynamicTableParams).then((response: any) => {
            fd.data = response.data.data || {}
        });

        // 添加 formData 到 forms
        fds.push(fd)

    })
}

// ########### 审核意见表单区域 start  ###########################################
const { formWidth, labelPosition, columnNum } = toRefs(props.formAttr)

const formFieldsColumnWidth = (item: any) => {

    const paddingWidth = 80

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth.value} ]，form labelWidth[ ${labelWidth()} ]，form columnNum[ ${columnNum.value} ]，form paddingWidth[ ${paddingWidth} ]`);

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth.value - paddingWidth) / columnNum.value)

    const occupiedColumnNum = item.columnNum || 1
    columnWidth = columnWidth * occupiedColumnNum

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}



const formRef = ref()

const formData = ref<{ [key: string]: any }>({})

const formItemChangeCallback = (data: any) => {
    console.log('formItemChangeCallback -- > data:', data);
}

const formFields = ref([
    alaBuildHidden('id'),// 固定格式
    alaBuildInput("name", '唯一编码', [alaRequired()]),
    alaBuildInput("displayName", '显示名称', [alaRequired()]),
    alaBuildSelectDict("typeEntity", "流程分类", { "dictValue": "pType" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [alaRequired()], "请选择流程分类", { clearable: true }),
    alaBuildInput("icon", '图标', [alaRequired()]),
    alaBuildTextarea("remark", "备注", [], "请输入流程说明"),
])
// 查询当前用户审批填写的表单配置数据

const { item } = toRefs(props.data)
if (!item.value['formKey']) {

}
u.checkNull(item.value['formKey'], "当前审批节点没有配置Form表单", t)
const formConfigs = u.parseJson(item.value['formKey'])
u.checkNull(formConfigs, "当前审批节点没有配置Form表单", t)
u.checkBoolean(formConfigs.length == 0, "当前审批节点没有配置Form表单", t)

formConfigs.forEach(async (form: Form) => {

    const fd: FormData = { data: {}, fields: [] }

    // 查询表单配置信息

    const lowcodingConfigUrl = '/l/lowcodingConfig/list'
    const lowcodingConfigParams = { className: form.className }

    await alaPost(u.url(lowcodingConfigUrl || ''), lowcodingConfigParams, false, '').then((data: any) => {
        const response = data;
        console.log('response:',response);
        
        // const config = u.parseJson(response.data[0].config)
        // config.blockConfig?.form.forEach((item: { code: string, formData: any }) => {

        //     const code = item.code
        //     const formData = item.formData
        //     // 组装详情页面字段
        //     // 注意，注意，注意！这里需要保持和列表字段解析一致
        //     if (code === 'dateRange') {
        //         const column = { prop: 'dateRange' + date.formatDateTime(new Date().getTime(), 'YYYYMMDDHHmmss'), label: formData.label.desktop, formItem: item }
        //         fd.fields.push(column)
        //     } else {
        //         const column = { prop: formData.fieldName?.desktop, label: formData.label?.desktop, formItem: item }
        //         fd.fields.push(column)
        //     }

        // })

    });

    // 查询数据
  
    // 添加 formData 到 forms
    // fds.push(fd)

})

const rules = computed(() => {
    const ruless: { [key: string]: object } = {}
    formFields.value.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})

console.log('props.data:', props.data);


// ########### 审核意见表单区域 end  ###########################################



</script>
<style scoped lang="scss">
.ala-detail-form {
    .ala-form-detail-one {
        margin-bottom: 30px;


        .ala-detail-item {
            display: inline-flex;
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

            :deep(.ala-chapter) {
                background: rgb(64 158 255 / 10%);
                box-shadow: 8px 0 0 0 rgb(64 158 255 / 10%), -8px 0 0 0 rgb(64 158 255 / 10%);
                padding: 16px 8px;
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
    .ala-form-detail-one {
        margin-bottom: 30px;

        div {}


        .ala-detail-item {
            display: inline-flex;
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

            :deep(.ala-chapter) {
                background: rgb(64 158 255 / 10%);
                box-shadow: 8px 0 0 0 rgb(64 158 255 / 10%), -8px 0 0 0 rgb(64 158 255 / 10%);
                padding: 16px 8px;
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

.ala-detail-form-handle {
    background: rgb(249, 249, 250);
    padding: 20px 0px;
    border-radius: 8px;

    .el-form-item__label {
        text-align: right;
    }
}
</style>
<style lang="scss">
.ala-detail-form {

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
</style>