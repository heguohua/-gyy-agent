<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-15 14:45:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-07 09:48:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/page-card.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-page-card">

        <template class="" v-for="(item, index) in onePageList" :key="item.id" :class="">
            <slot name="item" :row="item" @edit="handleEdit" @enable="handleEnable" @disable="handleDisable"
                @add="handleAdd" @delete="handleDelete"></slot>
        </template>

        <!-- <el-pagination v-model:current-page="current" :page-sizes="pageSize" :page-size="page.size"
            layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handlePageChange" class="ala-page-pagination" :pager-count="11" background>
        </el-pagination> -->


    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaDelete, alaPage, alaPost } from '@/utils/req';
import u from '@/utils/u';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Column {
    prop: string;
    label: string;
    formItem: any;
}

const props = defineProps({
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
    // 是否显示 新增子级 按钮
    showAddSubButton: {
        type: Boolean,
        default: false
    },
    pageSize: {
        type: Array<number>,
        default: [10, 20, 30, 40, 50, 100, 200]
    },
    // 是否显示 按钮列
    noButtons: {
        type: Boolean,
        default: false
    }

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
const displayAddButton = () => {
    console.log('props.showAddButton:', props.showAddButton);

    return props.showAddButton;
}
const displayAddSubButton = () => {
    return props.showAddSubButton;
}

const deleteContent = () => {
    const content = t('pop_content.delete', { content: baseInfo.moduleName })
    return content
}



// State
const refresh = (data: any) => {
    logger.warn("card页面接收到回调数据，即将刷新数据", data);
    logger.warn("card页面接收到回调数据，即将刷新数据，params", props.params);
    queryPageData()
}



const loading = ref(true)
// 分页列表通用代码
// 分页参数
const page = reactive({
    "current": 1,
    "size": 10000,
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
    loading.value = true
    alaPage(u.url(props.url || ""), page, props.params, true).then((data: any) => {
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

onMounted(() => {
    logger.info("onMounted 渲染 menu 分页列表页面");
    queryPageData()
})







// Methods
const emit = defineEmits(["add", "edit", "enable", "disable", "delete"])
defineExpose({ refresh })

const handleAdd = (item: { id: number }) => {
    emit("add", item)
}
const handleEnable = (item: any) => {
    emit('enable', item)
}

const handleDisable = (item: any) => {
    emit('disable', item)
}


const handleEdit = (item: any) => {
    emit("edit", item)
}

const handleDelete = (item: { id: number }) => {
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
            emit("delete", item)
            // postData(item)
        })
        .catch(() => {
            logger.info("用户选择【返回】按钮");
        })


}

</script>

<style scoped lang="scss">
.ala-page-card {
    overflow-y: auto;
    padding-bottom: 250px;
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #e2e2e2;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #e2e2e2;
    }

    .ala-page-pagination {
        float: right;
        margin-top: 8px;

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