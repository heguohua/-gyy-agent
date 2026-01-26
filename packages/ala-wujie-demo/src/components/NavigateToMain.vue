<script setup lang="ts">
import LogicFlow from '@logicflow/core';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import NodeDrawer from './NodeDrawer.vue';
import NodeListView from './NodeList.vue';


// 侧边栏节点列表
const nodeList = ref([
  {
    id: '21',
    type: 'rect',
    title: '大模型节点',
    img: 'https://img.icons8.com/color/48/rectangle.png'
  },
  {
    id: '50',
    type: 'circle',
    title: '圆形节点',
    img: 'https://img.icons8.com/color/48/circle.png'
  },
  {
    id: '99',
    type: 'diamond',
    title: '菱形节点',
    img: 'https://img.icons8.com/color/48/diamond.png'
  }
]);

const container = ref<HTMLDivElement | null>(null);
let lf: LogicFlow | null = null;
let nextNodeId = 1000;

// 新增：弹框右侧的可见性及内容
const drawerVisible = ref(false);
const currentNodeData = ref<any>(null);

function showDrawerForNode(node: any) {
  currentNodeData.value = node;
  drawerVisible.value = true;
}


// 动态高度
let dynamicHeight = ref(0);

// 初始数据
const data = {
  nodes: [
    {
      id: '21',
      type: 'rect',
      x: 200,
      y: 200,
      text: 'Origin Usage-rect',
      properties: {
        width: 160,
        height: 80,
      }
    },
    {
      id: '50',
      type: 'circle',
      x: 200,
      y: 300,
      text: 'Origin Usage-circle',
      properties: {
        r: 60,
      }
    },
  ],
  edges: [
    {
      id: 'rect-2-circle',
      type: 'polyline',
      sourceNodeId: '21',
      targetNodeId: '50',
    },
  ],
}

// 高度处理，动态获取并固定
function updateCanvasHeight() {
  if (container.value) {
    container.value.style.height =  800 + 'px';
  }
  dynamicHeight.value = 800;
  return 800;
}

function renderFlow() {
  if (container.value) {
    const height = updateCanvasHeight();
    lf = new LogicFlow({
      container: container.value,
      grid: true,
      width: container.value.clientWidth,
      height: height,
    });
    lf.render(data);

    setUpCanvasDrop();

    // 新增：监听节点的点击
    lf.on('element:click', (ev: any) => {
      // 只对新拖入的节点触发弹框（演示：对类型为rect弹框，可根据自身业务要求调整判断条件）
      if (ev.data && ev.data.type === 'rect') {
        showDrawerForNode(ev.data);
      }
    });
  }
}

// 记录最近新建节点id
let lastAddedNodeId: string | null = null;

// 修改：让 addNodeToCanvas 返回新建的 node id
function addNodeToCanvas(type: string, title: string, opts?: {x?: number, y?: number}) {
  if (!lf) return;

  let point: { x: number, y: number };

  if (opts && opts.x !== undefined && opts.y !== undefined) {
    point = { x: opts.x, y: opts.y };
  } else {
    const result = lf.getPointByClient(300, 150);
    point = result.canvasOverlayPosition
      ? { x: result.canvasOverlayPosition.x, y: result.canvasOverlayPosition.y }
      : { x: 300, y: 150 };
  }

  const newId = (nextNodeId++).toString();
  lastAddedNodeId = newId;

  let properties: any = {};
  if (type === 'rect') {
    properties = { width: 160, height: 80 };
  } else if (type === 'circle') {
    properties = { r: 60 };
  } else if (type === 'diamond') {
    properties = { width: 100, height: 80 };
  }

  lf.addNode({
    id: newId,
    type,
    x: point.x,
    y: point.y,
    text: title || type,
    properties,
  });

  // 新增：添加后自动弹出右侧弹框
  // 获取刚刚添加的节点进行弹框，只对rect类型
  if (type === 'rect') {
    const node = lf.getNodeModelById(newId);
    if (node) {
      // node.getData() 不是所有LogicFlow版本都支持，保险写法如下
      showDrawerForNode({
        id: newId,
        type,
        x: point.x,
        y: point.y,
        text: title || type,
        properties,
      });
    }
  }
}

function handleAdd(item: any) {
  if (!lf) return;
  const flowRect = container.value?.getBoundingClientRect();
  let canvasCenter = { x: 300, y: 200 };
  if (flowRect && lf) {
    const centerClientX = flowRect.left + flowRect.width / 2;
    const centerClientY = flowRect.top + flowRect.height / 2;
    const result = lf.getPointByClient(centerClientX, centerClientY);
    if (result.canvasOverlayPosition) {
      canvasCenter = {
        x: result.canvasOverlayPosition.x,
        y: result.canvasOverlayPosition.y,
      };
    }
  }
  addNodeToCanvas(item.type, item.title, canvasCenter);
}

function handleDragStart(e: DragEvent, item: any) {
  e.dataTransfer?.setData('application/x-node-type', JSON.stringify(item));
}

function handleDragOverOnCanvas(e: DragEvent) {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'copy';

  const target = e.currentTarget as HTMLElement;
  target && target.classList.add('drag-hover');
}

function handleDropOnCanvas(e: DragEvent) {
  e.preventDefault();

  const target = e.currentTarget as HTMLElement;
  target && target.classList.remove('drag-hover');

  const itemRaw = e.dataTransfer?.getData('application/x-node-type');
  if (!itemRaw || !lf) return;
  const item = JSON.parse(itemRaw);
  if (!item.type) return;
  const flowRect = container.value?.getBoundingClientRect();
  if (flowRect && lf) {
    const result = lf.getPointByClient(e.clientX, e.clientY);
    const graphPoint = result.canvasOverlayPosition
      ? { x: result.canvasOverlayPosition.x, y: result.canvasOverlayPosition.y }
      : { x: e.clientX, y: e.clientY };
    addNodeToCanvas(item.type, item.title, { x: graphPoint.x, y: graphPoint.y });
  }
}

function setUpCanvasDrop() {
  if (!container.value) return;
  container.value.ondragover = handleDragOverOnCanvas;
  container.value.ondragleave = function (e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    target && target.classList.remove('drag-hover');
  };
  container.value.ondrop = handleDropOnCanvas;
}

// resizeHandler 只动态宽高
function resizeHandler() {
  if (container.value && lf) {
    const h = updateCanvasHeight();
    lf.resize(container.value.clientWidth, h);
  }
}

onMounted(async () => {
  await nextTick();
  renderFlow();
  updateCanvasHeight();
  window.addEventListener('resize', resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  if (container.value) {
    container.value.ondragover = null;
    container.value.ondragleave = null;
    container.value.ondrop = null;
  }
});
</script>

<template>
  <div
    class="main-container"
    :style="{height: dynamicHeight + 'px'}"
  >
    <div class="side-list">
      <div class="side-title">节点类型</div>
      <NodeListView
        :nodeList="nodeList"
        @node-dragstart="handleDragStart"
        @node-add="handleAdd"
      />
    </div>
    <div
      ref="container"
      class="flow-canvas"
      @dragover.prevent="handleDragOverOnCanvas"
      @dragleave="event => {
        const t = event.currentTarget as HTMLElement;
        t && t.classList.remove('drag-hover')
      }"
      @drop.prevent="handleDropOnCanvas"
    ></div>

   
    <NodeDrawer :visible="drawerVisible" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  min-height: 360px;
  height: 100%;
  max-height: 900px;
  padding-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  display: flex !important;
  flex-direction: row;
  box-shadow: 0 2px 16px 0 rgba(34, 85, 180, 0.06);
  background: #f7fafd;
  overflow: hidden;
  transition: height 0.23s cubic-bezier(0.59,0.15,0.54,1.2);
  position: relative;
}

.side-list {
  width: 240px;
  min-width: 200px;
  max-width: 320px;
  background: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  padding: 28px 10px 18px 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  z-index: 2;
}
.side-title {
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 18px;
  letter-spacing: 1px;
  color: #28406b;
  padding-left: 2px;
}

.flow-canvas {
  flex: 1 1 0;
  min-width: 0;
  min-height: 360px;
  height: 100%;
  background: #fff;
  padding: 0;
  border: 1px solid #f00;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: border-color 0.18s, background 0.18s;

  &.drag-hover {
    border: 2px dashed #2584ff;
    background: #f0f6ff;
  }
}


</style>
