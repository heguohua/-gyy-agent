<template>
    <div>
        <el-table :data="paginatedData" style="width: 100%" @row-click="handleRowClick">

            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                :label="column.label"></el-table-column>

            <el-table-column label="Actions" width="180">
                <template #default="{ row }">
                    <el-button link @click="toggleExpand(row)">
                        {{ isExpanded(row) ? 'Collapse' : 'Expand' }}
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
            :total="totalItems" @current-change="handlePageChange">
        </el-pagination>

        <el-table v-if="expandedRow" :data="[expandedRow]" style="width: 100%; margin-top: 20px;">
            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                :label="column.label"></el-table-column>
        </el-table>
        
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus';

interface Column {
    prop: string;
    label: string;
}

interface Row {
    [key: string]: any;
}

const columns: Column[] = ref([
    { prop: 'date', label: 'Date' },
    { prop: 'name', label: 'Name' },
    { prop: 'address', label: 'Address' },
]);

// 添加测试数据
const data: Row[] = ref([
    {
        date: '2016-05-02',
        name: 'John',
        address: 'New York No. 1 Lake Park',
    },
    {
        date: '2016-05-04',
        name: 'Jim',
        address: 'London No. 1 Lake Park',
    },
    {
        date: '2016-05-01',
        name: 'Joe',
        address: 'Sydney No. 1 Lake Park',
    },
    {
        date: '2016-05-03',
        name: 'Jon',
        address: 'Beijing No. 1 Lake Park',
    },
    // 更多测试数据...
]);

const expandedRow = ref<Row | null>(null);

const pageSize = ref(10);
const currentPage = ref(1);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return data.value.slice(start, end);
});

const totalItems = computed(() => data.value.length);

const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};

const handleRowClick = (row: Row, column: Column, event: Event) => {
    console.log('Row clicked:', row);
};

const toggleExpand = (row: Row) => {
    expandedRow.value = expandedRow.value === row ? null : row;
};

const isExpanded = (row: Row) => expandedRow.value === row;
</script>

<style lang="scss" scoped>
/* Your SCSS styles here */
.el-table {
    margin-bottom: 20px;
}
</style>