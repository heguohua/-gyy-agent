<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-26 10:19:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

    <!-- 分页列表 -->
    <PageNestingTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="true" :showDeleteButton="true" :showAddSubButton="true">

        <!-- 非内嵌表格插槽 -->
        <template #cols="{ row, columnName }">
            <AlaPageViewStatus v-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <template v-else> {{ row[columnName] }} </template>
        </template>

        <!-- 内嵌表格插槽 -->
        <template #innerCols="{ row, columnName }">
            <AlaPageViewStatus v-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <template v-else> {{ row[columnName] }} </template>
        </template>

    </PageNestingTable>


    <!-- 新增、编辑 -->
    <MenuAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" v-if="showAddForm" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';
import PageNestingTable from '@/components/cps/page/page-nesting-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput, alaBuildSelect, alaBuildSelectApi, alaBuildSelectDict, alaBuildDivider, alaBuildSelectTable, alaBuildSelectTree } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import PageTable from '@/components/cps/page/page-table.vue';
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
const showAdd = (item: { [key: string]: any }) => {
    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: { id: null, pid: item.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {
    u.merged(baseInfo, { item })
    logger.info(`【编辑】方法接收到参数 item `, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
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

const url = "/u/menu/page"
const deleteUrl = "/u/menu/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        { prop: 'name', label: t('module.menu.name') },
        { prop: 'url', label: t('module.menu.url') },
        { prop: 'delFlag', label: t('common.enable') },
        { prop: 'icon', label: t('module.menu.icon') },
        { prop: 'width', label: t('module.menu.width') },
        { prop: 'height', label: t('module.menu.height') },
    ]
})


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("name", t('module.menu.name')),
    ]
})
// const baseFields = [
//     { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
//     { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
//     { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
//     { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch', other: { activeText: "开", inActiveText: "关" } },
//     // {
//     //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date', other: {
//     //         dateType: "datetimerange",
//     //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
//     //     }
//     // },
//     { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider', other: { min: 2, max: 10, step: 1, } },
//     { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating', other: { max: 8, allowHalf: true } },
// ]


// 高级查询条件
const advancedFields = [
    { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input2' },
    { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea2' },
    { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password2' },
    { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch2', other: { activeText: "开", inActiveText: "关" } },
    // {
    //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date2', other: {
    //         dateType: "datetimerange",
    //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
    //     }
    // },
    { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider2', other: { min: 2, max: 10, step: 1 } },
    { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating2', other: { max: 8, allowHalf: true } },
    alaBuildSelectApi("select_api", "api下拉选", "/u/menu/list", { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
    alaBuildSelectDict("select_dict", "字典下拉选", {}, { propertyName: 'dictLabel', valueName: 'id' }, undefined, "请选择"),
    alaBuildSelectTable("select_table", "table下拉选", "/u/menu/page", [{ prop: 'name', label: t('module.menu.name'), isQuery: true }, { prop: 'delFlag', label: t('common.enable') }], { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
    alaBuildSelectTree("select_tree", "tree下拉选", "/a/dict/tree", { dictValue: 'i18n' }, { propertyName: 'dictLabel', valueName: 'id', childrenName: 'children' }, undefined, "请选择"),

]


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################



</script>

<style lang="scss" scoped></style>