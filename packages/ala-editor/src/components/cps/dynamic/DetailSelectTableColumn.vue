<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-16 15:03:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectTableColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value">
    <div class="select-table">
        <div class="ala-select-table-value" v-for="(item, index) in showValue" @click="showDetail(item, index)">
            {{ item }}
        </div>
    </div>
    </p>

    <teleport to="body" v-if="showDetailPage">
        <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="detailAttr" />
    </teleport>

</template>

<script setup lang="ts">
import { getDetailConfig, setDetailConfig } from '@/config/formConfigs';
import FormConfig from '@/config/formConfigs/formConfig';
import { formConfigParse } from '@/pages/dynamic/formConfigParser';
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Array<any>,
        default: []
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    }
})

const { formItem } = toRefs(props)

// Methods
const showValue = computed(() => {
    const values = toRaw(props.value)
    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    const results: string[] = []

    if (values && values.length > 0) {
        values.forEach((v: string) => {
            results.push(v[propertyName])
        })
    }
    return results
})


// ########################################## 关联对象详情 ########################################################

const mName = ref('')
const moduleName = computed(() => {
    let name = ''
    if (mName.value) {
        name = t('menu.' + mName.value)
    }

    return name
})
const detailItem = reactive({
    moduleName,
    item: {}
})


const query = async (url: string, params: any): Promise<any> => {
    // Methods
    logger.info(`从 api 图标数据，url【 ${url} 】，查询参数：`, params);

    const result = await alaPost(u.url(url), params, false, '').then((response: any) => {
        return response
    });
    return result
}



const showDetailPage = ref(false)

const showDetail = async (item: string, index: number) => {
    const { formData } = formItem.value
    const url = formData.url.desktop
    let params = formData.params.desktop
    const valueName = formData.itemProperty.desktop.valueName

    // 先从 缓存中加载
    let formConfig = getDetailConfig(url)

    if (!formConfig) {
        // 说明缓存中没加载到表单配置
        if (url === '/l/dynamic/page') {
            // 说明是动态表单，则根据新的key加载缓存对象
            const { tableName: className } = u.parseJson(params)


            formConfig = getDetailConfig(className)

            if (!formConfig) {
                // 调用接口加载

                // 加载模型定义文件
                const list_url = "/l/lowcodingConfig/list"
                const list_params = { className }
                logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params)

                const configs = await formConfigParse(list_url, list_params)
                formConfig = {
                    formAttr: configs.formAttr,
                    detailAttr: configs.formAttr,
                    formFields: configs.addFormFields,
                    detailFields: configs.detailFields,
                    pageApi: url
                }

                // 将 formConfig 放置到缓存中

                setDetailConfig(className, formConfig)

            }

        } else {
            // 说明当前模块不是动态表单，那么当前模块是非动态表单模块，但是未在 formConfig 中配置表单信息
            logger.error(`当前模块是非动态表单模块，但是【 未在 formConfig 中配置表单 】信息，url[${url}]，params[${u.tojson(params)}]`)
        }
    }


    dAttr.value = formConfig?.detailAttr as any
    dFields.value = formConfig?.detailFields as any

    const value = props.value[index][valueName]

    if (params.indexOf('tableName') > 0) {

        // 说明当前关联字段是动态表单
        params = u.parseJson(params)
        params.className = params.tableName

        const conditions = [{ column: 'id', operator: '=', value }]
        u.merged(params, { conditions })

        mName.value = params.tableName

    } else {
        mName.value = formConfig?.moduleName!
    }
    const queryParams = u.merged({ [valueName]: value }, params)

    const response = await query(url, { body: queryParams, page: { orders: [], current: 1, size: 10 } })


    if (response.data?.list) {
        if (response.data.list.length === 0) {
            logger.error(`【 错误，错误，错误 】selectTable详情组件根据 [${queryParams}] 调用 [${url}]接口，返回【 空数组 】`)
        } else if (response.data.list.length > 1) {
            logger.error(`【 错误，错误，错误 】selectTable详情组件根据 [${queryParams}] 调用 [${url}]接口，返回【 数据多于1条 】`)
        } else {
            // 说明刚好查询到一条数据

            u.clear(detailItem.item)
            u.merged(detailItem.item, response.data.list[0])
            u.merged(detailItem.item, {className:params.className})
            logger.info(`当前模块【 DetailSelectTableColumn --- detailItem 】对象参数为`, detailItem);
            showDetailPage.value = true

        }
    } else {
        logger.error(`【 错误，错误，错误 】selectTable详情组件根据 [${queryParams}] 调用 [${url}]接口，返回【 数据为空 】，response[ ${u.tojson(response)} ]`)
    }






}

const dAttr = ref<Array<any>>([])
const detailAttr = computed(() => {
    return dAttr.value
})

const dFields = ref<Array<any>>([])
const detailFields = computed(() => {
    return dFields.value
})


</script>

<style scoped lang="scss">
.select-table {
    display: flex;
    gap: 4px;

    .ala-select-table-value {
        background-color: rgb(239, 77, 75, 12%);
        padding: 0px 4px;
        border-radius: 3px;
        display: inline-block;
    }

    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
}
</style>
