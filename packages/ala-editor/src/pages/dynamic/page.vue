<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-06 20:33:00
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-27 14:05:34
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
import { getRawLowcodingConfigByClassName } from '@/config/formConfigs';

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
const params = reactive({ tableName: className })

logger.info(`从后台加载【 ${className} 】配置数据，数据对象：`, params);

const styles = ref<{ [key: string]: any }>({})
const pageStyles = computed(() => {
    return styles.value
})

const pageConfig = ref<Object>({})
const blockList = ref<Array<any>>([])

onMounted(async () => {
    
    const config = await getRawLowcodingConfigByClassName(className)

    const pageFormData = config.pageConfig
    const blocks = config.blockConfig
    pageConfig.value = pageFormData
    blockList.value = blocks[bType.value]

})



// Methods

</script>

<style scoped lang="scss"></style>