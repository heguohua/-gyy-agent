<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-15 14:45:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-30 09:01:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/video-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-card-table">
        <!-- 分页列表区域 -->

        <div class="video-cards">

            <div class="video-card" v-for="row in paginatedData" :style="styles" :key="row.id" >
                <div class="video-title">
                    {{ row.deviceAreaGroup.name.replaceAll(' ', '') }}/{{ row.deviceName }}
                </div>
                <AlaVideoFlv :url="getUrl(row)" />
            </div>

        </div>

        <!-- 分页列表 -->
        <el-pagination v-model:current-page="current" :page-sizes="pageSize" :page-size="page.size"
            layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handlePageChange" class="ala-page-pagination" :pager-count="11" background>
        </el-pagination>


    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
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
        default: [2, 4, 6, 9, 12]
    },
    // 是否显示 按钮列
    noButtons: {
        type: Boolean,
        default: false
    },
    // 是否显示 启用/禁用 按钮
    showDisableButton: {
        type: Boolean,
        default: false
    },
    beforeShowQueryData: {
        type: Function,
        default: undefined
    },

})

// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    moduleName: '',
    id: 0,
    item: Object,
    selectedList: Array<{ id: string }>
});





// State
const refresh = (data: any) => {
    logger.warn("list页面接收到回调数据，即将刷新数据", data);
    logger.warn("list页面接收到回调数据，即将刷新数据，params", props.params);
    queryPageData()
}



const loading = ref(true)
// 分页列表通用代码
// 分页参数
const page = reactive({
    "current": 1,
    "size": 6,
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
            if (props.beforeShowQueryData) {
                props.beforeShowQueryData(data.data.list)
            }
            onePageList.value = data.data.list
        }
        loading.value = false

    });
}

onMounted(() => {
    logger.info("onMounted 渲染 menu 分页列表页面");
    queryPageData()
})



const paginatedData = computed(() => {
    // const currentPage = page.current; // 当前页码
    // const pageSize = page.size; // 每页显示条数
    // const start = (currentPage - 1) * pageSize;
    // const end = start + pageSize;
    // return onePageList.value.slice(start, end);
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


watch(() => page.size, (size: number) => {
    console.log('size: ---> ', size);

})


const styles = computed(() => {
    const style: { [key: string]: any } = {}
    if (page.size == 2) {
        style['width'] = '48%'
        // style['min-height'] = '600px'
    } else if (page.size == 4) {
        style['width'] = '48%'
        // style['min-height'] = '450px'
    } else if (page.size == 6) {
        style['width'] = '31%'
        // style['min-height'] = '450px'
    } else if (page.size == 9) {
        style['width'] = '31%'
        // style['min-height'] = '300px'
    } else if (page.size == 12) {
        style['width'] = '24%'
        // style['min-height'] = '300px'
    }

    return style
})


const getUrl = (row: any) => {
    return `${u.videoUrl()}/live?url=${row.deviceCode}&&&isLocal=true&&&ffmpeg=true&&&autoClose=true`

}

// Methods
const emit = defineEmits(["add", "edit"])
defineExpose({ refresh })

</script>

<style scoped lang="scss">
.ala-card-table {
    padding-left: 4px;

    .video-cards {
        padding: 4px 0px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding-bottom: 8px;

        .video-title {
            margin-top: 8px;
        }

        .video-card {
            display: flex;
            flex-direction: column;

            :deep(.ala-video-flv) {
                width: 100%;
                margin-bottom: 12px;
            }

            :deep(.xgplayer) {
                background: none;
            }

            :deep(.xgplayer video) {
                width: 98%;
                left: 1%;
            }

            transition: transform 0.5s ease;

            &:hover {
                scale: 1.005;
            }


            cursor: pointer;
            border: 1px solid #e7e7e7;
            background:#fff;
            border-radius: 6px;
            box-shadow: 0 12px 32px 0 rgba(0, 0, 0, .04),
            0 8px 20px 0 rgba(0, 0, 0, .08);
        }
    }

    height: 100vh;
    overflow-y: auto;
    padding-bottom: 250px;

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

        :deep(.el-pager li:not(.is-active)) {
            background-color: #fff;
        }

        :deep(button[aria-disabled="false"]) {
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