<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 23:15:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件区域 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd" />

    <!-- 分页列表区域 -->
    <el-table :data="paginatedData" style="width: 100%" row-key="id" :expand-row-keys="expandedRowIds"
        @expand-change="handleExpandChange" @sort-change="sortChange"
        :default-sort="{ prop: 'id', order: 'descending' }">

        <el-table-column type="expand">
            <template #default="{ row }">
                <el-table v-if="row.children" :data="row.children" style="width: 100%" row-key="id" class="hide-header">
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

    <!-- 新增、编辑区域 -->
    <MenuAdd @callback="refresh" v-model="showAddForm" v-bind="baseInfo" />

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { logger } from '@/utils/logger';
import { alaPage } from '@/utils/req';
import u from '@/utils/u';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';



// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
const moduleName = route.meta.menuName as string || '';

// 2、定义当前编辑对象id
let id = 0

const baseInfo = reactive({
    moduleName,
    id
})
// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

const showAddForm = ref(false)
const showAdd = () => {
    showAddForm.value = true
}
const refresh = (data: typeof form) => {
    logger.warn("list页面接收到回调数据，即将刷新数据", data);
    logger.warn("list页面接收到回调数据，即将刷新数据，params", params);
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

// 查询条件
const params = reactive({

})
const onePageList = ref<Array<Row>>([]);

onMounted(() => {
    logger.info("onMounted 渲染 menu 分页列表页面");

    // 后台加载菜单
    alaPage(u.url(url), page, params, true).then((data: any) => {

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

const handlePageChange = (newPage: number) => {
    page.current = newPage;
};
// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/u/menu/page"

const form = reactive<{ [key: string]: any }>({
    input: "input",
    textarea: "textarea",
    textarea_a: "textarea",
    password: "password",
    radio: "men",
    checkbox: ["men"],
    select: "man",
    switch: true,
    date: ["2024-11-11", "2024-11-12"],
    slider: 6,
    // slider: [30, 66],
    rating: 2,
})



// 基础查询条件
const baseFields = [
    { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
    { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
    { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
    { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch', other: { activeText: "开", inActiveText: "关" } },
    // {
    //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date', other: {
    //         dateType: "datetimerange",
    //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
    //     }
    // },
    { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider', other: { min: 2, max: 10, step: 1, } },
    { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating', other: { max: 8, allowHalf: true } },
]


// 高级查询条件
const advancedFields = [
    { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input2' },
    { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea2' },
    { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password2' },
    { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select2', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch2', other: { activeText: "开", inActiveText: "关" } },
    // {
    //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date2', other: {
    //         dateType: "datetimerange",
    //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
    //     }
    // },
    { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider2', other: { min: 2, max: 10, step: 1, } },
    { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating2', other: { max: 8, allowHalf: true } },
]


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################




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


const sortChange = (a: any, b: any, c: any) => {
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);

}


</script>

<style lang="scss" scoped>
// .ala-form {
//     background: #fff;
//     margin: 4px 0px;
//     border-radius: var(--border-radius);
//     padding: 8px 20px;

//     :deep .el-form-item {
//         margin-bottom: 12px;
//     }

//     :deep .el-form-item__label {
//         font-size: 0.9rem;
//         font-weight: bold;
//         padding-right: 6px;
//     }

//     :deep .el-button+.el-button {
//         margin: 0px;
//     }

//     .ala-search-base {
//         display: inline-flex;
//         flex-wrap: wrap;
//         column-gap: 16px;

//         .ala-input-wrapper {
//             min-width: 300px;
//         }

//         .ala-slider-wrapper {
//             min-width: 300px;
//         }

//         .ala-radio-wrapper {
//             min-width: 160px;
//         }
//     }

//     .ala-search-advanced {
//         display: inline-flex;
//         flex-wrap: wrap;
//         column-gap: 16px;

//         .ala-search-advanced-item {}
//     }

//     button {}
// }

.hide-header {}
</style>