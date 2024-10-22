<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-22 08:54:03
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/link/ala-link.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes">
    <component :is="tag" v-bind="$attrs" :class="[bem('--link'), bem('inactive')]" :href="to" :to="to" :target="target">
      <slot />
    </component>

  </div>
</template>
<script setup lang="ts">

import { logger } from '@/utils/logger';
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { blockProps } from './props';

const { name, bem } = createNamespace("link")

defineOptions({
  name: "ala-link"
})

const props = defineProps(blockProps)


logger.info("AlaLink组件被渲染");

const classes = computed(() => [bem()])

// const { to, target } = toRefs(props)
const { to, target } = toRefs(props)

const isExternalLink = computed(() => {
  return to.value.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/)
})

const tag = computed(() => {
  if (!to.value) return 'span'
  return isExternalLink.value ? 'a' : 'router-link'
})

</script>

<style scoped lang="scss">
@include b("link") {
  @include e("link") {
    display: inline-block;
  }
}
</style>
