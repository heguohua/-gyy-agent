<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 22:27:19
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/image/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes">
    <ala-link v-if="src" :to="link" target="_blank">
      <img :src="src" v-bind="$attrs" :class="[bem('--img'), bem('inactive')]" :style="styles" />
    </ala-link>
    <div v-else class="no-image">
      <ala-empty description="暂无图片，请上传"></ala-empty>
    </div>
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

  width: 100%;
  display: block;
  object-fit: cover;
  margin: 0 auto;
  @include res(height, 295, 295);

  .no-image {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    @include res(height, 295, 295);
  }
}
</style>
