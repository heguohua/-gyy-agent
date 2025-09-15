<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-07 18:17:56
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select/ala-select.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-select @change="handleChange" :model-value="model" class="ala-select-group" :style="styles" :id="fieldName"
        :disabled="isDisabled">
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
  fieldName: {
    type: String,
    default: ''
  },
  help: {
    type: String,
  },
  data: {
    type: Object,
  },
  noEditable: {
    type: Boolean,
    default: () => false
  }
})

const model = defineModel({
  type: [String, Number] as PropType<String | Number>,
})
const styles = computed(() => ({ minWidth: props.width + 'px' }))
// const styles = computed(() => ({}))



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

  return claszName;
})

const isDisabled = computed(() => {
  const idd = false

  if (props.noEditable) {
    return true
  }
  return idd
})

// Methods

</script>

<style scoped lang="scss"></style>