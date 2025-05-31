<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-31 09:16:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/index.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="left-admin" >
      <div class="chart">
        <d_229_使用path绘制条形图  @mousedown="startDrag" :style="{ left: panelPosition.x + 'px', top: panelPosition.y + 'px' }"/>
        <!-- <d_229_使用path绘制条形图  @mousedown="startDrag" :style="{ left: panelPosition.x + 'px', top: panelPosition.y + 'px' }"/>
        <d_229_使用path绘制条形图  @mousedown="startDrag" :style="{ left: panelPosition.x + 'px', top: panelPosition.y + 'px' }"/> -->
      </div>

    </div>
  </template>
   
  <script setup>
  import { ref, onBeforeUnmount } from 'vue'
  import d_229_使用path绘制条形图 from './d_229_使用path绘制条形图.vue'  
   
  // 新增状态
  // const panelPosition = ref({ x: 8, y: 80 })
  const panelWidth = 443
  const panelPosition = ref({
    x: 0,
    y: 0
    // x: 0.5,
    // y: 0.5
  })
  let isDragging = false
  let startX = 0
  let startY = 0
  let initialX = 0
  let initialY = 0
  // 鼠标按下事件
  const startDrag = e => {
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    initialX = panelPosition.value.x
    initialY = panelPosition.value.y
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
   
  // 鼠标移动事件
  const onDrag = e => {
    if (!isDragging) return
   
    const dx = e.clientX - startX
    const dy = e.clientY - startY
   
    let newX = initialX + dx
    let newY = initialY + dy
   
    newX = Math.max(newX, 8)
    newX = Math.min(newX, window.innerWidth - panelWidth - 8)
    panelPosition.value = {
      x: newX,
      y: newY
    }
  }
  // 鼠标释放事件
  const stopDrag = () => {
    isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
  // 组件卸载时清理事件
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  })
  </script>
   
  <style lang="scss" scoped>
  .left-admin {
    
    position: fixed;
    cursor: move;
  }
  </style>