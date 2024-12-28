<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-28 11:09:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/PropertySetting/end.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div>
    <el-form ref="formRef" :model="modelForm" label-width="120px" size="default" :rules="rules">

      <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index">

        <component :is="item.componentName" :label="item.label" position="right" :placeholder="item.placeholder"
          v-bind="item.other" v-model="modelForm[item.fieldName as keyof FlowFormModel]" :fieldName="item.fieldName"
          :data="modelForm" />

      </div>

    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { reactive, ref, watch, defineProps, onMounted, defineEmits } from 'vue'
import { FlowFormModel } from '../types'
import { AlaField } from '@/config/fieldSchemas'
import { alaBuildInput, alaBuildSelectDict } from '@/config/alaBuilders'
import { alaRequired } from '@/config/alaRules'
// 注意:ref不能与model一样，相同的话表单双向绑定将会失效
const formRef = ref(null)
const modelForm = reactive<FlowFormModel>({} as FlowFormModel)
// 定义属性
const props = defineProps<{
  modelValue: FlowFormModel
}>()
const emits = defineEmits(['update:modelValue'])
watch(() => modelForm, () => {
  emits('update:modelValue', Object.assign(props.modelValue, modelForm))
}, { deep: true })

onMounted(() => {
  Object.assign(modelForm, props.modelValue)
})



const isHidden = (item: { componentName: string, other?: any }) => {
  if (item.componentName === 'AlaHidden') {
    return 'ala-form-base-item-hidden'
  } else if (item.other && item.other.fullWidth) {
    return 'ala-form-base-item-full-width'
  } else {
    return 'ala-form-base-item'
  }
}

const fields = ref<Array<AlaField>>([])
fields.value.push(alaBuildInput("name", "名称", [alaRequired()], "请输入名称"))
fields.value.push(alaBuildSelectDict("preInterceptors", "节点前置拦截器", { "dictValue": "preInterceptor" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择节点前置拦截器", { clearable: true }))
fields.value.push(alaBuildSelectDict("postInterceptors", "节点后置拦截器", { "dictValue": "postInterceptor" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择节点后置拦截器", { clearable: true }))


const rules = computed(() => {
  const ruless: { [key: string]: object } = {}
  fields.value?.forEach(field => {
    if (field.rules) {
      ruless[field.fieldName] = field.rules
    }
  })
  return ruless
})


</script>
