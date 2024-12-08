<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-08 18:20:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/divider/ala-divider.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-divider-wrapper">
    <el-divider :content-position="position">{{ label }}</el-divider>
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <!-- <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <el-select @change="handleChange" :model-value="model" class="ala-divider-group" :style="styles" :id="fieldName">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select>
    </el-form-item> -->
  </div>
</template>

<script setup lang="ts">

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
  }
})

const model = defineModel({
  type: String || Number || Boolean || undefined
})
const styles = computed(() => ({ minWidth: props.width + 'px' }))
// const styles = computed(() => ({}))



// Methods

</script>

<style scoped lang="scss">
.ala-divider-wrapper {
  min-width: 100%;

  :deep(.el-divider__text) {
    background-color: var(--el-bg-color);
    color: var(--el-color-primary);
    padding: 0 4px;
    top: -1px;
  }

  :deep(.is-left) {
    left: 10px;
  }

  :deep(.is-right) {
    right: 10px;
  }

}
</style>