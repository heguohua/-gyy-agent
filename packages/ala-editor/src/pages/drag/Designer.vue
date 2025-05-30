<template>
    <div class="designer">
      <div class="sidebar">
        <DraggableComponent type="text" label="文本组件" />
        <DraggableComponent type="chart" label="图表组件" />
      </div>
      <div class="canvas-area">
        <DropCanvas />
      </div>
    </div>
  </template>
  
  
  <script lang="ts" setup>
  import DraggableComponent from './DraggableComponent.vue'
  import DropCanvas from './DropCanvas.vue'
  </script>
  
  <style scoped lang="scss">
  .designer {
    display: flex;
    height: 100%;
  }
  .sidebar {
    width: 200px;
    padding: 10px;
    background-color: #fafafa;
    border-right: 1px solid #ddd;
  }
  .canvas-area {
    flex: 1;
    padding: 10px;
  }
  </style>
  