<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-09-01 10:33:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-06 22:35:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/base/v-icon.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

  <Icon v-if="iconSrc" :icon="iconSrc" :height="height" :width="width" @click="handleClick($event)" :style="styles" />
  <div v-if="image" class="icon-image" :style="{ height, width }" @click="handleClick($event)">
    <img :src="image" />
  </div>

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
  image: {
    type: String,
    default: '',
  },
  height: {
    type: [String, Number] as const,
    default: '20',
  },
  width: {
    type: [String, Number] as const,
    default: '20',
  },
  class: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: () => ''
  },
})

const iconSrc = computed(() => iconConfig[props.icon as ConfigIcon])

const emits = defineEmits(["click"])
const handleClick = (event: MouseEvent) => {
  emits('click', event)
}

const styles = computed(() => {
  let st = {} as any
  if (props.color) {
    st.color = props.color

  }
  return st
})
</script>

<style lang="scss" scoped>
.icon-image {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
}
</style>
