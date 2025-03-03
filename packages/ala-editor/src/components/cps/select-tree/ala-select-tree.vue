<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-03 09:55:45
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
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-tree-select v-model="currentModel" :data="items" :id="fieldName" @change="handleChange" :style="styles"
        :props="{
          children: itemProperty.childrenName,
          label: itemProperty.propertyName, // 自定义label属性名
          value: itemProperty.valueName // 自定义value属性名
        }" :clearable="clearable" :default-expand-all="defaultExpandAll" :default-expanded-keys="defaultExpandedKeys"
        :placeholder="placeholder" :check-strictly="checkStrictly" node-key="id" :show-checkbox="showCheckbox"/>

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
    default: () => ([0])
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

const currentModel = ref()
const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
  default: ''
})


const query = () => {

  // Methods
  const url = props.url
  logger.info(`加载 select-tree 下拉组件数据，url【 ${url} 】，查询参数：`, props.params);
  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {
    alaPost(u.url(url), props.params, false, '').then((data: any) => {
      const response = data;
      if (response.data) {
        items.value = response.data
      } else {
        logger.error(`select-tree组件没有加载到 Tree 数据，url[ ${url} ]，params：`, props.params);
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

const styles = computed(() => ({ minWidth: props.width + 'px' }))

const handleChange = () => {
  model.value = currentModel.value
}

// onMounted(() => {
//   if (model.value) {
//     currentModel.value = model.value
//   }
// })


const findNodeById = (node: Item, targetId: any): Item | undefined => {
  // 如果当前节点的 value 等于目标 id，则直接返回当前节点
  if (node.value === targetId) {
    return node;
  }

  // 如果当前节点有子节点，递归查找子节点
  if (node.children) {
    for (const child of node.children) {
      const result = findNodeById(child, targetId); // 递归调用
      if (result) return result; // 如果找到目标节点，返回结果
    }
  }

  // 如果当前节点及其子节点中都没有找到目标节点，返回 undefined
  return undefined;
}


watch(() => model.value, () => {
  if (model && model.value) {
    currentModel.value = model.value
  } else {
    currentModel.value = ''
  }
}, {
  immediate: true
})



</script>

<style scoped lang="scss"></style>