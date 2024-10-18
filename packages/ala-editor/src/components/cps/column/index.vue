<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 22:34:50
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/column/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes">
   
  </div>
</template>
<script lang="ts">

import { logger } from '@/utils/logger';
import { defineComponent } from 'vue'
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { blockProps } from './props';

const { name, bem } = createNamespace("column")


export default defineComponent({
  name,
  props: blockProps,
  setup(props) {
    logger.warn("AlaColumn组件被渲染");

    const classes = computed(() => [bem()])

    const { data, viewport } = toRefs(props)
    const display = computed(() => data.value?.display?.[viewport.value] || '');


    return {
      bem,
      classes,

    }

  }
})

</script>

<style scoped lang="scss">
/**
* bem 示例
*/
@include b("column") {

}
</style>
