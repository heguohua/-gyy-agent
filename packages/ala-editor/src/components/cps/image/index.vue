<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 19:07:11
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/image/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes">
    <div>
      <h2>这是一幅图片，标题颜色是红色</h2>
    </div>
    <img :src="src" v-bind="$attrs" :class="[bem('--img'), bem('inactive')]" :style="styles" />
  </div>
</template>
<script lang="ts">

import { logger } from '@/utils/logger';
import { defineComponent, ref } from 'vue'
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { blockProps } from './props';

const { name, bem } = createNamespace("image")


export default defineComponent({
  name,
  props: blockProps,
  setup(props) {
    logger.warn("AlaImage组件被渲染");

    const classes = computed(() => [bem()])

    const { data, viewport } = toRefs(props)
    const display = computed(() => data.value?.display?.[viewport.value] || '');
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')

    const styles = computed(() => {
      return { width: width.value, height: height.value }
    })


    return {
      classes,
      bem,
      styles,
      display,
      src,
      link,
      width,
      height
    }

  }
})

</script>

<style scoped lang="scss">

/**
* bem 示例
*/
@include b("image") {
  @include e("img") {
    background: red;
  }

  @include m("inactive") {
    background: green;
    cursor: pointer;
  }
}


</style>
