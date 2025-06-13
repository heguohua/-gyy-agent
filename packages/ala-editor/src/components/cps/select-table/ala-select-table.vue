<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-13 15:33:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-table/ala-select-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-table-wrapper">
    <el-form-item :label="label" :label-position="position" :prop="fieldName">

      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <div class="ala-select-customer ala-form-item-border" :style="styles">
        <p class="placeholder" v-if="!model || model.length === 0">{{
          placeholder ? placeholder : ($t('form.p-select-1') + label) }}
        </p>
        <p class="show-values" v-if="model && model.length != 0" v-html="showValue"></p>
      </div>
      <div class="ala-select-customer-icon">
        <v-icon class="icon" :icon="icon" @click="openDialog" :width="iconWidth" :height="iconHeight" />
      </div>
    </el-form-item>

    <div class="ala-el-dialog-wrapper" v-if="dialogShow">
      <el-dialog v-model="dialogShow" :width="dialogWidth" :append-to-body="true" :showClose="false">

        <template #header="{ titleId, titleClass }">
          <div class="ala-select-table-header">
            <h4 :id="titleId" :class="titleClass">{{ $t('form.p-select-1') }} 【 {{ label }} 】</h4>
          </div>
        </template>

        <div class="dialog-content">
          <div class="left-panel">
            <!-- 分页列表 -->
            <PageTableSelect ref="pageListRef" :url="url" :columns="columns" :params="params" :showSelectCheckbox="true"
              :tipTitle="$t('pop.warm_title')" @selectedChange="selectedChange" :label="label" v-model="model"
              :itemProperty="itemProperty" :isFormDesign="isFormDesign" :singleValue="singleValue" />

          </div>

          <div class="right-panel">
            <div class="table-title">
              {{ $t('form.p-selected') }}【 {{ label }} 】
            </div>

            <el-table :data="selectedData" style="width: 100%" row-key="id">

              <!-- 主表列渲染 -->
              <el-table-column v-for="column in columnss" :key="column.prop" :prop="column.prop"
                :label="isFormDesign ? parseLabel(column.label) : column.label">
              </el-table-column>

              <!-- 主表操作列 -->
              <el-table-column :label="$t('buttons.buttons')">
                <template #default="scope">

                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    {{ $t('buttons.delete') }}
                  </el-button>

                </template>
              </el-table-column>

            </el-table>


          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
            <el-button type="primary" @click="confirmClick">
              {{ $t('buttons.confirm') }}
            </el-button>
          </span>
        </template>

      </el-dialog>
    </div>


  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import PageTableSelect from '@/components/cps/page/page-table-select.vue';
import notify from '@/utils/notify';
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';

interface ItemProperty {
  propertyName: string,
  valueName: string
  otherProperty: Array<string>
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
  url: {
    type: String,
    default: ''
  },
  params: {
    type: [Object, String] as PropType<object | string>,
    default: () => ({})
  },
  dialogWidth: {
    type: String,
    default: "80%",
  },
  width: {
    type: Number,
    default: 250,
  },
  fieldName: {
    type: String,
    default: ''
  },
  columns: {
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
  help: {
    type: String,
  },
  icon: {
    type: String,
    default: 'f_user'
  },
  iconWidth: {
    type: Number,
    default: 30
  },
  iconHeight: {
    type: Number,
    default: 30
  },
  singleValue: {
    type: Boolean,
    default: false
  }
})

const model = defineModel({
  type: Array<any>,
  default: () => { return [] }
})

const styles = computed(() => {
  return { minWidth: props.width + 'px' }
})

// 分页列表中列属性配置
const dialogShow = ref(false)
const openDialog = () => {
  dialogShow.value = true;
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
  dialogShow.value = false
  selectedData.value = []
}

const generateValue = (value: string) => {
  return `<p class='ala-select-table-value'>${value}</p>`
}

/**
 * 点击确认按钮，更新 model value
 */
// const localValue = ref()

const showValue = computed(() => {
  return modelItemToShowValue(model.value)
})

function confirmClick() {

  const length = selectedData.value.length

  if (!selectedData.value || length <= 0) {

    notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.label + ' 】')

  } else {

    // 给 model 赋值
    const mv: any = []
    // const sv: string[] = []
    const pi = props.itemProperty
    selectedData.value.forEach((item) => {

      const selected = { [pi.valueName]: item[pi.valueName], [pi.propertyName]: item[pi.propertyName], }
      if (pi.otherProperty && pi.otherProperty.length > 0) {
        pi.otherProperty.forEach((op: string) => {
          Object.assign(selected, { [op]: item[op] })
        })
      }
      mv.push(selected)
    })

    model.value = mv
    // 给显示标签赋值
    // localValue.value = sv.join('')
    // localValue.value = modelItemToShowValue(mv)
    // 清空列表选择页面当前状态
    pageListRef.value.clear()
    // 关闭弹窗
    dialogShow.value = false

    selectedData.value = []

  }
}

const modelItemToShowValue = (rows: any) => {
  let value: string[] = []
  const pi = props.itemProperty
  if (rows && rows.length > 0) {
    rows.forEach((row: any) => {
      value.push(generateValue(row[pi.propertyName]))
    })
  }
  return value.join('')
}

const selectedData = ref([])
const selectedChange = (currentSelected: [never]) => {

  if (props.singleValue) {

  }

  selectedData.value = currentSelected
}

// 删除选择项
const pageListRef = ref()
const handleDelete = (index: number, row: any) => {
  selectedData.value.splice(index, 1);
  // 取消 el-table 中勾选的对象
  pageListRef.value.cancelSelect(row)
}

const querySelectedData = (items: [{ id: number }]) => {

  if (items && items.length > 0) {

    logger.info(`正在【 初始化已勾选项 】，items`, items);

    // 根据分页列表 url 获取 list 查询url
    const listUrl = props.url?.slice(0, props.url?.lastIndexOf('/')) + '/list'

    const ids: number[] = items.map(item => item.id);

    const params = { ids }
    if (isDynamicTable()) {
      // 当前是 动态分页列表，需要转换查询条件
      const pm = u.parseJson(props.params as string)
      u.merged(params, { tableName: pm['tableName'] })
    }

    if (!listUrl) {
      notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
    } else {
      alaPost(u.url(listUrl || ''), params, false, '').then((data: any) => {
        const response = data;
        if (response.data && response.data.length > 0) {
          selectedData.value = response.data
        }
      });
    }

  } else {
    logger.info(`初始化数据不存在，【 不初始化 已勾选项 】，model.value`, model.value);
  }
}

watch(() => dialogShow.value, (value) => {
  if (value) {
    querySelectedData(model.value as [{ id: number }])
  }
})

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
  return t(label.slice(3, label.length - 2));
}
const columnss = computed(() => {
  const fields: any = []
  if (props.columns) {
    const columns = u.parseJson(props.columns)
    columns.forEach((column: any) => {
      column['label'] = u.parseI18n(column.label, t)
      fields.push(column)
    })
  }
  return fields
})

const isDynamicTable = () => {
  const url = props.url || ''
  if (url.indexOf('/l/dynamic/') > -1) {
    return true;
  }
  return false
}


</script>

<style scoped lang="scss">
.ala-select-table-wrapper {

  .ala-select-customer {

    .placeholder {
      color: var(--el-text-color-placeholder);
    }

    .show-values {
      display: flex;
      gap: 4px;
    }



  }

  .ala-select-customer-icon {

    color: #a8abb2;
    width: 30px;
    right: 0px;
    position: absolute;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      color: var(--el-color-primary-light-3);
    }

  }


}


// 由于 el-dialog 设置了 append-to-body="true"，那么样式更改也要放在顶层层级才能生效
.dialog-content {
  display: flex;
  align-items: top;
  justify-content: center;
  gap: 2%;

  .left-panel {
    width: 48%;
    padding: 0px 1px 10px 1px;
    background-color: var(--el-fill-color-blank);
    border-radius: var(--el-border-radius-base);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
  }

  .right-panel {
    width: 48%;
    padding: 0px 1px 10px 1px;
    background-color: var(--el-fill-color-blank);
    border-radius: var(--el-border-radius-base);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;

    .table-title {
      height: 68px;
      line-height: 68px;
      padding-left: 12px;
      font-size: 1rem;
      font-weight: 600;
    }
  }


}
</style>
<style>
.el-dialog__header {
  padding-bottom: 0px !important;
}

.el-dialog__title {
  line-height: inherit !important;
  margin: 0px 0px 10px 0px !important;
}

.el-table th.el-table__cell {
  background-color: #F9F9FA;
  padding: 8px 0px;
}

.ala-select-table-header {
  padding-left: 12px;
}

.ala-select-table-value {
  background-color: var(--el-fill-color);
  padding: 0px 6px;
  border-radius: 2px;
  display: inline-flex;
}
</style>