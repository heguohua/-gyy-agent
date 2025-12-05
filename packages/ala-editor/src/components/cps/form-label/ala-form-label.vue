<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-04 10:31:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form-label/ala-form-label.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-form-label-wrapper">
    {{ label }}
    <!-- <el-tooltip v-if="help" class="tip ala-help-icon" :effect="effect" :content="u.parseI18n(help, t)" -->
    <el-tooltip v-if="help" class="tip ala-help-icon" :effect="effect" :content="help" :placement="placement"
      :hide-after="0">
      <div class="ala-tooltip-wrapper">
        <v-icon class="image" icon="help" :width="width" :height="height" />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>

import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  help: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'right',
  },
  height: {
    type: String,
    default: '0.9rem',
  },
  width: {
    type: String,
    default: '0.9rem',
  },
  label: {
    type: String,
    default: ''
  },
  effect: {
    type: String,
    default: 'light'
  },
})




</script>

<style lang="scss" scoped>
.ala-form-label-wrapper {

  user-select: none;
  // display: flex;
  // align-items: center;
  display: inline-flex;
  align-items: center;
  position: relative;
  padding-right: 4px;

  .ala-help-icon {
    color: var(--el-input-hover-border-color);
  }

  // 2025-11-25 修复 tooltip 不显示的bug
  .ala-tooltip-wrapper {
    display: flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    width: 8px;
  }

}
</style>
<style>
.ala-form-label-wrapper svg {
  position: absolute;
  right: -3px;
  opacity: 0.7;
}
</style>
