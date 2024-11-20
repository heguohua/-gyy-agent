<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-20 18:50:27
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/image/ala-image.vue
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
<script setup lang="ts">

import { logger } from '@/utils/logger';
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { AlaImageProps } from './props';
import { Viewport } from '@/types/editorType';

const { bem } = createNamespace("image")
defineOptions({
  name: "ala-image"
})

const props = defineProps({
  formData: {
    type: Object as PropType<AlaImageProps>,
    default: () => ({
      display: {
        desktop: '',
        mobile: '',
      },
      src: {
        desktop: '',
        mobile: '',
      },
      link: {
        desktop: '',
        mobile: '',
      },
      width: {
        desktop: '',
        mobile: '',
      },
      height: {
        desktop: '',
        mobile: '',
      },
    })
  },
  viewport: {
    type: String as PropType<Viewport>,
    default: "desktop"
  }
}
)


logger.info("AlaImage组件被渲染");

const classes = computed(() => [bem()])

const { formData, viewport } = toRefs(props)
const display = computed(() => formData.value?.display?.[viewport.value] || '');
const src = computed(() => formData.value?.src?.[viewport.value] || '')
const link = computed(() => formData.value?.link?.[viewport.value] || '')
const width = computed(() => formData.value?.width?.[viewport.value] || '')
const height = computed(() => formData.value?.height?.[viewport.value] || '')

const styles = computed(() => {
  return { width: width.value, height: height.value }
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
