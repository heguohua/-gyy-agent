<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-12 10:13:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/myDoneList.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" />

    <!-- 分页列表 -->
    <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="false" :showDeleteButton="false" :showAddButton="false" :noButtons="true">


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

            <AlaButton :showButton="true" name="form_handle" @form_handle="handleTask(row)" buttonType="primary" />

        </template>
    </PageTable>

    <!-- 详情预览页面 -->
    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程任务" width="1800" :tabs="tabs"
        :previewParams="previewParams" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildDateRange, alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate, alaDetailSelectDict } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
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

// 查询条件
const params = reactive({
    taskState: 20
})

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

const showDetail = (row: any) => {
    logger.info(`当前模块【 detailItem 】对象参数为`, row);

    u.clear(detailItem.item)
    u.merged(detailItem, { item: row })

    // 组装 基本信息 
    previewParams.data = detailItem
    console.log('previewParams.data:', previewParams.data);


    // 组装 审核表单预览页面参数
    const variable = u.parseJson(row.variable)
    const forms = u.parseJson(variable.forms)
    previewParams.forms = []
    forms.forEach((form: { id: number, tableName: string }) => {
        previewParams.forms.push({ id: form.id, tableName: form.tableName })
    })

    // 组装 流程图 预览页面参数
    previewParams.defineId = row.instanceVo.defineId

    // 组装 审批记录 页面参数
    previewParams.instanceId = row.instanceId

    showPreviewPage.value = true
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/p/task/myPage"
const deleteUrl = "/p/task/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'displayName', "任务名称", 1, true),
        alaDetailBuild(dType.input, 'instanceVo', "流程名", 1, false, { deepColumnName: { desktop: 'displayName' } }),
        alaDetailBuild(dType.input, 'instanceVo', "发起人", 1, false, { deepColumnName: { desktop: 'operatorEntity.nickName' } }),
        alaDetailDate(dType.date, 'createdTime', "流程发起时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { deepColumnName: 'instanceVo.createdTime' }),
        alaDetailDate(dType.date, 'createdTime', "任务创建时间", 'YYYY-MM-DD HH:mm:ss'),

        // { prop: 'operator', label: '发起人' },
        // { prop: 'createdTime', label: '发起时间' },
        // { prop: 'version', label: '发起人所属部门' },
        // { prop: 'state', label: '发起人职务' },
    ]
})


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildDateRange('createdTime', '任务创建时间段', 'daterange', 'YYYY-MM-DD HH:mm:ss')
    ]
})


// 高级查询条件
const advancedFields: any = []


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################


const handleTask = (item: any) => {
    console.log('item:', item);
}

// ######################## 流程详情预览 start ####################################################
const showPreviewPage = ref(false)
const previewParams = reactive<any>({ forms: [], defineId: 0 })

const formAttr = ref({
    formWidth: 1800,
    columnNum: 1,
    labelWidth: 120,
    labelPosition: 'left',
    useFormTitle: false,
})

const detailFields: any = ref([
    alaDetailBuild(dType.input, 'variable', "任务名称", 1, false, { deepColumnName: { desktop: 'autoGenTitle' }, columnWidth: { desktop: '300' } }),
    alaDetailBuild(dType.input, 'displayName', "流程节点"),
    alaDetailBuild(dType.input, 'instanceVo', "流程名", 1, false, { deepColumnName: { desktop: 'displayName' } }),
    alaDetailBuild(dType.input, 'instanceVo', "发起人", 1, false, { deepColumnName: { desktop: 'operatorEntity.nickName' } }),
    alaDetailDate(dType.date, 'createdTime', "流程发起时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { deepColumnName: 'instanceVo.createdTime' }),
    alaDetailDate(dType.date, 'createdTime', "任务创建时间", 'YYYY-MM-DD HH:mm:ss'),
])

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


// ######################## 流程详情预览 end ####################################################

</script>

<style lang="scss" scoped></style>