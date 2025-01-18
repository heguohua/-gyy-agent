<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-15 14:45:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-18 18:36:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/page-table-select.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-page-table">
        <!-- 分页列表区域 -->

        <div class="table-title">
            <!-- 查询条件 -->
            <SearchPanel :baseFields="searchFields" :params="formParams" @refresh="refresh" labelWidth="180px"
                :showAddButton="false" ref="searchPanelRef" :isFormDesign="isFormDesign" />

        </div>

        <el-table :data="paginatedData" style="width: 100%" :row-key="getRowKeys" @sort-change="sortChange"
            :default-sort="{ prop: 'id', order: 'descending' }" @selection-change="handleSelectedChange"
            @current-change="handleCurrentChange" ref="table" v-loading="loading"
            :element-loading-text="$t('common.loading')">


            <!-- 多选框 -->
            <el-table-column type="selection" :width="selectCheckboxWidth()" v-if="displaySelectCheckbox()"
                :reserve-selection="true" />

            <!-- 主表列渲染 -->
            <el-table-column v-for="column in columnss" :key="column.prop" :prop="column.prop"
                :label="isFormDesign ? parseLabel(column.label) : column.label" sortable>

                <!-- <template #default="scope">
                    <slot name="cols" :row="scope.row" :columnName="column.prop"></slot>
                </template> -->


            </el-table-column>

        </el-table>

        <!-- 分页列表 -->
        <el-pagination v-model:current-page="current" :page-sizes="pageSize" :page-size="page.size"
            layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handlePageChange" class="ala-page-pagination" :pager-count="11" background>
        </el-pagination>


    </div>
</template>

<script setup lang="ts">
import { alaBuildInput } from '@/config/alaBuilders';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaDelete, alaPage, alaPost } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Column {
    prop: string;
    label: string;
    isQuery?: boolean;
}

interface ItemProperty {
    propertyName: string,
    valueName: string
}

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    columns: {
        type: String
    },
    url: {
        type: String
    },
    deleteUrl: {
        type: String
    },
    params: {
        type: [Object, String] as PropType<object | string>
    },
    // 是否显示 表格前面的 复选框按钮
    showSelectCheckbox: {
        type: Boolean,
        default: true
    },
    // 是否显示 表格前面的 复选框按钮
    showSelectCheckboxWidth: {
        type: Number,
        default: 55
    },
    // 是否显示 编辑 按钮
    showEditButton: {
        type: Boolean,
        default: true
    },
    // 是否显示 编辑 按钮
    showDeleteButton: {
        type: Boolean,
        default: true
    },
    pageSize: {
        type: Array<number>,
        default: [10, 20, 30, 40, 50, 100, 200]
    },
    itemProperty: {
        type: Object as () => ItemProperty,
        default: () => ({})
    },
    isFormDesign: {
        type: Boolean,
        default: false
    }

})

// 查询条件区域对象
const formParams = ref({})
const columnss = ref<Array<any>>([])
const searchFields = computed(() => {
    const fields: any = []
    if (props.columns) {
        const columns = u.parseJson(props.columns)
        columns.forEach((column: any) => {

            if (column.isQuery) {
                fields.push(alaBuildInput(column.prop, u.parseI18n(column.label, t)),)
            }
            column['label'] = u.parseI18n(column.label, t)
            columnss.value.push(column)
        })
    }
    return fields
})

// 获取数据缓存对象

// 操作按钮
const displaySelectCheckbox = () => {
    return props.showSelectCheckbox;
}


const selectCheckboxWidth = () => {
    return props.showSelectCheckboxWidth;
}


const handleSelectedChange = (items: Array<{ id: string }>) => {
    emit('selectedChange', items)
}

const handleCurrentChange = (item: { id: string }) => {
}


// State
const refresh = (data: any) => {
    logger.warn("list页面接收到回调数据，即将刷新数据，params", props.params);
    queryPageData()
}

// 排序字段发生变化
const sortChange = (a: any, b: any, c: any) => {
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);

}

const loading = ref(true)
// 分页列表通用代码
// 分页参数
const page = reactive({
    "current": 1,
    "size": 10,
    "total": 0,
    orders: [{
        column: 'id',
        asc: false
    }]
})

const { current, total, size } = toRefs(page)

const onePageList = ref<Array<any>>([]);

const queryPageData = () => {

    // 后台加载菜单
    logger.info(`查询分页列表数据，url【 ${props.url} 】`);

    const totalParams = {}

    let params = props.params

    console.log('props.params:', props.params);


    if (typeof params === 'string') {
        params = u.parseJson(params)
    }

    u.merged(totalParams, params as Record<string, any>);


    if (isDynamicTable()) {

        // 当前是 动态分页列表，需要转换查询条件
        const conditions: any[] = []
        const fp = formParams.value as { [key: string]: any }
        Object.keys(fp).forEach((key: string) => {
            const value = fp[key]
            if (value) {
                conditions.push({ column: 'a_' + key, operator: 'rLike', value })
            }
        })

        u.merged(totalParams, { conditions });

    } else {
        // 当前 不是 动态分页列表，不需要转换查询条件，直接合并
        u.merged(totalParams, formParams.value);
    }
    loading.value = true

    if (!props.url) {
        notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
    } else {
        alaPage(u.url(props.url || ""), page, totalParams, false).then((data: any) => {
            const responsePage = data.data;
            current.value = responsePage.pageNum
            // size.value = responsePage.pageSize
            total.value = responsePage.total

            if (data?.data?.list) {
                onePageList.value = data?.data?.list
            }
            loading.value = false

        });
    }
}


const paginatedData = computed(() => {
    return onePageList.value
});

const handlePageChange = (newPage: number) => {
    page.current = newPage;
    queryPageData()
};

const handleSizeChange = (newSize: number) => {
    page.size = newSize;
    queryPageData()
};

// Methods
const emit = defineEmits(["add", "edit", "selectedChange"])

// 取消勾选的项目
const table = ref()
const cancelSelect = (item: any) => {
    logger.info(`子组件接收到父组件方法调用，item：`, item);
    table.value.toggleRowSelection(item, false);
}

const searchPanelRef = ref()
const clear = () => {
    searchPanelRef.value.clear()
}

const model = defineModel({
    type: Array<any>,
    default: () => ([])
})


onMounted(() => {
    logger.info(`onMounted 渲染 menu 分页列表页面，url [ ${props.url} ]，当前页面 model`);
    // 先刷新分页列表数据
    queryPageData()

    // 再初始化历史勾选的数据状态
    if (model.value && model.value.length > 0) {
        model.value.forEach(item => {
            table.value.toggleRowSelection(item, true);
        })
    }

})

const getRowKeys = (row: any) => {
    return row.id
}

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label.slice(3, label.length - 2));
}

const isDynamicTable = () => {

    const url = props.url || ''
    if (url.indexOf('/l/dynamic/') > -1) {
        return true;
    }
    return false
}

// 暴露方法
defineExpose({ refresh, cancelSelect, clear })


</script>

<style scoped lang="scss">
.ala-page-table {

    .table-title {
        margin-top: 1px;
        padding-left: 12px;
        font-size: 1rem;
        font-weight: 600;
    }

    .ala-page-pagination {
        float: right;
        margin-top: 8px;
        margin-right: 2px;

        :deep .el-pager li:not(.is-active) {
            background-color: #fff;
        }

        :deep button[aria-disabled="false"] {
            background-color: #fff;
        }
    }

    :deep(.el-table__body-wrapper) {
        min-height: 400px;
    }

    :deep(.caret-wrapper .sort-caret) {
        /* 增加边框宽度 */
        border-width: 4px;
        /* 调整箭头的位置 */
        margin-top: 3px;
        left: 4px;
    }

}
</style>