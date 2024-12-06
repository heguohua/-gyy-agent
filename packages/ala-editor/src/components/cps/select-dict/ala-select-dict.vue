<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-06 11:36:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-dict/ala-select-dict.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-api-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <el-select @change="handleChange" :model-value="model" class="ala-select-group" :style="styles" :id="fieldName">
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
})

interface item {
  name: string,
  value: string,
}

const items = ref<Array<item>>([])

const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
})
const styles = computed(() => ({ minWidth: props.width + 'px' }))



const handleChange = (value: any) => {
  model.value = value
}


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

</script>

<style scoped lang="scss"></style>