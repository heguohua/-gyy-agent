<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-17 16:57:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dict/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" />

    <!-- 分页列表 -->
    <PageNestingTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')" />

    <!-- 新增、编辑 -->
    <DictAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageNestingTable from '@/components/cps/page/page-nesting-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import DictAdd from './dict-add.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
const moduleName = route.meta.menuName as string || '';

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
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageNestingTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/a/dict/page"
const deleteUrl = "/a/dict/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        { prop: 'dictLabel', label: t('module.dictionary.dictLabel') },
        { prop: 'dictValue', label: t('module.dictionary.dictValue') },
        { prop: 'dictCode', label: t('module.dictionary.dictCode')  },
        { prop: 'i18nName', label: t('module.dictionary.i18nName') },
        { prop: 'remark', label: t('module.dictionary.remark') },
        { prop: 'delFlag', label: t('module.dictionary.delFlag') },
    ]
})

// 基础查询条件
const baseFields = [
    alaBuildInput("name", "菜单名"),
]


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################



</script>

<style lang="scss" scoped></style>