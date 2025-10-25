<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-25 10:52:27
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTimelineColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <el-timeline>

        <template v-for="(item, index) in timelines" :key="index">
            <DetailTimelineItem :title="item.title" :content="item.content" :timestamp="item.timestamp"
                v-bind="item.properties" :showDetail="item.showDetail" @handleShowDetail="handleShowDetail(item)" />
        </template>

    </el-timeline>

    <AlaDetail :data="detailItem" v-model="showDetailPage" v-if="showDetailPage" :fields="detailFields"
        :formAttr="formAttrs" />


</template>

<script setup lang="ts">
import { getLowcodingConfigByClassName } from '@/config/formConfigs'
import u from '@/utils/u'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


interface Item {
    title: string,
    content: string,
    timestamp: any,
    properties: any,
    showDetail: any,
    detailEntity: any,
}

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
    timelines: {
        type: Array<Item>,
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
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})


// Methods
const detailItem = reactive({
    // moduleName,
    item: {}
})
const detailFields: any = ref([])
const formAttrs: any = ref({})

const showDetailPage = ref(false)


const handleShowDetail = async (item: Item) => {
    console.log('item: --->', item);


    // 获取表单元数据
    const className = u.parseJson(item.detailEntity.args)[0].className
    const config = await getLowcodingConfigByClassName(className)
    detailFields.value = config.detailFields
    formAttrs.value = config.formAttr

    // 获取表单数据

    // 渲染弹窗

    u.clear(detailItem.item)
    console.log('`menu.${className}`:',t("menu.customerVisitWorkOrderConfirm"));
    
    u.merged(detailItem, { item: item.detailEntity, moduleName: u.parseI18n(`t("menu.${className}")`, t) })
    // u.merged(baseInfo, { id: entity.id })
    showDetailPage.value = true

}

</script>

<style scoped lang="scss">
:deep(.el-card__body) {
    padding: 14px 20px;
}
</style>
