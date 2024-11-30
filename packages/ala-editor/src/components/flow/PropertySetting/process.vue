<template>
  <el-form ref="formRef" :model="form" label-width="130px" size="default">
      <slot name="form-item-process-name" :model="form" field="name">
        <el-form-item label="流程定义名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-displayName" :model="form" field="displayName">
        <el-form-item label="流程定义显示名称">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-expireTime" :model="form" field="expireTime">
        <el-form-item label="期望完成时间">
          <el-input v-model="form.expireTime"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-instanceUrl" :model="form" field="instanceUrl">
        <el-form-item label="实例启动Url">
          <el-input v-model="form.instanceUrl"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-instanceNoClass" :model="form" field="instanceNoClass">
        <el-form-item label="实例编号生成类">
          <el-input v-model="form.instanceNoClass"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-preInterceptors" :model="form" field="preInterceptors">
        <el-form-item label="节点前置拦截器">
          <el-input v-model="form.preInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-process-postInterceptors" :model="form" field="postInterceptors">
        <el-form-item label="节点后置拦截器">
          <el-input v-model="form.postInterceptors"></el-input>
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
