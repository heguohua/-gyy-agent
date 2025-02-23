<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-23 22:33:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/oa/todo/todoList.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" :showAddButton="true" />

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
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-if="formItem.formData.detail?.desktop" @showDetail="showDetail" />
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-else />
            </template>

        </template>


    </PageTable>

    <!-- 新增、编辑 -->
    <TodoAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" />

    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import chatGroupAdd from '@/pages/im/chatGroup/chatGroupAdd.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate, alaDetailRadio, alaDetailSelectDict, alaDetailSelectTable, alaDetailSwitch, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import AlaDetail from '@/components/cps/form/ala-detail.vue';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
import colors from '@/utils/colors';
import TodoAdd from './todoAdd.vue';
const { t } = useI18n();
const router = useRouter()
// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();

const moduleName = computed(() => {
    const code = route.meta.menuCode as string;
    console.log('code:', code);

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

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label);
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
const showPreviewPage = ref(false)
// const showPreview = (item: { [key: string]: any }) => {
//     u.clear(detailItem.item)
//     u.merged(detailItem, { item })
//     logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
//     showPreviewPage.value = true
// }

const formAttr = ref({
    formWidth: 600,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})



// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/p/todo/page"
const deleteUrl = "/p/todo/delete"
// const cls = alaBuildSelectTable("forms", "表单", "/l/lowcodingConfig/page", [{ prop: 'name', label: '表单名称', isQuery: true }], { propertyName: 'name', valueName: 'id', otherProperty: ['className'] }, undefined, { formType: 'flow' }, "请选择")

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'subject', "待办主题", 1, true),

        alaDetailDate(dType.date, 'startTime', "开始时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),
        alaDetailDate(dType.date, 'endTime', "结束时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),

        // 1-不重复，2-每天，3-每周，4-每半个月，5-每一个月，6-每2个月，7-每3个月，8-每半年，9-每一年，10-每个工作日，11-每2天，12-每3天，14-每4天，15-每5天，16-每10天
        alaDetailRadio(dType.radio, 'repeatType', "重复类型", [{ '不重复': 1 }, { '每天': 2, 'color': colors.primary }, { '每周': 3, 'color': colors.success }, { '每半个月': 4, 'color': colors.danger }, { '每一个月': 5 }, { '每2个月': 6 }, { '每3个月': 7 }, { '每半年': 8 }, { '每一年': 9 }, { '每个工作日': 10 }, { '每2天': 11 }, { '每3天': 12 }, { '每4天': 14 }, { '每5天': 15 }, { '每10天': 16 }], undefined, undefined, { columnWidth: { desktop: '150' } }),

        alaDetailBuild(dType.input, 'createdName', "创建人", undefined, undefined, { columnWidth: { desktop: '150' } }),
        alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),

    ]
})
/**
 * 详情页面字段
 */
const detailFields: any = ref([
    alaDetailBuild(dType.input, 'subject', "待办主题", 1, true),
    alaDetailDate(dType.date, 'startTime', "开始时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),
    alaDetailDate(dType.date, 'endTime', "结束时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),
    alaDetailBuild(dType.input, 'createdName', "创建人", undefined, undefined, { columnWidth: { desktop: '150' } }),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),
])

// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("displayName", '名称'),
    ]
})


// 高级查询条件
const advancedFields: any = []


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################


const handlePreview = (row: any) => {
    console.log('row:', row);
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    u.merged(previewPageProps, { id: row.id })
    showPreviewPage.value = true
}

const handleDeploy = (row: any) => {
    const deployUrl = '/p/design/deploy'
    alaPost(u.url(deployUrl), { id: row.id }, false, '').then((data: any) => {
        const response = data;
        if (response.data) {
            notify.success(t('pop.warm_title'), t('buttons.flow_deploy') + '成功')
            refresh()
        }
    });
}


const handleRedeploy = (row: any) => {
    const deployUrl = '/p/design/redeploy'
    alaPost(u.url(deployUrl), { id: row.id }, false, '').then((data: any) => {
        const response = data;
        if (response.data) {
            notify.success(t('pop.warm_title'), t('buttons.flow_redeploy') + '成功')
            refresh()
        }
    });
}


const handleClone = (row: any) => {
    const deployUrl = '/p/design/clone'
    alaPost(u.url(deployUrl), { id: row.id }, false, '').then((data: any) => {
        const response = data;
        if (response.data) {
            notify.success(t('pop.warm_title'), t('buttons.flow_redeploy') + '成功')
            refresh()
        }
    });
}


const handleDesign = (row: any) => {
    router.push({ name: "Design", query: { id: row.id } })
}

const previewPageProps = reactive({})

const tabs = computed(() => {
    return reactive([
        { title: '流程图', code: 'ProcessDesign', props: { ...previewPageProps, viewer: true } },
    ])
})
</script>

<style lang="scss" scoped></style>