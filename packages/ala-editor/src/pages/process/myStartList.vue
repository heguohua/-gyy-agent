<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-09 09:28:23
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/myStartList.vue
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
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')">

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

            <AlaButton :showButton="true" name="form_withdraw" @form_withdraw="handleWithdraw(row)"
                buttonType="danger" />

        </template>
    </PageTable>

    <!-- 新增、编辑 -->
    <!-- <MenuAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" /> -->
    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程任务" width="1800" :tabs="tabs" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate } from '@/config/alaDetailBuilder';
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
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/p/instance/myPage"
const deleteUrl = "/p/instance/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'defineDisplayName', "流程名称", 1, true),
        alaDetailBuild(dType.input, 'operatorName', "发起人"),
        alaDetailDate(dType.date, 'createdTime', "发起时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailDate(dType.date, 'expireTime', "过期时间", 'YYYY-MM-DD HH:mm:ss'),

        alaDetailBuild(dType.input, 'stateName', "审批状态"),

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
const previewPageProps = reactive({})

const handleWithdraw = (row: any) => {
    logger.info(`当前模块【 detailItem 】对象参数为`, row);
}
const showDetail = (row: any) => {
    logger.info(`当前模块【 detailItem 】对象参数为`, row);

    u.clear(detailItem.item)
    u.merged(detailItem, { item: row })

    u.merged(previewPageProps, { id: row.id })
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
    alaDetailBuild(dType.input, 'stateName', "审批状态"),
])

const formAttr = {
    formWidth: 1800,
    columnNum: 1,
    labelWidth: 120,
    labelPosition: 'left',
    useFormTitle: false,
}

const tabs = computed(() => {
    return reactive([
        { title: '基本信息', code: 'AlaDetailNoDrawer', props: { data: detailItem, fields: detailFields, formAttr: formAttr } },
        { title: '流程表单', code: 'AlaDetailNoDrawerForms', props: { forms: [{ id: 3, moduleName: "member" }, { id: 1, moduleName: "member" },], formAttr: formAttr } },
        { title: '流程图', code: 'ProcessPreview', props: { ...previewPageProps, viewer: true } },
    ])
})

</script>

<style lang="scss" scoped></style>