<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-24 14:42:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form-label/ala-form-label.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-form-label">
    {{ label }}
    <el-tooltip v-if="help" class="tip ala-help-icon" :effect="effect" :content="u.parseI18n(help, t)"
      :placement="placement" :hide-after="0">
      <v-icon class="image" icon="help" :width="width" :height="height" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>

import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


defineProps({
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
.ala-form-label {

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

}
</style>
<style>
.ala-form-label svg {
  position: absolute;
  right: -11px;
  opacity: 0.7;
}
</style>
