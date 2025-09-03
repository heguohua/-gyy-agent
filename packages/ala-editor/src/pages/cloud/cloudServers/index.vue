<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-03 21:20:14
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/cloud/cloudServers/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="page">

        <div class="left">
            <AlaTree title="业务组" addUrl="/c/cloudServersGroup/add" treeUrl="/c/cloudServersGroup/tree"
                deleteUrl="/c/cloudServersGroup/delete" updateUrl="/c/cloudServersGroup/update" />
        </div>
        <div class="right">

            <!-- 查询条件 -->
            <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
                @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

            <!-- 分页列表 -->
            <!-- 分页列表 -->
            <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
                :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
                :showEditButton="true" :showAddButton="true" :showDeleteButton="false">


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

                <template #btns="{ row }">

                    <AlaButton :showButton="true" name="start" @start="handleStart(row)" buttonType="primary" />

                    <AlaButton :showButton="true" name="shutdown" @shutdown="handleShutdown(row)" buttonType="danger" />

                    <AlaButtonGroup :buttons="[
                        { name: 'snapshot', popConfirm: false, handle: handleSnapshot, row: row, buttonType: 'primary' },
                        { name: 'toSnapshot', popConfirm: true, handle: handleToSnapshot, row: row, buttonType: 'danger' },
                        { name: 'delete', popConfirm: true, handle: handleDelete, row: row, buttonType: 'danger' },
                    ]" />

                </template>

            </PageTable>


        </div>
    </div>

    <!-- dept 详情页面 -->
    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />

    <!-- dept 新增、编辑 -->
    <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" v-if="showAddForm" />


    <AlaDialog v-if="showTypeInSnapshotRemarkDialog" :showDialog="showTypeInSnapshotRemarkDialog"
        @confirm="handleConfirm" @cancel="handleCancel" title="请填写快照名称">
        <template #body>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
                <AlaInput label="快照名称" placeholder="请填写快照名称" fieldName="name" v-model="form.name" />
            </el-form>
        </template>
    </AlaDialog>

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import PageTable from '@/components/cps/page/page-table.vue';
import { alaDetailBuild, alaDetailCascader, alaDetailDate, alaDetailInput, alaDetailSelectTable, alaDetailSwitch, alaDetailSwitchImage, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import Add from '@/pages/cloud/cloudServers/add.vue';
import notify from '@/utils/notify';
import { cloudServers } from '@/config/formConfigs/cloud/cloudServers';
import { alaPost } from '@/utils/req';
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
    u.merged(baseInfo, { item: { id: null, pid: item.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {
    u.merged(baseInfo, item)
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


// setInterval(() => {
//     refresh()
// }, 5 * 1000);

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = cloudServers.pageApi
const deleteUrl = "/c/cloudServers/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return cloudServers.pageFields
})
/**
 * 详情页面字段
 */
const detailFields: any = ref(cloudServers.detailFields)

// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("name", '云主机名'),
    ]
})

// 高级查询条件
const advancedFields: any[] = []

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


const formAttr = ref(cloudServers.formAttr)

/**
 * 详情页面字段
 */

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


const handleStart = (row: any) => {
    const params = { id: row.id, runningStatus: 1 }
    alaPost(u.url('/c/cloudServers/startOrShutdown'), params, false, '').then((response: any) => {
        let d = response.data
        notify.success("温馨提示", d)
        setTimeout(() => {
            refresh()
        }, 5000)
    });
}

const handleShutdown = (row: any) => {
    const params = { id: row.id, runningStatus: 2 }
    alaPost(u.url('/c/cloudServers/startOrShutdown'), params, false, '').then((response: any) => {
        let d = response.data
        notify.success("温馨提示", d)
        setTimeout(() => {
            refresh()
        }, 5000)
    });
}


const showTypeInSnapshotRemarkDialog = ref(false)
const form = ref({ cloudServers: undefined, name: undefined })
const rules = {
    name: [
        { required: true, message: '请填写快照名称', trigger: 'blur' },
    ]
}
const handleConfirm = () => {
    const params = form.value
    alaPost(u.url('/c/cloudServers/snapshot'), params, false, '').then((response: any) => {
        let d = response.data
        notify.success("温馨提示", "提交成功，请等待快照创建完成")
        u.clear(form.value)
        showTypeInSnapshotRemarkDialog.value = false
    });
}

const handleCancel = () => {
    showTypeInSnapshotRemarkDialog.value = false
}
const handleSnapshot = (row: any) => {
    form.value.cloudServers = row.id
    showTypeInSnapshotRemarkDialog.value = true
}

const handleToSnapshot = (row: any) => {
    console.log(' handleToSnapshot ', row);
}

const handleDelete = (row: any) => {
    console.log(' handleDelete ', row);
}

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