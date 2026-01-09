<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-09 21:59:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null })" labelWidth="180px" :showAddButton="showAddButton"
        :showImportButton="showImportButton" :showExportButton="showExportButton" @export="handleExport"
        @import="handleImport" @importTemplate="handleTemplate" />

    <!-- 分页列表 -->
    <PageDynamicTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="showEditButton" :showDisableButton="showDisableButton" :showDeleteButton="showDeleteButton"
        :showAddButton="showAddButton" :showButtonsColumn="showButtonsColumn" :className="className"
        :beforeQuery="beforeQuery">

        <template #cols="{ row, columnName, formItem }">

            <template v-if="formItem.code === 'dateRange'">

                <component :is="getComponent(formItem.code)"
                    :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                    :formItem="formItem" :data="row" @refresh="refresh" />
            </template>
            <template v-else>
                <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-if="formItem.formData.detail?.desktop" @showDetail="showDetail" @refresh="refresh" />
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-else @refresh="refresh" />
            </template>

        </template>

    </PageDynamicTable>

    <!-- 新增、编辑 -->
    <Add @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" :fields="addFormFields" :formAttr="formAttrs"
        :className="className" v-if="showAddForm" />

    <AlaDetail :data="detailItem" v-model="showDetailPage" v-if="showDetailPage" :fields="detailFields"
        :formAttr="formAttrs" />
    <input type="file" ref="fileInput" @change="handleFileChange" :accept="acceptFileTypes" class="hidden-input"
        :value="fileValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Add from '@/pages/dynamic/add.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import { getLowcodingConfigByClassName } from '@/config/formConfigs';
import { useAlaStore } from '@/store/ala-store';
import req, { alaDownload, alaUpload } from '@/utils/req';
import { date } from '@/utils/date';
const alaStore = useAlaStore()
const { t } = useI18n();

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();

const className = route.path.slice(route.path.lastIndexOf('/') + 1)


const moduleName = computed(() => {
    const code = route.meta.menuCode as string;
    return t(code)
})

const formType = ref('')
const outApi = ref(false)
const outApiUrl = ref('')
const outApiParams = ref('')

// 2、定义当前编辑对象id
const baseInfo = reactive({
    module: className,
    moduleName,
    id: null,
    selectedList: Array<{ id: string }>,
    item: {},
    formType,
    outApi,
    outApiUrl,
    outApiParams,
})
const detailItem = reactive({
    moduleName,
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


watch(() => alaStore.get('ai_toPage'), (url: string) => {

    if (!url) return

    const mName = url.slice(route.path.lastIndexOf('/') + 1)
    if (mName === className) {
        nextTick(() => {
            // 在 DOM 更新后打开新增页面
            showAdd({ id: null })
        })
    }


}, {
    immediate: true
})


const showEdit = (item: { [key: string]: any }) => {
    // 解除 响应式引用，防止新增页面数据影响列表数据
    const entity = toRaw(item)
    entity.typeEntity = [{ id: entity.type }]

    u.merged(baseInfo, { entity })
    logger.info(`【编辑】方法接收到参数 entity `, entity);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);

    showAddForm.value = true

}

const showDetailPage = ref(false)
const showDetail = (item: { [key: string]: any }) => {
    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    const entity = toRaw(item)
    u.merged(baseInfo, { id: entity.id })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    showDetailPage.value = true
}

// 查询条件
const params = reactive({ tableName: className })

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = ref("")
const deleteUrl = ref("")

interface Column { prop: string, label: string, formItem: any }
const columns = ref<Array<Column>>([])

// 基础查询条件
const baseFields = ref<Array<any>>([])
// 高级查询条件
const advancedFields: any[] = []

// 表单字段
const addFormFields = ref<Array<any>>([
])

const formAttr = ref({
    formWidth: 400,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})

const formAttrs = computed(() => {
    return formAttr.value
})
const formConfigItems: any = {}

// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################
// ############## 分页列表导出、导入 start  ######################################


const handleExport = () => {
    console.log('export')
}

const handleImport = () => {
    console.log('import')
    fileInput.value.click()
}

const handleTemplate = async () => {
    console.log('importTemplate')

    const result = await alaDownload(u.url('/l/ieport/template'), { tableName: className }).then((data: any) => {
        const response = data;
        return response
    });

    const blob = new Blob([result.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    const fileName = `${baseInfo.moduleName}-数据导入模板-${date.format(new Date(), 'YYYYMMDDHHmmss')}.xlsx`;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl); // 释放内存

}

const acceptFileTypes = computed(() => {
    return 'xlsx'
})

const fileInput = ref();
const fileValue = ref('');

const handleFileChange = async (event: any) => {

    const target = event.target as HTMLInputElement


    if (target.files && target.files.length > 0) {
        for (let i = 0; i < target.files.length; i++) {
            const f: File = target.files[i]
            const result = await uploadAndImport(f, className)
            target.value = ''

        }
        // 上传文件，并更新 model 值
    }
}

const uploadAndImport = async (file: File, tableName: string) => {
    // 假设 params 是一个对象：{ file: File, otherField: string }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('tableName', tableName)
    const result = await alaUpload(u.url('/l/ieport/import'), formData, false, 'POST').then((data: any) => {
        const response = data;
        return response
    });

    return result
}

// ############## 分页列表导出、导入 end ######################################

const beforeQuery = (params: any) => {
    return req.beforeQuery(params, className, formConfigItems.value)
}

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})

/**
 * 详情页面字段
 */
const detailFields: any = ref([])

const showAddButton = ref(false)
const showDeleteButton = ref(false)
const showEditButton = ref(false)
const showDisableButton = ref(false)
const showImportButton = ref(false)
const showExportButton = ref(false)
const showButtonsColumn = ref(false)

onMounted(async () => {

    // 加载模型定义文件
    logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params)

    const configs = await getLowcodingConfigByClassName(className)

    columns.value = configs.columns
    baseFields.value = configs.baseFields
    formConfigItems.value = configs.formConfigItems
    addFormFields.value = configs.addFormFields
    detailFields.value = configs.detailFields
    showAddButton.value = configs.showAddButton
    showDeleteButton.value = configs.showDeleteButton
    showEditButton.value = configs.showEditButton
    showDisableButton.value = configs.showDisableButton
    showImportButton.value = configs.showImportButton
    showExportButton.value = configs.showExportButton
    showButtonsColumn.value = configs.showButtonsColumn
    formType.value = configs.formType
    u.merged(formAttr.value, configs.formAttr)


    if (configs.outApi) {
        // 说明是 静态api模块
        outApiUrl.value = configs.outApiUrl
        outApiParams.value = configs.outApiParams

        url.value = outApiUrl.value + '/page'
        deleteUrl.value = outApiUrl.value + '/delete'
        outApi.value = true
    } else {
        url.value = "/l/dynamic/page"
        deleteUrl.value = "/l/dynamic/delete"
    }

})

</script>

<style lang="scss" scoped></style>