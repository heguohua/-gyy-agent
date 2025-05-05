<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-05 22:13:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>


    <div class="page-tab">
        <!-- 查询条件 -->
        <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
            @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="showAddButton" />

        <!-- 分页列表 -->
        <!-- 分页列表 -->
        <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
            :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
            :showEditButton="showEditButton" :showAddButton="showAddButton" :showDeleteButton="showDeleteButton"
            :noButtons="noButtons">


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
    <!-- dept 详情页面 -->
    <!-- <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" /> -->

    <!-- dept 新增、编辑 -->
    <!-- <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" /> -->

</template>

<script setup lang="ts">
import { alaBuildInput } from '@/config/alaBuilders';
import { alaDetailBuild, alaDetailDate } from '@/config/alaDetailBuilder';
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'
import { dType } from '../dynamic/detailType';
import { useI18n } from 'vue-i18n';
import PageTable from '../page/page-table.vue';
const { t } = useI18n();

const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const props = defineProps({
    previewParams: {
        type: Object as any
    },
    url: {
        type: String
    },
    deleteUrl: {
        type: String
    },
    columns: {
        type: Array<any>
    },
    // 是否显示 编辑 按钮
    showEditButton: {
        type: Boolean,
        default: false
    },
    // 是否显示 编辑 按钮
    showDeleteButton: {
        type: Boolean,
        default: false
    },
    // 是否显示 新增 按钮
    showAddButton: {
        type: Boolean,
        default: false
    },
    // 是否显示 按钮列
    noButtons: {
        type: Boolean,
        default: false
    },
})


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
    u.clear(baseInfo.item)
    u.merged(baseInfo, item)
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
    item: {}
})

const showDetailPage = ref(false)
const showDetail = (item: { [key: string]: any }) => {
    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    showDetailPage.value = true
}


</script>
<style scoped lang="scss">
.page-tab {
    padding-right: 15px;
}

.ala-detail-timeline {

    .title {
        padding: 8px;
        font-weight: bold;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-items: center;
        background: rgba(64, 158, 255, 0.1);
        box-shadow: 8px 0 0 0 rgba(64, 158, 255, 0.1), -8px 0 0 0 rgba(64, 158, 255, 0.1);
        border-radius: 4px;
        margin-bottom: 10px;
        margin-top: 10px;

        .ala-chapter-icon {
            display: inline-block;
            width: 6px;
            border-radius: 1px;
            background: var(--el-color-primary);
            height: 20px;
            margin-right: 8px;
        }
    }

    :deep(.success) {
        color: var(--el-color-primary);
        font-weight: bold;
    }

    :deep(.danger) {
        color: var(--el-color-danger);
        font-weight: bold;
    }

    :deep(.warning) {
        color: var(--el-color-warning);
        font-weight: bold;
    }

    :deep(.primary) {
        color: var(--el-color-primary);
        font-weight: bold;
    }

    :deep(.info) {
        color: var(--el-color-info);
        font-weight: bold;
    }
}
</style>
