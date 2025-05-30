<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-30 21:51:44
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-30 22:20:58
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/drag/DropCanvas.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="drop-canvas" @dragover.prevent @drop="onDrop">
        <div v-for="(item, index) in droppedComponents" :key="item.id" class="dropped-item"
            :style="{ top: item.y + 'px', left: item.x + 'px' }" @mousedown="startDrag">
            {{ item.type }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

interface DroppedItem {
    id: string
    type: string
    x: number
    y: number
}

const droppedComponents = reactive<DroppedItem[]>([])

const onDrop = (e: DragEvent) => {

    const data = e.dataTransfer?.getData('component-type')


    console.log('data:', data);


    if (!data) return
    const { type } = JSON.parse(data)
    droppedComponents.push({
        id: Date.now().toString(),
        type,
        x: e.offsetX,
        y: e.offsetY
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

    droppedComponents[0].x = e.clientX
    
    droppedComponents[0].y = e.clientY

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
</script>

<style scoped lang="scss">
.drop-canvas {
    position: relative;
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 2px dashed #ccc;
}

.dropped-item {
    position: absolute;
    background: #fff;
    border: 1px solid #000;
    padding: 4px 8px;
    user-select: none;
}
</style>