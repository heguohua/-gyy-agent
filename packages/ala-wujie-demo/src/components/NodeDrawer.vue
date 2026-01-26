
<script setup lang="ts">
// 组件 props，可按需扩展
const props = defineProps<{
  visible: boolean
  nodeData?: any
}>();

// 组件事件
const emit = defineEmits(['close']);

// 控制抽屉显隐
const drawerVisible = ref(props.visible);

// 监听props变化同步显隐
import { ref, watch } from 'vue';
watch(() => props.visible, (val) => {
  drawerVisible.value = val;
});

// 关闭抽屉
function closeDrawer() {
  emit('close');
}

</script>

<template>
  <transition name="slide-fade">
    <div v-if="drawerVisible" class="node-drawer">
      <div class="drawer-header">
        <span>节点属性</span>
        <button class="drawer-close" @click="closeDrawer">×</button>
      </div>
      <div class="drawer-body">
        <div v-if="props.nodeData">
          <div><b>ID</b>: {{ props.nodeData.id }}</div>
          <div><b>类型</b>: {{ props.nodeData.type }}</div>
          <div><b>标题</b>: {{ props.nodeData.text }}</div>
          <div v-if="props.nodeData.properties">
            <b>属性</b>: <pre style="margin:0">{{ props.nodeData.properties }}</pre>
          </div>
        </div>
        <div v-else>
          暂无节点数据
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
/* 右侧抽屉样式 */
.node-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 340px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #d5e0f0;
  box-shadow: -4px 0 14px 1px rgba(34, 85, 180, 0.10);
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 17px;
  padding: 19px 21px 13px 21px;
  border-bottom: 1px solid #e5e7eb;
}
.drawer-close {
  background: none; border: none; font-size: 21px; line-height: 1; cursor: pointer;
}
.drawer-body {
  flex: 1;
  padding: 24px 22px;
  overflow-y: auto;
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .21s cubic-bezier(.52,0,.37,1.41);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
