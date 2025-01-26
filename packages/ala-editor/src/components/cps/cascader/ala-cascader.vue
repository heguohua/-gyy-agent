<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-26 12:34:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/cascader/ala-cascader.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-cascader-wrapper">
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-cascader :model-value="data" :options="options" :props="configs" @change="handleChange"
        :clearable="clearable" :showAllLevels="showAllLevels" :filterable="filterable">

        <template #default="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>

      </el-cascader>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import u from '@/utils/u'
import { CascaderValue } from 'element-plus'


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
    type: String,
    default: ''
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
  clearable: {
    type: Boolean,
    default: false
  },
  showAllLevels: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  }
})

const configs = {
  expandTrigger: 'hover' as const,
}

const model = defineModel({
  type: String || Number || Boolean || undefined
})


// const styles = computed(() => ({}))
const data = ref<CascaderValue>([]) 
const handleChange = (value: any) => {
  data.value = value
}

watch(() => data.value, (value: any) => {
  model.value = u.tojson(value)
})

watch(() => model.value, (value: any) => {
  if (model && model.value) {
    data.value = u.parseJson(model.value)
  }
})

// Methods

const options = computed(() => {
  let items: any[] = []
  console.log('items:', items);

  if (props.items) {
    items = u.parseJson(props.items)
  }
  return items
})

</script>

<style scoped lang="scss">
.ala-cascader-wrapper {
  :deep(.el-cascader) {
    width: 100%;
  }
}
</style>