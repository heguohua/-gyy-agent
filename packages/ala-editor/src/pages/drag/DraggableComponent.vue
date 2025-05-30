<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-30 21:51:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-30 21:55:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/drag/DraggableComponent.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div
      class="draggable-component"
      draggable="true"
      @dragstart="onDragStart"
    >
      {{ label }}
    </div>
  </template>
  
  <script lang="ts" setup>
  const props= defineProps<{
    type: string
    label: string
  }>()
  
  const onDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData('component-type', JSON.stringify(props.type))
  }
  </script>
  
  <style scoped lang="scss">
  .draggable-component {
    padding: 8px;
    margin: 8px 0;
    background-color: #eee;
    border: 1px dashed #aaa;
    cursor: grab;
  }
  </style>
  