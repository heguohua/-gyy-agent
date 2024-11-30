<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="120px" size="default">
      <slot name="form-item-custom-name" :model="form" field="name">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-displayName" :model="form" field="displayName">
        <el-form-item label="显示名称">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-clazz" :model="form" field="clazz">
        <el-form-item label="类路径">
          <el-input v-model="form.clazz"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-methodName" :model="form" field="methodName">
        <el-form-item label="方法名">
          <el-input v-model="form.methodName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-args" :model="form" field="args">
        <el-form-item label="参数变量">
          <el-input v-model="form.args"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-preInterceptors" :model="form" field="preInterceptors">
        <el-form-item label="前置拦截器">
          <el-input v-model="form.preInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-custom-postInterceptors" :model="form" field="postInterceptors">
        <el-form-item label="后置拦截器">
          <el-input v-model="form.postInterceptors"></el-input>
        </el-form-item>
      </slot>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus'
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
