<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-08 15:37:18
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
import { getDetailConfig } from '@/config/formConfigs';
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


const moduleName = computed(() => {
    // const code = route.meta.menuCode as string;
    // console.log('code:', code);

    // return t(code)
    return '112233'
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
    const params = formData.params.desktop
    const valueName = formData.itemProperty.desktop.valueName
    console.log('formData:---》', formData);
    console.log('url:---》', url);
    console.log('params:---》', params);
    console.log('props.value:---》', props.value);
    console.log('props.value[index]:---》', props.value[index]);

    const formConfig = getDetailConfig('/u/user/page')
    console.log('formConfig:', formConfig);

    dAttr.value = formConfig?.detailAttr as any
    dFields.value =formConfig?.detailFields as any

    const value = props.value[index][valueName]

    const queryParams = u.merged({ [valueName]: value }, params)
    console.log('queryParams:', queryParams);

    const response = await query(url, { body: queryParams, page: { orders: [], current: 1, size: 10 } })

    console.log('response ------> :', response);

    if (response.data?.list) {
        if (response.data.list.length === 0) {
            logger.error(`【 错误，错误，错误 】selectTable详情组件根据 [${queryParams}] 调用 [${url}]接口，返回【 空数组 】`)
        } else if (response.data.list.length > 1) {
            logger.error(`【 错误，错误，错误 】selectTable详情组件根据 [${queryParams}] 调用 [${url}]接口，返回【 数据多于1条 】`)
        } else {
            // 说明刚好查询到一条数据

            u.clear(detailItem.item)
            u.merged(detailItem.item, response.data.list[0])
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
        background-color: var(--el-fill-color);
        padding: 0px 4px;
        border-radius: 3px;
        display: inline-block;
    }

    &:hover {
        color: var(--el-menu-active-color);
        cursor: pointer;
        font-weight: bold;
    }
}
</style>
