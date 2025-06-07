<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-06 20:33:00
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-07 15:54:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/page.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-dynamic-page" :style="pageStyles">
        <PageRender :blockList="blockList" :pageConfig="pageConfig" class="render" :bType="bType"></PageRender>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
import PageRender from '@/pages/dynamic/page-render.vue';

const { t } = useI18n();

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();

const className = route.path.slice(route.path.lastIndexOf('/') + 1)


const moduleName = computed(() => {
    const code = route.meta.menuCode as string;
    return t(code)
})

// 2、定义当前编辑对象id
const baseInfo = reactive({
    moduleName,
    id: null,
    selectedList: Array<{ id: string }>,
    item: {}
})
const detailItem = reactive({
    moduleName,
    item: {}
})

provide('baseInfo', baseInfo);


const bType = ref('screen')

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// 加载模型定义文件
const list_url = "/l/lowcodingConfig/list"
const list_params = { className }
const params = reactive({ tableName: className })

logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params);

const styles = ref<{ [key: string]: any }>({})
const pageStyles = computed(() => {
    return styles.value
})

const pageConfig = ref<Object>({})
const blockList = ref<Array<any>>([])

alaPost(u.url(list_url || ''), list_params, false, '').then((response: any) => {
    if (response.code === 200) {
        if (response.data.length === 0) {
            notify.error(t('pop.warm_title'), `没有找到模块【 ${className} 】`)
            return
        }
        const config = u.parseJson(response.data[0].config)
        const pageFormData = config.pageConfig
        const blocks = config.blockConfig
        pageConfig.value = pageFormData
        blockList.value = blocks[bType.value]
    }
});



// Methods

</script>

<style scoped lang="scss"></style>