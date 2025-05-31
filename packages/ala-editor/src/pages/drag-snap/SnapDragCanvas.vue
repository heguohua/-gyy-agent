<template>
    <div class="canvas" ref="canvasRef">
      <div
        v-for="item in items"
        :key="item.id"
        class="drag-item"
        :style="getItemStyle(item)"
        @mousedown="onDragStart($event, item)"
      ></div>
  
      <!-- 对齐参考线 -->
      <div
        v-for="line in guidelines"
        :key="line.id"
        :class="['guide-line', line.direction]"
        :style="lineStyle(line)"
      ></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  
  interface Item {
    id: string
    x: number
    y: number
    width: number
    height: number
  }
  
  interface GuideLine {
    id: string
    direction: 'vertical' | 'horizontal'
    position: number
  }
  
  const snapThreshold = 5 // px
  const canvasRef = ref<HTMLElement | null>(null)
  
  const items = reactive<Item[]>([
    { id: '1', x: 50, y: 50, width: 100, height: 100 },
    { id: '2', x: 300, y: 200, width: 100, height: 100 }
  ])
  
  const guidelines = ref<GuideLine[]>([])
  
  const getItemStyle = (item: Item) => ({
    left: item.x + 'px',
    top: item.y + 'px',
    width: item.width + 'px',
    height: item.height + 'px'
  })
  
  const onDragStart = (e: MouseEvent, item: Item) => {
    e.preventDefault()
  
    const startX = e.clientX
    const startY = e.clientY
    const initialX = item.x
    const initialY = item.y
  
    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY
  
      const targetX = initialX + dx
      const targetY = initialY + dy
  
      const snapResult = getSnappedPosition(item.id, targetX, targetY)
  
      item.x = snapResult.x
      item.y = snapResult.y
  
      guidelines.value = snapResult.guidelines
    }
  
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      guidelines.value = []
    }
  
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  
  function getSnappedPosition(id: string, x: number, y: number) {
    const movingItem = items.find((i) => i.id === id)!
    const guidelines: GuideLine[] = []
    let snapX = x
    let snapY = y
  
    // 拖拽中的边界线（左、中、右 / 上、中、下）
    const movingEdges = {
      left: x,
      right: x + movingItem.width,
      centerX: x + movingItem.width / 2,
      top: y,
      bottom: y + movingItem.height,
      centerY: y + movingItem.height / 2
    }
  
    // 遍历其他元素做对比
    for (const other of items) {
      if (other.id === id) continue
  
      const otherEdges = {
        left: other.x,
        right: other.x + other.width,
        centerX: other.x + other.width / 2,
        top: other.y,
        bottom: other.y + other.height,
        centerY: other.y + other.height / 2
      }
  
      for (const [edge, value] of Object.entries(movingEdges)) {
        for (const [otherEdge, otherValue] of Object.entries(otherEdges)) {
          const diff = Math.abs(value - otherValue)
          if (diff <= snapThreshold) {
            if (edge.includes('X')) {
              // 吸附水平线
              guidelines.push({ id: `v-${otherValue}`, direction: 'vertical', position: otherValue })
              if (edge === 'left') snapX = otherValue
              if (edge === 'centerX') snapX = otherValue - movingItem.width / 2
              if (edge === 'right') snapX = otherValue - movingItem.width
            } else {
              // 吸附垂直线
              guidelines.push({ id: `h-${otherValue}`, direction: 'horizontal', position: otherValue })
              if (edge === 'top') snapY = otherValue
              if (edge === 'centerY') snapY = otherValue - movingItem.height / 2
              if (edge === 'bottom') snapY = otherValue - movingItem.height
            }
          }
        }
      }
    }
  
    return { x: snapX, y: snapY, guidelines }
  }
  
  const lineStyle = (line: GuideLine) => {
    if (line.direction === 'vertical') {
      return { left: line.position + 'px', top: 0, bottom: 0 }
    } else {
      return { top: line.position + 'px', left: 0, right: 0 }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .canvas {
    position: relative;
    width: 800px;
    height: 600px;
    background: #f8f8f8;
    border: 1px solid #ccc;
  }
  
  .drag-item {
    position: absolute;
    background: #fff;
    border: 1px solid #000;
    cursor: move;
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
  </style>
  