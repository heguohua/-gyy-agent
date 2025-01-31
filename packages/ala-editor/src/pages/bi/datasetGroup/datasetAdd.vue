<template>


    <AlaFullScreen v-model="model" :fullscreen="true" :showClose="false">

        <template #header>
            <div class="header">
                <div class="left">
                    <v-icon-tooltip icon="back" content="返回" @click="close" />
                    <ala-input class="dataset-input" />
                </div>
                <div class="right">
                    <AlaButton :showButton="true" name="saveAndBack" @save="handleSaveAndBack()" buttonType="default" />
                    <AlaButton :showButton="true" name="save" @save="handleSave()" buttonType="primary" />
                </div>
            </div>
        </template>


        <template #middle>

            <div class="middle">
                <div class="left">
                    <div class="select-datasource">
                        <h1 class="sd-title">选择数据源</h1>
                        <AlaSelectApi v-model="datasourceId" url="/b/datasource/list"
                            :item-property="{ propertyName: 'name', valueName: 'id', }" :params="{ noType: 'folder' }"
                            placeholder="请选择数据源" />
                    </div>
                    <div class="tables">
                        <h1 class="sd-title">数据表</h1>

                        <div class="table-item" v-for="(item, index) in tables" :key="item.tableName">
                            <VIcon icon="table" />
                            <p class="tableName">{{ item.tableName }}</p>
                            <div class="buttons">
                                <VIcon icon="b_copy" @click="handleCopy(item.tableName)" />
                                <AlaPopover src="/dataset/columns.svg" image-width="16px" image-height="16px"
                                    @onShow="showTableFields(item.tableName)">
                                    sddff
                                </AlaPopover>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="sql-editor" :style="{ height: `${tableHeight}px` }">
                        <AlaSqlEditor />
                    </div>
                    <div class="resizer" @mousedown="startResize">
                        <div class="resizer-button">

                        </div>
                    </div>
                    <div class="preview" :style="{ height: `${previewHeight}px` }">
                        <el-tabs v-model="activeName" class="ala-tabs" @tab-click="handleClick" :stretch="true">
                            <el-tab-pane label="数据预览" name="dataPreview" class="ala-tab-pane">
                                数据预览
                            </el-tab-pane>

                            <el-tab-pane label="批量设置" name="batchConfig" class="ala-tab-pane">
                                批量设置
                            </el-tab-pane>

                        </el-tabs>
                    </div>
                </div>
            </div>

        </template>

    </AlaFullScreen>



</template>

<script setup lang="ts">
import AlaSelectApi from '@/components/cps/select-api/ala-select-api.vue'
import { logger } from '@/utils/logger'
import { alaPost } from '@/utils/req'
import tip from '@/utils/tip'
import u from '@/utils/u'
import { table } from 'console'
import { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

// State


// Methods
const height = window.innerHeight
const unitHeight = window.innerHeight / 3
const tableHeight = ref(unitHeight) // 初始顶部区域高度
const previewHeight = ref(unitHeight * 2 - 16) // 初始底部区域高度
let isResizing = false

const startResize = (e: MouseEvent) => {
    isResizing = true
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
    if (isResizing) {
        const newTopHeight = e.clientY - 100 // 假设顶部距离窗口顶部100px
        const newBottomHeight = height - newTopHeight // 假设整个容器高度为400px
        if (newTopHeight > 100 && newBottomHeight > 100) { // 限制最小高度
            tableHeight.value = newTopHeight
            previewHeight.value = newBottomHeight
        }
    }
}

const stopResize = () => {
    isResizing = false
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
}


onMounted(() => {
    document.addEventListener('mouseup', stopResize)
})

onUnmounted(() => {
    document.removeEventListener('mouseup', stopResize)
})

const model = defineModel({
    type: Boolean
})

const activeName: any = ref("")
const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.paneName
}

const close = () => {
    model.value = false
}

const handleSave = () => {

}

const handleSaveAndBack = () => {

}

// ################## 选择数据源 start ####################################################

const datasourceId = ref('')
interface Table {
    tableName: string,
    datasourceId: number
}
const tables = ref<Array<Table>>([])
watch(() => datasourceId.value, (id: any) => {
    logger.info(`观察到数据源发生变化，即将加载数据源中的表信息，datasourceId[ ${datasourceId.value} ]`);

    // Methods
    const url = '/b/datasource/getTables'

    let params = { datasourceId: id }

    logger.info(`从 dict 模块加载下拉组件数据，url【 ${url} 】，查询参数：`, params);

    alaPost(u.url(url), params, false, '').then((data: any) => {
        const response = data;
        console.log('data:', data);
        if (response?.data && response.data.length > 0) {
            const tbs: Table[] = []
            response.data.forEach((item: { tableName: string, datasourceId: number, }) => {
                tbs.push({ tableName: item.tableName, datasourceId: item.datasourceId })
            })
            tables.value = tbs
        }

    });

})

const handleCopy = (value: string) => {
    u.copy(value)
    tip.success('已复制')
}

const showTableFields = (tableName: string) => {
    console.log('showTableFields:', tableName);
}


// ################## 选择数据源 end ####################################################

</script>

<style scoped lang="scss">
.header {
    // background: var(--el-color-primary);
    height: 50px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(31, 35, 41, 0.15);

    .left {
        display: flex;
        align-items: center;
        justify-content: left;
        justify-items: center;
        width: 50%;
        padding-left: 4px;

        :deep(.el-form-item) {
            margin: 0px;

            input {
                height: 26px;
                line-height: 26px;
            }
        }

        .dataset-input {}
    }

    .right {
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: right;
        justify-items: center;
        padding-right: 26px;

        :deep(button) {
            padding: 14px 22px;
        }
    }
}

.middle {
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .left {
        width: 300px;
        height: 100%;
        border-right: 1px solid rgba(31, 35, 41, 0.15);

        .sd-title {
            font-size: 16px;
            font-weight: bold;
            padding: 12px;
            text-align: left;
        }

        .select-datasource {
            .sd-title {}

            padding: 0px 8px;

            :deep(.el-select__wrapper.is-focused) {
                box-shadow: 0 0 0 1px var(--el-border-color) inset;
            }

        }

        .tables {
            padding: 0px 8px;

            .sd-title {}

            .table-item {

                display: flex;
                align-items: center;
                justify-content: left;
                justify-items: left;
                padding: 4px 0px;
                padding-left: 16px;
                border-radius: 4px;

                &:hover {
                    cursor: pointer;
                    background: var(--ala-color-bg);

                }

                .tableName {}

                .buttons {
                    margin-left: 2px;
                    align-items: center;
                    justify-content: center;
                    justify-items: center;
                    display: none;

                    :deep(svg) {
                        width: 16px;
                        height: 16px;
                    }
                }

                &:hover {
                    .buttons {
                        display: flex;
                    }
                }

                :deep(svg) {
                    width: 20px;
                    height: 20px;
                    // opacity: 0.7;
                    margin-right: 4px;
                }

                p {}
            }
        }
    }


    .right {
        width: calc(100% - 300px);
        height: 100%;

        .sql-editor {
            height: 40%;
            background: var(--ala-color-bg);
        }

        .resizer {
            height: 16px;
            display: flex;
            align-items: center;
            justify-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }

            .resizer-button {
                width: 100px;
                height: 6px;
                border-radius: 3px;
                display: inline-block;
                background: rgba(31, 35, 41, 0.1);
            }
        }

        .preview {
            height: calc(60% - 10px);

            .ala-tabs {
                :deep(.el-tabs__item) {
                    height: 30px;
                }

                .ala-tab-pane {}
            }
        }
    }
}
</style>