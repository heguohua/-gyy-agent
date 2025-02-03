<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-30 20:12:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/bi/datasource/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="page">

        <div class="left">
            <AlaTree title="数据源分类" addUrl="/b/datasource/add" treeUrl="/b/datasource/tree"
                deleteUrl="/b/datasource/delete" updateUrl="/b/datasource/update" />
        </div>
        <div class="right">

            <!-- 查询条件 -->
            <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
                @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

            <!-- 分页列表 -->
            <!-- 分页列表 -->
            <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
                :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
                :showEditButton="true" :showDeleteButton="true">


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

    <!-- datasource 详情页面 -->
    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />

    <!-- datasource 新增、编辑 -->
    <DatasourceAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" />

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import PageTable from '@/components/cps/page/page-table.vue';
import { alaDetailBuild, alaDetailCascader, alaDetailDate, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import DatasourceAdd from './datasourceAdd.vue';
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
    u.merged(baseInfo, { item: { id: null, pid: item.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {
    // 解密 configuration 字段
    let it = u.cloned(item) as { [key: string]: any }
    it['configuration'] = u.parseJson(u.base64Decode(it['configuration']))

    // item['type'] = u.parseJson(item['type'])
    it = u.flattenObject(it)
    u.merged(baseInfo, { item: { ...it } })

    logger.info(`【编辑】方法接收到参数 item `, it);
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

const url = "/b/datasource/page"
const deleteUrl = "/b/datasource/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'name', "数据源名称", 1, true),
        alaDetailCascader(dType.cascader, 'type', "类型"),
        alaDetailBuild(dType.input, 'status', "状态"),
        alaDetailTextarea(dType.textarea, 'description', '描述', 16),
        alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        // alaDetailSelectDict(dType.selectDict, 'typeEntity', "流程分类", 'dictLabel'),

    ]
})


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("name", '数据源名称'),
    ]
})

// 高级查询条件
const advancedFields: any[] = []

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


const formAttr = ref({
    formWidth: 800,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})

/**
 * 详情页面字段
 */
const detailFields: any = ref([
    alaDetailBuild(dType.input, 'name', "数据源名称", 1, true),
    alaDetailCascader(dType.cascader, 'type', "类型"),
    alaDetailBuild(dType.input, 'status', "状态"),
    alaDetailTextarea(dType.textarea, 'description', '描述', 16),
    alaDetailBuild(dType.input, 'createdName', "创建人"),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.input, 'updatedName', "更新人"),
    alaDetailDate(dType.date, 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

])

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
    params['pid'] = value.id
    refresh()
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