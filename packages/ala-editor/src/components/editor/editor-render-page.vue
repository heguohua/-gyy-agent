<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-17 08:22:18
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-render-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="drop-canvas" @dragover.prevent @drop="onDrop" ref="canvasRef" :style="canvasStyles">
        <!-- <div v-for="(item, index) in droppedComponents" :key="item.id" :id="item.id" class="dropped-item"
            :style="{ top: item.y + 'px', left: item.x + 'px', width: item.width + 'px', height: item.height + 'px', }"
            @mousedown="startDrag" @click="onClick">
            {{ item.type }}
        </div> -->

        <template v-for="(element, index) in blockList" :key="element.id">
            <div class="dropped-item" :class="activeClass(element)" @click.stop="setCurrentSelect(element)"
                :style="styles(element)" @mouseenter="hoverId = element.id" @mouseleave="hoverId = ''">
                <!-- @mousedown="startDrag"> -->

                <Transition name="fade">
                    <EditRenderHover v-if="bType == 'screen'" v-show="hoverId === element.id" :id="element.id"
                        :name="element.name" @copy="copy" @clear="clear" :bType="bType" :showDrag="false"
                        :showTop="true" :showClone="true" @top="top" @clone="clone">
                    </EditRenderHover>
                    <EditRenderHover v-else v-show="hoverId === element.id" :id="element.id" :name="element.name"
                        @copy="copy" @clear="clear" :bType="bType" :showDrag="false" :showTop="true" @top="top">
                    </EditRenderHover>
                </Transition>

                <component :is="getComponentNameByCode(element)" :key="bType + '-' + element.id"
                    :viewport="editorStore.viewport[bType]" :currentId="element.id" :formData="element.formData"
                    :pid="pid" :block="element" :bType="bType" />
            </div>
        </template>

        <!-- 对齐参考线 -->
        <div v-for="line in guidelines" :key="line.id" :class="['guide-line', line.direction]" :style="lineStyle(line)">
        </div>
    </div>
    <!-- <draggable :list="blockList" :group="group" :sort="sort" animation="200" item-key="id" ghost-class="ghost-class"
        class="edit-render-drag" :clone="clone" :move="move">
        <template #item="{ element }">

            <div class="page-block"> -->

    <!-- 
                    1、渲染普通组件 
                    2、更新 editorStore.currentSelect 值 
                 
                -->
    <!-- <div :class="activeClass(element)" @click.stop="setCurrentSelect(element)"
                    @mouseenter="hoverId = element.id" @mouseleave="hoverId = ''"> -->

    <!-- <Transition name="fade">
                            <EditRenderHover v-show="hoverId === element.id" :id="element.id" :name="element.name"
                                @copy="copy" @clear="clear" :bType="bType">

                            </EditRenderHover>
                        </Transition> -->
    <!-- 
                    <component :is="getComponentNameByCode(element)" :key="bType + '-' + element.id"
                        :viewport="editorStore.viewport[bType]" :currentId="element.id" :formData="element.formData"
                        :pid="pid" :block="element" :bType="bType" />
                </div>

            </div>
        </template>
</draggable> -->
</template>

<script setup lang="ts">

import { findNodeById, replaceNodeId } from "@/components/editor/nested"
import { alaConsts } from "@/config/alaConsts";

import { useEditorStore } from "@/store/useEditorStore"
import { BaseBlock } from "@/types/editorType";
import { logger } from "@/utils/logger";
import EditRenderHover from "./edit-render-hover.vue";
import DropCanvas from '@/pages/drag/DropCanvas.vue'

import u from '@/utils/u'
import { reactive } from 'vue'
import { nanoid } from "@/utils/nanoid";
import { dType } from "../cps/dynamic/detailType";

const editorStore = useEditorStore()

defineOptions({
    name: 'EditRenderPage'
})

const props = defineProps({
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
        logger.info(`editor-render-page组件中根据组件 code[ ${element.code} ]获取子组件名[ ${componentName} ]`);
        return componentName
    }
})


const activeClass = computed(() => {
    return (element: { id: string }) => {
        const id = editorStore.currentSelect[bType]?.id || ''
        return { "is-active": element.id === id }
    }
})
onMounted(() => {
    logger.info(`edit-render-drag 组件已挂载, 当前level ` + props.level);

})
// State

const currentSelectedBlock = ref<BaseBlock>()

// Methods

// const addedBlock = (element) => {
//     setCurrentSelect(element)
// }
/**
 * 1）将当前选中的 BaseBlock 存储到 editorStore 中的 currentSelect 中
 * 2）同时将当前 BaseBlock 存储到 editorStore 中的 blockConfig[] 中（ 如果不存在则添加）
 * @param element 
 */
const setCurrentSelect = (block: BaseBlock) => {


    currentSelectedBlock.value = block

    block.parent = props.pid
    logger.info("edit-block-drag组件 被点击,即将更新 editorStore.currentSelect 和 editorStore.blockConfig");

    const id = block.id;

    if (id) {

        if (editorStore.currentSelect[bType]?.id != id) {

            console.log('editorStore.blockConfig - 1:', u.tojson(editorStore.blockConfig[bType]));


            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 不相同 】，即将更新editorStore.currentSelect，code【 ${block.code} 】,block：`, block);
            editorStore.setCurrentSelect(block, bType)
            console.log('editorStore.blockConfig - 2:', u.tojson(editorStore.blockConfig[bType]));


            // 向 editorStore 的 blockConfig 中追加 block
            // tod 这里是不是都改成 拖拽后自动初始化，如果做到了自动初始化，那么这里就不用再添加到 blockConfig 中了
            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 不相同 】，即将添加当前block到blockConfig，code【 ${block.code} 】，block：`, block);
            editorStore.addToBlockConfigIfNotExist(block, bType)
            console.log('editorStore.blockConfig - 3:', u.tojson(editorStore.blockConfig[bType]));

        } else {
            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 相同 】，不执行更新操作，code【 ${block.code} 】`, block);
        }
    } else {
        logger.error(`bType[ ${bType} ],【 注意，注意，注意 】，当前 被选中block的 id不存在`, block);
    }

}

// 接收子组件的初始化回调事件
const init = (data: { pid: string, block: BaseBlock }) => {
    const { pid, block } = data
    logger.info(`bType[ ${bType} ],接收到子组件【 init 回调 】，即将回调 setCurrentSelect 方法，父组件id[ ${pid} ]，当前组件id[ ${block.id} ]，当前组件数据`, block);
    console.log('接收到子组件初始化回调参数data：', data);
    setCurrentSelect(block)
}


const handleNodeById = (arr: BaseBlock[], nodeId: string, type: 'copy' | 'clear' | 'top') => {
    return findNodeById(arr, nodeId, (params) => {
        const { array, node, index } = params
        if (type === 'copy') array.splice(index, 0, replaceNodeId(node))
        if (type === 'clear') array.splice(index, 1)
        if (type === 'top') {
            if (index <= 0) return false;           // 没找到或已经在 0 位——不动

            // 交换 index 与 index-1 位置的元素
            [array[index - 1], array[index]] = [array[index], array[index - 1]];
        }
    })
}

const copy = (id: string) => {
    if (!editorStore.blockConfig[bType]?.length) return
    const newBlockConfigs = handleNodeById(editorStore.blockConfig[bType], id, 'copy')

    // 稍微移动x、y距离，方便识别
    // const formData = {
    //     x:{
    //         desktop:newBlockConfig.formData.x.desktop
    //     }
    // }

    const newBlockConfig = newBlockConfigs[newBlockConfigs.length - 1]!


    let x = newBlockConfig.formData!.x.desktop
    if (x.includes('%')) {
        x = +(x.replaceAll('%', '')) * (1 + 0.1) + '%'
    } else if (x.includes('px')) {
        x = +(x.replaceAll('px', '')) * 2 + 'px'
    }

    let y = newBlockConfig.formData!.y.desktop
    if (y.includes('%')) {
        y = +(y.replaceAll('%', '')) * (1 + 0.1) + '%'
    } else if (y.includes('px')) {
        y = +(y.replaceAll('px', '')) * 2 + 'px'
    }

    const formData = {
        x: {
            desktop: x
        },
        y: {
            desktop: y
        }
    }

    u.merged(newBlockConfig.formData!, formData)



    editorStore.setCurrentSelect({}, bType)
    editorStore.setBlockConfig(newBlockConfigs, bType)
}

const top = (id: string) => {
    if (!editorStore.blockConfig[bType]?.length) return
    const newBlockConfigs = handleNodeById(editorStore.blockConfig[bType], id, 'top')
    editorStore.setBlockConfig(newBlockConfigs, bType)
}

const clear = (id: string) => {
    if (!editorStore.blockConfig[bType]?.length) return
    const newBlockConfig = handleNodeById(editorStore.blockConfig[bType], id, 'clear')
    editorStore.setCurrentSelect({}, bType)
    editorStore.setBlockConfig(newBlockConfig, bType)
}


const clone = (id: string) => {
    // if (!editorStore.blockConfig[bType]?.length) return
    // const newBlockConfig = handleNodeById(editorStore.blockConfig[bType], id, 'clear')
    // editorStore.setCurrentSelect({}, bType)
    // editorStore.setBlockConfig(newBlockConfig, bType)
    console.log('id: ---> ', id);

}




const handleStart = (e: MouseEvent) => {
};

const handleMove = (e: MouseEvent) => {
    // 获取鼠标位置
    const mouseX = e.clientX;
    const mouseY = e.clientY;
};

const handleEnd = (e: MouseEvent) => {
};


interface DroppedItem {
    id: string
    type: string
    x: number
    y: number
    width: number
    height: number
}
const canvasRef = ref<HTMLElement | null>(null)

const droppedComponents = reactive<DroppedItem[]>([])


const onDrop = (e: DragEvent) => {

    let block: any = e.dataTransfer?.getData('alaChartBlock')!
    block = u.parseJson(block)

    block.id = nanoid(8)



    const type = block.code

    setCurrentSelect(block)


    if (!type) return


    // props.blockList.push(block)

    // droppedComponents.push({
    //     id: Date.now().toString(),
    //     type,
    //     x: e.offsetX,
    //     y: e.offsetY,
    //     width: 200 * (Math.random() + 0.5),
    //     height: 100 * (Math.random() + 0.5),
    // })
}

// 鼠标按下事件
const startDrag = (e: MouseEvent) => {


    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    // 防止事件冒泡
    e.stopPropagation();
}
// 鼠标移动事件
const onDrag = (e: MouseEvent) => {
    // if (!isDragging) return


    const canvasRect = canvasRef.value!.getBoundingClientRect()


    // const targetElement = e.target as HTMLElement;
    // e.currentTarget 是原始触发事件的 div
    const idValue = currentSelectedBlock.value!.id;
    // const item = droppedComponents.find((i) => i.id === idValue)!
    // if (!item) return
    // const snapResult = getSnappedPosition(item.id, item.x, item.y)

    // item.x = snapResult.x
    // item.y = snapResult.y



    // guidelines.value = snapResult.guidelines
    // if (snapResult.guidelines.length > 0) {
    //     debugger
    // }

    if (!idValue) return

    const item = props.blockList.find((i) => i.id === idValue)!
    if (!item) return
    const xy = {
        formData: {
            x: {
                desktop: e.clientX - canvasRect.x - 20
            },
            y: {
                desktop: e.clientY - canvasRect.y - 20
            }
        }
    }

    u.merged(currentSelectedBlock.value!, xy)

    // const dx = e.clientX - startX
    // const dy = e.clientY - startY

    // let newX = initialX + dx
    // let newY = initialY + dy

    // newX = Math.max(newX, 8)
    // newX = Math.min(newX, window.innerWidth - panelWidth - 8)
    // panelPosition.value = {
    //   x: newX,
    //   y: newY
    // }
}
// 鼠标释放事件
const stopDrag = () => {
    // isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}


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

const snapThreshold = 1 // px

function getSnappedPosition(id: string, x: number, y: number) {

    const movingItem = droppedComponents.find((i) => i.id === id)!
    const guidelines: GuideLine[] = []

    let snapX = x
    let snapY = y

    // 拖拽中的边界线（左、中、右 / 上、中、下）
    const movingChartEdges: { [key: string]: number } = {

        // 左、中、右
        left: x,
        centerX: x + movingItem.width / 2,
        right: x + movingItem.width,

        // 上、中、下
        top: y,
        centerY: y + movingItem.height / 2,
        bottom: y + movingItem.height

    }


    const xKeys = ['left', 'centerX', 'right']
    const yKeys = ['top', 'centerY', 'bottom']

    // 遍历其他元素做对比
    for (const other of droppedComponents) {

        if (other.id === id) continue

        const otherChartEdges: { [key: string]: number } = {

            // 左、中、右
            left: other.x,
            centerX: other.x + other.width / 2,
            right: other.x + other.width,

            // 上、中、下
            top: other.y,
            centerY: other.y + other.height / 2,
            bottom: other.y + other.height

        }

        // X 方向对齐：left / centerX / right
        for (const edge of xKeys) {

            const xValue = movingChartEdges[edge]

            for (const otherEdge of xKeys) {

                const otherValue = otherChartEdges[otherEdge]
                const diff = Math.abs(xValue - otherValue)

                if (diff <= snapThreshold) {
                    guidelines.push({
                        id: `v-${nanoid(8)}`,
                        direction: 'vertical',
                        position: otherValue
                    })

                    if (edge === 'left') snapX = otherValue
                    if (edge === 'centerX') snapX = otherValue - movingItem.width / 2
                    if (edge === 'right') snapX = otherValue - movingItem.width

                }
            }
        }

        // Y 方向对齐：top / centerY / bottom
        for (const edge of yKeys) {
            const value = movingChartEdges[edge]
            for (const otherEdge of yKeys) {
                const otherValue = otherChartEdges[otherEdge]
                const diff = Math.abs(value - otherValue)
                if (diff <= snapThreshold) {
                    guidelines.push({
                        id: `h-${nanoid(8)}`,
                        direction: 'horizontal',
                        position: otherValue
                    })

                    if (edge === 'top') snapY = otherValue
                    if (edge === 'centerY') snapY = otherValue - movingItem.height / 2
                    if (edge === 'bottom') snapY = otherValue - movingItem.height
                }
            }
        }

    }

    return { x: snapX, y: snapY, guidelines }
}



const canvasStyles = computed(() => {

    let style: { [key: string]: any } = {}

    const flow = editorStore.pageConfig['screen'].formData?.flow?.desktop
    const columnGap = editorStore.pageConfig['screen'].formData?.columnGap?.desktop
    const rowGap = editorStore.pageConfig['screen'].formData?.rowGap?.desktop
    const paddingTop = editorStore.pageConfig['screen'].formData?.paddingTop?.desktop
    const paddingLeft = editorStore.pageConfig['screen'].formData?.paddingLeft?.desktop


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

    const isFlow = editorStore.pageConfig['screen'].formData?.flow.desktop

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


    // const style = { top: element.formData.y + 'px', left: item.x + 'px', width: item.width + 'px', height: item.height + 'px', }

    return style
}


const canvasBackground = ref()
watch(() => editorStore.pageConfig[bType].formData?.background?.desktop, (v) => {
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
    border: 1px dashed var(--color-edit-render-block-border-hover);

    .dropped-item {
        // position: fixed;
        background: #fff;
        // border: 1px solid #000;
        // padding: 4px 8px;
        user-select: none;
        display: inline-flex;
        // background: red;

        &:hover,
        &.is-active {
            // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
            border: 1px dashed var(--color-edit-render-block-border-hover);
        }
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