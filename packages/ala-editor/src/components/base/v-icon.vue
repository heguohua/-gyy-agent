<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 15:00:03
 * @FilePath: /low-coding/packages/ala-editor/src/components/base/v-icon.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <Icon :icon="iconSrc" />
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
})

const iconSrc = computed(() => iconConfig[props.icon as ConfigIcon])
</script>

<style lang="scss" scoped></style>
