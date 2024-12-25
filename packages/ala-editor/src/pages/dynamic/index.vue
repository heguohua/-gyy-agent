<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 20:30:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null })" labelWidth="180px" :showAddButton="true" />

    <!-- 分页列表 -->
    <PageDynamicTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="true" :showDeleteButton="true" :showAddButton="true" :className="className">

        <template #cols="{ row, columnName, formItem }">
            <AlaPageViewStatus v-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <template v-else-if="formItem.code === 'textarea'">
                <TextareaColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'radio'">
                <RadioColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'checkbox'">
                <CheckboxColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'select'">
                <SelectColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'slider'">
                <SliderColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'rating'">
                <RatingColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'selectApi'">
                <SelectApiColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'selectTree'">
                <SelectTreeColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'selectDict'">
                <SelectDictColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'selectTable'">
                <SelectTableColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'number'">
                <NumberColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'xiaoshu'">
                <XiaoshuColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'switch'">
                <SwitchColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'date'">
                <DateColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else-if="formItem.code === 'dateRange'">
                <DateRangeColumn :value="row[columnName]" :formItem="formItem" />
            </template>
            <template v-else>
                <InputColumn :value="row[columnName]" :formItem="formItem" />
            </template>
        </template>

    </PageDynamicTable>

    <!-- 新增、编辑 -->
    <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" :basicFields="addFormFields"
        :formAttr="getFormAttr" :className="className" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Add from '@/pages/dynamic/add.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildDivider, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildSwitch } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import { parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from './formItemParser';
import { alaStrLengthRange, alaRequired, alaStrMax, alaStrMin, alaStrLength, alaNumberMin, alaNumberMax, alaNumberRange, alaPattern, alaEnumRule, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaLOrlOr8Or_, alaLl8_, alaPassword, alaCnTw, alaCn, alaTw } from "@/config/alaRules";
import baseRule from '@/config/rules/baseRule';
import InputColumn from '@/components/cps/dynamic/InputColumn.vue';
import TextareaColumn from '@/components/cps/dynamic/TextareaColumn.vue';
import RadioColumn from '@/components/cps/dynamic/RadioColumn.vue';
import CheckboxColumn from '@/components/cps/dynamic/CheckboxColumn.vue';
import SelectColumn from '@/components/cps/dynamic/SelectColumn.vue';
import SliderColumn from '@/components/cps/dynamic/SliderColumn.vue';
import RatingColumn from '@/components/cps/dynamic/RatingColumn.vue';
import SelectApiColumn from '@/components/cps/dynamic/SelectApiColumn.vue';
import SelectTreeColumn from '@/components/cps/dynamic/SelectTreeColumn.vue';
import SelectDictColumn from '@/components/cps/dynamic/SelectDictColumn.vue';
import SelectTableColumn from '@/components/cps/dynamic/SelectTableColumn.vue';
import NumberColumn from '@/components/cps/dynamic/NumberColumn.vue';
import XiaoshuColumn from '@/components/cps/dynamic/XiaoshuColumn.vue';
import SwitchColumn from '@/components/cps/dynamic/SwitchColumn.vue';
import DateColumn from '@/components/cps/dynamic/DateColumn.vue';
import DateRangeColumn from '@/components/cps/dynamic/DateRangeColumn.vue';

const { t } = useI18n();

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();

const className = route.path.slice(route.path.lastIndexOf('/') + 1)


const moduleName = computed(() => {
    const code = route.meta.menuCode as string;
    return t(code)
})

// 2、定义当前编辑对象id
const baseInfo = reactive({
    moduleName,
    id: null,
    selectedList: Array<{ id: string }>,
    item: {}
})

provide('baseInfo', baseInfo);

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

const showAddForm = ref(false)
const showAdd = (item: { [key: string]: any }) => {
    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: { id: null, pid: item.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {
    showAddForm.value = true
    u.merged(baseInfo, { item })
    logger.info(`【编辑】方法接收到参数 item `, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

// 查询条件
const params = reactive({ tableName: className })

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/l/dynamic/page"
const deleteUrl = "/l/dynamic/delete"

// 分页列表中列属性配置
// const columns = computed(() => {
//     return [
//         { prop: 'displayName', label: '名称' },
//         { prop: 'name', label: '唯一编码' },
//         { prop: 'type', label: '流程分类' },
//         { prop: 'version', label: '版本号' },
//         { prop: 'state', label: '状态' },
//     ]
// })
interface Column { prop: string, label: string }
const columns = ref<Array<Column>>([])

// 基础查询条件
const baseFields = ref<Array<any>>([])
// 高级查询条件
const advancedFields: any[] = []

// 表单字段
const addFormFields = ref<Array<any>>([
])

// 加载模型定义文件
const list_url = "/l/lowcodingConfig/list"
const list_params = { className }
logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params);


const formAttr = ref({
    formWidth: 400,
    columnNum: 1,
    labelWidth: 100,
    labelPosition: 'left',
    useFormTitle: false,
})
const getFormAttr = computed(() => {
    return formAttr
})

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

alaPost(u.url(list_url || ''), list_params, false, '').then((response: any) => {
    if (response.code === 200) {
        const config = u.parseJson(response.data[0].config)

        // 解析列表字段
        if (config.blockConfig?.form) {
            config.blockConfig?.form.forEach((item: { code: string, formData: any }) => {

                const { code, formData } = { ...item }

                // 组装列表字段
                if (formData.showInTable?.desktop) {
                    if (code === 'dateRange') {
                        console.log('showInTable - dateRange:', formData);

                    } else {
                        const column = { prop: formData.fieldName.desktop, label: formData.label.desktop, formItem: item }

                        columns.value.push(column)
                    }


                }

                // 组装基础查询字段
                if (formData.showInSearch?.desktop) {
                    if (code === 'dateRange') {
                        console.log('showInSearch - dateRange:', formData);

                    } else {
                        baseFields.value.push(alaBuildInput(formData.fieldName.desktop, formData.label.desktop))
                    }
                }

                // 组装 form 表单字段
                let formItem: any = {}
                if (code === 'input') {
                    formItem = parseInput(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'textarea') {
                    formItem = parseTextarea(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'radio') {
                    formItem = parseRadio(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'checkbox') {
                    formItem = parseCheckbox(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'date') {
                    formItem = parseDate(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'number') {
                    formItem = parseNumber(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'select') {
                    formItem = parseSelect(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'slider') {
                    formItem = parseSlider(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'rating') {
                    formItem = parseRating(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'switch') {
                    formItem = parseSwitch(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'divider') {
                    formItem = parseDivider(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'chapter') {
                    formItem = parseChapter(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'selectTable') {
                    formItem = parseSelectTable(formData)
                    addFormFields.value.push(formItem)
                } else if (code === 'dateRange') {
                    // 类似于时间范围这种表单，需要 使用组件数据回调机制 动态更新具体form中的属性值，因此需要把属性字段名传递到具体组件中
                    formItem = parseDateRange(formData)
                    formItem.other.startFieldName = formData.startFieldName.desktop
                    formItem.other.endFieldName = formData.endFieldName.desktop
                    addFormFields.value.push(formItem)
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

            });
        }

        if (config.pageConfig?.form) {
            const formData = config.pageConfig?.form.formData
            // 表单宽度 
            formAttr.value.formWidth = formData.width.desktop
            // 表单列数量
            formAttr.value.columnNum = formData.columnNum.desktop
            // 表单标签宽度
            formAttr.value.labelWidth = formData.labelWidth.desktop
            // 表单标签位置
            formAttr.value.labelPosition = formData.position.desktop
            // 是否启用表单中定义的标题栏
            formAttr.value.useFormTitle = formData.useFormTitle.desktop
        }


    }
});



// 基础表单字段
// const basicFields = computed(() => {
//     return [
//         alaBuildHidden('id'),// 固定格式
//         alaBuildSwitch('value', t('module.menu.name') + ' or ' + t('module.menu.url'), t('module.menu.url'), t('module.menu.name'), 2, 1, [alaRequired()]),
//         alaBuildInput("name", t('module.menu.name'), [alaRequired()]),
//         alaBuildDivider("这里是分隔线", "right"),

//         alaBuildInput("url", t('module.menu.url'), [alaRequired()]),
//         alaBuildDivider("这里是分隔线", "left"),
//         alaBuildSwitch('delFlag', t('common.enable'), t('buttons.enable'), t('buttons.disable'), 2, 1, [alaRequired()]),
//         alaBuildInput("icon", t('module.menu.icon'), [alaRequired()]),
//         alaBuildDivider("这里是分隔线"),
//         alaBuildNumber("width", t('module.menu.width'), [alaRequired()]),
//         alaBuildNumber("height", t('module.menu.height'), [alaRequired()]),
//         alaBuildNumber("sort", t('common.sorting')),
//     ]
// })



// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################



</script>

<style lang="scss" scoped></style>