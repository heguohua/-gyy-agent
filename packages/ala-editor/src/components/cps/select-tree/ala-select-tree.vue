<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-08 23:43:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-tree/ala-select-tree.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-api-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <!-- <el-select @change="handleChange" :model-value="model" class="ala-select-group" :style="styles" :id="fieldName">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select> -->

      <el-tree-select v-model="currentModel" :data="items" :id="fieldName" @change="handleChange" :style="styles"
        :props="{
          children: itemProperty.childrenName,
          label: itemProperty.propertyName, // 自定义label属性名
          value: itemProperty.valueName // 自定义value属性名
        }" />

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
  childrenName: string
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
  url: {
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
  }
})

interface Item {
  label: string,
  value: any,
  children: any,
}

const items = ref<Array<Item>>([])

const currentModel = ref()
const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
  default: ''
})

const query = () => {

  // Methods
  const url = props.url
  logger.info(`加载 select-tree 下拉组件数据，url【 ${url} 】，查询参数：`, props.params);

  alaPost(u.url(url), props.params, false, '').then((data: any) => {
    const response = data;
    if (response.data) {
      items.value = response.data
    } else {
      logger.error(`select-tree组件没有加载到 Tree 数据，url[ ${url} ]，params：`, props.params);
    }
  });
}


// 如果不添加该判断条件那么在form设计器中拖拽并放置该组件后会立马请求后端 / 路径Api，网关则会报错并重定向前端页面到 /login 
const isFormDesign = computed(() => props.isFormDesign)
if (!isFormDesign) {
  query()
}

watch(() => isFormDesign.value, (v) => {
  if (v) {
    // 说明是form表单设计页面
    query()
  }
})

const styles = computed(() => ({ minWidth: props.width + 'px' }))

const handleChange = () => {
  model.value = currentModel.value
}

onMounted(() => {
  if (model.value) {
    currentModel.value = model.value
  }
})

</script>

<style scoped lang="scss"></style>