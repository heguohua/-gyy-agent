<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-07 18:19:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/profile/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="page">

        <div class="left">
            <AlaTree title="模型分类" addUrl="/iot/profileGroup/add" treeUrl="/iot/profileGroup/tree"
                deleteUrl="/iot/profileGroup/delete" updateUrl="/iot/profileGroup/update" />
        </div>
        <div class="right">

            <!-- 查询条件 -->
            <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
                @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

            <!-- 分页列表 -->
            <!-- 分页列表 -->
            <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
                :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
                :showEditButton="true" :showAddButton="true" :showDeleteButton="true">


                <template #cols="{ row, columnName, formItem }">
                    <template v-if="formItem.code === 'dateRange'">

                        <component :is="getComponent(formItem.code)"
                            :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                            :formItem="formItem" :data="row" />
                    </template>
                    <template v-else>
                        <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                        <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem"
                            :data="row" v-if="formItem.formData.detail?.desktop" @showDetail="showDetail" />
                        <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem"
                            :data="row" v-else />
                    </template>

                </template>


            </PageTable>


        </div>
    </div>

    <!-- 详情页面 -->
    <!-- <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" /> -->

    <!-- 详情预览页面 -->
    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" :title="'【 详情 】' + moduleName.replaceAll('管理', '')"
        width="1800" :tabs="tabs" :previewParams="previewParams" />


    <!-- dept 新增、编辑 -->
    <profileAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" v-if="showAddForm" />

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '@/utils/logger';
import { alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildRadio, alaBuildSelect, alaBuildSelectDict, alaBuildSelectTable, alaBuildTextarea } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import PageTable from '@/components/cps/page/page-table.vue';
import { alaDetailBuild, alaDetailCascader, alaDetailDate, alaDetailInput, alaDetailSelectTable, alaDetailSwitchImage, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import Add from '@/pages/iot/profile/add.vue';
import profileAdd from '@/pages/iot/profile/profileAdd.vue';
import notify from '@/utils/notify';
import { alaRequired } from '@/config/alaRules';
import { profile } from '@/config/formConfigs/profile';
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
    item: {} as any,
    folder: { id: 0 },
    treeFormData: { type: 'folder' },
})

provide('baseInfo', baseInfo);

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

const showAddForm = ref(false)
const showAdd = (item: { [key: string]: any }) => {

    //根节点不能添加数据
    u.checkTrue(baseInfo.folder.id === 0, "不能在根节点新增数据", t)

    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: { id: null, groupId: baseInfo.folder.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {

    u.merged(baseInfo, item)

    logger.info(`【编辑】方法接收到参数 item `, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

// 查询条件
const params = reactive({}) as { [key: string]: any }

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = profile.pageApi
const deleteUrl = "/iot/profile/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return profile.pageFields
})
/**
 * 详情页面字段
 */
const detailFields: any = ref(profile.detailFields)

// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("profileName", '物模型名称'),
    ]
})

// 高级查询条件
const advancedFields: any[] = []

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


const formAttr = ref(profile.formAttr)

/**
 * 详情页面字段
 */

const detailItem = reactive({
    moduleName,
    item: {} as any,
})

const showDetail = (item: { [key: string]: any }) => {

    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);

    // 组装 基本信息 
    previewParams.data = detailItem
    previewParams.params = { profileId: item.id }


    // 组装 审核表单预览页面参数
    previewParams.forms = []

    // 组装 审批记录 页面参数
    // previewParams.instanceId = row.instanceId

    showPreviewPage.value = true

}



// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################

// 监控 baseInfo 中的folder属性，如果有变化，则更新分页列表 params 参数，并刷新分页列表数据
watch(() => baseInfo.folder, (value: any) => {
    u.clear(params)
    if (value.id) {
        params['groupId'] = value.id
    } else {
        params['groupId'] = undefined
    }
    refresh()
})

// ######################## 流程详情预览 start ####################################################
const showPreviewPage = ref(false)
const previewParams = reactive<any>({ forms: [], defineId: 0 })

// 分页列表中列属性配置

const devicePageColumns = [
    alaDetailInput('deviceName', "设备名称", 1, true),
    alaDetailInput('deviceCode', "资产编号"),
    alaDetailSelectTable('profiles', "物模型", "profileName", 1, false, { columnWidth: { desktop: '150' } }),
    alaDetailInput('deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
    alaDetailSwitchImage('online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
    alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
    alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),
]

const deviceFormWidth = reactive({
    formWidth: 800,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'top',
    useFormTitle: false
})

const deviceDetailFields = ref([
    alaDetailInput('deviceName', "设备名称", 1, true),
    alaDetailInput('deviceCode', "资产编号"),
    alaDetailSelectTable('profiles', "物模型", "profileName"),
    alaDetailInput('deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
    alaDetailSwitchImage('online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
    alaDetailInput('createdName', "创建人"),
    alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailInput('updatedName', "更新人"),
    alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
])

// 基础查询条件
const deviceBaseFields = ref([
    alaBuildInput("deviceName", '设备名称'),
])

// 基础表单字段
const pointAddFields = computed(() => {
    return [
        alaBuildHidden('id'),// 固定格式
        alaBuildHidden('profileId'),// 固定格式
        alaBuildInput("pointName", '点位名称', [alaRequired()]),
        alaBuildInput("platformName", '平台属性名', [alaRequired()]),
        alaBuildInput("pointCode", '设备属性名（支持 xxx.yyy.zzz 格式多层级取值）', [alaRequired()]),
        // 点位数据类型：0-字符串,1-字节,2-短整数,3-整数,4-长整数,5-浮点数,6-双精度浮点数,7-布尔
        alaBuildSelect("pointTypeFlag", "点位数据类型", [{ '字符串': 0 }, { '浮点数': 5 }, { '双精度浮点数': 6 }, { '短整数': 2 }, { '整数': 3 }, { '长整数': 4 }, { '字节': 1 }, { '布尔': 7 }], [alaRequired()], "请选择数据类型", { clearable: true }),
        // 读写标识，1-只读、2-只写、3-读写
        alaBuildRadio('rwFlag', "读写标识", [{ '只读': 1 }, { '只写': 2 }, { '读写': 3 }], [alaRequired()]),
        alaBuildNumber("valueDecimal", "数据精度", [alaRequired()], "请输入高度", { initValue: 2, min: 0, max: 6, step: 1 }),

        alaBuildSelectDict("unit", "数值单位", { "dictValue": "unit" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [alaRequired()], "请选择数值单位", { singleValue: true }),

        alaBuildNumber("baseValue", "基础值", [], "请输入基础值", { initValue: 0, min: 0 }),
        alaBuildNumber("multiple", "倍数", [], "请输入基础值", { initValue: 1, min: 0 }),

        alaBuildTextarea("remark", "备注", [], "请输入点位说明"),


        // alaBuildInput("deviceCode", '资产编号', [alaRequired()]),
        // alaBuildSelectTable("profiles", "物模型", "/iot/profile/page", [{ prop: 'profileName', label: '模型名称', isQuery: true }, { prop: 'profileCode', label: '模型编号' }], { propertyName: 'profileName', valueName: 'id' }, undefined, {}, "请选择", 'model'),
        // alaBuildInput("profileCode", '模型编号', [alaRequired()]),
    ]
})


const beforeSaveFun = (data: any) => {
    // data.unitDict = u.parseJson(data.unitDict)[0]
    data.profileId = detailItem.item.id
    return data;
}

// 基础查询条件
const pointBaseFields = ref([
    alaBuildInput("pointName", '点位名称'),
])

const tabsModel = reactive([
    { title: '基本信息', code: 'AlaDetailNoDrawer', props: { fields: detailFields, formAttr: formAttr } },
    { title: '模型点位', code: 'AlaDetailCard', props: { url: "/iot/point/page", columns: devicePageColumns, noButtons: true, formAttr: deviceFormWidth, formFields: pointAddFields, detailFields: deviceDetailFields, baseFields: pointBaseFields, moduleName: '点位', showAddButton: true, component: 'PointCard', addUrl: '/iot/point/add', updateUrl: '/iot/point/update', deleteUrl: '/iot/point/delete', beforeSave: beforeSaveFun } },
    { title: '关联设备', code: 'AlaDetailPage', props: { url: "/iot/device/page", deleteUrl: "/iot/device/delete", columns: devicePageColumns, noButtons: true, formAttr: deviceFormWidth, detailFields: deviceDetailFields, baseFields: deviceBaseFields, moduleName: '设备' } },
])

const tabs = computed(() => {
    return tabsModel
})



</script>

<style lang="scss" scoped>
.page {

    display: flex;
    align-items: flex-start;
    justify-content: center;
    justify-items: center;

    .left {
        width: 300px;
        margin-top: 4px;
        border-radius: 2px;
    }

    .right {
        width: calc(100% - 300px);
    }
}
</style>