<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-20 09:20:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/模拟数据版本.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-table :data="paginatedData" style="width: 100%" row-key="id" :expand-row-keys="expandedRows"
        @expand-change="handleExpandChange">


        <el-table-column type="expand">

            <template #default="{ row }">
                <el-table v-if="row.rows" :data="row.rows" style="width: 100%" row-key="id" class="hide-header">
                    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                        :label="column.label"></el-table-column>
                </el-table>

            </template>

        </el-table-column>

        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
        </el-table-column>


        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
            :total="totalItems" @current-change="handlePageChange">
        </el-pagination>

    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

interface Row {
    id: number;
    date: string;
    name: string;
    address: string;
    expanded?: boolean;
    rows?: Row[];
}

const columns = ref([
    { prop: 'date', label: 'Date' },
    { prop: 'name', label: 'Name' },
    { prop: 'address', label: 'Address' }
]);

const data = ref<Array<Row>>([
    {
        id: 1,
        date: '2016-05-02',
        name: 'John',
        address: 'New York No. 1 Lake Park',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'Jim',
        address: 'London No. 1 Lake Park',
        rows: [
            {
                id: 1,
                date: '2016-05-02',
                name: 'John',
                address: 'New York No. 1 Lake Park',
            },
            {
                id: 2,
                date: '2016-05-04',
                name: 'Jim',
                address: 'London No. 1 Lake Park',
            },
            // 更多测试数据...
        ]
    },
    // 更多测试数据...
]);

const expandedRowIds = ref<String[]>([]);

const paginatedData = computed(() => {
    // 分页逻辑
    const page = 1; // 假设当前页码
    const pageSize = 10; // 假设每页显示条数
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.value.slice(start, end);
});

const handleExpandChange = (row: Row, expandedRows: any) => {

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
</script>

<style lang="scss" scoped>
:deep .hide-header .el-table__header {
    display: none;
}
</style>