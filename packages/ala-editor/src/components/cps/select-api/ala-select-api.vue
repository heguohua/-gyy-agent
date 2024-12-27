<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-27 17:11:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-api/ala-select-api.vue
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
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
  url: {
    type: String,
    default: ''
  },
  itemProperty: {
    type: Object as () => ItemProperty,
    default: () => ({})
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
  isFormDesign: {
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

const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
})
const styles = computed(() => ({ minWidth: props.width + 'px' }))

const handleChange = (value: any) => {
  model.value = value
}

const query = () => {

  // Methods
  const url = props.url
  const params = props.params
  logger.info(`从 api 加载下拉组件数据，url【 ${url} 】，查询参数：`, params);
  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {
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