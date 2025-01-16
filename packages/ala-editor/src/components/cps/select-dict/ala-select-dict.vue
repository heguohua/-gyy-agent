<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-16 23:07:20
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
        :id="fieldName" :clearable="clearable" :placeholder="placeholder">
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
import { PropType } from 'vue';


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
  },
  singleValue: {
    type: Boolean,
    default: false
  },
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
  type: [Array, String, Number] as PropType<Array<any> | String | Number>,
})

const localValue = ref<any>()

watch(() => model.value, () => {

  if (model && model.value) {

    if (Array.isArray(model.value)) {
      // 数组类型
      if (model.value.length > 0) {
        const pi = props.itemProperty
        localValue.value = model.value[0][pi.valueName]
      }
    } else {
      // 普通类型
      localValue.value = model.value
    }
  }

})

const handleChange = (value: any) => {
  const pi = props.itemProperty
  if (props.singleValue) {
    model.value = value
  } else {
    model.value = [{ [pi.valueName]: value }]
  }
  localValue.value = value

}


const query = () => {
  // Methods
  const url = '/a/dict/list'

  let params = props.params

  if (typeof params === 'string') {
    params = u.parseJson(params)
  }

  logger.info(`从 dict 模块加载下拉组件数据，url【 ${url} 】，查询参数：`, params);

  alaPost(u.url(url), params, false, '').then((data: any) => {
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