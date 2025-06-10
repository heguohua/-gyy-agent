<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 20:36:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null })" labelWidth="180px" :showAddButton="showAddButton" />

    <!-- 分页列表 -->
    <PageDynamicTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="showEditButton" :showDeleteButton="showDeleteButton" :showAddButton="showAddButton"
        :showButtonsColumn="showButtonsColumn" :className="className" :beforeQuery="beforeQuery">

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

    </PageDynamicTable>

    <!-- 新增、编辑 -->
    <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" :fields="addFormFields" :formAttr="formAttrs"
        :className="className" />

    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttrs" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Add from '@/pages/dynamic/add.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import { parseCascade, parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from './formItemParser';
import { alaStrLengthRange, alaRequired, alaStrMax, alaStrMin, alaStrLength, alaNumberMin, alaNumberMax, alaNumberRange, alaPattern, alaEnumRule, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaLOrlOr8Or_, alaLl8_, alaPassword, alaCnTw, alaCn, alaTw } from "@/config/alaRules";
import baseRule from '@/config/rules/baseRule';
import { date } from '@/utils/date';
import { formConfigParse } from './formConfigParser';

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
const detailItem = reactive({
    moduleName,
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
    // 解除 响应式引用，防止新增页面数据影响列表数据
    const entity = toRaw(item)
    entity.typeEntity = [{ id: entity.type }]

    u.merged(baseInfo, { entity })
    logger.info(`【编辑】方法接收到参数 entity `, entity);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    // u.merged(baseInfo, { item })
    // logger.info(`【编辑】方法接收到参数 item `, item);
    // logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    // showAddForm.value = true
}

const showDetailPage = ref(false)
const showDetail = (item: { [key: string]: any }) => {
    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    showDetailPage.value = true
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
interface Column { prop: string, label: string, formItem: any }
const columns = ref<Array<Column>>([])

// 基础查询条件
const baseFields = ref<Array<any>>([])
// 高级查询条件
const advancedFields: any[] = []

// 表单字段
const addFormFields = ref<Array<any>>([
])



const formAttr = ref({
    formWidth: 400,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})


const formAttrs = computed(() => {
    return formAttr.value
})

const formConfigItems: any = {}





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
interface Result {
    tableName: string,
    conditions: Array<any>,
}

const beforeQuery = (params: any) => {
    const result: Result = { tableName: className, conditions: [] }
    const conditions = result.conditions
    Object.keys(params).forEach((key: string) => {
        if (key != 'tableName' && params[key]) {
            // 转换字段查询条件为动态分页列表形式
            const formConfigItem = formConfigItems[key]
            const code = formConfigItem.code
            if (code === 'input') {
                conditions.push({ column: 'a_' + key, operator: 'like', value: params[key] })
            }
        }
    })
    return result
}

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label);
}

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})

/**
 * 详情页面字段
 */
const detailFields: any = ref([])

const showAddButton = ref(false)
const showDeleteButton = ref(false)
const showEditButton = ref(false)
const showButtonsColumn = ref(false)



onMounted(async () => {

    // 加载模型定义文件
    const list_url = "/l/lowcodingConfig/list"
    const list_params = { className }
    logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params)

    const configs = await formConfigParse(list_url, list_params)

    columns.value = configs.columns
    baseFields.value = configs.baseFields
    formConfigItems.value = configs.formConfigItems
    addFormFields.value = configs.addFormFields
    detailFields.value = configs.detailFields
    showAddButton.value = configs.showAddButton
    showDeleteButton.value = configs.showDeleteButton
    showEditButton.value = configs.showEditButton
    showButtonsColumn.value = configs.showButtonsColumn
    u.merged(formAttr.value, configs.formAttr)

})

</script>

<style lang="scss" scoped></style>