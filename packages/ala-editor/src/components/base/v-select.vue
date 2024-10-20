<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-20 14:28:08
 * @FilePath: /low-coding/packages/ala-editor/src/components/base/v-select.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

  <el-select :model-value="model" :style="styles" :teleported="false" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>

</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '@/utils/i18n/i18n';
import { useEditorStore } from '@/store/useEditorStore';
import { Viewport } from '@/types/editorType';


const editorStore = useEditorStore()
/**
 * TODO: 用于待办事项
 * ! 用于重要或警告信息
 * ? 用于疑问或需要确认的内容
 * * 用于强调或重要说明
 * 其他普通注释
 */

const props = defineProps({
  options: {
    type: Array<{ value: string, label: string }>,
  },
  width: {
    type: Number,
    default: 100,
  },
})


const styles = computed(() => ({ width: props.width + 'px' }))

const model = defineModel({ default: 'desktop' })

const change = (value: Viewport) => {
  model.value = value
  editorStore.setViewport(value)
}
</script>

<style lang="scss" scoped>
:deep(.el-select__popper) {
  border-radius: var(--border-radius);
  top: 34px !important;
  left: 0 !important;
}

:deep(.el-popper__arrow) {
  display: none;
}

:deep(.el-select-dropdown__list) {
  padding: 3px 0;
}

:deep(.el-select-dropdown__item) {
  border-radius: var(--border-radius);
  margin: 0 3px;
  padding: 0 44px 0 8px;
}

:deep(&.is-hovering) {
  background-color: var(--color-block-hover);
}

:deep(.el-select__wrapper) {
  box-shadow: none !important;
}

:deep(.el-select__wrapper:hover) {
  box-shadow: none !important;
}

:deep(.el-select__wrapper.is-hovering) {
  background-color: var(--color-block-hover);
}

:deep(.el-select__wrapper.is-focused) {
  background-color: var(--color-block-hover);
}
</style>
