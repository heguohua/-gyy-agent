<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-15 14:45:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 15:03:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/page-nesting-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-page-nesting-table">

        <!-- 分页列表区域 -->
        <el-table :data="paginatedData" style="width: 100%" row-key="id" :expand-row-keys="expandedRowIds"
            @expand-change="handleExpandChange" @sort-change="sortChange"
            :default-sort="{ prop: 'id', order: 'descending' }">

            <el-table-column type="expand">
                <template #default="{ row }">
                    <el-table v-if="row.children" :data="row.children" style="width: 100%" row-key="id"
                        class="hide-header">
                        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                            :label="column.label"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>

            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
                sortable>
            </el-table-column>

            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
                :total="total" @current-change="handlePageChange" class="ala-page-pagination">
            </el-pagination>

        </el-table>

    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaPage } from '@/utils/req';
import u from '@/utils/u';
import { ref } from 'vue'


interface Column {
    prop: string;
    label: string;
}


const props = defineProps({
    columns: {
        type: Array<Column>
    },
    url: {
        type: String
    },
    params: {
        type: Object
    },
})

// State
const refresh = (data: any) => {
    logger.warn("list页面接收到回调数据，即将刷新数据", data);
    logger.warn("list页面接收到回调数据，即将刷新数据，params", props.params);
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


const onePageList = ref<Array<any>>([]);

onMounted(() => {
    logger.info("onMounted 渲染 menu 分页列表页面");

    // 后台加载菜单
    alaPage(u.url(props.url || ""), page, props.params, true).then((data: any) => {

        const responsePage = data.data;
        page.current = responsePage.pageNum
        page.size = responsePage.pageSize
        page.total = responsePage.total

        if (data?.data?.list) {
            onePageList.value = data?.data?.list
        }

    });
})
const paginatedData = computed(() => {
    const page = 1; // 当前页码
    const pageSize = 10; // 每页显示条数
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return onePageList.value.slice(start, end);
});

const currentPage = computed(() => {
    return page.current;
})

const pageSize = computed(() => {
    return page.size;
})

const total = computed(() => {
    return page.total;
})

// 可展开内表通用代码
const expandedRowIds = ref<String[]>([]);
const handleExpandChange = (row: { id: string }, expandedRows: any) => {

    const id = row.id + ''
    if (expandedRows && expandedRows.length > 0) {
        // 如果当前行被展开，添加到数组中
        if (!expandedRowIds.value?.includes(id)) {
            expandedRowIds.value.push(id);
        }
    } else {
        // 如果当前行被收起，从数组中移除
        const index = expandedRowIds.value?.indexOf(id);
        if (index > -1) {
            expandedRowIds.value.splice(index, 1);
        }
    }
};

const handlePageChange = (newPage: number) => {
    page.current = newPage;
};

// Methods

defineExpose({ refresh })

</script>

<style scoped lang="scss"></style>