<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-04 23:08:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-dict/ala-select-dict.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-api-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-select @change="handleChange" :model-value="localValue" class="ala-select-group" :style="styles"
        :id="fieldName" :clearable="clearable">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';


interface ItemProperty {
  propertyName: string,
  valueName: string
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
  params: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: Number,
    default: 100,
  },
  fieldName: {
    type: String,
    default: ''
  },
  itemProperty: {
    type: Object as () => ItemProperty,
    default: () => ({})
  },
  isFormDesign: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  help: {
    type: String,
  }
})

interface item {
  name: string,
  value: string,
}

const items = ref<Array<item>>([])

// const model = defineModel({
//   type: Array<any>,
// })
const styles = computed(() => ({ minWidth: props.width + 'px' }))


// const handleChange = (value: Number) => {
//   // model.value = [value]
//   const pi = props.itemProperty
//   // model.value.push({ [pi.valueName]: value, [pi.propertyName]: item[pi.propertyName], })
//   model.value = [{ [pi.valueName]: value }]
// }



const model = defineModel({
  type: Array<any>,
})

const localValue = ref<Number>()

watch(() => model.value, () => {

  if (model && model.value && model.value.length > 0) {
    localValue.value = model.value[0]
  }

})



const handleChange = (value: any) => {
  const pi = props.itemProperty
  // model.value.push({ [pi.valueName]: value, [pi.propertyName]: item[pi.propertyName], })
  model.value = [{ [pi.valueName]: value }]
  localValue.value = value
}


const query = () => {
  // Methods
  const url = '/a/dict/list'
  logger.info(`从 dict 模块加载下拉组件数据，url【 ${url} 】，查询参数：`, props.params);

  alaPost(u.url(url), props.params, false, '').then((data: any) => {
    const response = data;
    if (response.data) {
      const item_s: Array<item> = []
      response.data.forEach((item: any) => {
        const name = item[props.itemProperty.propertyName]
        const value = item[props.itemProperty.valueName]
        item_s.push({ name, value })
      })
      u.merged(items.value, item_s)
    }

  });
}

// 如果不添加该判断条件那么在form设计器中拖拽并放置该组件后会立马请求后端 / 路径Api，网关则会报错并重定向前端页面到 /login 
const isFormDesign = computed(() => props.isFormDesign)

if (!isFormDesign.value) {
  query()
}

watch(() => isFormDesign.value, (v) => {
  if (v) {
    // 说明是form表单设计页面
    query()
  }
})
</script>

<style scoped lang="scss"></style>