<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-15 14:45:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-07 17:53:38
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
            <SearchPanel :baseFields="baseFields" :params="formParams" @refresh="refresh" labelWidth="180px"
                :showAddButton="false" />

        </div>

        <el-table :data="paginatedData" style="width: 100%" row-key="id" @sort-change="sortChange"
            :default-sort="{ prop: 'id', order: 'descending' }" @selection-change="handleSelectedChange"
            @current-change="handleCurrentChange" ref="table">


            <!-- 多选框 -->
            <el-table-column type="selection" :width="selectCheckboxWidth()" v-if="displaySelectCheckbox()" />

            <!-- 主表列渲染 -->
            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
                sortable>
            </el-table-column>

        </el-table>

        <!-- 分页列表 -->
        <el-pagination v-model:current-page="current" :page-sizes="pageSize" layout="total, prev, pager, next"
            :total="total" @current-change="handlePageChange" class="ala-page-pagination" :pager-count="11" background>
        </el-pagination>


    </div>
</template>

<script setup lang="ts">
import { alaBuildInput } from '@/config/alaBuilders';
import { logger } from '@/utils/logger';
import { alaDelete, alaPage, alaPost } from '@/utils/req';
import u from '@/utils/u';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Column {
    prop: string;
    label: string;
    isQuery?: boolean;
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
        type: Array<Column>
    },
    url: {
        type: String
    },
    deleteUrl: {
        type: String
    },
    params: {
        type: Object
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
    }

})

// 查询条件区域对象
const formParams = ref({})
const baseFields = computed(() => {
    const fields: any = []
    props.columns?.forEach((column) => {
        if (column.isQuery) {
            fields.push(alaBuildInput(column.prop, t('module.menu.' + column.prop)),)
        }
    })
    return fields
})

// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    moduleName: '',
    id: 0,
    item: Object,
    selectedList: Array<{ id: string }>
});

// 操作按钮
const displaySelectCheckbox = () => {
    return props.showSelectCheckbox;
}
const displayEditButton = () => {
    return props.showEditButton;
}
const displayDeleteButton = () => {
    return props.showDeleteButton;
}

const deleteContent = () => {
    const content = t('pop_content.delete', { content: baseInfo.moduleName })
    return content
}

const selectCheckboxWidth = () => {
    return props.showSelectCheckboxWidth;
}

const handleDelete = (index: number, item: { id: number }) => {
    logger.info(`点击【 删除 】按钮，当前行数据`, item);

    ElMessageBox.confirm(
        deleteContent(),
        props.tipTitle,
        {
            confirmButtonText: t("buttons.confirm"),
            cancelButtonText: t("buttons.cancel"),
            type: 'warning',
        })
        .then(() => {
            logger.info("用户选择【确认】按钮，即将删除数据，当前对象id为：", item.id);
            // postData(props.formData)
            // emit("confirm", props.formData)
            postData(item)
        })
        .catch(() => {
            logger.info("用户选择【返回】按钮");
        })


}

const postData = (item: { id: number }) => {

    // 刷新列表数据
    alaDelete(u.url(props.deleteUrl || ""), { id: item.id }, false).then((data: any) => {
        const response = data;
        refresh(response)
    });
}


const handleAdd = (index: number, item: { id: number }) => {
    logger.info(`点击【 添加子级 】按钮，当前行id【 ${item.id} 】当前行数据`, item);
    emit("add", item)
}

const handleSelectedChange = (items: Array<{ id: string }>) => {
    console.log('分页列表多选items:', items);
    emit('selectedChange', items)
}

const handleCurrentChange = (item: { id: string }) => {
    console.log('分页列表单选item:', item);
}


// State
const refresh = (data: any) => {
    logger.warn("list页面接收到回调数据，即将刷新数据,formParams");
    console.log('formParams.value:', formParams.value);
    logger.warn("list页面接收到回调数据，即将刷新数据，params", props.params);
    queryPageData()
}

// 排序字段发生变化
const sortChange = (a: any, b: any, c: any) => {
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);

}

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
    u.merged(totalParams, props.params as Record<string, any>);
    u.merged(totalParams, formParams.value);

    alaPage(u.url(props.url || ""), page, totalParams, true).then((data: any) => {
        const responsePage = data.data;
        current.value = responsePage.pageNum
        size.value = responsePage.pageSize
        total.value = responsePage.total

        if (data?.data?.list) {
            onePageList.value = data?.data?.list
        }
    });
}

onMounted(() => {
    logger.info("onMounted 渲染 menu 分页列表页面");
    queryPageData()
})

const paginatedData = computed(() => {
    return onePageList.value
});

const handlePageChange = (newPage: number) => {
    page.current = newPage;
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

// 暴露方法
defineExpose({ refresh, cancelSelect })


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


}
</style>