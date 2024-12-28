<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="120px" size="default">
      <slot name="form-item-task-name" :model="form" field="name">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-displayName" :model="form" field="displayName">
        <el-form-item label="显示名称">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-form" :model="form" field="form">
        <el-form-item label="表单">
          <el-input v-model="form.form"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-assignee" :model="form" field="assignee">
        <el-form-item label="参与者">
          <el-input v-model="form.assignee"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-assignmentHandler" :model="form" field="assignmentHandler">
        <el-form-item label="参与者处理类">
          <el-input v-model="form.assignmentHandler"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-taskType" :model="form" field="taskType">
        <el-form-item label="任务类型">
          <el-select v-model="form.taskType">
            <el-option value="Major" label="主办任务"></el-option>
            <el-option value="Aidant" label="协办任务"></el-option>
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-performType" :model="form" field="performType">
        <el-form-item label="参与类型">
          <el-select v-model="form.performType">
            <el-option value="ANY" label="普通参与"></el-option>
            <el-option value="ALL" label="会签参与"></el-option>
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-preInterceptors" :model="form" field="preInterceptors">
        <el-form-item label="前置拦截器">
          <el-input v-model="form.preInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-postInterceptors" :model="form" field="postInterceptors">
        <el-form-item label="后置拦截器">
          <el-input v-model="form.postInterceptors"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-reminderTime" :model="form" field="reminderTime">
        <el-form-item label="提醒时间">
          <el-input v-model="form.reminderTime"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-reminderRepeat" :model="form" field="reminderRepeat">
        <el-form-item label="重复提醒间隔">
          <el-input v-model="form.reminderRepeat"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-expireTime" :model="form" field="expireTime">
        <el-form-item label="期待完成时间">
          <el-input v-model="form.expireTime"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-autoExecute" :model="form" field="autoExecute">
        <el-form-item label="是否自动完成">
          <el-select v-model="form.autoExecute">
            <el-option value="N" label="否"></el-option>
            <el-option value="Y" label="是"></el-option>
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-callback" :model="form" field="callback">
        <el-form-item label="回调处理">
          <el-input v-model="form.callback"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-width" :model="form" field="width">
        <el-form-item label="宽度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.width"></el-input-number>
        </el-form-item>
      </slot>
      <slot name="form-item-task-height" :model="form" field="height">
        <el-form-item label="高度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.height"></el-input-number>
        </el-form-item>
      </slot>
      <el-card>
        <template #header>
          <div class="clearfix">
          <span>扩展属性</span>
          <el-dropdown @command="handleCommand" style="float: right; padding: 3px 0">
            <el-button link type="primary">添加<el-icon class="el-icon--right"><ArrowDown /></el-icon></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="item.disabled === true" :icon="item.icon" :key="item.name" v-for="item in dropdownData" :command="item.name">
                  {{item.label}}
                </el-dropdown-item>
              </el-dropdown-menu>
          </template>
          </el-dropdown>
        </div>
        </template>
        <div>
         <el-row v-for="item in attrList" :key="item.key" style="margin-bottom: 12px;">
           <el-col :span="10" style="height: 32px;display: flex;align-items: center;position: relative;z-index: 99999;">
             <span>{{getLabel(item.key)}}&nbsp;
               <el-tooltip :content="getTooltip(item.key)">
                <el-icon><info-filled/></el-icon>
               </el-tooltip>
             </span>
           </el-col>
           <el-col :span="12">
             <el-select v-if="item.key == 'countersignType'" size="default" v-model="form.field[item.key]">
              <el-option value="PARALLEL" label="并行会签"></el-option>
              <el-option value="SEQUENTIAL" label="顺序会签"></el-option>
             </el-select>
             <template v-else>
              <component v-if="(typeof getRender(item.key) === 'function')" :is="getRender(item.key)(form, item)" />
              <el-input v-else v-model="form.field[item.key]" size="default"></el-input>
             </template>
           </el-col>
           <el-col :span="2" style="height: 32px;display: flex;align-items: center;padding-left: 10px;">
             <el-icon v-if="item.disabled!==true" @click="handleRemoveFieldAttr(item.key)"> <remove-filled/></el-icon>
           </el-col>
         </el-row>
        </div>
      </el-card>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown, InfoFilled, RemoveFilled } from '@element-plus/icons-vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElCard,
  ElSelect,
  ElOption,
  ElInputNumber,
  ElButton,
  ElRow,
  ElCol,
  ElTooltip,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon
} from 'element-plus'
import { reactive, ref, watch, defineProps, onMounted, defineEmits, computed } from 'vue'
import { FlowFormModel } from '../types'
// 注意:ref不能与model一样，相同的话表单双向绑定将会失效
const formRef = ref(null)
const form = reactive<FlowFormModel>({} as FlowFormModel)
// 定义属性
const props = defineProps<{
  modelValue: FlowFormModel,
  extendAttrConfig: { // 扩展属性配置
    type: Object,
  }
}>()
const mDropdownData = [
  {
    label: '用户标识',
    name: 'userKey',
    icon: '',
    tips: '参与者处理类可根据用户标识获取参与者'
  },
  {
    label: '用户组标识',
    name: 'groupKey',
    icon: '',
    tips: '参与者处理类可根据用户组标识获取参与者'
  },
  {
    label: '候选用户',
    name: 'candidateUsers',
    icon: '',
    tips: '候选用户(提供给上一节点选择下一节点参与者的用户标识)'
  },
  {
    label: '候选用户组',
    name: 'candidateGroups',
    icon: '',
    tips: '候选用户组(提供给上一节点选择下一节点参与者的用户组标识)'
  },
  {
    label: '候选人处理类',
    name: 'candidateHandler',
    icon: '',
    tips: '获取候选人的处理类'
  },
  {
    label: '额外属性1',
    name: 'attr1',
    icon: '',
    tips: '其他扩展属性1'
  },
  {
    label: '额外属性2',
    name: 'attr2',
    icon: '',
    tips: '其他扩展属性2'
  },
  {
    label: '额外属性3',
    name: 'attr3',
    icon: '',
    tips: '其他扩展属性3'
  }
]
const performTypeAttrs = [
  {
    label: '会签类型',
    name: 'countersignType',
    icon: '',
    tips: '参数类型为会签参与时生效',
    disabled: true
  },
  {
    label: '会签完成条件',
    name: 'countersignCompletionCondition',
    disabled: true,
    icon: '',
    tips: '参数类型为会签参与时生效'
  }
]
const dropdownData = computed<Array<any>>(() => {
  const { extendAttrConfig }: any = props
  let res = []
  if (!extendAttrConfig || !extendAttrConfig.items || !extendAttrConfig.items.length) {
    res = mDropdownData
  } else {
    res = extendAttrConfig.items
  }
  if (form.performType === 'ALL') {
    return [
      ...performTypeAttrs,
      ...res
    ]
  }
  return res
})
const attrList = computed(() => {
  if (!form.field) {
    return []
  }
  // 会签相关属性
  const performTypeAttrs: Array<any> = []
  if (form.performType === 'ALL') {
    performTypeAttrs.push({
      key: 'countersignType',
      value: form.field.countersignType,
      disabled: true
    })
    performTypeAttrs.push({
      key: 'countersignCompletionCondition',
      value: form.field.countersignCompletionCondition,
      disabled: true
    })
  }
  return [
    ...performTypeAttrs,
    ...Object.keys(form.field).filter((key: string) => !performTypeAttrs.map(item => item.key).includes(key)).map(key => {
      return {
        key: key,
        value: form.field[key]
      }
    })
  ]
})
const emits = defineEmits(['update:modelValue'])
// 监听表单属性
watch(() => form, () => {
  emits('update:modelValue', Object.assign(props.modelValue, form))
}, { deep: true })
const handleCommand = (command: string) => {
  form.field[command] = ''
}
const handleRemoveFieldAttr = (key: string) => {
  delete form.field[key]
}
const getLabel = (name: string) => {
  const res = dropdownData.value.find((item: any) => {
    return item.name === name
  })
  if (res) {
    return res.label
  }
  return ''
}
const getTooltip = (name: string) => {
  const res = dropdownData.value.find((item: any) => {
    return item.name === name
  })
  if (res) {
    return res.tips || res.label
  }
  return ''
}
const getRender = (name: string) => {
  const res = dropdownData.value.find((item: any) => {
    return item.name === name
  })
  if (res) {
    return res.render
  }
  return undefined
}
watch(() => form.performType, () => {
  // 设置countersignType默认值
  if (form.performType === 'ALL' && !form.field.countersignType) {
    form.field.countersignType = 'PARALLEL'
  }
  if (form.performType !== 'ALL' && form.field) {
    performTypeAttrs.forEach((item) => {
      delete form.field[item.name]
    })
  }
})
onMounted(() => {
  if (props.modelValue.field) {
    if (typeof props.modelValue.field === 'string') {
      Object.assign(form, props.modelValue, { field: JSON.parse(props.modelValue.field) })
    } else {
      Object.assign(form, props.modelValue)
    }
  } else {
    Object.assign(form, props.modelValue, { field: {} })
  }
})
</script>
