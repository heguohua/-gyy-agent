<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 19:43:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-form">
        <el-form :model="form" label-width="80px">
            <!-- <AlaInput v-model="ala_input.name" label="文本输入框" position="right" placeholder="123"/> -->
            <!-- <AlaInput v-model="form.input" label="普通文本框" placeholder="请输入普通文本框" />
            <AlaTextarea v-model="form.textarea" label="多行文本框" placeholder="请输入多行文本框" />
            <AlaPassword v-model="form.password" label="密码" placeholder="请输入密码" />
            <AlaRadio v-model="form.radio" label="单选框" :items="radioItems" />
            <AlaCheckbox v-model="form.checkbox" label="多选框" :items="radioItems" />
            <AlaSelect v-model="form.select" label="下拉选" :items="radioItems" />
            <AlaSwitch v-model="form.switch" label="开关" :items="radioItems" />
            <AlaDate v-model="form.date" label="日期" placeholder="请选择日期" dateType="datetimerange"
                format="YYYY-MM-DD HH:mm:ss" start="2024-11-10" end="2024-11-13" />
            <AlaSlider v-model="form.slider" label="滑块" placeholder="请拖拽滑块" :min="0" :max="100" :range="true" /> -->

            <!-- <AlaRating v-model="form.rating" label="评分" placeholder="请点击打分" :max="5" /> -->
            <!-- <component :is="AlaRating" v-bind="rt" v-model="form.rating" /> -->

            <!-- <SearchPanel :fields="fields" /> -->
            <!-- <div class="ala-search-item" v-for="(item, index) in fields" :key="u.uuid()">
                <component :is="item.name" :label="item.label" :position="item.position" :placeholder="item.placeholder"
                    v-bind="item.other" v-model="form[item.model]" />
            </div> -->

            <!-- 基础查询条件 -->
            <div class="ala-search-base">
                <div class="ala-search-base-item" v-for="(item, index) in basicFields" :key="u.uuid()">
                    <component :is="item.componentName" :label="item.label" :position="item.position"
                        :placeholder="item.placeholder" v-bind="item.other" v-model="form[item.fieldName]" />
                </div>

                <el-button type="primary" @click.prevent="query">查询</el-button>
                <el-button type="primary">重置</el-button>
                <!-- 高级查询条件 -->
                <el-button type="primary" @click="toggleAdvanced">
                    {{ advanced ? '收起高级查询' : '展开高级查询' }}
                    <!-- <el-icon :style="{ transform: `rotate(${advanced ? 180 : 0}deg)` }">
                        <arrow-up v-if="advanced" />
                        <arrow-down v-else />
                    </el-icon> -->
                </el-button>
                <el-button type="primary" @click="showAddForm = !showAddForm">新增</el-button>

            </div>

            <!-- <div class="ala-search-advanced animate__animated animate__fadeIn " v-show="advanced">
                <div class="ala-search-advanced-item" v-for="(item, index) in advancedFields" :key="u.uuid()">
                    <component :is="item.componentName" :label="item.label" :position="item.position"
                        :placeholder="item.placeholder" v-bind="item.other" v-model="form[item.fieldName]" />
                </div>
            </div> -->

        </el-form>
    </div>
    <!-- <SearchForm /> -->
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
const refresh = (data: typeof form) => {
    logger.warn("list页面接收到回调数据，即将刷新数据", data);
}
// 切换高级查询条件按钮
const toggleAdvanced = () => {
    advanced.value = !advanced.value;
};

//查询按钮
const query = () => {
    console.log('form.value:', form);
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
const basicFields = [
    { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
    { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
    { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
    { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch', other: { activeText: "开", inActiveText: "关" } },
    {
        componentName: 'AlaDate', label: '创建时间', fieldName: 'date', other: {
            dateType: "datetimerange",
            format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
        }
    },
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
    { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating2', other: { max: 8, allowHalf: true } },]
const advanced = ref(false)


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
.ala-form {
    background: #fff;
    margin: 4px 0px;
    border-radius: var(--border-radius);
    padding: 8px 20px;

    :deep .el-form-item {
        margin-bottom: 12px;
    }

    :deep .el-form-item__label {
        font-size: 0.9rem;
        font-weight: bold;
        padding-right: 6px;
    }

    :deep .el-button+.el-button {
        margin: 0px;
    }

    .ala-search-base {
        display: inline-flex;
        flex-wrap: wrap;
        column-gap: 16px;

        .ala-input-wrapper {
            min-width: 300px;
        }

        .ala-slider-wrapper {
            min-width: 300px;
        }

        .ala-radio-wrapper {
            min-width: 160px;
        }
    }

    .ala-search-advanced {
        display: inline-flex;
        flex-wrap: wrap;
        column-gap: 16px;

        .ala-search-advanced-item {}
    }

    button {}
}

.hide-header {}
</style>