<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 14:07:05
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/column/ala-column.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

  <div :class="classes" :styles="background_styles">
    <div class="item" v-for="(columnWidth, index) in columnWidths" :key="index" :style="itemStyle(columnWidth)">
      <slot :columnBlocks="columnBlocksComputed(index)" :index="index"></slot>
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

    const columnWidths = computed(() => {
      const columns = data.value?.cols?.[viewport.value] || [0.5, 0.5]
      return columns
    });

    const background = computed(() => data.value?.background?.[viewport.value] || '');
    const background_styles = () => { background: background.value }

    const itemStyle = computed(() => {
      return (columnWidth: any) => {
        const styles = { width: Number(columnWidth) * 100 + '%' }
        return styles
      }
    })

    const columnBlocksComputed = computed(() => {
      return (index: number) => {
        const childrens = children.value?.[index]
        logger.info(`多列组件渲染 第[ ${index} ]列`);
        logger.info(`多列组件 childrens: `, childrens);
        return reactive(childrens || [])
      }
    })

    return {
      bem,
      classes,
      itemStyle,
      background_styles,
      columnWidths,
      columnBlocksComputed
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
