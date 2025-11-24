<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:59:53
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-24 09:06:56
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
                            <img :src="imageSrc(item)" :style="{ width: imageWidth, height: imageHeight }" :img="item.icon"/>
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
    <StartForm v-if="showAddForm" v-model="showAddForm" :baseInfo="baseInfo" :fields="addFormFields"
        :formAttr="formAttr" :className="className" />

</template>

<script setup lang="ts">
import { alaBuildInput } from '@/config/alaBuilders';
import { logger } from '@/utils/logger';
import { alaDownload, alaPost, get } from '@/utils/req'
import u from '@/utils/u'
import { useI18n } from 'vue-i18n';
import StartForm from '@/pages/process/startForm.vue';
import { parseChapter, parseCheckbox, parseDate, parseDateRange, parseDivider, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSlider, parseSwitch, parseTextarea } from '../dynamic/formItemParser';
import baseRule from '@/config/rules/baseRule';
import { alaCard, alaCn, alaCnTw, alaEmail, alaEnumRule, alaLetter, alaLl8, alaLl8_, alaLOrlOr8, alaLOrlOr8Or_, alaNumber, alaNumberMax, alaNumberMin, alaNumberRange, alaPassword, alaPattern, alaPhone, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaTw, alaUrl } from '@/config/alaRules';
import { getLowcodingConfigByClassName } from '@/config/formConfigs';
const { t } = useI18n();


// State

// 图片高度
const imageWidth = '36px'
const imageHeight = '36px'

// const src = '/flow/'
// const imageSrc = (item: any) => {
//     const imgSrc = item.icon ? src + item.icon + '.svg' : src + 'leave.svg'
//     return imgSrc
// }

const images = ref<{ [key: string]: string }>({})
const imageSrc = computed(() => (item: { [key: string]: string }) => {
    const icon = item.icon
    if (!images.value[icon]) {
        loadImage(icon)
    }
    return images.value[icon]
})

const remark = '普工请假办理普工请假办理普工请假办理'

// Methods
const showValue = (value: string) => {
    const maxlength = 12
    if (value && value.length > maxlength) {
        value = value.slice(0, maxlength) + ' ...'
    }
    return value
}

const url = '/p/define/searchForApply'
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

const formAttr = ref({
    formWidth: 500,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'right',
    useFormTitle: false,
})
// 表单字段
const addFormFields = ref<Array<any>>([
])
const showAdd = async (form: any, define: any) => {
    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: {}, tableName: form.name, defineId: define.id })
    cn.value = form.className
    logger.info(`【新增】方法接收到参数【 form 】`, form);
    logger.info(`【新增】方法接收到参数【 define 】`, define);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);

    // 组装列表字段

    const configs = await getLowcodingConfigByClassName(form.className)
    formAttr.value = configs.formAttr
    addFormFields.value = configs.addFormFields

    // columns.value = configs.columns
    // baseFields.value = configs.baseFields
    // formConfigItems.value = configs.formConfigItems
    // detailFields.value = configs.detailFields
    // showAddButton.value = configs.showAddButton
    // showDeleteButton.value = configs.showDeleteButton
    // showEditButton.value = configs.showEditButton
    // showButtonsColumn.value = configs.showButtonsColumn
    // u.merged(formAttr.value, configs.formAttr)


    showAddForm.value = true


}





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
}


const loadImage = (image: string) => {

    if (image) {

        alaDownload(u.url('/f/ossfile/download'), { fid: image }).then((data: any) => {
            const response = data;

            const blob = new Blob([response.data])
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64 = reader.result
                console.log('props.formData.icon.desktop:', image);
                console.log('base64:', base64);

                if (typeof base64 === 'string') {
                    // localValues.value.push(base64.replace('data:application/octet-stream', `data:image/${imageType}`))
                    const imageBlob = base64.replace('data:application/octet-stream', `data:image/svg+xml`)

                    images.value[image] = imageBlob
                }
            }

            reader.onerror = (e) => {
                console.log('e:', e)
            }

            reader.readAsDataURL(blob) // 转成 base64
        })


    }


}

</script>

<style scoped lang="scss">
.ala-start {
    padding: 20px;
    overflow-y: auto;
    height: 100%;

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
                min-width: 300px;
                background: #f3f7fa;
                border-radius: 8px;
                transition: box-shadow 0.3s ease-in-out;

                &:hover {
                    box-shadow:
                        0 0 14px 4px rgb(243, 247, 250, 1),
                        // 0 0 10px 10px rgba(0, 255, 0, 0.5),
                        // 0 0 10px 15px rgba(0, 0, 255, 0.5);
                }

                .ala-card-image {
                    padding: 8px;
                    background: radial-gradient(circle, rgb(64 158 255 / 93%) 50%, rgb(64 158 255 / 99%) 100%);
                    margin-right: 8px;
                    border-radius: 8px;
                    /* 平滑过渡效果 */
                    transition: transform 0.3s ease;

                    &:hover {
                        /* 放大 0.1 倍 */
                        transform: scale(1.1);
                    }
                }

                .ala-card-content {
                    min-width: 200px;
                    text-align: left;

                    .title {
                        font-size: 1.1rem;
                        font-weight: bold;
                        white-space: nowrap;
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