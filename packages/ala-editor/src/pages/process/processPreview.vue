<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:57:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-10 16:23:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/processPreview.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <flow-designer ref='flowDesignerRef' v-model="flowModel" @save="handleSave" @change="handleChange"
        :viewer="viewer" />
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Define {
    id: number | undefined,
    name: string,
    displayName: string,
    content: any,
}

const props = defineProps({
    viewer: {
        type: Boolean,
    },
    previewParams: {
        type: Object as any,
        default: () => ({})
    }
})



const flowDesignerRef = ref()

// State
const flowModel = ref<Define>({
    id: undefined,
    name: '',
    displayName: '',
    content: {}
})

const handleChange = (flowData: { json: any }) => {

}

const handleSave = (flowData: { json: any }) => {

}

// Methods
// 加载编辑时的初始化数据

watch(() => props.previewParams.defineId, (id) => {

    if (id) {

        const url = "/p/define/get"

        const params = { id }
        logger.info(`从后台加载【 define 】配置数据，url【 ${url} 】，数据对象：`, params);

        get(u.url(url || ''), params).then((response: any) => {

            const { data: { content, id, } } = response.data;
            const ct = u.parseJson(content)

            flowModel.value.content = ct

        });
    }

}, { immediate: true })

</script>

<style scoped lang="scss"></style>