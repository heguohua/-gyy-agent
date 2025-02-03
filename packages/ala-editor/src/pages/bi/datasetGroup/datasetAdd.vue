<template>


    <AlaFullScreen v-model="model" :fullscreen="true" :showClose="false">

        <template #header>
            <div class="header">
                <div class="left">
                    <v-icon-tooltip icon="back" content="返回" @click="close" />
                    <ala-input class="dataset-input" placeholder="请填写数据集名称" v-model="dataset.name" />
                </div>
                <div class="right">
                    <AlaButton :showButton="true" name="saveAndBack" @saveAndBack="handleSave(true)" buttonType="default" />
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

                                    <table class="table-fields">

                                        <thead>
                                            <tr>
                                                <th>字段名</th>
                                                <th>字段描述</th>
                                                <th>字段类型</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(item, index) in tableFields" :key="item.columnName">
                                                <td>
                                                    <VIcon :image="getIcon(item.type, item.columnName)" width="16px"
                                                        height="16px" />&nbsp;{{
                                                            item.columnName }}
                                                </td>
                                                <td>{{ item.remark }}</td>
                                                <td>{{ item.type }}</td>
                                                <td>
                                                    <VIcon icon="b_copy" @click="handleCopy(item.columnName)" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </AlaPopover>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="sql-editor" :style="{ height: `${topHeight}px` }">
                        <AlaSqlEditor ref="alaSqlEditor">

                            <template #header>
                                <AlaButton :showButton="true" name="run" @run="handleRun()" buttonType="default" />
                            </template>

                        </AlaSqlEditor>
                    </div>
                    <div class="resizer" @mousedown="startResize">
                        <div class="resizer-button">

                        </div>
                    </div>
                    <div class="preview" :style="{ height: `${bottomHeight}px` }">
                        <el-tabs v-model="activeName" class="ala-tabs" @tab-click="handleClick" :stretch="true">
                            <el-tab-pane label="数据预览" name="dataPreview" class="ala-tab-pane">
                                <AlaSimpleTable v-if="!showEmptyInfo" :headers="previewDataHeaders"
                                    :rows="previewDataRows" />
                                <AlaBlankImage v-if="showEmptyInfo" title="点击上方【 运行 】按钮，即可查看SQL执行结果" />
                            </el-tab-pane>

                            <!-- <el-tab-pane label="批量设置" name="batchConfig" class="ala-tab-pane">
                                批量设置
                            </el-tab-pane> -->

                        </el-tabs>
                    </div>
                </div>
            </div>

        </template>

    </AlaFullScreen>



</template>

<script setup lang="ts">
import AlaBlankImage from '@/components/cps/blank/ala-blank-image.vue'
import AlaSelectApi from '@/components/cps/select-api/ala-select-api.vue'
import Snowflake from '@/utils/Snowflake'
import alaType from '@/utils/alaType'
import { logger } from '@/utils/logger'
import notify from '@/utils/notify'
import { alaPost, get } from '@/utils/req'
import tip from '@/utils/tip'
import u from '@/utils/u'
import { table } from 'console'
import { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const baseInfo = inject('baseInfo') as { [key: string]: any };

// 注册 雪花id 生成算法实例
const now = Date.now(); // 获取当前时间的毫秒时间戳
const lastThreeDigits = now % 1000; // 取模运算获取最后三位
const snowflake = new Snowflake(lastThreeDigits); // 机器节点 ID 为 1

// Methods
const height = window.innerHeight
const unitHeight = window.innerHeight / 3
const topHeight = ref(unitHeight * 2) // 初始顶部区域高度
const bottomHeight = ref(unitHeight - 16) // 初始底部区域高度
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
            topHeight.value = newTopHeight
            bottomHeight.value = newBottomHeight
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

const activeName: any = ref("dataPreview")
const handleClick = (tab: TabsPaneContext, event: Event) => {
    // activeName.value = tab.paneName
}

const emits = defineEmits(['refresh'])
const close = () => {
    model.value = false
    emits('refresh')
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

    logger.info(`加载数据源中的表信息，url【 ${url} 】，查询参数：`, params);

    alaPost(u.url(url), params, false, '').then((data: any) => {
        const response = data;
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

interface TableField {
    columnName: string,
    remark: string,
    type: string
}
const tableFields = ref<Array<TableField>>([])
const showTableFields = (tableName: string) => {
    const params = { datasourceId: datasourceId.value, tableName, info: u.tojson({ table: tableName, sql: "" }), "type": "db" }

    const url = '/b/datasetTableField/tableField'

    logger.info(`加载数据源中的表字段信息，url【 ${url} 】，查询参数：`, params);

    tableFields.value = []

    alaPost(u.url(url), params, false, '').then((data: any) => {
        const response = data;
        if (response?.data && response.data.length > 0) {
            const tfs: TableField[] = []
            response.data.forEach((item: { originName: string, description: string, type: string, datasourceId: number, }) => {
                tfs.push({ columnName: item.originName, remark: item.description, type: item.type })
            })
            tableFields.value = tfs
        }

    });
}

const getIcon = (type: string, columnName: string) => {
    let image = ''
    if (columnName === 'created_time' || columnName === 'updated_time') {
        image = alaType.getIconByColumnType('DATE')
    } else {
        image = alaType.getIconByColumnType(type)
    }

    return image
}

// ################## 选择数据源 end ####################################################

// ################## sql编辑器 start ####################################################

const alaSqlEditor = ref()
const handleRun = () => {

    // Methods
    const url = '/b/datasetTable/previewSql'

    // {
    // "sql": "c2VsZWN0ICogZnJvbSBzeXNfbWVudSBsaW1pdCAke2xpbWl0TnVtfQ==",
    // "datasourceId": "1076863062130167808",
    // "sqlVariableDetails": "[{\"variableName\":\"limitNum\",\"alias\":\"\",\"type\":[\"LONG\"],\"required\":false,\"defaultValue\":\"10\",\"details\":\"\",\"defaultValueScope\":\"ALLSCOPE\"}]"
    // }
    const sql = u.base64Encode(alaSqlEditor.value.sqlContent)
    const id = datasourceId.value
    u.checkEmpty(id, "数据源", t)

    let params = { sql, datasourceId: id, sqlVariableDetails: u.tojson([]) }

    logger.info(`加载sql预览数据，url【 ${url} 】，查询参数：`, params);

    //先清空上一次数据，放置干扰
    if (showEmptyInfo.value) {
        showEmptyInfo.value = false
    }
    previewDataHeaders.value = []
    previewDataRows.value = []


    alaPost(u.url(url), params, false, '').then((response: any) => {

        if (response?.data?.data?.data && response.data.data.data.length > 0) {

            const data = response.data.data.data
            const fields = response.data.data.fields

            const f: any[] = []

            fields.forEach((field: any) => {
                // 组装 数据集预览表格 - 表头字段
                f.push({ name: field.originName, label: field.description, type: field.type })
            })
            previewDataHeaders.value = f
            previewDataRows.value = data


        }

    });

}

// 预览数据区域变量
const showEmptyInfo = ref(true)
const previewDataHeaders = ref<Array<any>>([])
const previewDataRows = ref<Array<any>>([])





// ################## sql编辑器 end ####################################################

// ################## dataset 数据保存、编辑 start ####################################################
interface Field {
    id?: string,
    datasourceId: string,
    datasetTableId?: string,
    datasetGroupId?: string,
    chartId?: string,
    originName: string,
    name: string,
    dbFieldName?: string,
    description: string,
    alaName?: string,
    groupType: string,
    type: string,
    precision?: number,
    scale?: number,
    alaType: number,
    alaExtractType: number,
    extField: number,
    checked: number, // 1-是，2-否
    columnIndex?: number,
    lastSyncTime?: number,
    dateFormat?: string,
    dateFormatType?: string,
    fieldShortName?: string,
    desensitized?: number, // 1-是，2-否
}

interface CurrentDataset {
    id?: string, // id
    datasourceId: string, // 数据源 id
    type: string, // 固定值 sql，后续可以扩充表
    tableName: string, // 同最外层 name
    info: string, // {"table":"三个字段","sql":"c2VsZWN0IHNtLmlkLHNtLm5hbWUsc20udXJsIGZyb20gc3lzX21lbnUgc20gd2hlcmUgc20uaWQgPiAke21pbklkfQ=="}
    sqlVariableDetails: string, //[{"variableName":"minId","alias":"","type":["LONG"],"required":false,"defaultValue":"10","details":"","defaultValueScope":"ALLSCOPE"}]
}

interface Union {
    currentDataset: CurrentDataset,
    currentDatasetFields: Array<Field>,
    childrenDataset: [],
    unionToParent: {
        unionType: string,
        unionFields: []
    }
}

interface Dataset {
    id?: number,
    nodeType: string,
    name: string,
    pid: number,
    union: Array<Union>,
    allFields: Array<Field>,
}

const dataset = ref<Dataset>({
    name: '',
    nodeType: 'dataset',
    pid: 0,
    union: [],
    allFields: []
})

if (baseInfo.datasetGroup.id) {
    // 当前是编辑数据集，则加载原始数据
    const url = '/b/datasetGroup/details'

    get(u.url(url), { id: baseInfo.datasetGroup.id }).then((response: any) => {

        console.log('response:', response?.data);

        if (response?.data?.data) {

            const data = response.data.data
            console.log('data:', data);

            const name = data.name
            const pid = data.pid
            const union = data.union
            const currentDataset = union[0].currentDataset
            const dId = currentDataset.datasourceId
            let info = {} as any
            if (currentDataset.info) {
                info = u.parseJson(currentDataset.info)
            }
            const sql = u.base64Decode(info.sql)


            const dt = dataset.value
            dt.name = name
            baseInfo.datasetGroup.pid = pid
            datasourceId.value = dId
            if (sql) {
                alaSqlEditor.value.sqlContent = sql
            }


            // fields.forEach((field: any) => {

            // })
        } else {
            notify.error(t('pop.warm_title'), "没有加载到数据集原始数据！")
        }
    });

}


const handleSave = async (closeAddPage = false) => {

    // 校验数据
    const dt = dataset.value

    const id = baseInfo.datasetGroup.id
    const pid = baseInfo.datasetGroup.pid

    if (id) {
        dt.id = id
    }
    u.checkEmpty(pid, "数据集目录", t)
    dt.pid = pid

    // 检查 数据集名称 是否存在 ？
    u.checkEmpty(dt.name, '数据集名称', t)

    // 检查 数据源id 是否存在 ？
    u.checkEmpty(datasourceId.value, '数据源id', t)

    const sql = alaSqlEditor.value.sqlContent
    u.checkEmpty(sql, "查询SQL", t)

    // 根据 sql 调用api接口获取当前sql的配置字段信息

    // 检查 数据集 字段配置是否正确
    // u.checkTrue(dt.union.length === 0, '请先运行SQL，并检查查询结果是否正确？', t)
    // u.checkTrue(dt.allFields.length === 0, '请先运行SQL，并检查查询结果是否正确？', t)

    // {
    //     "datasourceId": "1076863062130167808",
    //     "id": "7291757393132654592",
    //     "info": "{\"table\":\"联表查询\",\"sql\":\"CgpzZWxlY3Qgc20uaWQsc20ubmFtZSxzdS5uaWNrX25hbWUgZnJvbSBzeXNfbWVudSBzbSBsZWZ0IGpvaW4gc3lzX3VzZXIgc3Ugb24gc20uY3JlYXRlZF9ieSA9IHN1LmlkIG9yZGVyIGJ5IHN1Lm5pY2tfbmFtZSBkZXNj\"}",
    //     "tableName": "联表查询",
    //     "type": "sql"
    // }
    const tableFieldsUrl = '/b/datasetTableField/tableField'
    const tableFieldsParams = {
        tableName: dt.name,
        datasourceId: datasourceId.value,
        info: u.tojson({
            table: dt.name,
            sql: u.base64Encode(sql)
        }),
        type: 'sql'
    }

    const allFields: Field[] = []

    await alaPost(u.url(tableFieldsUrl), tableFieldsParams, false, '').then((response: any) => {

        if (response?.data && response.data.length > 0) {

            const fields = response.data

            fields.forEach((field: any) => {
                allFields.push({
                    // id: snowflake.nextId(), //
                    datasourceId: datasourceId.value, //
                    originName: field.originName, //
                    name: field.name, //
                    description: field.type, //
                    groupType: field.groupType, //
                    type: field.type, //
                    alaType: field.alaType, //
                    alaExtractType: field.alaExtractType, //
                    extField: field.extField, //
                    checked: field.checked //
                })
            })
        }
    });


    // 组装 union
    const currentDataset: CurrentDataset = {
        datasourceId: datasourceId.value,
        type: 'sql',
        tableName: dt.name,
        sqlVariableDetails: '[]',
        info: u.tojson({
            table: dt.name,
            sql: u.base64Encode(sql)
        }),
    }

    dt.union = [
        {
            currentDataset,
            currentDatasetFields: allFields,
            childrenDataset: [],
            unionToParent: {
                "unionType": "left",
                "unionFields": []
            }
        }
    ]

    // 组装 allFields
    dt.allFields = allFields

    const datasetUrl = id ? '/b/datasetGroup/updateDatasetGroup' : '/b/datasetGroup/create'
    alaPost(u.url(datasetUrl), dt, false, '').then((response: any) => {
        notify.success(t('pop.warm_title'), "保存成功");
        console.log('closeAddPage:',closeAddPage);
        
        if (closeAddPage) {
            close()
        } else {
            emits('refresh')
        }
    });

}

// ################## dataset 数据保存、编辑 end ####################################################



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

        .dataset-input {
            width: 270px;
        }
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
                    .table-fields {
                        text-align: left;
                        padding: 4px 32px;

                        thead {
                            height: 32px;
                            line-height: 32px;
                            background: var(--ala-color-bg);

                            th {
                                padding: 0px 8px;
                                max-width: 200px;
                                word-wrap: break-word;

                            }
                        }

                        tbody {
                            overflow-y: auto;

                            tr {
                                height: 26px;
                                line-height: 26px;
                                border-bottom: 1px solid var(--ala-color-bg);

                                td {
                                    padding: 0px 8px;
                                    max-width: 200px;
                                    word-wrap: break-word;
                                    line-height: 26px;

                                    :deep(.icon-image) {
                                        display: inline-block;
                                        width: 26px;
                                        height: 26px;
                                    }
                                }
                            }
                        }
                    }

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
                height: 100%;

                :deep(.el-tabs__item) {
                    height: 30px;
                }

                :deep(.el-tabs__header) {
                    margin: 0px !important;
                }

                :deep(.el-tabs__active-bar) {
                    background-color: #F4F7FA;
                    height: 1px;
                }

                :deep(.ala-tab-pane) {
                    height: 100%;
                }
            }
        }
    }
}
</style>