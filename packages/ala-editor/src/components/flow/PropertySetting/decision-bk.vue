<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="120px" size="default">
      <slot name="form-item-decision-name" :model="form" field="name">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-decision-expr" :model="form" field="expr">
        <el-form-item label="决策表达式">
          <el-input v-model="form.expr"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-decision-handleClass" :model="form" field="handleClass">
        <el-form-item label="处理类">
          <el-input v-model="form.handleClass"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-decision-preInterceptors" :model="form" field="preInterceptors">
        <el-form-item label="前置拦截器">
          <el-input v-model="form.preInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-decision-postInterceptors" :model="form" field="postInterceptors">
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
