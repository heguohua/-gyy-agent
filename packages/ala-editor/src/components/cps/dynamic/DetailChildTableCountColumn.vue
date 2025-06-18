<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-18 10:59:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailChildTableCountColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value" @click="handleClick"><i :style="style">
            {{ showValue }}</i>{{ unit }}

        <teleport to="body" v-if="showDetailPage">

            <AlaDetailPageTable :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr">

                <template #content>

                    <PageDynamicTable v-if="showDetailPage" :url="url" :deleteUrl="deleteUrl" :columns="columns"
                        :params="params" :showSelectCheckbox="false" @add="false" @edit="false" :tipTitle="label"
                        :showEditButton="false" :showDeleteButton="false" :showAddButton="false"
                        :showButtonsColumn="false" :className="className" :beforeQuery="beforeQuery">

                        <template #cols="{ row, columnName, formItem }">

                            <template v-if="formItem.code === 'dateRange'">

                                <component :is="getComponent(formItem.code)"
                                    :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                                    :formItem="formItem" :data="row" />

                            </template>
                            <template v-else>
                                <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                                <component :is="getComponent(formItem.code)" :value="row[columnName]"
                                    :formItem="formItem" :data="row" v-if="formItem.formData.detail?.desktop" />
                                <component :is="getComponent(formItem.code)" :value="row[columnName]"
                                    :formItem="formItem" :data="row" v-else />
                            </template>
                        </template>
                    </PageDynamicTable>

                </template>

            </AlaDetailPageTable>
        </teleport>

    </p>

</template>

<script setup lang="ts">
import { getLowcodingConfigByClassName } from '@/config/formConfigs'
import u from '@/utils/u'


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
        type: Number,
        default: () => 0
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
    }
})

// Methods

const style = computed(() => {
    const st = { marginRight: '6px' }

    let value = props.value || 0
    const backgroundNum = props.formItem.formData.backgroundNum?.desktop
    const colors = props.formItem.formData.colors?.desktop
    const index = u.findIntervalIndex(backgroundNum, value)

    if (colors && colors.length > 0) {
        u.merged(st, { color: colors[index] })
    }

    return st
})



// 2025-6-9 修复分页列表、详情页面值回显异常bug
const showValue = computed(() => {
    let value = props.value || 0
    return value
})

const unit = computed(() => {
    const unit = props.formItem.formData.unit?.desktop
    return unit
})



const detailItem = ref({})
const detailFields = ref<Array<any>>([])
const formAttr = reactive({
    formWidth: 800,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false
})

const showDetailPage = ref(false)



const className = ref<string>()
const url = "/l/dynamic/page"
const deleteUrl = "/l/dynamic/delete"

const columns = ref<Array<any>>()
const params = ref<{ [key: string]: any }>({})

const beforeQuery = (params: any) => {
    return params
}


const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})
// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    module: '',
    moduleName: '',
    id: 0,
    item: Object,
    selectedList: Array<{ id: string }>
});

const handleClick = async () => {

    let leftTableName = props.formItem.formData.moduleName.desktop

    let rightTableName = `a_${leftTableName}_${baseInfo.module}`
    let joinLeftColumn = `a_${leftTableName}_id`
    let rightColumnName = "a_dynamic_list"
    let rightColumnValue = props.data.id

    const configs = await getLowcodingConfigByClassName(leftTableName)

    columns.value = configs.columns
    className.value = configs.className
    params.value = {
        tableName: leftTableName,
        columns: ['*'],
        joinRightColumn: 'id',
        tableInfos: [
            {
                tableName: rightTableName,
                columns: ["a_dynamic_list"],
                joinType: 'innerJoin',
                joinLeftColumn: joinLeftColumn,
                conditions: [
                    {
                        column: rightColumnName,
                        operator: "=",
                        value: rightColumnValue,
                    }
                ]
            }
        ],
    }



    showDetailPage.value = true
}


</script>

<style scoped lang="scss">
.value {
    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
}
</style>
