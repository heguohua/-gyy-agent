<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-07 11:19:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/page-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="drop-canvas" @dragover.prevent ref="canvasRef" :style="canvasStyles">

        <template v-for="(element, index) in blockList" :key="element.id">
            <div class="dropped-item" :style="styles(element)" @mouseenter="hoverId = element.id"
                @mouseleave="hoverId = ''">
                <component :is="getComponentNameByCode(element)" :key="bType + '-' + element.id" :viewport="bType"
                    :currentId="element.id" :formData="element.formData" :pid="pid" :block="element" :bType="bType" />
            </div>
        </template>

        <!-- 对齐参考线 -->
        <div v-for="line in guidelines" :key="line.id" :class="['guide-line', line.direction]" :style="lineStyle(line)">
        </div>
        
    </div>

</template>

<script setup lang="ts">
import { alaConsts } from "@/config/alaConsts";
import { logger } from "@/utils/logger";

defineOptions({
    name: 'EditRenderPage'
})

const props = defineProps({
    pageConfig: {
        type: Object,
        required: true,
        default: () => { }
    },
    blockList: {
        type: Array<any>,
        required: true,
        default: () => []
    },
    group: {
        type: [String, Object],
        default: 'group'
    },
    sort: {
        type: Boolean,
        default: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    pid: {
        type: String,
    },
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

const hoverId = ref('')

const getComponentNameByCode = computed(() => {
    return (element: { code: string }) => {
        const componentName = alaConsts.COMPONENT_PREFIX + element.code
        logger.info(`page-render组件中根据组件 code[ ${element.code} ]获取子组件名[ ${componentName} ]`);
        return componentName
    }
})

const canvasRef = ref<HTMLElement | null>(null)

interface GuideLine {
    id: string
    direction: 'vertical' | 'horizontal'
    position: number
}

const guidelines = ref<GuideLine[]>([])
const lineStyle = (line: GuideLine) => {
    if (line.direction === 'vertical') {
        return { left: line.position + 'px', top: 0, bottom: 0 }
    } else {
        return { top: line.position + 'px', left: 0, right: 0 }
    }
}

const canvasStyles = computed(() => {

    let style: { [key: string]: any } = {}
    if(!props.pageConfig['screen']) return

    const flow = props.pageConfig['screen'].formData?.flow?.desktop
    const columnGap = props.pageConfig['screen'].formData?.columnGap?.desktop
    const rowGap = props.pageConfig['screen'].formData?.rowGap?.desktop
    const paddingTop = props.pageConfig['screen'].formData?.paddingTop?.desktop
    const paddingLeft = props.pageConfig['screen'].formData?.paddingLeft?.desktop

    if (flow) {

        style = {
            background: canvasBackground.value,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            height: 'auto',
        }

        if (columnGap) style['columnGap'] = columnGap
        if (rowGap) style['rowGap'] = rowGap
        if (paddingTop) style['paddingTop'] = paddingTop
        if (paddingLeft) style['paddingLeft'] = paddingLeft
        style['paddingBottom'] = '50px'


    } else {
        style = {
            background: canvasBackground.value
        }
    }

    return style
})


const styles = (element: any) => {

    const isFlow = props.pageConfig['screen'].formData?.flow.desktop

    let style = undefined
    if (isFlow) {
        // 当前是流式布局
        style = {
            width: element.formData.width?.desktop,
            height: element.formData.height?.desktop,
            borderRadius: element.formData.radius?.desktop,
            position: 'relative',
        }
    } else {
        // 当前是绝对布局
        style = {
            width: element.formData.width?.desktop,
            height: element.formData.height?.desktop,
            left: element.formData.x?.desktop,
            top: element.formData.y?.desktop,
            borderRadius: element.formData.radius?.desktop,
            position: 'absolute',
        }

    }
    return style
}

const canvasBackground = ref()
watch(() => props.pageConfig[props.bType]?.formData?.background?.desktop, (v) => {
    canvasBackground.value = v
}, {
    immediate: true
})

</script>

<style scoped lang="scss">
.drop-canvas {
    position: relative;
    width: 100%;
    min-height: 600px;
    // background-color: #f5f5f5;

    .dropped-item {
        // position: fixed;
        background: #fff;
        // border: 1px solid #000;
        // padding: 4px 8px;
        user-select: none;
        display: inline-flex;
        // background: red;

    }

    .guide-line {
        position: absolute;
        background: red;
        z-index: 1000;

        &.vertical {
            width: 1px;
        }

        &.horizontal {
            height: 1px;
        }
    }


}
</style>