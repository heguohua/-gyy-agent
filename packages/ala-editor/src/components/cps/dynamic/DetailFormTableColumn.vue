<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-16 13:47:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailFormTableColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>


    <div class="ala-form-table-detail">
        <p class="label" :style="{ width: '100%' }">{{ label }} <template v-if="isDetailPage"> </template></p>

        <p class="value-table">
            <!-- 分页列表 -->
            <PageDynamicTable v-if="showTable" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
                :showSelectCheckbox="false" @add="false" @edit="false" :tipTitle="label" :showEditButton="false"
                :showDeleteButton="false" :showAddButton="false" :showButtonsColumn="false" :className="className"
                :beforeQuery="beforeQuery">

                <template #cols="{ row, columnName, formItem }">

                    <template v-if="formItem.code === 'dateRange'">

                        <component :is="getComponent(formItem.code)"
                            :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                            :formItem="formItem" :data="row" />

                    </template>
                    <template v-else>
                        <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                        <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem"
                            :data="row" v-if="formItem.formData.detail?.desktop" />
                        <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem"
                            :data="row" v-else />
                    </template>
                </template>
            </PageDynamicTable>

        </p>
    </div>

</template>

<script setup lang="ts">
import { formConfigParse } from '@/pages/dynamic/formConfigParser';
import PageTable from '@/components/cps/page/page-table.vue';
import u from '@/utils/u';


// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: [String] as PropType<string>,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    },
    deepColumnName: {
        type: String,
        default: ''
    }
})

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    module: '',
    moduleName: '',
    id: 0,
    item: Object,
    selectedList: Array<{ id: string }>
});

const className = ref<string>()
const url = "/l/dynamic/page"
const deleteUrl = "/l/dynamic/delete"

const columns = ref<Array<any>>()
const params = ref<{ [key: string]: any }>({})

const beforeQuery = (params: any) => {
    return params
}

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    console.log('pageRef.value --->:');

    if (pageRef.value) {
        console.log('pageRef.value:', pageRef.value);

        pageRef.value.refresh(params)
    }
}

const showTable = ref(false)
watch(() => baseInfo.id, async () => {
    showTable.value = false
    if (props.value) {
        console.log('baseInfo:', baseInfo);
        console.log('props.value:', props.value);


        const childTableLowcodingConfig = u.parseJson(props.value)

        const list_url = "/l/lowcodingConfig/list"
        const list_params = { id: childTableLowcodingConfig[0].id }
        const configs = await formConfigParse(list_url, list_params)

        columns.value = configs.columns
        className.value = configs.className
        params.value = {
            tableName: configs.className,
            columns: ['*'],
            joinRightColumn: 'id',
            tableInfos: [
                {
                    tableName: `a_${configs.className}_${baseInfo.module}`,
                    columns: ["a_dynamic_list"],
                    joinType: 'innerJoin',
                    joinLeftColumn: `a_${configs.className}_id`,
                    conditions: [
                        {
                            column: "a_dynamic_list",
                            operator: "=",
                            value: baseInfo.id,
                        }
                    ]
                }
            ],
        }

        console.log('configs:', configs);
        console.log('className.value:', className.value);
        console.log('params.value: ___>', params.value);
        showTable.value = true


    }

}, {
    immediate: true,
    deep: true
})


const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})


</script>

<style scoped lang="scss">
.ala-form-table-detail {

    display: flex;
    flex-wrap: wrap;
    width: 100%;

    border: 2px solid #f3f7fa;
    border-radius: 6px;
    padding: 0px 0px 16px 0px;
    margin: 10px 0px;
    // background:#f3f7fa;

    :deep(.ala-page-table) {
        height: auto;
        padding: 0px 0px 0px 0px;
    }

    :deep(.el-table__body-wrapper) {
        min-height: 50px;
    }

    :deep(th.el-table__cell) {
        background: #f3f7fa !important;
        font-weight: normal;
        font-size: 0.9rem;
    }

    :deep(.el-table__cell) {
        .cell {
            white-space: nowrap; // 不换行
        }
    }

    :deep(.value) {
        background: none !important;
        padding-left: 0px !important;
    }

    :deep(.omit) {
        background: none !important;
    }

    .label {
        background: #f3f7fa;
        padding: 6px 8px 6px 8px;
        margin-bottom: 1px;
        font-size: 0.9rem;
    }

    .value-table {
        width: 100%;
    }
}
</style>
