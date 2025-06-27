<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:45:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-27 18:20:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/lowcoding/screen-design-editor.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor">
        <!-- <EditorHeader /> -->

        <div class="container" :class="classes">

            <EditorBlockDynamic :bType="bType" :menuList="menuList" :blocks="blocks" />

            <EditorRender :bType="bType" />

            <EditorConfig :bType="bType" />
            <!-- <button @click="getLoveMessage()">Change</button> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { queryLoveMessage } from '@/utils/tuwei';
import { logger } from '@/utils/logger';
import { useEditorStore } from '@/store/useEditorStore';
import {
    lineChart,
    barChart,
    pieChart,
    scatterPlotChart,
    map,
    radarChart,
    boxPlot,
    heatmap,
    relationshipDiagram,
    pathDiagram,
    treeDiagram,
    treemap,
    sunburstChart,
    parallelCoordinates,
    sankeyDiagram,
    funnelChart,
    dashboard,
    pictorialBarChart,
    themeRiverChart,
    calendarCoordinateSystem,
    cardChart
} from "@/config/pageItems"

import { useI18n } from 'vue-i18n';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import notify from '@/utils/notify';
import EditorBlockDynamic from '@/components/editor/editor-block-dynamic.vue';
const { t } = useI18n();
const route = useRoute()

// State
const bType = 'screen'
const editorStore = useEditorStore()

// Methods
const classes = computed(() => {
    return { "mobile-background": editorStore.isMobileViewport(bType) }
})


interface Menu {
    icon: string,
    iconActive: string,
    name: string,
}
const menuList = computed(() => {
    return [
        {
            icon: "block",
            iconActive: "blockActive",
            name: t("module.lowcoding.baseName")
        },
        {
            icon: "kit",
            iconActive: "kitActive",
            name: t("module.lowcoding.kitName")
        }
    ]
})


const formData = ref({})

// 加载编辑时的初始化数据
onMounted(() => {
    if (route.query.id) {

        const url = "/l/lowcodingConfig/get"

        const params = { id: route.query.id }
        logger.info(`从后台加载【 ${bType} 】配置数据，url【 ${url} 】，数据对象：`, params);

        get(u.url(url || ''), params).then((response: any) => {
            const { data: { config, id } } = response.data;

            const conf = u.parseJson(config)

            const blockConfig = conf["blockConfig"][bType]
            const pageConfig = conf["pageConfig"][bType]

            // 向 pageConfig 添加 id ，供 editor-config 页面保存数据用于判断当前是新建还是编辑操作
            pageConfig["id"] = route.query.id

            editorStore.setBlockConfig(blockConfig, bType)
            editorStore.setPageConfig(pageConfig, bType)

        });
    }
})


const blocks = ref<any>([
    { name: 'module.page_designer.card_chart', blocks: cardChart },
    { name: 'module.page_designer.line_chart', blocks: lineChart },
    { name: 'module.page_designer.bar_chart', blocks: barChart },
    { name: 'module.page_designer.pie_chart', blocks: pieChart },
    { name: 'module.page_designer.scatter_plot_chart', blocks: scatterPlotChart },
    { name: 'module.page_designer.map', blocks: map },
    { name: 'module.page_designer.radar_chart', blocks: radarChart },
    { name: 'module.page_designer.box_plot', blocks: boxPlot },
    { name: 'module.page_designer.heatmap', blocks: heatmap },
    { name: 'module.page_designer.relationship_diagram', blocks: relationshipDiagram },
    { name: 'module.page_designer.path_diagram', blocks: pathDiagram },
    { name: 'module.page_designer.tree_diagram', blocks: treeDiagram },
    { name: 'module.page_designer.treemap', blocks: treemap },
    { name: 'module.page_designer.sunburst_chart', blocks: sunburstChart },
    { name: 'module.page_designer.parallel_coordinates', blocks: parallelCoordinates },
    { name: 'module.page_designer.sankey_diagram', blocks: sankeyDiagram },
    { name: 'module.page_designer.funnel_chart', blocks: funnelChart },
    { name: 'module.page_designer.dashboard', blocks: dashboard },
    { name: 'module.page_designer.pictorial_bar_chart', blocks: pictorialBarChart },
    { name: 'module.page_designer.theme_river_chart', blocks: themeRiverChart },
    { name: 'module.page_designer.calendar_coordinate_system', blocks: calendarCoordinateSystem },
])

</script>

<style scoped lang="scss">
.editor {
    width: 100%;
    overflow-x: hidden;
    user-select: none;
    --edit-header-height: 100px;
    --edit-block-width: 300px;
    --border-radius-editor: 4px;

    .container {
        display: flex;
        width: 100%;
        min-width: 100%;

        &.mobile-background {
            background: var(--color-bg);
        }
    }
}
</style>