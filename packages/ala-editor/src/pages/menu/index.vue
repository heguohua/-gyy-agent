<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 23:09:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: 0 })" />

    <!-- 分页列表 -->
    <PageNestingTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" />

    <!-- 新增、编辑 -->
    <MenuAdd @refresh="refresh" v-model="showAddForm" :id="id" :baseInfo="baseInfo" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';
import PageNestingTable from '@/components/cps/page/page-nesting-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
const moduleName = route.meta.menuName as string || '';

// 2、定义当前编辑对象id
let id = ref(0)

const baseInfo = reactive({
    moduleName,
    id: id,
    selectedList: Array<{ id: string }>
})
provide('baseInfo', baseInfo);

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

const showAddForm = ref(false)
const showAdd = (item: { [key: string]: any }) => {
    showAddForm.value = true
    id.value = item.id
    u.merged(baseInfo, { item })
    logger.info(`新增方法接收到参数item.id【 ${item.id} 】，当前模块选中对象id【 ${id.value} 】`);

}

// 查询条件
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageNestingTable> | null>(null)
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
const columns = ref([
    { prop: 'name', label: '菜单名' },
    { prop: 'url', label: '路由URL' },
    { prop: 'delFlag', label: '是否删除' },
    { prop: 'icon', label: '图标名称' },
    { prop: 'width', label: '图标宽度' },
    { prop: 'height', label: '图标高度' },
]);

// 基础查询条件
const baseFields = [
    alaBuildInput("name", "菜单名"),
]
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
    { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider2', other: { min: 2, max: 10, step: 1, } },
    { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating2', other: { max: 8, allowHalf: true } },
]


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################



</script>

<style lang="scss" scoped></style>