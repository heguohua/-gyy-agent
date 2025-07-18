<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-18 20:26:39
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/designList.vue
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


        <template #btns="{ row }">

            <AlaButton :showButton="true" name="preview" @preview="handlePreview(row)" buttonType="default" />

            <AlaButton :showButton="true" name="flow_design" @flow_design="handleDesign(row)" buttonType="primary" />

            <AlaButtonGroup :buttons="[
                { name: 'flow_deploy', popConfirm: false, handle: handleDeploy, row: row, buttonType: 'primary' },
                { name: 'flow_redeploy', popConfirm: true, handle: handleRedeploy, row: row, buttonType: 'danger' },
                { name: 'clone', popConfirm: true, handle: handleClone, row: row, buttonType: 'primary' }
            ]" />

        </template>

        <!-- <template #cols="{ row, columnName }">
            <AlaPageViewStatus v-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <AlaPageViewStatus v-else-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <template v-else>{{ row[columnName] }}</template>
        </template> -->

    </PageTable>

    <!-- 新增、编辑 -->
    <designAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" />

    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />

    <!-- <AlaTabPage v-model="showPreviewPage" title="流程图预览" width="1200"
        :tabs="[{ title: '表单', code: 'form', properties: {} }, { title: '流程图', code: 'table', properties: {} },]" /> -->

    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程图" width="1800" :tabs="tabs" />


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import designAdd from '@/pages/process/designAdd.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailSelectDict, alaDetailSwitch, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import AlaDetail from '@/components/cps/form/ala-detail.vue';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
const { t } = useI18n();
const router = useRouter()
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

const url = "/p/design/page"
const deleteUrl = "/p/design/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailInput('displayName', "流程名称", 1, true),
        alaDetailInput('name', "唯一编码"),
        alaDetailSelectDict('typeEntity', "流程分类", 'dictLabel'),
        alaDetailSwitch('isDeployed', "是否已部署", "已部署", 1, "未部署", 2),
        alaDetailTextarea('remark', "备注说明"),
        alaDetailDate( 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailDate( 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

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
    alaDetailInput('displayName', "流程名称", 1, true),
    alaDetailInput('name', "唯一编码"),
    alaDetailSelectDict('typeEntity', "流程分类", 'dictLabel'),
    alaDetailSwitch('isDeployed', "是否已部署", "已部署", 1, "未部署", 2),
    alaDetailInput('createdName', "创建人"),
    alaDetailDate( 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailInput('updatedName', "更新人"),
    alaDetailDate( 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailTextarea('remark', "备注说明"),

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
            notify.success(t('pop.warm_title'), t('buttons.clone') + '成功')
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