<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-19 22:42:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/column/ala-column.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

  <div :class="classes" :styles="background_styles">
    <div class="item" v-for="(columnWidth, index) in columnWidths" :key="index" :style="itemStyle(columnWidth)">
      <slot :childrenBlocks="getOneChildrenBlocksByIndex(index)" :index="index"></slot>
    </div>
  </div>

</template>

<script setup lang="ts">

import { logger } from '@/utils/logger';
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { Viewport } from '@/types/editorType';

const { name, bem } = createNamespace("column")

defineOptions({
  name: "ala-column"
})

export type AlaColumnProps = {
  cols: {
    desktop: [],
    mobile: [],
  },
  background?: {
    desktop: string,
    mobile: string,
  },
}

export type AlaColumnPropsChildrenList = any[][]

const props = defineProps({
  data: {
    type: Object as PropType<AlaColumnProps>,
    default: () => {
      return {
        cols: {
          desktop: [0.5, 0.5],
          mobile: [0.5, 0.5],
        },
        background: {
          desktop: '',
          mobile: '',
        },
      }
    }
  },
  children: {
    type: Array as PropType<AlaColumnPropsChildrenList>,
    default: () => [[], []],
  },
  viewport: {
    type: String as PropType<Viewport>,
    default: "desktop"
  },
  id: {
    type: String,
  },
  element: {
    type: Object,
  }
})


// export default defineComponent({
// name,
// props: blockProps,
// setup(props) {
logger.warn("AlaColumn组件被渲染");

const classes = computed(() => [bem()])

const { data: formData, viewport, children, element } = toRefs(props)

logger.info('element?.value', element?.value);
console.log('element?.value', element?.value);

logger.info('formData.value', formData.value);
console.log('formData.value', formData.value);

logger.info('children.value', children.value);
console.log('children.value', children.value);

logger.info('viewport', viewport.value);


const columnWidths = computed(() => {
  const columns = formData.value?.cols?.[viewport.value] || [0.5, 0.5]
  return columns
});

const background = computed(() => formData.value?.background?.[viewport.value] || '');
const background_styles = () => { background: background.value }

const itemStyle = computed(() => {
  return (columnWidth: any) => {
    const styles = { width: Number(columnWidth) * 100 + '%' }
    return styles
  }
})

const getOneChildrenBlocksByIndex = computed(() => {
  return (index: number) => {
    const oneChildren = children.value?.[index]
    logger.info(`多列组件渲染 第[ ${index} ]列`);
    logger.info(`多列组件 oneChildren: `, oneChildren);
    return oneChildren
  }
})

// 发送组件初始化消息
const emit = defineEmits(["init"])
watch(() => props.id, () => {
  logger.info(`向 editor-render-drag 组件发送初始化消息，当前组件${props.id}`);
  console.log('ala-column中 element 元素值:',element);
  
  emit('init', {
    pid: null,
    element: props.element
  })
}, {
  immediate: true
})
// return {
//   bem,
//   classes,
//   itemStyle,
//   background_styles,
//   columnWidths,
//   getOneChildrenBlocksByIndex: getOneChildrenBlocksByIndex
// }
// }
// })

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
