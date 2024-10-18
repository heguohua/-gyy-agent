<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 22:16:42
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/empty/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes">
    <img :src="src" v-bind="$attrs" :class="[bem('--img')]" />
    <div :class="[bem('--description')]" v-html="description">

    </div>
  </div>
</template>
<script lang="ts">

import { logger } from '@/utils/logger';
import { defineComponent } from 'vue'
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { blockProps } from './props';
import noDataImage from '@/assets/images/no-data.png';

const { name, bem } = createNamespace("empty")


export default defineComponent({
  name,
  props: blockProps,
  setup(props) {
    logger.warn("Empty组件被渲染");

    const classes = computed(() => [bem()])

    const { image, description } = props

    const src = computed(() => {
      const data = image ? image : noDataImage
      return data
    })
    console.log(src);


    return {
      bem,
      classes,
      src,
      description
    }

  }
})

</script>

<style scoped lang="scss">
@include b("empty") {
  width: 100%;
  text-align: center;
  margin: 0 auto;

  @include e("img") {
    object-fit: cover;
    display: block;
    margin: 0 auto;
    @include res(width, 120, 80);
  }

  @include e('description') {
    color: #909399;
    @include res(font-size, 16, 16);
    @include res(margin-top, 16, 16);
  }

}
</style>
