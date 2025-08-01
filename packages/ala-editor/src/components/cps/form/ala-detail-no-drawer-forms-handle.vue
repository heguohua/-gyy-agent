<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-01 21:51:24
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-no-drawer-forms-handle.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-form">

        <template class="" v-for="(form, index) in fds" :key="index">

            <div class="ala-form-detail-one">
                <div :class="isHidden(item)" v-for="(item, cIndex) in form.fields" :key="cIndex"
                    :style="columnWidth(item)">

                    <template v-if="item.formItem.code === 'dateRange'">
                        <component :is="getComponent(item.formItem.code)"
                            :value="{ start: form.data[item.formItem.formData.startFieldName.desktop], end: form.data[item.formItem.formData.endFieldName.desktop] }"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" :previewParams="previewParams" :formIndex="index" />
                    </template>

                    <template v-else>
                        <component :is="getComponent(item.formItem.code)"
                            :value="item.formItem.formData.fieldName?.desktop ? form.data[item.formItem.formData.fieldName.desktop] : ''"
                            :formItem="item.formItem" :label="item.label" :labelWidth="labelWidth()"
                            :isDetailPage="true" :previewParams="previewParams" :formIndex="index" />
                    </template>

                </div>
            </div>


        </template>


    </div>
    <div class="ala-detail-form-handle">
        <div class="remark">
            <p class="ala-chapter-icon"></p>
            请填写审核意见
        </div>
        <el-form :model="formData" :label-width="labelWidth()" :rules="rules" ref="formRef">
            <div :class="isHidden(item)" v-for="(item, index) in formFields" :key="item.fieldName + '-' + index"
                :style="formFieldsColumnWidth(item)">
                <component :is="item.componentName" :label="item.label" :position="labelPosition"
                    :placeholder="item.placeholder" v-bind="item.other" v-model="formData[item.fieldName]"
                    :fieldName="item.fieldName" :data="formData" @formItemChangeCallback="formItemChangeCallback" />
            </div>

        </el-form>

        <div class="ala-detail-form-handle-buttons">
            <AlaButton :showButton="true" name="agree" @agree="handleAgree()" buttonType="primary" size="default" />
            <AlaButton :showButton="true" name="reject" @reject="handleReject()" buttonType="danger" size="default" />
            <AlaButton :showButton="true" name="return_to_previous" @return_to_previous="handleReturnToPrevious()"
                buttonType="warning" size="default" :plain="true" />
            <AlaButton :showButton="true" name="return_to_initiator" @return_to_initiator="handleReturnToInitiator()"
                buttonType="warning" size="default" :plain="true" />

        </div>

    </div>


</template>

<script setup lang="ts">
import { alaBuildHidden, alaBuildInput, alaBuildSelectDict, alaBuildTextarea } from '@/config/alaBuilders';
import { alaCard, alaCn, alaCnTw, alaEmail, alaEnumRule, alaLetter, alaLl8, alaLl8_, alaLOrlOr8, alaLOrlOr8Or_, alaNumber, alaNumberMax, alaNumberMin, alaNumberRange, alaPassword, alaPattern, alaPhone, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaTw, alaUrl } from '@/config/alaRules';
import baseRule from '@/config/rules/baseRule';
import { parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from '@/pages/dynamic/formItemParser';
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import AlaChapter from '../chapter/ala-chapter.vue';
import { getRawLowcodingConfigByClassName } from '@/config/formConfigs';
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
    },
    previewParams: {
        type: Object as any
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



watch(() => props.previewParams.forms, (forms) => {

    if (forms && forms.length > 0) {

        forms.forEach(async (form: Form) => {

            const fd: FormData = { data: {}, fields: [] }

            // 查询表单配置信息
            const config = await getRawLowcodingConfigByClassName(form.tableName!)

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

}, { deep: true, immediate: true })

// ########### 审核意见表单区域 start  ###########################################

// 创建一个映射，将函数名字符串映射到函数引用
const ruleFunctions: { [key: string]: Function } = {
    alaRequired: alaRequired,
    alaStrMin: alaStrMin,
    alaStrMax: alaStrMax,
    alaStrLengthRange: alaStrLengthRange,
    alaStrLength: alaStrLength,
    alaNumberMin: alaNumberMin,
    alaNumberMax: alaNumberMax,
    alaNumberRange: alaNumberRange,
    alaPattern: alaPattern,
    alaEnumRule: alaEnumRule,
    alaEmail: alaEmail,
    alaPhone: alaPhone,
    alaUrl: alaUrl,
    alaCard: alaCard,
    alaNumber: alaNumber,
    alaLetter: alaLetter,
    alaLOrlOr8: alaLOrlOr8,
    alaLl8: alaLl8,
    alaLOrlOr8Or_: alaLOrlOr8Or_,
    alaLl8_: alaLl8_,
    alaPassword: alaPassword,
    alaCnTw: alaCnTw,
    alaCn: alaCn,
    alaTw: alaTw,
};

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
}

const formFields = reactive<Array<any>>([
    alaBuildHidden('taskId'),// 固定格式
    alaBuildHidden('taskName'),// 固定格式
    alaBuildHidden('args'),// 固定格式
])
// 查询当前用户审批填写的表单配置数据

const { item } = toRefs(props.data)

formData.value['taskId'] = item.value.id
formData.value['taskName'] = item.value.displayName
formData.value['args'] = item.value.formKey

u.checkNull(item.value['formKey'], "当前审批节点Form表单配置信息", t)
const formConfigs = u.parseJson(item.value['formKey'])
u.checkNull(formConfigs, "当前审批节点Form表单配置信息", t)
u.checkTrue(formConfigs.length == 0, "当前审批节点Form表单配置信息", t)

formConfigs.forEach(async (form: Form) => {

    const fd: FormData = { data: {}, fields: [] }

    // 查询表单配置信息

    const config = await getRawLowcodingConfigByClassName(form.className!)

    u.checkNull(config, "当前审批节点Form表单配置信息", t)

    config.blockConfig?.form.forEach((item: { code: string, formData: any }) => {

        const code = item.code
        const formData = item.formData
        // 组装 form 表单字段
        let formItem: any = {}
        if (code === 'input') {
            formItem = parseInput(formData)
        } else if (code === 'textarea') {
            formItem = parseTextarea(formData)
        } else if (code === 'radio') {
            formItem = parseRadio(formData)
        } else if (code === 'checkbox') {
            formItem = parseCheckbox(formData)
        } else if (code === 'date') {
            formItem = parseDate(formData)
        } else if (code === 'number') {
            formItem = parseNumber(formData)
        } else if (code === 'select') {
            formItem = parseSelect(formData)
        } else if (code === 'slider') {
            formItem = parseSlider(formData)
        } else if (code === 'rating') {
            formItem = parseRating(formData)
        } else if (code === 'switch') {
            formItem = parseSwitch(formData)
        } else if (code === 'divider') {
            formItem = parseDivider(formData)
        } else if (code === 'chapter') {
            formItem = parseChapter(formData)
        } else if (code === 'selectTable') {
            formItem = parseSelectTable(formData)
        } else if (code === 'selectDict') {
            formItem = parseSelectDict(formData)
        } else if (code === 'dateRange') {
            // 类似于时间范围这种表单，需要 使用组件数据回调机制 动态更新具体form中的属性值，因此需要把属性字段名传递到具体组件中
            formItem = parseDateRange(formData)
            formItem.other.startFieldName = formData.startFieldName.desktop
            formItem.other.endFieldName = formData.endFieldName.desktop
        }

        const fieldName = formData.fieldName.desktop
        if (fieldName != 'taskId' && fieldName != 'args' && fieldName != 'taskName') {
            formFields.push(formItem)
        }

        const other = formItem.other || {}

        if (item.formData.columnNum) {
            formItem.columnNum = item.formData.columnNum.desktop
        }

        // 处理 组件 other 中的属性信息
        if (item.formData.help && item.formData.help.desktop) {
            other.help = item.formData.help.desktop
        }
        if (item.formData.icon && item.formData.icon.desktop) {
            other.icon = item.formData.icon.desktop
            other.iconWidth = item.formData.iconWidth.desktop
            other.iconHeight = item.formData.iconHeight.desktop
        }

        formItem.other = other

        // 解析表单验证规则


        const rules: Array<baseRule> = []

        // 非空验证条件
        if (formData.required && formData.required.desktop) {
            rules.push(alaRequired())
        }

        // 添加字符数最少、最多和范围验证
        if (formData.strMin && formData.strMax && formData.strMin.desktop && formData.strMax.desktop) {
            rules.push(alaStrLengthRange(formData.strMin.desktop, formData.strMax.desktop))
        } else if (formData.strMin && formData.strMin.desktop) {
            rules.push(alaStrMin(formData.strMin.desktop))
        } else if (formData.strMax && formData.strMax.desktop) {
            rules.push(alaStrMax(formData.strMax.desktop))
        }

        // 添加 数值最小、最大和范围验证
        if (formData.numberMin && formData.numberMax && formData.numberMin.desktop && formData.numberMax.desktop) {
            rules.push(alaNumberRange(formData.numberMin.desktop, formData.numberMax.desktop))
        } else if (formData.numberMin && formData.numberMin.desktop) {
            rules.push(alaNumberMin(formData.numberMin.desktop))
        } else if (formData.numberMax && formData.numberMax.desktop) {
            rules.push(alaNumberMax(formData.numberMax.desktop))
        }

        if (formData.rules && formData.rules.desktop) {
            const functionName = ruleFunctions[formData.rules.desktop]
            if (!functionName) {
                logger.error(`【 错误，错误，错误 】${formData.rules.desktop} 函数不存在`);
            } else {
                rules.push(ruleFunctions[formData.rules.desktop]())
            }
        }

        formItem.rules = rules

    })

    // 查询数据

    // 添加 formData 到 forms
    // fds.push(fd)

})

const rules = computed(() => {
    const ruless: { [key: string]: object } = {}
    formFields.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})



const emits = defineEmits(['close'])

const beforeSave = (data: any) => {
    const dynamicFormData = { tableName: formConfigs[0].className, columns: u.cloned(data) }
    return dynamicFormData
}
// const url = '/l/dynamic/add'
const url = '/p/task/execute'

const handleAgree = () => {
    post(1)
}
const handleReject = () => {
    post(2)
}
const handleReturnToPrevious = () => {
    post(3)
}

const handleReturnToInitiator = () => {
    post(6)
}

const post = (approveType: number) => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            // 表单验证成功，可以进行表单提交操作
            logger.info(`表单验证通过，formData`, formData.value);

            const data = {};

            // 设置任务 id、提交类型、表单数据
            const task = props.data.item
            const performType = task.performType

            u.merged(data, { approveType, performType, taskId: task.id, formData: u.tojson(beforeSave(formData.value)) })


            // let data = props.formData
            // if (props.beforeSave) {
            //     data = props.beforeSave(data)
            // }

            const response = await postData(url, data)

            if (response) {

                // 清空 formData
                u.clear(formData.value)
                logger.info("【 办理 - 我的任务 】 完成，data", data);

                // 关闭弹窗
                // showDrawer.value = false

                emits("close")

            }

        } else {
            // 表单验证失败，阻止提交
            logger.error(`【 表单验证 不通过 】`);
            notify.error(t('pop.warm_title'), "表单数据不正确，请修改")
        }
    });

}
const postData = async (url: string, item: any): Promise<any> => {

    logger.info(`【 新增数据 】，url${url}，数据对象：`, item);

    const result = await alaPost(u.url(url || ''), item, false, '').then((data: any) => {
        const response = data;
        // emit("refresh", response)
        notify.success(t('pop.warm_title'), "保存成功")
        return response
    });

    return result
}

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
                margin-top: 0;
                margin-bottom: 0;
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
                margin-top: 0;
                margin-bottom: 0;
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
            display: block;
            width: 0px !important;
            margin: 0;
            padding: 0;
        }
    }

}
</style>
<style lang="scss">
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
                margin-top: 0;
                margin-bottom: 0;
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
                margin-top: 0;
                margin-bottom: 0;
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

    .ala-detail-form-handle-buttons {

        margin: 20px 0px 10px 0px;
        text-align: right;

        .ala-button-wrapper {
            margin-right: 16px;

            button {
                border-radius: var(--el-border-radius-round);
            }
        }
    }

    .ala-textarea-wrapper {
        height: 66px !important;

        .el-textarea__inner {
            height: 66px !important;
        }
    }


    .ala-detail-item-hidden {
        display: none;
        height: 0px;
    }

    .remark {
        padding: 0px 0px 22px 16px;
        font-weight: bold;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-items: center;

        .ala-chapter-icon {
            display: inline-block;
            width: 6px;
            border-radius: 1px;
            background: var(--el-color-primary);
            height: 20px;
            margin-right: 8px;
        }

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