<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-09 13:12:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/divider/ala-divider.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-divider-wrapper">
    <el-divider :content-position="position" :style="styles">{{ label }}</el-divider>
  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';


// State
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  position: {
    type: String as () => '' | 'left' | 'right' | 'center',
    default: 'left'
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: String,
    default: "2",
  },
  lineStyle: {
    type: String,
    default: 'solid',
  }
})

const model = defineModel({
  type: String || Number || Boolean || undefined
})

const styles = computed(() => {
  const style = { minWidth: props.width + 'px', borderWidth: props.height + 'px', borderStyle: props.lineStyle }
  logger.info(`分隔线样式，styles：`, style);
  return style
})

// const styles = computed(() => ({}))



// Methods

</script>

<style scoped lang="scss">
.ala-divider-wrapper {
  min-width: 100%;

  :deep(.el-divider__text) {
    background-color: var(--el-bg-color);
    color: var(--el-table-header-text-color);
    padding: 0 4px;
    top: -1px;
  }

  :deep(.is-left) {
    left: 10px;
  }

  :deep(.is-right) {
    right: 10px;
  }

  :deep(.el-divider--horizontal) {
    border-top: none;
    border-color: var(--el-border-color);
  }

}
</style>