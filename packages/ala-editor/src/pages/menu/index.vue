<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 13:55:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-form">
        <el-form :model="form" label-width="120px">
            <!-- <AlaInput v-model="ala_input.name" label="文本输入框" position="right" placeholder="123"/> -->
            <AlaInput v-model="form.input" label="普通文本框" placeholder="请输入普通文本框" />
            <AlaTextarea v-model="form.textarea" label="多行文本框" placeholder="请输入多行文本框" />
            <AlaPassword v-model="form.password" label="密码" placeholder="请输入密码" />
            <AlaRadio v-model="form.radio" label="单选框" :items="radioItems" />
            <AlaCheckbox v-model="form.checkbox" label="多选框" :items="radioItems" />
            <AlaSelect v-model="form.select" label="下拉选" :items="radioItems" />
            <AlaSwitch v-model="form.switch" label="开关" :items="radioItems" />
        </el-form>
        <button @click="showValue">console</button>
    </div>
    <!-- <SearchForm /> -->
    <el-table :data="paginatedData" style="width: 100%" row-key="id" :expand-row-keys="expandedRowIds"
        @expand-change="handleExpandChange">


        <el-table-column type="expand">

            <template #default="{ row }">
                <el-table v-if="row.children" :data="row.children" style="width: 100%" row-key="id" class="hide-header">
                    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                        :label="column.label"></el-table-column>
                </el-table>

            </template>

        </el-table-column>

        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
        </el-table-column>


        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
            :total="total" @current-change="handlePageChange" class="ala-page-pagination">
        </el-pagination>

    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { logger } from '@/utils/logger';
import { alaPage } from '@/utils/req';
import u from '@/utils/u';

const radioItems = [
    {
        name: "男",
        value: "man",
    },
    {
        name: "女",
        value: "men",
    }
]

const form = ref({
    input: "input",
    textarea: "textarea",
    password: "password",
    radio: "men",
    checkbox: ["men"],
    select: "man",
    switch: true,
})

const showValue = () => {
    console.log('form.value:', form.value);
}


// 分页参数
const page = ref({
    "current": 1,
    "size": 10,
    "total": 0,
    orders: [{
        column: 'id',
        asc: false
    }]
})
const params = ref({

})


const currentPage = computed(() => {
    return page.value.current;
})

const pageSize = computed(() => {
    return page.value.size;
})

const total = computed(() => {
    return page.value.total;
})


onMounted(() => {
    logger.info("onMounted 渲染 layout 页面");
    // 后台加载菜单
    alaPage(u.url("/u/menu/page"), page.value, params.value, true).then((data: any) => {

        const responsePage = data.data;
        page.value.current = responsePage.pageNum
        page.value.size = responsePage.pageSize
        page.value.total = responsePage.total

        console.log('data:', data?.data);
        // menus.value = data.data

        if (data?.data?.list) {
            menusList.value = data?.data?.list
        }



    });
})

interface Row {
    id: number;
    name: string;
    url: string;
    delFlag: number;
    icon: string;
    width: number;
    height: number;
    children?: Row[];
}

const columns = ref([
    { prop: 'name', label: '菜单名' },
    { prop: 'url', label: '路由URL' },
    { prop: 'delFlag', label: '是否删除' },
    { prop: 'icon', label: '图标名称' },
    { prop: 'width', label: '图标宽度' },
    { prop: 'height', label: '图标高度' },
]);

const menusList = ref<Array<Row>>([
]);

const expandedRowIds = ref<String[]>([]);

const paginatedData = computed(() => {
    // 分页逻辑
    const page = 1; // 假设当前页码
    const pageSize = 10; // 假设每页显示条数
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return menusList.value.slice(start, end);
});

const handleExpandChange = (row: Row, expandedRows: any) => {

    const id = row.id + ''
    console.log('row:', row);

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
    page.value.current = newPage;
};

</script>

<style lang="scss" scoped>
.hide-header {}
</style>