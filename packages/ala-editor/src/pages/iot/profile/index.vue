<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-06 09:26:02
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
    <profileAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" />

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import PageTable from '@/components/cps/page/page-table.vue';
import { alaDetailBuild, alaDetailCascader, alaDetailDate, alaDetailSelectTable, alaDetailSwitchImage, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import Add from '@/pages/iot/profile/add.vue';
import profileAdd from '@/pages/iot/profile/profileAdd.vue';
import notify from '@/utils/notify';
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
    item: {},
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

const url = "/iot/profile/page"
const deleteUrl = "/iot/profile/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'profileName', "模型名称", 1, true),
        alaDetailBuild(dType.input, 'profileCode', "模型编号"),
        alaDetailBuild(dType.input, 'group.name', "模型分组"),
        alaDetailBuild(dType.input, 'createdName', "创建人"),
        alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),

        // { prop: 'displayName', label: '名称' },
        // { prop: 'name', label: '唯一编码' },
        // { prop: 'type', label: '流程分类' },
        // { prop: 'isDeployed', label: '是否已部署' },
        // { prop: 'remark', label: '备注' },
        // { prop: 'updatedTime', label: '更新时间' },
    ]
})
/**
 * 详情页面字段
 */
const detailFields: any = ref([
    alaDetailBuild(dType.input, 'profileName', "模型名称", 1, true),
    alaDetailBuild(dType.input, 'createdName', "创建人"),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.input, 'updatedName', "更新人"),
    alaDetailDate(dType.date, 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

])

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


const formAttr = ref({
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})

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
    console.log('previewParams:', previewParams);


    // 组装 审核表单预览页面参数
    previewParams.forms = []

    // 组装 审批记录 页面参数
    // previewParams.instanceId = row.instanceId

    showPreviewPage.value = true

}



// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################

// 监控 baseInfo 中的folder属性，如果有变化，则更新分页列表 params 参数，并刷新分页列表数据
watch(() => baseInfo.folder, (value: any) => {
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
const pointPageColumns = [
    alaDetailBuild(dType.input, 'profileName', "模型名称", 1, true),
    alaDetailBuild(dType.input, 'profileCode', "模型编号"),
    alaDetailBuild(dType.input, 'group.name', "模型分组"),
    alaDetailBuild(dType.input, 'createdName', "创建人"),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),

]
const devicePageColumns = [
    alaDetailBuild(dType.input, 'deviceName', "设备名称", 1, true),
    alaDetailBuild(dType.input, 'deviceCode', "资产编号"),
    alaDetailSelectTable(dType.selectTable, 'profiles', "物模型", "profileName", 1, false, { columnWidth: { desktop: '150' } }),
    alaDetailBuild(dType.input, 'deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
    alaDetailSwitchImage(dType.switchImage, 'online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
    alaDetailBuild(dType.input, 'createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),
]

const deviceFormWidth = reactive({
    formWidth: 800,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false
})

const deviceDetailFields = ref([
    alaDetailBuild(dType.input, 'deviceName', "设备名称", 1, true),
    alaDetailBuild(dType.input, 'deviceCode', "资产编号"),
    alaDetailSelectTable(dType.selectTable, 'profiles', "物模型", "profileName"),
    alaDetailBuild(dType.input, 'deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
    alaDetailSwitchImage(dType.switchImage, 'online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
    alaDetailBuild(dType.input, 'createdName', "创建人"),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.input, 'updatedName', "更新人"),
    alaDetailDate(dType.date, 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
])

// 基础查询条件
const deviceBaseFields = ref([
    alaBuildInput("deviceName", '设备名称'),
])



const tabsModel = reactive([
    { title: '基本信息', code: 'AlaDetailNoDrawer', props: { fields: detailFields, formAttr: formAttr } },
    { title: '模型点位', code: 'AlaDetailPage', props: { url: "/iot/device/page", deleteUrl: "/iot/device/delete", columns: devicePageColumns, noButtons: true, formAttr: deviceFormWidth, detailFields: deviceDetailFields, baseFields: deviceBaseFields } },
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