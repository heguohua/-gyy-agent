<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-28 16:14:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-tree/ala-select-tree.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div class="ala-select-api-wrapper">
    <el-form-item :label="label" :label-position="position" :prop="fieldName">

      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-tree-select v-model="currentModel" :data="items" :id="fieldName" @change="handleChange" :style="styles"
        :props="{
          children: itemProperty.childrenName,
          label: itemProperty.propertyName, // 自定义label属性名
          value: itemProperty.valueName // 自定义value属性名
        }" :clearable="clearable" :default-expand-all="defaultExpandAll" :default-expanded-keys="eKeys"
        :placeholder="placeholder" :check-strictly="!checkStrictly" :node-key="itemProperty.valueName"
        :show-checkbox="showCheckbox" />

    </el-form-item>
  </div>
</template>

<script setup lang="ts">

// 2025-06-11: 变更 ala-select-tree 组件前端-》后端传值为[{propertyName:valueName}]方式，也变更了后端->前端的方式，因此这里做了修改！！！


import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface ItemProperty {
  propertyName: string,
  valueName: string
  childrenName: string
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
  params: {
    type: [Object, String] as PropType<object | string>,
    default: () => { }
  },
  columnWidth: {
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
    default: () => { }
  },
  isFormDesign: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultExpandedKeys: {
    type: Array<number>,
    default: () => []
  },
  help: {
    type: String,
  }
})

interface Item {
  label: string,
  value: any,
  children: any,
}

const items = ref<Array<Item>>([])

const currentModel = ref<string | number>()
const model = defineModel({
  type: Array<any>,
  default: () => { return [] }
})


const query = () => {

  // Methods
  const url = props.url

  let pms = props.params

  if (pms && typeof pms === "string") {
    pms = u.parseJson(pms)
  }

  logger.info(`加载 select-tree 下拉组件数据，url【 ${url} 】，查询参数：`, pms);
  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {
    alaPost(u.url(url), pms, false, '').then((data: any) => {
      const response = data;
      if (response.data) {
        items.value = response.data
      } else {
        logger.error(`select-tree组件没有加载到 Tree 数据，url[ ${url} ]，params：`, pms);
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

const styles = computed(() => ({ minWidth: props.columnWidth + 'px' }))

const handleChange = (val: string | number) => {

  currentModel.value = val

  const pi = props.itemProperty
  const valueName = pi.valueName
  const propertyName = pi.propertyName
  model.value = [{ [valueName]: val }]

}

const expandedKeys = ref<Array<number | string>>([])
const eKeys = computed(() => {
  console.log('expandedKeys.value:', expandedKeys.value);

  return expandedKeys.value
})

watch(() => model.value, () => {
  console.log('model.value[0]:', model.value[0]);

  if (model && model.value && model.value[0]) {

    const pi = props.itemProperty
    const valueName = pi.valueName

    // 注意，注意，注意： 我们发现 el-tree-select 组件使用时，如果不展开某个层级级，而当前选择的选项恰好在当前层级，那么el-tree-select显示值会显示为value的值，因此这里做主动展开到当前节点的设置
    const v = model.value[0][valueName]
    expandedKeys.value = [v]

    currentModel.value = v

  } else {
    if (props.defaultExpandedKeys && props.defaultExpandedKeys.length > 0) {
      expandedKeys.value = props.defaultExpandedKeys
    }
    currentModel.value = undefined
  }
}, {
  immediate: true
})





</script>

<style scoped lang="scss"></style>