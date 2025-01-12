<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-12 10:18:39
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/instanceList.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="" labelWidth="180px" />

    <!-- 分页列表 -->
    <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="" @edit="" :tipTitle="$t('pop.warm_title')">

        <template #cols="{ row, columnName, formItem }">
            <template v-if="formItem.code === 'dateRange'">

                <component :is="getComponent(formItem.code)"
                    :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                    :formItem="formItem" :data="row" />
            </template>
            <template v-else>
                <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-if="formItem.formData.detail?.desktop" @showDetail="showDetail" />
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-else />
            </template>
        </template>
        <template #btns="{ row }">

            <AlaButton v-if="row.stateName == '进行中'" :showButton="true" name="form_withdraw"
                @form_withdraw="handleWithdraw(row)" buttonType="danger" />

            <AlaButton v-if="row.stateName == '已退回'" :showButton="true" name="update_application_form"
                @update_application_form="showEdit(row)" buttonType="" />

            <AlaButton v-if="row.stateName == '已退回'" :showButton="true" name="reinitiate"
                @reinitiate="handleRestart(row)" buttonType="primary" />


        </template>
    </PageTable>

    <!-- 新增、编辑 -->
    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程任务" width="1800" :tabs="tabs"
        :previewParams="previewParams" />

    <!-- 新增、编辑 -->
    <StartFormEdit v-if="showAddForm" v-model="showAddForm" :baseInfo="baseInfo" :fields="formFields" :formAttr="formAttr"
        :className="className" />


</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import notify from '@/utils/notify';
import { alaPost, get } from '@/utils/req';
import { parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from '../dynamic/formItemParser';
import baseRule from '@/config/rules/baseRule';
import { alaCard, alaCn, alaCnTw, alaEmail, alaEnumRule, alaLetter, alaLl8, alaLl8_, alaLOrlOr8, alaLOrlOr8Or_, alaNumber, alaNumberMax, alaNumberMin, alaNumberRange, alaPassword, alaPattern, alaPhone, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaTw, alaUrl } from '@/config/alaRules';
import StartFormEdit from './startFormEdit.vue';
const { t } = useI18n();

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
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
const cn = ref('')
const className = computed(() => {
    return cn.value
})


const showEdit = (item: { [key: string]: any }) => {

    const form = u.parseJson(u.parseJson(item.variable)['forms'])[0]
    const defineId = item.defineId

    u.clear(baseInfo.item)
    const bif = { item: {}, tableName: form.tableName, defineId: defineId }
    console.log('bif:', bif);
    u.merged(baseInfo, bif)
    cn.value = form.tableName

    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);

    // 组装列表字段
    const url = "/l/lowcodingConfig/list"
    const params = { className: form.tableName }
    const bType = 'form'
    logger.info(`从后台加载【 ${bType} 】配置数据，url【 ${url} 】，数据对象：`, params);

    alaPost(u.url(url || ''), params, false, '').then((response: any) => {
        const { config, id } = response.data[0];
        const conf = u.parseJson(config)
        const blockConfig = conf["blockConfig"][bType]
        const pageConfig = conf["pageConfig"][bType]

        u.checkNull(pageConfig?.formData, '当前流程第一级任务节点表单【 页面配置 】不存在', t)
        u.checkNull(blockConfig, '当前流程第一级任务节点表单【 字段配置 】不存在', t)

        // 初始化表单页面配置项
        const pFormData = pageConfig?.formData
        const formAttrs = {
            formWidth: pFormData.width?.desktop ? pFormData.width.desktop : formAttr.value.formWidth,
            labelWidth: pFormData.labelWidth?.desktop ? pFormData.labelWidth.desktop : formAttr.value.labelWidth,
            columnNum: pFormData.columnNum?.desktop ? pFormData.columnNum.desktop : formAttr.value.columnNum,
            useFormTitle: pFormData.useFormTitle?.desktop ? pFormData.useFormTitle.desktop : formAttr.value.useFormTitle,
            labelPosition: pFormData.labelPosition?.desktop ? pFormData.labelPosition.desktop : formAttr.value.labelPosition,
        }
        logger.info(`【 流程表单 - pageConfig】配置信息：`, formAttrs);

        u.merged(formAttr, formAttrs)

        addFormFields.value = []
        // 初始化表单字段配置项
        blockConfig.forEach((item: { code: string, formData: any }) => {
            const { code, formData } = { ...item }

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
            } else if (code === 'selectDict') {
                formItem = parseSelectDict(formData)
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

        })

        logger.info(`【 流程表单 - blockConfig】配置信息：`, addFormFields.value);

        // 查询表单数据
        // 查询数据
        const dynamicTableUrl = '/l/dynamic/get'
        const dynamicTableParams = { tableName: form.tableName, id: form.id }

        get(u.url(dynamicTableUrl || ''), dynamicTableParams).then((response: any) => {
            u.merged(baseInfo, { item: response.data.data })

            console.log('baseInfo:',baseInfo);
            
            showAddForm.value = true

        });



    });
}

// 查询条件
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/p/instance/page"
const deleteUrl = "/p/instance/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'defineDisplayName', "流程名称", 1, true),
        alaDetailBuild(dType.input, 'operatorName', "发起人"),
        alaDetailDate(dType.date, 'createdTime', "发起时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailDate(dType.date, 'expireTime', "过期时间", 'YYYY-MM-DD HH:mm:ss'),

        // alaDetailBuild(dType.input, 'stateName', "审批状态"),
        alaDetailBuild(dType.textColor, 'stateName', "审批状态", 1, true, { colors: { desktop: { '进行中': '#409eff', '已完成': '#67c23a', '已拒绝': '#f56c6c', '已撤回': '#b2b6bf' } }, background: { desktop: true } }),

        // { prop: 'displayName', label: '标题' },
        // { prop: 'name', label: '摘要' },
        // { prop: 'operator', label: '发起人' },
        // { prop: 'createdTime', label: '发起时间' },
        // { prop: 'version', label: '发起人所属部门' },
        // { prop: 'state', label: '发起人职务' },
        // { prop: 'defineId', label: '流程名称' },
        // { prop: 'version', label: '流程版本' },
        // { prop: 'state', label: '状态' },
    ]
})
// alaDetailBuild(dType.input, 'displayName', "流程名称", 1, true),
// alaDetailBuild(dType.input, 'name', "唯一编码"),
// alaDetailSelectDict(dType.selectDict, 'typeEntity', "流程分类", 'dictLabel'),
// alaDetailSwitch(dType.switch, 'delFlag', "状态", "启用", 2, "禁用", 1),
// alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
// alaDetailDate(dType.date, 'updatedTime', "重新部署时间", 'YYYY-MM-DD HH:mm:ss'),


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("displayName", '名称'),
    ]
})


// 高级查询条件
const advancedFields: any = []


const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################

const showPreviewPage = ref(false)
const previewParams = reactive<any>({ forms: [], defineId: 0 })

const withdrawUrl = '/p/instance/withdraw'
const handleWithdraw = (row: any) => {
    const id = row.id
    logger.info(`【 撤回流程 】，url${url}，数据对象：`, row);
    alaPost(u.url(withdrawUrl || ''), { id }, false, '').then((data: any) => {
        const response = data;
        notify.success(t('pop.warm_title'), "流程撤回成功。")
        refresh()
    });
}

const restartUrl = '/p/instance/restart'
const handleRestart = (row: any) => {    
    const id = row.id
    logger.info(`【 重新发起流程 】，url${url}，数据对象：`, row);
    alaPost(u.url(restartUrl || ''), { id }, false, '').then((data: any) => {
        const response = data;
        notify.success(t('pop.warm_title'), "重新发起流程执行成功。")
        refresh()
    });
}

const showDetail = (row: any) => {
    logger.info(`当前模块【 detailItem 】对象参数为`, row);

    u.clear(detailItem.item)
    u.merged(detailItem, { item: row })

    // 组装 基本信息 

    previewParams.data = detailItem

    // 组装 审核表单预览页面参数
    const variable = u.parseJson(row.variable)
    const forms = u.parseJson(variable.forms)
    previewParams.forms = []
    forms.forEach((form: { id: number, tableName: string }) => {
        previewParams.forms.push({ id: form.id, tableName: form.tableName })
    })

    // 组装 流程图 预览页面参数
    previewParams.defineId = row.defineId

    // 组装 审批记录 页面参数
    previewParams.instanceId = row.id

    showPreviewPage.value = true
}

const detailItem = reactive({
    moduleName,
    item: {}
})

const detailFields: any = ref([
    alaDetailBuild(dType.input, 'defineDisplayName', "流程名称", 1, true),
    alaDetailBuild(dType.input, 'operatorName', "发起人"),
    alaDetailDate(dType.date, 'createdTime', "发起时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailDate(dType.date, 'expireTime', "过期时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.textColor, 'stateName', "审批状态", 1, true, { colors: { desktop: { '进行中': '#409eff', '已完成': '#67c23a', '已拒绝': '#f56c6c', '已撤回': '#b2b6bf' } }, background: { desktop: true } }),
])

const formAttr = ref({
    formWidth: 1800,
    columnNum: 1,
    labelWidth: 120,
    labelPosition: 'left',
    useFormTitle: false,
})


// forms: { id: 3, moduleName: "member" }, { id: 1, moduleName: "member" },
const tabsModel = reactive([
    { title: '基本信息', code: 'AlaDetailNoDrawer', props: { fields: detailFields, formAttr: formAttr } },
    { title: '流程表单', code: 'AlaDetailNoDrawerForms', props: { forms: [], formAttr: formAttr } },
    { title: '流程图', code: 'ProcessPreview', props: { viewer: true } },
    { title: '审批记录', code: 'AlaDetailNoDrawerTasks', props: {} },
])
const tabs = computed(() => {
    return tabsModel
})

// ################### 更新申请单 Start ###############################################################

// 表单字段
const formFields = computed(() => {
    return addFormFields.value
})
const addFormFields = ref<Array<any>>([
])

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
// ################### 更新申请单 end ###############################################################
</script>

<style lang="scss" scoped></style>