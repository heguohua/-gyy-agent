<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-19 14:19:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form-table/ala-form-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-select-table-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">

            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <div class="ala-select-customer ala-form-item-border" :style="styles">
                <p class="placeholder" v-if="!localValue || localValue.length === 0">{{
                    placeholder ? placeholder : ($t('form.p-select-1') + label) }}
                </p>
                <p class="show-values" v-if="localValue && localValue.length != 0" v-html="showValue"></p>
            </div>
            <div class="ala-select-customer-icon">
                <v-icon class="icon" :icon="icon" @click="openDialog" :width="iconWidth" :height="iconHeight" />
            </div>
        </el-form-item>

        <div class="ala-el-dialog-wrapper" v-if="dialogShow">
            <el-dialog v-model="dialogShow" :width="dialogWidth" :append-to-body="true" :showClose="false">

                <template #header="{ titleId, titleClass }">
                    <div class="ala-select-table-header">
                        <h4 :id="titleId" :class="titleClass">{{ $t('form.p-select-1') }} 【 {{ label }} 】</h4>
                    </div>
                </template>

                <div class="dialog-content">
                    <div class="left-panel">
                        <!-- 分页列表 -->
                        <PageTableSelect ref="pageListRef" :url="url" :columns="cols" :params="params"
                            :showSelectCheckbox="true" :tipTitle="$t('pop.warm_title')" @selectedChange="selectedChange"
                            :label="label" v-model="localValue" :itemProperty="itemProperty"
                            :isFormDesign="isFormDesign" :singleValue="singleValue" />

                    </div>

                    <div class="right-panel">
                        <div class="table-title">
                            {{ $t('form.p-selected') }}【 {{ label }} 】
                        </div>

                        <el-table :data="selectedData" style="width: 100%" row-key="id">

                            <!-- 主表列渲染 -->
                            <el-table-column v-for="column in columnss" :key="column.prop" :prop="column.prop"
                                :label="isFormDesign ? parseLabel(column.label) : column.label">
                            </el-table-column>

                            <!-- 主表操作列 -->
                            <el-table-column :label="$t('buttons.buttons')">
                                <template #default="scope">

                                    <el-button size="small" type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">
                                        {{ $t('buttons.delete') }}
                                    </el-button>

                                </template>
                            </el-table-column>

                        </el-table>


                    </div>
                </div>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                        <el-button type="primary" @click="confirmClick">
                            {{ $t('buttons.confirm') }}
                        </el-button>
                    </span>
                </template>

            </el-dialog>
        </div>


        <div class="ala-form-table" v-if="headers && headers.length > 0">
            <div class="ala-form-table-form">
                <table>

                    <thead>
                        <tr class="one-row">
                            <th class="one-column header" :style="{ width: item.width }"
                                v-for="(item, index) in headers" :key="'th' + index">
                                {{ item.label }}
                            </th>
                            <th class="buttons">
                                <div class="button-add" @click="handleAddChild">
                                    <VIcon icon="add" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="one-row" v-for="(row, rIndex) in formTableValues" :key="'r' + rIndex">

                            <td class="one-column" v-for="(field, fIndex) in addFormFields"
                                :key="'r' + rIndex + 'c' + fIndex" :style="{ width: headers[fIndex].width }">

                                <component :is="field.componentName" :placeholder="field.placeholder"
                                    v-bind="field.other" v-model="formTableValues[rIndex][field.fieldName]"
                                    :fieldName="field.fieldName" :data="data" />


                            </td>
                            <td class="buttons">
                                <div class="button-minus" @click="handleDeleteChild(rIndex)">
                                    <VIcon icon="minus" />
                                </div>
                            </td>
                        </tr>


                    </tbody>
                </table>

                <!-- <div class="one-row" v-for="(item, index) in rows" :key="u.uuid()">
                    <AlaFormItemsTable />
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import PageTableSelect from '@/components/cps/page/page-table-select.vue';
import notify from '@/utils/notify';
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { alaDetailInput } from '@/config/alaDetailBuilder';
import { formConfigParse } from '@/pages/dynamic/formConfigParser';
import { getLowcodingConfigById } from '@/config/formConfigs';
// import { data } from './d';

interface ItemProperty {
    propertyName: string,
    valueName: string
    otherProperty: Array<string>
}
// State
const props = defineProps({
    data: {
        type: Object,
    },
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    dialogWidth: {
        type: String,
        default: "80%",
    },
    width: {
        type: Number,
        default: 250,
    },
    fieldName: {
        type: String,
        default: ''
    },
    isFormDesign: {
        type: Boolean,
        default: false
    },
    help: {
        type: String,
    }
})

const { data } = toRefs(props)
const formTableValues = ref<Array<any>>([])
const headers = ref<Array<Header>>([])

watch(() => data?.value, (v: any) => {
    const keys = Object.keys(v)
    // console.log('data --->:', v);
    if (keys.length === 0) {
        // 说明表单数据为空
        formTableValues.value = []
        headers.value = []
        return
    }


}, {
    immediate: true,
    deep: true
})

const url = '/l/lowcodingConfig/page'
const params = { 'formType': 'pageForm' }
const icon = 'f_table'
const iconWidth = 22
const iconHeight = 22
const singleValue = true
const itemProperty = {
    propertyName: 'name',
    valueName: 'id'
}

const model = defineModel({
    type: String,
    default: () => '[]'
})

const localValue = ref<Array<any>>([])
// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    module: '',
    moduleName: '',
    id: 0,
    item: Object,
    selectedList: Array<{ id: string }>
});


watch(() => baseInfo, (v) => {
    // console.log('观察到 model.value 发生变化 :', model.value);

    if (model.value) {

        localValue.value = u.parseJson(model.value)

        if (data?.value?.id) {
            //  查询关联数据
            const listUrl = '/l/dynamic/queryForFormTable'
            const params = {
                mainTableName: baseInfo.module,
                childTableLowcodingConfig: model.value,
                mainTableId: data?.value?.id,
            }

            alaPost(u.url(listUrl || ''), params, false).then((data: any) => {
                const response = data;
                if (response.data && response.data.length > 0) {
                    // console.log('response.data ---> :', response.data);
                    formTableValues.value = response.data
                }
            });
        }




    }
}, {
    immediate: true,
    deep: true
})

watch(() => localValue.value, (v) => {
    // console.log('观察到 localValue.value 发生变化 :', v);

    if (v) {
        model.value = u.tojson(v)
    }
}, {
    immediate: true,
    deep: true
})

const styles = computed(() => {
    return { minWidth: props.width + 'px' }
})

// 分页列表中列属性配置
const dialogShow = ref(false)
const openDialog = () => {
    dialogShow.value = true;
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    dialogShow.value = false
    selectedData.value = []
}

const generateValue = (value: string) => {
    return `<p class='ala-select-table-value'>${value}</p>`
}

/**
 * 点击确认按钮，更新 model value
 */
// const localValue = ref()

const showValue = computed(() => {
    return modelItemToShowValue(localValue.value)
})

function confirmClick() {

    const length = selectedData.value.length

    if (!selectedData.value || length <= 0) {

        notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.label + ' 】')

    } else {

        // 给 model 赋值
        const mv: any = []
        // const sv: string[] = []
        const pi = itemProperty
        selectedData.value.forEach((item) => {

            const selected = { [pi.valueName]: item[pi.valueName], [pi.propertyName]: item[pi.propertyName], }
            mv.push(selected)
        })

        localValue.value = mv
        // 给显示标签赋值
        // localValue.value = sv.join('')
        // localValue.value = modelItemToShowValue(mv)
        // 清空列表选择页面当前状态
        pageListRef.value.clear()
        // 关闭弹窗
        dialogShow.value = false

        selectedData.value = []

    }
}

const modelItemToShowValue = (rows: any) => {
    let value: string[] = []
    const pi = itemProperty
    if (rows && rows.length > 0) {
        rows.forEach((row: any) => {
            value.push(generateValue(row[pi.propertyName]))
        })
    }
    return value.join('')
}

const selectedData = ref([])
const selectedChange = (currentSelected: [never]) => {
    selectedData.value = currentSelected
}

// 删除选择项
const pageListRef = ref()
const handleDelete = (index: number, row: any) => {
    selectedData.value.splice(index, 1);
    // 取消 el-table 中勾选的对象
    pageListRef.value.cancelSelect(row)
}

const querySelectedData = (items: [{ id: number }]) => {

    if (items && items.length > 0) {

        logger.info(`正在【 初始化已勾选项 】，items`, items);

        // 根据分页列表 url 获取 list 查询url
        const listUrl = url?.slice(0, url?.lastIndexOf('/')) + '/list'

        const ids: number[] = items.map(item => item.id);

        const pm = { ids }
        if (isDynamicTable()) {
            // 当前是 动态分页列表，需要转换查询条件
            u.merged(pm, params)
        }

        if (!listUrl) {
            notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
        } else {
            alaPost(u.url(listUrl || ''), pm, false, '').then((data: any) => {
                const response = data;
                if (response.data && response.data.length > 0) {
                    selectedData.value = response.data
                }
            });
        }

    } else {
        logger.info(`初始化数据不存在，【 不初始化 已勾选项 】，model.value`, model.value);
    }
}

watch(() => dialogShow.value, (value) => {
    if (value) {
        querySelectedData(localValue.value as [{ id: number }])
    }
})

const cols = u.tojson(
    [
        u.merged(alaDetailInput('name', '表单名称', 1, true), { isQuery: true }),
        alaDetailInput('name', '表单名称', 1, true)
    ]
)

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label.slice(3, label.length - 2));
}
const columnss = computed(() => {
    const fields: any = []
    const columns = u.parseJson(cols)
    columns.forEach((column: any) => {
        column['label'] = u.parseI18n(column.label, t)
        fields.push(column)
    })

    return fields
})

const isDynamicTable = () => {
    if (url.indexOf('/l/dynamic/') > -1) {
        return true;
    }
    return false
}


interface Header {
    label: string
    width: string
}

const formConfigItems = ref<Array<any>>([])
const addFormFields = ref<Array<any>>([])
const addFormFieldRules = ref<{ [key: string]: Array<any> }>({})

watch(() => localValue.value, async (v) => {

    if (!v[0]) {
        return
    }

    const configs = await getLowcodingConfigById(v[0].id)

    const currentModule = baseInfo.module
    const fci = configs.formConfigItems

    // 添加一列
    headers.value = []
    formConfigItems.value = []
    addFormFields.value = []
    configs.addFormFields.forEach(field => {

        // console.log('field.fieldName:', field.fieldName);

        // 去除 ala-divider 此类没有属性name的组件
        if (fci[field.fieldName]) {

            // 剔除当前模块对应的字段
            if (field.fieldName != currentModule) {

                headers.value.push({
                    label: field.label,
                    width: (fci[field.fieldName]?.formData?.columnWidth?.desktop || 150) + 'px'
                })
                formConfigItems.value.push(fci[field.fieldName])
                addFormFields.value.push(field)
                addFormFieldRules.value[field.fieldName] = field.rules

            }

        }
    })

    // console.log('headers.value:', headers.value);
    // console.log('formConfigItems.value:', formConfigItems.value);
    // console.log('addFormFields.value:', addFormFields.value);


    formTableValues.value = [{}]

}, {
    immediate: true
})


watch(() => formTableValues.value, (v) => {

    const fieldName = `${props.fieldName}FormTableValues`

    // console.log('fieldName:', fieldName);
    // console.log('formTableValues.value:', formTableValues.value);
    u.merged(data?.value!, { [fieldName]: v })

}, {
    immediate: true,
    deep: true
})


const handleAddChild = () => {
    if (headers.value && headers.value.length > 0) {
        formTableValues.value.push({})
    }
}

const handleDeleteChild = (index: number) => {
    formTableValues.value.splice(index, 1);
}

const saveOrPause = (): Boolean => {

    // 校验动态表单数据合法性
    let checkResult = true

    const rowValues = Object.values(formTableValues.value)
    for (let rowValueIndex in rowValues) {
        const rowValue = rowValues[rowValueIndex]
        // console.log('rowValueIndex:', rowValueIndex);
        // console.log('rowValue:', rowValue);

        const columns = Object.values(addFormFields.value)

        for (let columnIndex in columns) {
            const label = columns[columnIndex].label
            const fieldName = columns[columnIndex].fieldName
            const fieldValue = rowValue[fieldName]
            const rules = addFormFieldRules.value[fieldName]

            // 根据key查找表单校验规则，并进行匹配
            if (rules) {
                for (let ruleIndex in Object.values(rules)) {
                    // console.log('ruleIndex:', ruleIndex);
                    // console.log('rule:', rules[ruleIndex]);
                    const { required, min, max, message } = rules[ruleIndex]

                    // 不能为空
                    if (required) {
                        if (fieldValue === undefined) {
                            checkResult = false
                            const m = `${props.label}第【 ${+(rowValueIndex) + 1} 】行，【 ${label} 】${message}`
                            notify.warn(t('pop.warm_title'), m)

                            break
                        }
                    }

                    // 检验最小、最大长度
                    if (fieldValue != undefined) {
                        if (typeof fieldValue === 'string') {
                            const f = fieldValue.trim()
                            if (min) {
                                if (f.length < min) {
                                    checkResult = false
                                    const m = `${props.label}第【 ${+(rowValueIndex) + 1} 】行，【 ${label} 】${message}`
                                    notify.warn(t('pop.warm_title'), m)
                                    break
                                }
                            }
                            if (max) {
                                if (f.length > max) {
                                    checkResult = false
                                    const m = `${props.label}第【 ${+(rowValueIndex) + 1} 】行，【 ${label} 】${message}`
                                    notify.warn(t('pop.warm_title'), m)
                                    break
                                }
                            }

                        }
                    }

                    if (fieldValue != undefined) {
                        if (typeof fieldValue === 'number') {
                            const f = fieldValue
                            if (min) {
                                if (f < min) {
                                    checkResult = false
                                    const m = `${props.label}第【 ${+(rowValueIndex) + 1} 】行，【 ${label} 】${message}`
                                    notify.warn(t('pop.warm_title'), m)
                                    break
                                }
                            }
                            if (max) {
                                if (f > max) {
                                    checkResult = false
                                    const m = `${props.label}第【 ${+(rowValueIndex) + 1} 】行，【 ${label} 】${message}`
                                    notify.warn(t('pop.warm_title'), m)
                                    break
                                }
                            }
                        }
                    }
                }
            }
            if (!checkResult) {
                break
            }
        }
        if (!checkResult) {
            break
        }
    }

    // console.log('addFormFieldRules:', addFormFieldRules.value);
    // console.log('addFormFields.value:', addFormFields.value);

    return checkResult
}
defineExpose({
    saveOrPause: saveOrPause
})
</script>

<style scoped lang="scss">
.ala-select-table-wrapper {
    :deep(.el-scrollbar__wrap--hidden-default) {
        margin-bottom: 30px;
    }

    .ala-select-customer {
        .placeholder {
            color: var(--el-text-color-placeholder);
        }

        .show-values {
            display: flex;
            gap: 4px;
        }
    }

    .ala-select-customer-icon {

        color: #a8abb2;
        width: 30px;
        right: 0px;
        position: absolute;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
            color: var(--el-color-primary-light-3);
        }

    }

    .ala-form-table {
        width: 100%;

        .ala-form-table-form {
            width: 100%;
            overflow-x: auto;
            padding: 10px 18px;

            table {
                min-width: 100%;



                thead {
                    background-color: #F9F9FA;

                    .header {
                        color: var(--el-table-header-text-color);
                    }

                    .buttons {
                        width: 60px;


                        .button-add {
                            background: #ecf5ff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 4px;
                            cursor: pointer;
                            width: 32px;
                            height: 32px;

                            &:hover {
                                background: var(--el-fill-color);
                            }
                        }
                    }

                }

                tbody {
                    .buttons {
                        width: 60px;
                        display: flex;
                        align-items: center;

                        .button-minus {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 4px;
                            cursor: pointer;
                            width: 32px;
                            height: 32px;

                            &:hover {
                                stroke: #f56c6c;

                                :deep(path) {
                                    fill: #f56c6c;
                                }
                            }
                        }
                    }
                }

                .one-row {
                    // height: 40px;
                    display: flex;
                    // border-bottom: 1px solid red;
                    padding: 6px 0px;


                    .one-column {
                        display: flex;
                        margin-right: 10px;

                        :deep(div) {
                            display: flex;
                            width: 100%;
                        }

                        :deep(.el-form-item__label) {
                            display: none !important;
                        }

                        :deep(.el-form-item__content) {
                            margin-left: 0px !important;
                        }

                        :deep(.ala-radio-group) {
                            row-gap: 0px;

                            // flex-wrap: nowrap;
                            .ala-radio-item {
                                width: auto;
                            }

                        }

                        :deep(.ala-checkbox-group) {

                            // flex-wrap: nowrap;
                            .ala-checkbox--item {
                                width: auto;
                            }
                        }

                        :deep(.el-form-item--default) {
                            margin-bottom: 0px;
                        }

                        :deep(.ala-checkbox-wrapper) {
                            border: none !important;
                        }

                        :deep(.ala-radio-wrapper) {
                            border: none !important;
                        }

                        .ala-textarea-wrapper {
                            // width: 250px;

                            :deep(.el-textarea__inner) {
                                min-height: 32px !important;
                            }
                        }

                    }
                }
            }
        }
    }

}


// 由于 el-dialog 设置了 append-to-body="true"，那么样式更改也要放在顶层层级才能生效
.dialog-content {
    display: flex;
    align-items: top;
    justify-content: center;
    gap: 2%;

    .left-panel {
        width: 48%;
        padding: 0px 1px 10px 1px;
        background-color: var(--el-fill-color-blank);
        border-radius: var(--el-border-radius-base);
        box-shadow: 0 0 0 1px var(--el-border-color) inset;
    }

    .right-panel {
        width: 48%;
        padding: 0px 1px 10px 1px;
        background-color: var(--el-fill-color-blank);
        border-radius: var(--el-border-radius-base);
        box-shadow: 0 0 0 1px var(--el-border-color) inset;

        .table-title {
            height: 68px;
            line-height: 68px;
            padding-left: 12px;
            font-size: 1rem;
            font-weight: 600;
        }
    }


}
</style>
<style>
.el-dialog__header {
    padding-bottom: 0px !important;
}

.el-dialog__title {
    line-height: inherit !important;
    margin: 0px 0px 10px 0px !important;
}

.el-table th.el-table__cell {
    background-color: #F9F9FA;
    padding: 8px 0px;
}

.ala-select-table-header {
    padding-left: 12px;
}

.ala-select-table-value {
    background-color: var(--el-fill-color);
    padding: 0px 6px;
    border-radius: 2px;
    display: inline-flex;
}
</style>