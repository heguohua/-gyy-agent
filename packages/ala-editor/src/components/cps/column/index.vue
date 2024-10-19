<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-19 11:26:16
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/column/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div :class="classes" :styles="styles">
    <div class="item" v-for="(item, index) in cols" :key="index" :style="itemStyle(item)">
      <slot :item="itemComputed(index)" :index="index"></slot>
    </div>
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

    const { data, viewport, children } = toRefs(props)
    logger.info('data', data.value);
    logger.info('viewport', viewport.value);
    logger.info('children', children);


    const cols = computed(() => {
      const columns = data.value?.cols?.[viewport.value] || [0.5, 0.5]
      console.log('columns', columns);

      return columns
    });


    const background = computed(() => data.value?.background?.[viewport.value] || '');
    const styles = computed(() => { background: background.value })
    const itemStyle = computed(() => {
      return (item: any) => {
        const styles = { width: item * 100 + '%' }
        logger.error('item', item);
        logger.error('styles', styles);
        return styles
      }
    })

    const itemComputed = computed(() => (index: number) => children.value?.[index] || [])

    return {
      bem,
      classes,
      itemStyle,
      styles,
      cols,
      itemComputed
    }

  }
})

</script>

<style scoped lang="scss">
/**
* bem 示例
*/
@include b("column") {
  display: flex;
  justify-content: center;

  .item {
    min-height: 240px;
  }
}
</style>
