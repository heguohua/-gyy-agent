<script setup lang="ts">
const props = defineProps<{
  nodeList: Array<{
    id: string
    type: string
    title: string
    img: string
  }>
}>()

// 发出事件 node-dragstart 和 node-add
const emits = defineEmits<{
  (e: 'node-dragstart', event: DragEvent, item: any): void
  (e: 'node-add', item: any): void
}>()

function handleDragStart(e: DragEvent, item: any) {
  emits('node-dragstart', e, item)
}

function handleAdd(item: any) {
  emits('node-add', item)
}
</script>

<template>
  <div class="node-list">
    <div
      v-for="item in props.nodeList"
      :key="item.id"
      class="node-list-item"
      draggable="true"
      @dragstart="handleDragStart($event, item)"
    >
      <img class="node-img" :src="item.img" :alt="item.title" />
      <span class="node-title">{{ item.title }}</span>
      <button class="node-add-btn" @click="handleAdd(item)">新增</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.node-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.node-list-item {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 8px 10px;
  transition: box-shadow 0.14s;
  cursor: grab;
  gap: 10px;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(77, 117, 255, 0.07);
    border-color: #cce2ff;
  }
}
.node-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 6px;
}
.node-title {
  font-size: 15px;
  color: #35689d;
  flex: 1;
}
.node-add-btn {
  border: none;
  background: #2584ff;
  color: #fff;
  border-radius: 4px;
  padding: 3px 14px;
  margin-left: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.13s;
  &:hover {
    background: #005ecc;
  }
}
</style>
