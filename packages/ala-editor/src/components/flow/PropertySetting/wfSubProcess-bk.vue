<template>
  <el-form ref="formRef" :model="form" label-width="130px" size="default">
      <slot name="form-item-wfSubProcess-name" :model="form" field="name">
        <el-form-item label="流程定义名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-wfSubProcess-displayName" :model="form" field="displayName">
        <el-form-item label="流程定义显示名称">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-wfSubProcess-form" :model="form" field="form">
        <el-form-item label="表单">
          <el-input v-model="form.form"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-wfSubProcess-version" :model="form" field="version">
        <el-form-item label="版本号">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-wfSubProcess-width" :model="form" field="width">
        <el-form-item label="宽度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.width"></el-input-number>
        </el-form-item>
      </slot>
      <slot name="form-item-wfSubProcess-height" :model="form" field="height">
        <el-form-item label="高度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.height"></el-input-number>
        </el-form-item>
      </slot>
    </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus'
import { reactive, ref, watch, defineProps, onMounted, defineEmits } from 'vue'
import { FlowFormModel } from '../types'
// 注意:ref不能与model一样，相同的话表单双向绑定将会失效
const formRef = ref(null)
const form = reactive<FlowFormModel>({} as FlowFormModel)
// 定义属性
const props = defineProps<{
  modelValue: FlowFormModel
}>()
const emits = defineEmits(['update:modelValue'])
watch(() => form, () => {
  emits('update:modelValue', Object.assign(props.modelValue, form))
}, { deep: true })

onMounted(() => {
  Object.assign(form, props.modelValue)
})
</script>
