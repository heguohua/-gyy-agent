<template>
  <ElDrawer destroy-on-close direction="rtl" append-to-body :title="title" ref="drawerRef" @close="handleClose"
    v-model="drawer">
    <component :is="componentType" v-model="formData" :extendAttrConfig="props.extendAttrConfig || {}">
      <!-- <template #[key]="data" v-for="(item, key) in $slots">
      <slot :name="key" v-bind="data || {}"></slot>
    </template> -->
    </component>
  </ElDrawer>
</template>
<script lang="ts" setup>
import { ElDrawer } from 'element-plus'
import { ref, defineExpose, computed, unref, reactive, watch, defineEmits, defineProps } from 'vue'
import { NodeTypeEnum } from '../enums'
import { FlowFormModel, PropertyEvent } from '../types'
import process from './process.vue'
import start from './start.vue'
import custom from './custom.vue'
import decision from './decision.vue'
import end from './end.vue'
import fork from './fork.vue'
import join from './join.vue'
import task from './task.vue'
import transition from './transition.vue'
import subProcess from './subProcess.vue'
import wfSubProcess from './wfSubProcess.vue'
import { logger } from '@/utils/logger'
const NODE_NAME_LIST = [
  'snaker:custom', 'snaker:decision',
  'snaker:end', 'snaker:fork', 'snaker:join', 'snaker:start',
  'snaker:task'] as string[]
const NODE_NAME_MAP = {
  'snaker:custom': '自定义节点',
  'snaker:decision': '决策节点',
  'snaker:end': '结束节点',
  'snaker:fork': '分支节点',
  'snaker:join': '合并节点',
  'snaker:start': '开始节点',
  'snaker:task': '任务节点'
}
// 组件列表
const COMPONENT_LIST = {
  process,
  start,
  custom,
  decision,
  end,
  fork,
  join,
  task,
  transition,
  subProcess,
  wfSubProcess
}
// 事件
const emits = defineEmits(['change'])
// 属性
const props = defineProps({
  extendAttrConfig: { // 扩展属性配置
    type: Object
  },
  // 扩展的属性key
  extendPropertyKeys: {
    type: Array
  }
})
const drawer = ref(false)
const drawerRef = ref(null)
var formData = reactive({} as FlowFormModel)


// 标题
const title = computed(() => {
  if (formData.type === 'process') {
    return '设置流程属性'
  } else if (formData.type === 'snaker:transition') {
    return '设置边属性'
  } else if (NODE_NAME_LIST.includes(formData.type)) {
    return `设置${NODE_NAME_MAP[formData.type] || '节点'}属性`
  } else if (formData.type === 'snaker:subProcess') {
    return '设置子流程属性'
  } else if (formData.type === 'snaker:wfSubProcess') {
    return '设置snaker子流程属性'
  }
  return ''
})


// 组件类型
const componentType = computed(() => {
  const mFormData = formData
  if (!mFormData || !mFormData.type) return
  return COMPONENT_LIST[mFormData.type.replace('snaker:', '')]
})


// 节点名称
const nodeName = computed((): NodeTypeEnum => {
  const mFormData = formData
  if (!mFormData || !mFormData.type) return NodeTypeEnum.ignore
  return mFormData.type.replace('snaker:', '') as unknown as NodeTypeEnum
})


// 处理emits
const handleEmits = (propertyName: string, propertyValue: any) => {

  if (propertyValue === undefined) {
    logger.info(`属性【 值不存在 】，不回调上层组件，type[${unref(nodeName)}]，propertyName[${propertyName}]`);
    return
  }

  const data = {
    type: unref(nodeName),
    propertyName: propertyName,
    propertyValue: propertyValue
  } as PropertyEvent
  logger.info(`监听到【 节点属性 】发生变化，即将回调上层组件，type[${unref(nodeName)}]，propertyName[${propertyName}]，data：`, data);

  emits('change', data)

}


// 表单属性keys
const propertyKeys = [
  // 流程属性
  'name', 'displayName', 'expireTime', 'instanceUrl', 'instanceNoClass', 'preInterceptors', 'postInterceptors',
  // 子流程属性
  'name', 'displayName', 'form', 'version', 'width', 'height',
  // 开始节点和结束节点属性
  'name', 'preInterceptors', 'postInterceptors',
  // 自定义节点属性
  'name', 'displayName', 'clazz', 'methodName', 'args', 'preInterceptors', 'postInterceptors',
  // 决策节点属性
  'name', 'expr', 'handleClass', 'preInterceptors', 'postInterceptors',
  // 任务节点属性
  'form', 'assignee', 'assignmentHandler', 'taskType', 'performType', 'reminderTime', 'reminderRepeat', 'expireTime',
  'autoExecute', 'callback', 'width', 'height', 'field',
  // 额外扩展的属性
  ...props.extendPropertyKeys || props.extendAttrConfig?.extendPropertyKeys || []
] as string[]


// 去重后的key
const propertyKeysSet = Array.from(new Set(propertyKeys))
propertyKeysSet.forEach((key: string) => {
  // 监听属性变化
  watch(() => formData[key], (n) => handleEmits(key, n), { deep: true })
})


// 显示抽屉
const show = (args: FlowFormModel) => {
  // 将args的值复制给formData
  const width = args.width ? args.width : (args.type === 'snaker:subProcess' ? 500 : 120)
  const height = args.height ? args.height : (args.type === 'snaker:subProcess' ? 300 : 80)
  Object.assign(formData, args, { width: Number(width), height: Number(height) })
  drawer.value = true
}


// 抽屉关闭处理
const handleClose = () => {
  // 清空表单值
  Object.keys(formData).forEach((key: string) => {
    delete formData[key]
  })
}


// 导入属性及方法给外部调用
defineExpose({
  show
})

</script>
