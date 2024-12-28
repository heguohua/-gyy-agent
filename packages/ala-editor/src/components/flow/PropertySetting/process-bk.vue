<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-28 09:03:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/PropertySetting/process.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <el-form ref="formRef" :model="modelForm" label-width="130px" size="default">
      <slot name="form-item-process-name" :model="modelForm" field="name">
        <el-form-item label="流程定义名称">
          <el-input v-model="modelForm.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-displayName" :model="modelForm" field="displayName">
        <el-form-item label="流程定义显示名称">
          <el-input v-model="modelForm.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-expireTime" :model="modelForm" field="expireTime">
        <el-form-item label="期望完成时间">
          <el-input v-model="modelForm.expireTime"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-instanceUrl" :model="modelForm" field="instanceUrl">
        <el-form-item label="实例启动Url">
          <el-input v-model="modelForm.instanceUrl"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-instanceNoClass" :model="modelForm" field="instanceNoClass">
        <el-form-item label="实例编号生成类">
          <el-input v-model="modelForm.instanceNoClass"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-preInterceptors" :model="modelForm" field="preInterceptors">
        <el-form-item label="节点前置拦截器">
          <el-input v-model="modelForm.preInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-postInterceptors" :model="modelForm" field="postInterceptors">
        <el-form-item label="节点后置拦截器">
          <el-input v-model="modelForm.postInterceptors"></el-input>
        </el-form-item>
      </slot>
    </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { reactive, ref, watch, defineProps, onMounted, defineEmits } from 'vue'
import { FlowFormModel } from '../types'

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

</script>
