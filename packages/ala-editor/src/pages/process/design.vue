<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:57:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-28 18:43:22
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/design.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <flow-designer ref='flowDesignerRef' v-model="flowModel" @save="handleSave" @change="handleChange" />
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'
const route = useRoute()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Define {
    id: number | undefined,
    name: string,
    displayName: string,
    content: any,
}

const flowDesignerRef = ref()

// State
const flowModel = ref<Define>({
    id: undefined,
    name: '',
    displayName: '',
    content: {}
})

const handleChange = (flowData: { json: any }) => {
    logger.info(`接收到流程设计器数据回调，flowData`);
    console.log('flowData:', flowData);
    flowModel.value.content = flowData
}

const handleSave = (flowData: { json: any }) => {
    const { name, displayName } = flowData.json

    let flowDataJson = ''
    if (flowData) {
        flowDataJson = u.tojson(flowData.json)
    }
    // 1、验证流程图是否正确？如连线是否完整

    // 2、保存
    const data = { name: name, displayName: displayName, content: flowDataJson }
    // 保存数据并刷新分页列表
    // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口
    const id = flowModel.value.id ? flowModel.value.id : undefined

    const url = id ? '/p/define/update' : '/p/define/add'

    if (id) {
        u.merged(data, { id })
        logger.info(`【 更新数据 】，url${url}，数据对象：`);
    } else {
        logger.info(`【 新增数据 】，url${url}，数据对象：`);
    }
    console.log('data:', data);


    alaPost(u.url(url || ''), data, false, id ? 'put' : '').then((data: any) => {

        const response = data;
        if (response.data.id) {
            flowModel.value.id = response.data.id
        }
        notify.success(t('pop.warm_title'), "保存成功")
    });

}

// Methods
// 加载编辑时的初始化数据
onActivated(() => {
    if (route.query.id) {

        const url = "/p/define/get"

        const params = { id: route.query.id }
        logger.info(`从后台加载【 define 】配置数据，url【 ${url} 】，数据对象：`, params);

        get(u.url(url || ''), params).then((response: any) => {

            const { data: { content, id, } } = response.data;

            const ct = u.parseJson(content)
            response.data.data.content = ct

            // 初始化 flowModel 数据
            flowModel.value.id = id
            flowModel.value.content = ct

        });
    }
})

</script>

<style scoped lang="scss"></style>