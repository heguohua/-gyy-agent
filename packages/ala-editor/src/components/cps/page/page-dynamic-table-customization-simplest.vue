<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 22:38:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/page-dynamic-table-customization-simplest.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        labelWidth="180px" />

    <!-- 分页列表 -->
    <PageDynamicTableCustomization ref="pageRef" :url="url" :columns="columns" :params="params"
        :showSelectCheckbox="false" :tipTitle="$t('pop.warm_title')" :className="className" :beforeQuery="beforeQuery">
        <template #default="{ row }">

            <slot :row="row" />

        </template>

    </PageDynamicTableCustomization>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import { getLowcodingConfigByClassName } from '@/config/formConfigs';
import req from '@/utils/req';
const { t } = useI18n();


const props = defineProps({
    className:{
        type:String,
    }
})

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();



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
    module: props.className,
    moduleName,
    id: null,
    selectedList: Array<{ id: string }>,
    item: {},
    formType,
    outApi,
    outApiUrl,
    outApiParams,
})

provide('baseInfo', baseInfo);

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

// 查询条件
const params = reactive({ tableName: props.className })

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}
// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = ref("")

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


const formConfigItems: any = {}

// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################

const beforeQuery = (params: any) => {
    return req.beforeQuery(params, props.className, formConfigItems.value)
}

/**
 * 详情页面字段
 */
const detailFields: any = ref([])

const showAddButton = ref(false)
const showDeleteButton = ref(false)
const showEditButton = ref(false)
const showDisableButton = ref(false)
const showButtonsColumn = ref(false)

onMounted(async () => {

    // 加载模型定义文件
    logger.info(`从后台加载【 ${props.className} 】配置数据，数据对象：`, params)

    const configs = await getLowcodingConfigByClassName(props.className!)

    columns.value = configs.columns
    baseFields.value = configs.baseFields
    formConfigItems.value = configs.formConfigItems
    addFormFields.value = configs.addFormFields
    detailFields.value = configs.detailFields
    showAddButton.value = configs.showAddButton
    showDeleteButton.value = configs.showDeleteButton
    showEditButton.value = configs.showEditButton
    showDisableButton.value = configs.showDisableButton
    showButtonsColumn.value = configs.showButtonsColumn
    formType.value = configs.formType
    u.merged(formAttr.value, configs.formAttr)

    if (configs.outApi) {
        // 说明是 静态api模块
        outApiUrl.value = configs.outApiUrl
        outApiParams.value = configs.outApiParams
        url.value = outApiUrl.value + '/page'
        outApi.value = true

    } else {
        url.value = "/l/dynamic/page"
    }

})

</script>

<style lang="scss" scoped></style>