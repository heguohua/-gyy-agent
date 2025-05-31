<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-30 21:51:44
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-31 15:52:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/drag/DropCanvas.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="drop-canvas" @dragover.prevent @drop="onDrop" ref="canvasRef">
        <div v-for="(item, index) in droppedComponents" :key="item.id" :id="item.id" class="dropped-item"
            :style="{ top: item.y + 'px', left: item.x + 'px', width: item.width + 'px', height: item.height + 'px', }"
            @mousedown="startDrag" @click="onClick">
            {{ item.type }}
        </div>

        <!-- 对齐参考线 -->
        <div v-for="line in guidelines" :key="line.id" :class="['guide-line', line.direction]" :style="lineStyle(line)">
        </div>
    </div>
</template>

<script lang="ts" setup>
import u from '@/utils/u'
import { reactive } from 'vue'

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

const onClick = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const idValue = targetElement.id;
    const item = droppedComponents.find((i) => i.id === idValue)!
    console.log('当前图形 x :', item.x);
    console.log('当前图形 y :', item.y);
    console.log('当前图形 宽度 :', item.width);
    console.log('当前图形 高度 :', item.height);


}


const onDrop = (e: DragEvent) => {

    const type = e.dataTransfer?.getData('component-type')

    console.log('type:', type);

    if (!type) return

    droppedComponents.push({
        id: Date.now().toString(),
        type,
        x: e.offsetX,
        y: e.offsetY,
        width: 200 * (Math.random() + 0.5),
        height: 100 * (Math.random() + 0.5),
    })
}

// 鼠标按下事件
const startDrag = (e: MouseEvent) => {

    console.log('e.clientX:', e.clientX);
    console.log('e.clientY:', e.clientY);

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)

}
// 鼠标移动事件
const onDrag = (e: MouseEvent) => {
    // if (!isDragging) return
    console.log('e.clientX -- onDrag -->:', e.clientX);
    console.log('e.clientY -- onDrag -->:', e.clientY);


    const canvasRect = canvasRef.value!.getBoundingClientRect()

    console.log('canvasRect.x: ', canvasRect.x);
    console.log('canvasRect.y: ', canvasRect.y);

    const targetElement = e.target as HTMLElement;
    const idValue = targetElement.id;
    const item = droppedComponents.find((i) => i.id === idValue)!
    if (!item) return
    const snapResult = getSnappedPosition(item.id, item.x, item.y)

    item.x = snapResult.x
    item.y = snapResult.y

    console.log('snapResult:',snapResult);
    

    guidelines.value = snapResult.guidelines
    if (snapResult.guidelines.length > 0) {
        debugger
    }

    droppedComponents[0].x = e.clientX - canvasRect.x - 20

    droppedComponents[0].y = e.clientY - canvasRect.y - 20

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
                        id: `v-${u.uuid()}`,
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
                        id: `h-${u.uuid()}`,
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

</script>

<style scoped lang="scss">
.drop-canvas {
    position: relative;
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 2px dashed #ccc;

    .dropped-item {
        // position: fixed;
        position: absolute;
        background: #fff;
        border: 1px solid #000;
        // padding: 4px 8px;
        user-select: none;
        display: inline-flex;
        background: red;
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