<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 22:18:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/chapter/ala-chapter.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-chapter-wrapper">
    <!-- <el-divider :content-position="position" :style="styles">{{ label }}</el-divider> -->
    <div class="ala-chapter" :style="styles">
      <p class="ala-chapter-icon" />
      <AlaFormLabel :label="label" :help="help" />
    </div>
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
  },
  help: {
    type: String,
  }
})

const model = defineModel({
  type: String || Number || Boolean || undefined
})
// borderWidth: props.height + 'px', borderStyle: props.lineStyle
const styles = computed(() => {
  const style = { minWidth: props.width + 'px', }
  logger.info(`分隔线样式，styles：`, style);
  return style
})

// const styles = computed(() => ({}))



// Methods

</script>

<style scoped lang="scss">
.ala-chapter-wrapper {
  .ala-chapter {
    min-width: 100px;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    justify-content: left;
    align-items: center;
    background: var(--al-title-color);
    padding: 0px 8px;
    border-radius: 4px;
    margin-bottom: 12px;
    box-shadow: 8px 0 0 0 var(--al-title-color), -8px 0 0 0 var(--al-title-color);
    height: 34px;
    .ala-chapter-icon {
      display: inline-block;
      width: 6px;
      border-radius: 1px;
      background: var(--el-color-primary);
      height: 20px;
      margin-right: 8px;
    }

  }

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