<template>
  <div>
    <el-form ref="formRef" :model="modelForm" label-width="150px" size="default" :rules="rules">

      <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index">

        <component :is="item.componentName" :label="item.label" position="right" :placeholder="item.placeholder"
          v-bind="item.other" v-model="modelForm[item.fieldName as keyof FlowFormModel]" :fieldName="item.fieldName"
          :data="modelForm" />

      </div>

      <el-card>
        <template #header>
          <div class="clearfix">
            <span>扩展属性</span>
            <el-dropdown @command="handleCommand" style="float: right; padding: 3px 0">
              <el-button link type="primary">添加<el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :disabled="item.disabled === true" :icon="item.icon" :key="item.name"
                    v-for="item in dropdownData" :command="item.name">
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <div>
          <el-row v-for="item in attrList" :key="item.key" style="margin-bottom: 12px;">
            <el-col :span="10"
              style="height: 32px;display: flex;align-items: center;position: relative;z-index: 99999;">
              <span>{{ getLabel(item.key) }}&nbsp;
                <el-tooltip :content="getTooltip(item.key)">
                  <el-icon><info-filled /></el-icon>
                </el-tooltip>
              </span>
            </el-col>
            <el-col :span="12">
              <el-select v-if="item.key == 'countersignType'" size="default" v-model="modelForm.field[item.key]">
                <el-option value="PARALLEL" label="并行会签"></el-option>
                <el-option value="SEQUENTIAL" label="顺序会签"></el-option>
              </el-select>
              <template v-else>
                <component v-if="(typeof getRender(item.key) === 'function')"
                  :is="getRender(item.key)(modelForm, item)" />
                <el-input v-else v-model="modelForm.field[item.key]" size="default"></el-input>
              </template>
            </el-col>
            <el-col :span="2" style="height: 32px;display: flex;align-items: center;padding-left: 10px;">
              <el-icon v-if="item.disabled !== true" @click="handleRemoveFieldAttr(item.key)">
                <remove-filled /></el-icon>
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
import { AlaField } from '@/config/fieldSchemas'
import { alaBuildDate, alaBuildInput, alaBuildNumber, alaBuildSelect, alaBuildSelectDict, alaBuildSelectTable, alaBuildSwitch, alaBuildTextarea } from '@/config/alaBuilders'
import { alaRequired } from '@/config/alaRules'
import { useI18n } from 'vue-i18n';
import { logger } from '@/utils/logger'
const { t } = useI18n();
// 注意:ref不能与model一样，相同的话表单双向绑定将会失效
const formRef = ref(null)
const modelForm = reactive<FlowFormModel>({} as FlowFormModel)

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
  if (modelForm.performType === 'ALL') {
    return [
      ...performTypeAttrs,
      ...res
    ]
  }
  return res
})
const attrList = computed(() => {
  if (!modelForm.field) {
    return []
  }
  // 会签相关属性
  const performTypeAttrs: Array<any> = []
  if (modelForm.performType === 'ALL') {
    performTypeAttrs.push({
      key: 'countersignType',
      value: modelForm.field.countersignType,
      disabled: true
    })
    performTypeAttrs.push({
      key: 'countersignCompletionCondition',
      value: modelForm.field.countersignCompletionCondition,
      disabled: true
    })
  }
  return [
    ...performTypeAttrs,
    ...Object.keys(modelForm.field).filter((key: string) => !performTypeAttrs.map(item => item.key).includes(key)).map(key => {
      return {
        key: key,
        value: modelForm.field[key]
      }
    })
  ]
})

const emits = defineEmits(['update:modelValue'])

// 监听表单属性
watch(() => modelForm, () => {
  
  logger.info(`配置表单属性发生变化，更新前：props.modelValue`, props.modelValue);
  logger.info(`配置表单属性发生变化，更新值：modelForm`, modelForm);

  Object.assign(props.modelValue, modelForm)

  logger.info(`配置表单属性发生变化，更新后：props.modelValue`, props.modelValue);

  emits('update:modelValue', props.modelValue)

}, { deep: true })

const handleCommand = (command: string) => {
  modelForm.field[command] = ''
}

const handleRemoveFieldAttr = (key: string) => {
  delete modelForm.field[key]
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

watch(() => modelForm.performType, () => {
  // 设置countersignType默认值
  if (modelForm.performType === 'ALL' && !modelForm.field.countersignType) {
    modelForm.field.countersignType = 'PARALLEL'
  }
  if (modelForm.performType !== 'ALL' && modelForm.field) {
    performTypeAttrs.forEach((item) => {
      delete modelForm.field[item.name]
    })
  }
})

onMounted(() => {

  logger.info(`即将初始化【 流程节点 】属性model，初始化前modelForm：`, modelForm);

  if (props.modelValue.field) {
    logger.info(`即将初始化【 流程节点 】属性model，props.modelValue.field存在，props.modelValue.field参数值为：`, props.modelValue.field);

    if (typeof props.modelValue.field === 'string') {

      Object.assign(modelForm, props.modelValue, { field: JSON.parse(props.modelValue.field) })

    } else {

      Object.assign(modelForm, props.modelValue)

    }
  } else {
    logger.info(`即将初始化【 流程节点 】属性model，props.modelValue.field不存在，props.modelValue参数值为：`, props.modelValue);

    Object.assign(modelForm, props.modelValue, { field: {} })

  }
  logger.info(`即将初始化【 流程节点 】属性model，初始化后modelForm：`, modelForm);

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
fields.value.push(alaBuildInput("name", "名称", [alaRequired()], "请输入流程名称"))
fields.value.push(alaBuildInput("displayName", "显示名称", [alaRequired()], "请输入显示名称"))
// fields.value.push(alaBuildInput("form", "表单", [alaRequired()], "请选择表单"))
// t('module.menu.name')
const cls = alaBuildSelectTable("forms", "表单", "/l/lowcodingConfig/page", [{ prop: 'name', label: '表单名称', isQuery: true }], { propertyName: 'name', valueName: 'id', otherProperty: ['className'] }, undefined, { formType: 'flow' }, "请选择")

fields.value.push(cls)

fields.value.push(alaBuildInput("assignee", "参与者", [], "请选择参与者"))
fields.value.push(alaBuildSelectDict("assignmentHandler", "参与者处理类", { "dictValue": "assignmentHandler" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择参与者处理类", { clearable: true }))
fields.value.push(alaBuildSelect("taskType", "任务类型", [{ '主办任务': 'Major' }, { '协办任务': 'Aidant' }], [], "请选择任务参与者", { clearable: true }))
fields.value.push(alaBuildSelect("performType", "参与类型", [{ '普通参与': 'ANY' }, { '会签参与': 'ALL' }], [], "请选择参与类型", { clearable: true }))
fields.value.push(alaBuildSelectDict("preInterceptors", "节点前置拦截器", { "dictValue": "preInterceptor" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择节点前置拦截器", { clearable: true }))
fields.value.push(alaBuildSelectDict("postInterceptors", "节点后置拦截器", { "dictValue": "postInterceptor" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择节点后置拦截器", { clearable: true }))

fields.value.push(alaBuildDate("expireTime", "期望完成时间", "date", "YYYY-MM-DD", [], "", "", "请选择期望完成时间"))

// fields.value.push(alaBuildSelect("performType", "是否自动完成", [{ '普通参与': 'ANY' }, { '会签参与': 'ALL' }], [], "请选择参与类型", { clearable: true }))
fields.value.push(alaBuildSwitch("autoExecute", "是否自动完成", "是", "否", "Y", "N", [], ""))

fields.value.push(alaBuildDate("reminderTime", "提醒时间", "date", "YYYY-MM-DD", [], "", "", "请选择提醒时间"))
fields.value.push(alaBuildNumber("reminderRepeat", "重复提醒间隔（分钟）", [], "请输入高度"))

fields.value.push(alaBuildTextarea("callback", "回调Url", [], "请输入回调Url"))

fields.value.push(alaBuildNumber("width", "宽度", [], "请输入宽度"))
fields.value.push(alaBuildNumber("height", "高度", [], "请输入高度"))



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
<style scoped lang="scss">
:deep(.ala-select-customer) {
  p {
    margin: 0px;
  }
}
</style>