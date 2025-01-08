<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:59:53
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-07 20:49:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/start.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-start">

        <template v-for="(define, index) in defines" :key="index" @click="">
            <div class="one-class">
                <p class="class-title">
                    {{ define.name }}
                </p>
                <div class="cards">
                    <div class="ala-card" v-for="(item, i) in define.defineVos" :key="index + '-' + i"
                        @click="handleClick(item)">
                        <div class="ala-card-image">
                            <img :src="imageSrc(item)" :style="{ width: imageWidth, height: imageHeight }" />
                        </div>
                        <div class="ala-card-content">
                            <p class="title">
                                {{ item.displayName }}
                            </p>
                            <p class="remark">
                                <el-tooltip effect="light" :content="item.remark" :hide-after="0">
                                    {{ showValue(item.remark) }}
                                </el-tooltip>

                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </template>
    </div>

    <!-- 新增、编辑 -->
    <StartForm v-if="showAddForm" v-model="showAddForm" :baseInfo="baseInfo" :fields="formFields"
        :formAttr="getFormAttr" :className="className" />

</template>

<script setup lang="ts">
import { alaBuildInput } from '@/config/alaBuilders';
import { logger } from '@/utils/logger';
import { alaPost, get } from '@/utils/req'
import u from '@/utils/u'
import { useI18n } from 'vue-i18n';
import StartForm from '@/pages/process/startForm.vue';
import { parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from '../dynamic/formItemParser';
import baseRule from '@/config/rules/baseRule';
import { alaCard, alaCn, alaCnTw, alaEmail, alaEnumRule, alaLetter, alaLl8, alaLl8_, alaLOrlOr8, alaLOrlOr8Or_, alaNumber, alaNumberMax, alaNumberMin, alaNumberRange, alaPassword, alaPattern, alaPhone, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaTw, alaUrl } from '@/config/alaRules';
const { t } = useI18n();


// State

// 图片高度
const imageWidth = '36px'
const imageHeight = '36px'

const src = '/flow/'
const imageSrc = (item: any) => {
    const imgSrc = item.icon ? src + item.icon + '.svg' : src + 'leave.svg'
    return imgSrc
}

const remark = '普工请假审批普工请假审批普工请假审批'

// Methods
const showValue = (value: string) => {
    const maxlength = 12
    if (value && value.length > maxlength) {
        value = value.slice(0, maxlength) + ' ...'
    }
    return value
}

const url = '/p/define/listForApply'
const params = { state: 1 }
const defines = ref<any>([])
onActivated(() => {
    alaPost(u.url(url), params, false, '').then((data: any) => {
        const response = data;
        if (response.data) {
            defines.value = response.data
        }
    });
})



const classifyByProperty = (items: [], propertyName: string) => {
    const classified: { [key: string]: [] } = {};
    items.forEach(item => {
        const key = item[propertyName]
        if (!classified[key]) {
            classified[key] = [];
        }
        classified[key].push(item);
    });

    console.log('classified:', classified);


    const sortedKeys = getSortedPropertyKeys(classified)
    const sortedValues: any = []
    sortedKeys.forEach(key => {
        sortedValues.push(classified[key])
    })

    return sortedValues;
}

const getSortedPropertyKeys = (obj: any) => {
    // 获取对象的所有属性名，并转换为数组
    const keys = Object.keys(obj);
    // 对属性值进行排序
    const sortedValues = keys.sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        } else if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    });
    return sortedValues;
}

const getUrl = '/p/define/get'
const handleClick = (item: { id: number }) => {

    get(u.url(getUrl || ''), { id: item.id }).then((response: any) => {

        const data = response.data.data
        const content = data.content
        const dynamicForm = getStartForm(u.parseJson(content))
        u.checkNull(dynamicForm, '申请单', t)

        // 查找动态form表单，并动态渲染
        showAdd(dynamicForm[0], item)

    });
}

interface FlowJson {
    nodes: [],
    edges: [],
}

const getStartForm = (flowJson: FlowJson) => {
    // 查找 type 为 snaker:start 的节点的输出边的id
    const nodes = flowJson.nodes || []
    let startId = ''
    nodes.forEach((node) => {
        if (node['type'] === 'snaker:start') {
            startId = node['id'] as string
        }
    })
    u.checkEmpty(startId, '当前流程没有配置开始节点', t)
    // 根据输出边的id找到流程发起节点的 id
    const edges = flowJson.edges || []
    let firstNodeId = ''
    edges.forEach((edge) => {
        if (edge['sourceNodeId'] === startId) {
            firstNodeId = edge['targetNodeId']
        }
    })
    u.checkEmpty(firstNodeId, '当前流程没有配置第一级任务节点', t)
    // 然后根据流程发起节点id找流程发起节点
    let firstNode: any = {}
    nodes.forEach((node) => {
        if (node['id'] === firstNodeId) {
            firstNode = node
        }
    })
    u.checkNull(firstNode, '当前流程没有配置第一级任务节点', t)

    // 从流程发起节点提取form配置信息
    return firstNode['properties']?.['forms']
}

const baseInfo = reactive({
    id: null,
    defineId: null,
    item: {}
})
const showAddForm = ref(false)
const cn = ref('')
const className = computed(() => {
    return cn.value
})
const showAdd = (form: any, define: any) => {
    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: {}, moduleName: form.name, defineId: define.id })
    cn.value = form.className
    logger.info(`【新增】方法接收到参数【 form 】`, form);
    logger.info(`【新增】方法接收到参数【 define 】`, define);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);

    // 组装列表字段

    const url = "/l/lowcodingConfig/get"
    const params = { id: form.id }
    const bType = 'form'
    logger.info(`从后台加载【 ${bType} 】配置数据，url【 ${url} 】，数据对象：`, params);

    get(u.url(url || ''), params).then((response: any) => {
        const { data: { config, id } } = response.data;
        const conf = u.parseJson(config)
        const blockConfig = conf["blockConfig"][bType]
        const pageConfig = conf["pageConfig"][bType]

        u.checkNull(pageConfig?.formData, '当前流程第一级任务节点表单【 页面配置 】不存在', t)
        u.checkNull(blockConfig, '当前流程第一级任务节点表单【 字段配置 】不存在', t)

        // 初始化表单页面配置项
        const pFormData = pageConfig?.formData
        const formAttrs = {
            formWidth: pFormData.width?.desktop ? pFormData.width.desktop : formAttr.value.formWidth,
            labelWidth: pFormData.labelWidth?.desktop ? pFormData.labelWidth.desktop : formAttr.value.labelWidth,
            columnNum: pFormData.columnNum?.desktop ? pFormData.columnNum.desktop : formAttr.value.columnNum,
            useFormTitle: pFormData.useFormTitle?.desktop ? pFormData.useFormTitle.desktop : formAttr.value.useFormTitle,
            labelPosition: pFormData.labelPosition?.desktop ? pFormData.labelPosition.desktop : formAttr.value.labelPosition,
        }
        logger.info(`【 流程表单 - pageConfig】配置信息：`, formAttrs);

        u.merged(formAttr, formAttrs)

        addFormFields.value = []
        // 初始化表单字段配置项
        blockConfig.forEach((item: { code: string, formData: any }) => {
            const { code, formData } = { ...item }

            // 组装 form 表单字段
            let formItem: any = {}
            if (code === 'input') {
                formItem = parseInput(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'textarea') {
                formItem = parseTextarea(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'radio') {
                formItem = parseRadio(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'checkbox') {
                formItem = parseCheckbox(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'date') {
                formItem = parseDate(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'number') {
                formItem = parseNumber(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'select') {
                formItem = parseSelect(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'slider') {
                formItem = parseSlider(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'rating') {
                formItem = parseRating(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'switch') {
                formItem = parseSwitch(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'divider') {
                formItem = parseDivider(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'chapter') {
                formItem = parseChapter(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'selectTable') {
                formItem = parseSelectTable(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'selectDict') {
                formItem = parseSelectDict(formData)
                addFormFields.value.push(formItem)
            } else if (code === 'dateRange') {
                // 类似于时间范围这种表单，需要 使用组件数据回调机制 动态更新具体form中的属性值，因此需要把属性字段名传递到具体组件中
                formItem = parseDateRange(formData)
                formItem.other.startFieldName = formData.startFieldName.desktop
                formItem.other.endFieldName = formData.endFieldName.desktop
                addFormFields.value.push(formItem)
            }

            const other = formItem.other || {}

            if (item.formData.columnNum) {
                formItem.columnNum = item.formData.columnNum.desktop
            }

            // 处理 组件 other 中的属性信息
            if (item.formData.help && item.formData.help.desktop) {
                other.help = item.formData.help.desktop
            }
            if (item.formData.icon && item.formData.icon.desktop) {
                other.icon = item.formData.icon.desktop
                other.iconWidth = item.formData.iconWidth.desktop
                other.iconHeight = item.formData.iconHeight.desktop
            }

            formItem.other = other

            // 解析表单验证规则


            const rules: Array<baseRule> = []

            // 非空验证条件
            if (formData.required && formData.required.desktop) {
                rules.push(alaRequired())
            }

            // 添加字符数最少、最多和范围验证
            if (formData.strMin && formData.strMax && formData.strMin.desktop && formData.strMax.desktop) {
                rules.push(alaStrLengthRange(formData.strMin.desktop, formData.strMax.desktop))
            } else if (formData.strMin && formData.strMin.desktop) {
                rules.push(alaStrMin(formData.strMin.desktop))
            } else if (formData.strMax && formData.strMax.desktop) {
                rules.push(alaStrMax(formData.strMax.desktop))
            }

            // 添加 数值最小、最大和范围验证
            if (formData.numberMin && formData.numberMax && formData.numberMin.desktop && formData.numberMax.desktop) {
                rules.push(alaNumberRange(formData.numberMin.desktop, formData.numberMax.desktop))
            } else if (formData.numberMin && formData.numberMin.desktop) {
                rules.push(alaNumberMin(formData.numberMin.desktop))
            } else if (formData.numberMax && formData.numberMax.desktop) {
                rules.push(alaNumberMax(formData.numberMax.desktop))
            }

            if (formData.rules && formData.rules.desktop) {
                const functionName = ruleFunctions[formData.rules.desktop]
                if (!functionName) {
                    logger.error(`【 错误，错误，错误 】${formData.rules.desktop} 函数不存在`);
                } else {
                    rules.push(ruleFunctions[formData.rules.desktop]())
                }
            }

            formItem.rules = rules

        })

        logger.info(`【 流程表单 - blockConfig】配置信息：`, addFormFields.value);

        showAddForm.value = true

    });

}

const formAttr = ref({
    formWidth: 400,
    columnNum: 1,
    labelWidth: 100,
    labelPosition: 'left',
    useFormTitle: false,
})

const getFormAttr = computed(() => {
    return formAttr
})

// 表单字段
const formFields = computed(() => {
    return addFormFields.value
})
const addFormFields = ref<Array<any>>([
])

// 创建一个映射，将函数名字符串映射到函数引用
const ruleFunctions: { [key: string]: Function } = {
    alaRequired: alaRequired,
    alaStrMin: alaStrMin,
    alaStrMax: alaStrMax,
    alaStrLengthRange: alaStrLengthRange,
    alaStrLength: alaStrLength,
    alaNumberMin: alaNumberMin,
    alaNumberMax: alaNumberMax,
    alaNumberRange: alaNumberRange,
    alaPattern: alaPattern,
    alaEnumRule: alaEnumRule,
    alaEmail: alaEmail,
    alaPhone: alaPhone,
    alaUrl: alaUrl,
    alaCard: alaCard,
    alaNumber: alaNumber,
    alaLetter: alaLetter,
    alaLOrlOr8: alaLOrlOr8,
    alaLl8: alaLl8,
    alaLOrlOr8Or_: alaLOrlOr8Or_,
    alaLl8_: alaLl8_,
    alaPassword: alaPassword,
    alaCnTw: alaCnTw,
    alaCn: alaCn,
    alaTw: alaTw,
};
</script>

<style scoped lang="scss">
.ala-start {
    padding: 20px;


    .one-class {
        margin-bottom: 22px;

        background: #fff;
        padding: 12px 8px;
        border-radius: 8px;

        .class-title {
            height: 32px;
            line-height: 32px;
            text-align: left;
            font-weight: bold;
            font-size: 1.2rem;
            padding-left: 8px;
        }

        .cards {
            display: flex;
            gap: 20px;
            padding: 8px;
            align-items: center;
            flex-wrap: wrap;

            .ala-card {

                display: flex;
                padding: 16px 20px;
                width: 300px;
                background: #f3f7fa;
                border-radius: 8px;


                .ala-card-image {
                    padding: 8px;
                    background: radial-gradient(circle, rgb(64 158 255 / 93%) 50%, rgb(64 158 255 / 99%) 100%);
                    margin-right: 8px;
                    border-radius: 8px;

                }

                .ala-card-content {
                    width: 200px;
                    text-align: left;

                    .title {
                        font-size: 1.1rem;
                        font-weight: bold;
                    }

                    .remark {
                        margin-top: 4px;
                        font-size: 0.9rem;
                        color: var(--el-text-color-regular);
                    }
                }

                &:hover {
                    cursor: pointer;
                }


            }
        }
    }



}
</style>