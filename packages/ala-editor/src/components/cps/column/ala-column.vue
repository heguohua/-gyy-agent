<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 15:05:56
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/column/ala-column.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

  <div :class="classes" :styles="background_styles">
    <div class="item" v-for="(columnWidth, index) in columnWidths" :key="bType + '-' + index"
      :style="itemStyle(columnWidth)">
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
  formData: {
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
  currentId: { // 当前被渲染组件ID
    type: String,
  },
  block: { // 当前被渲染组件 block
    type: Object,
  },
    bType: {
        type: String,
        default: 'page'
    }
})

// State
const bType = props.bType


// export default defineComponent({
// name,
// props: blockProps,
// setup(props) {
logger.warn("AlaColumn组件被渲染");

const classes = computed(() => [bem()])


const { formData, viewport, children } = toRefs(props)

// logger.info('element?.value', element?.value);
// console.log('element?.value', element?.value);

// logger.info('formData.value', formData.value);
console.log('formData.value', formData);

// logger.info('children.value', children.value);
// console.log('children.value', children.value);

// logger.info('viewport', viewport.value);


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

// // 发送组件初始化消息
const emit = defineEmits(["init"])
onMounted(() => {

  // 组件挂载后再发送初始化消息
  watch(() => props.currentId, () => {
    logger.info(`向 editor-render-drag 组件【 发送初始化消息 】，当前组件${props.currentId}`);

    emit('init', {
      pid: null,
      block: props.block,
    })
  }, {
    immediate: true
  })

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
    min-height: 18px;
  }
}
</style>
