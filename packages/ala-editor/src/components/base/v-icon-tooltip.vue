<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-24 15:23:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/base/v-icon-tooltip.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="icon">
    <el-tooltip class="tip" effect="dark" :content="content" :placement="placement" :hide-after="0">
      <div class="image-box">
        <v-icon v-if="icon" class="image" :icon="icon" :width="width" :height="height" />
        <slot v-else class="image" />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    require: true,
    default: '',
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  height: {
    type: String,
    default: '20',
  },
  width: {
    type: String,
    default: '20',
  },
})
</script>

<style lang="scss" scoped>
.icon {
  user-select: none;
}

.image-box {
  cursor: pointer;
  width: 26px;
  height: 26px;
  padding: 3px;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.2s linear;

  &:hover {
    background: var(--color-icon-hover);
    transition: all 0.2s linear;
  }

  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
