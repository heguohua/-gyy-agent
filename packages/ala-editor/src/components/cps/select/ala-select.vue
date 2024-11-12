<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 14:10:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select/ala-select.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position">
      <el-select @change="handleChange" :model-value="model" class="ala-select-group" :style="styles">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">

interface Item {
  name: string,
  value: string
}

// State
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  position: {
    type: String as () => '' | 'top' | 'left' | 'right',
    default: 'left'
  },
  placeholder: {
    type: String,
    default: ''
  },
  items: {
    type: Array<Item>,
    default: []
  },
  width: {
    type: Number,
    default: 100,
  },
})

const model = defineModel({
  type: String || Number || Boolean || undefined
})
const styles = computed(() => ({ width: props.width + 'px' }))



const handleChange = (value: any) => {
  model.value = value
}

const clasz = computed(() => {
  const position = props.position
  let claszName = ''
  if (!position || position === 'left') {
    claszName = 'label-left';
  } else {
    if (position === 'top') {
      claszName = 'label-top';
    }
  }
  console.log('claszName:', claszName);

  return claszName;
})

// Methods

</script>

<style scoped lang="scss">

</style>