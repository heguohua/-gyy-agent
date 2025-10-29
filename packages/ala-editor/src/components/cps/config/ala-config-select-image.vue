<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-29 15:56:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-select-image.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-api-wrapper">

    <el-form-item :label="title" :class="isRequired()">
      <el-input v-model="input" :placeholder="placeholder" class="input" readonly />

      <el-select @change="handleChange" :model-value="input" class="ala-select-group" :style="styles" :id="fieldName"
        :placeholder="placeholder">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select>
      <!-- @change="handleChange" -->
    </el-form-item>

    <!-- <span :class="clasz">{{ label }}</span>  -->
    <!-- <el-form-item :label="title" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="title" :help="help" />
      </template>
<el-select @change="handleChange" :model-value="input" class="ala-select-group" :style="styles" :id="fieldName"
  :placeholder="placeholder">
  <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
    <el-option :key="item.value" :label="item.name" :value="item.value" />
  </div>
</el-select>
</el-form-item> -->
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
  data: {
    type: Object,
    default: () => { }
  },
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
  clearable: {
    type: Boolean,
    default: false
  },
  help: {
    type: String,
  },
  bType: {
    type: String,
    default: 'screen'
  },
  viewport: {
    type: String,
    default: 'desktop'
  }
})

interface item {
  name: string,
  value: string,
}

const items = ref<Array<item>>([])

const isRequired = () => {
  return required ? 'is-required' : ''
}
const bType = props.bType

const { data } = toRefs(props)

const { formData, parentKey, key, id, properties } = data.value

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]

const emit = defineEmits(["callback"])

const input = ref<number>()
const styles = computed(() => ({ minWidth: props.width + 'px' }))

const handleChange = (value: any) => {
  input.value = value
}

watch(() => input.value, (value) => {
  if (!value) return;
  let data = {}
  const _value = value || ''

  if (Object.values(formData || {}).length < 2) {
    data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
  } else {
    data = { [props.viewport]: _value, required: required ? required : false, title, rules }
  }
  logger.info(`config-select-api 组件 model 发生变化,即将调用父组件callback, data`, data);
  emit("callback", {
    data: {
      [key]: data
    },
    id
  })
}, {
  immediate: true
})



const query = () => {

  // Methods
  const url = defaultValue.url
  const params = defaultValue.params
  logger.info(`从 api 加载下拉组件数据，url【 ${url} 】，查询参数：`, params);
  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {
    alaPost(u.url(url), params, false, '').then((data: any) => {
      const response = data;
      if (response.data) {
        const item_s: Array<item> = []
        response.data.forEach((item: any) => {
          const name = item[defaultValue.itemProperty.propertyName]
          const value = u.parseJson(item.file)[0].fid
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