<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-10 12:49:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/base/v-icon.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <Icon :icon="iconSrc" :height="height" :width="width" />
</template>

<script lang="ts" setup>
import iconConfig, { type ConfigIcon } from '@/config/icons'
import { computed } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps({
  icon: {
    type: String,
    default: '',
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

const iconSrc = computed(() => iconConfig[props.icon as ConfigIcon])
</script>

<style lang="scss" scoped></style>
