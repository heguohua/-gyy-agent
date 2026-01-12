<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-12 21:47:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/system/app/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

    <!-- 分页列表 -->
    <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="formConfigs.app.pageFields"
        :params="params" :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="true" :showAddButton="true" :showDeleteButton="true">


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


    </PageTable>

    <!-- 新增、编辑 -->
    <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" v-if="showAddForm" />

    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="formConfigs.app.detailFields"
        :formAttr="formConfigs.app.detailAttr" />


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import Add from '@/pages/system/app/add.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import AlaDetail from '@/components/cps/form/ala-detail.vue';
import formConfigs from '@/config/formConfigs';
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
    u.merged(baseInfo, { item: { id: null, pid: item.id, typeEntity: [] } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
    // /process/design
    // router.push("/process/designAdd")
}

const showEdit = (item: { [key: string]: any }) => {
    showAddForm.value = true

    // 解除 响应式引用，防止新增页面数据影响列表数据
    const entity = toRaw(item)
    entity.typeEntity = [{ id: entity.type }]

    u.merged(baseInfo, { entity })
    logger.info(`【编辑】方法接收到参数 entity `, entity);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
}

// 查询条件
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


const detailItem = reactive({
    moduleName,
    item: {}
})
const showDetailPage = ref(false)
const showDetail = (item: { [key: string]: any }) => {
    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    showDetailPage.value = true
}


// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = formConfigs.app.pageApi
const deleteUrl = "/u/app/delete"
// const cls = alaBuildSelectTable("forms", "表单", "/l/lowcodingConfig/page", [{ prop: 'name', label: '表单名称', isQuery: true }], { propertyName: 'name', valueName: 'id', otherProperty: ['className'] }, undefined, { formType: 'flow' }, "请选择")

// alaBuildInput("scabbard", '登录账号', [alaRequired()]),
// alaBuildPassword("sword", '登录密码', [alaRequired()]),
// alaBuildInput("nickName", '用户昵称', [alaRequired()]),
// alaBuildInput("mobile", '手机号', [alaRequired(),alaPhone()]),
// alaBuildInput("email", '邮箱', [alaRequired(),alaEmail()]),
// alaBuildInput("iconPath", '用户头像', []),
// alaBuildDate("entryDate", "入职时间", "date", "YYYY-MM-DD", [alaRequired()], "", "", "请选择入职时间"),


// 分页列表中列属性配置


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("name", '应用名称'),
    ]
})


// 高级查询条件
const advancedFields: any = []


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################


</script>

<style lang="scss" scoped></style>