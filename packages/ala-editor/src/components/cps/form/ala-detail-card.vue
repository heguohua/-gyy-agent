<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-07 11:11:57
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-card.vue
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
        <PageCard ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
            :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
            :showEditButton="showEditButton" :showAddButton="showAddButton" :showDeleteButton="showDeleteButton"
            :noButtons="noButtons">

            <template #item="{ row }">
                <component :is="component" :data="row" @edit="handleEdit" @enable="handleEnable"
                    @disable="handleDisable" @add="handleAdd" @delete="handleDelete" />
            </template>

        </PageCard>

    </div>

    <!-- 详情页面 -->
    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />

    <!-- 新增、编辑 -->
    <!-- <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" /> -->


    <AlaBaseForm v-model="showAddForm" @confirm="confirm" v-bind="props" :fields="formFields" :formData="formData"
        labelPosition="top" :moduleName="moduleName" :url="addUrl" :updateUrl="updateUrl"
        :tipTitle="$t('pop.warm_title')" :formAttr="formAttr" :beforeSave="beforeSave" ref="alaBaseForm">
    </AlaBaseForm>

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
import PageCard from '../page/page-card.vue';
const { t } = useI18n();

const props = defineProps({
    previewParams: {
        type: Object as any
    },
    url: {
        type: String
    },
    addUrl: {
        type: String,
        default: () => ""
    },
    updateUrl: {
        type: String,
        default: () => ""
    },
    deleteUrl: {
        type: String,
        default: () => ""
    },
    moduleName: {
        type: String
    },
    component: {
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
    noButtons: {
        type: Boolean,
        default: false
    },
    formAttr: {
        type: Object as any,
        default: () => {
            return reactive({
                formWidth: 800,
                columnNum: 1,
                labelWidth: 150,
                labelPosition: 'top',
                useFormTitle: false
            })
        }
    },
    detailFields: {
        type: Array<any>,
        default: () => []
    },
    formFields: {
        type: Array<any>,
        default: () => []
    },
    baseFields: {
        type: Array<any>,
        default: () => []
    },
    beforeSave: {
        type: Function,
        default: null
    },
})



// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
const moduleName = computed(() => {
    return props.moduleName
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
    // logger.info(`【编辑】方法接收到参数 item `, item);
    // logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    // showAddForm.value = true
}

// 查询条件
const params = reactive({}) as { [key: string]: any }
watch(() => props.previewParams.params, (value: object) => {    
    console.log('props.previewParams.params: ------> ',props.previewParams.params);
    
    u.merged(params, props.previewParams.params)
}, { immediate: true, deep: true })

const pageRef = ref<InstanceType<typeof PageCard> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################




// 高级查询条件
const advancedFields: any[] = []

/**
 * 详情页面字段
 */
const detailItem = reactive({
    moduleName,
    item: {}
})

const showDetailPage = ref(false)


// 表单数据保存对象
const formData = reactive<{ [key: string]: any }>({
})
// 监听表单回调事件
const emit = defineEmits(["refresh", "close"])
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    // emit('refresh', data)

    refresh()
}

const alaBaseForm = ref()
const beforeSave = async (data: { [key: string]: any }) => {

    if (props.beforeSave) {
        if (u.isAsyncFunction(props.beforeSave)) {
            data = await props.beforeSave(data)
        } else {
            data = props.beforeSave(data)
        }
    }

    // 对 configuration 字段进行 base64加密
    // delete d['configuration']
    logger.info(`格式化数据后，data参数`, data);

    return data
}


const handleAdd = (item: { id: number }) => {
    console.log('handleAdd: ---> ', item);
}
const handleEnable = (item: any) => {
    updateStatus(item.id, { deleted: 1 })
}

const handleDisable = (item: any) => {
    updateStatus(item.id, { deleted: 2 })
}


const handleEdit = (item: any) => {

    u.clear(formData)
    u.merged(formData, item)
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true

}

const handleDelete = (item: { id: number }) => {
    console.log('handleDelete: ---> ', item);
}


const updateStatus = (id: number, data: object) => {

    alaPost(u.url('/iot/point/updateStatus'), { id, ...data }, false, 'PUT').then((data: any) => {
        const response = data;
        if (response.code === 200) {
            refresh()
        }
    });

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

<style>
.el-drawer__header h4 {
    text-align: center;
}
</style>
