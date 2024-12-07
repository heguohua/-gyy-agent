<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-07 17:58:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-table/ala-select-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-select-table-wrapper">
    <!-- <span :class="clasz">{{ label }}</span>  -->
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <!-- <el-select @change="handleChange" :model-value="model" class="ala-select-group" :style="styles" :id="fieldName">
        <div class="el-select-item" v-for="(item, index) in items" :key="item.value">
          <el-option :key="item.value" :label="item.name" :value="item.value" />
        </div>
      </el-select> -->

      <!-- <el-input :disabled="true" suffix-icon="el-icon-more" @click.native="openDialog" :model-value="model" :id="fieldName">
      </el-input> -->
      <div class="ala-select-customer ala-form-item-border" :style="styles">
        <input type="hidden" :model-value="model" :id="fieldName">
        <p class="placeholder">{{ $t('form.p-select-1') }} {{ label }}</p>
      </div>
      <div class="ala-select-customer-icon">
        <v-icon class="icon" icon="f_user" @click="openDialog" />
        <!-- <v-icon class="icon" icon="f_dept" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_role" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_duty" @click="openDialog" /> -->
      </div>
    </el-form-item>

    <el-dialog v-model="dialogShow" :width="dialogWidth" :append-to-body="true" :showClose="false">

      <template #header="{ titleId, titleClass }">
        <div class="ala-select-table-header">
          <h4 :id="titleId" :class="titleClass">{{ $t('form.p-select-1') }} 【 {{ label }} 】</h4>
        </div>
      </template>

      <div class="dialog-content">
        <div class="left-panel">
          <!-- 分页列表 -->
          <PageTableSelect ref="pageRef" :url="url" :columns="columns" :params="params" :showSelectCheckbox="true"
            :tipTitle="$t('pop.warm_title')" @selectedChange="selectedChange" :label="label" />

        </div>

        <div class="right-panel">
          <div class="table-title">
            {{ $t('form.p-selected') }}【 {{ label }} 】
          </div>

          <el-table :data="selectedData" style="width: 100%" row-key="id">
            <!-- 主表列渲染 -->
            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
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
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaPage, alaPost } from '@/utils/req';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import PageTableSelect from '@/components/cps/page/page-table-select.vue';

interface Column {
  prop: string;
  label: string;
}

interface ItemProperty {
  propertyName: string,
  valueName: string
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
  itemProperty: {
    type: Object as () => ItemProperty,
    default: () => ({})
  },
  params: {
    type: Object,
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
    type: Array<any>,
    default: () => []
  }
})

interface item {
  name: string,
  value: string,
}

const items = ref<Array<item>>([])

const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
})
const styles = computed(() => {
  return { minWidth: props.width + 'px' }
})

const handleChange = (value: any) => {
  model.value = value
}

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
}

/**
 * 点击确认按钮，弹窗消息提示框
 */
function confirmClick() {
  // emit("confirm", {
  //     // data: {
  //     //     [key]: data
  //     // },
  //     // id
  //     abc: 123
  // })

  console.log('selectedData:', selectedData);

}

const selectedData = ref([])
const selectedChange = (items: any) => {
  selectedData.value = items
}

// 删除选择项
const pageRef = ref()
const handleDelete = (index: number, row: any) => {
  selectedData.value.splice(index, 1);
  // 取消 el-table 中勾选的对象
  pageRef.value.cancelSelect(row)
}


console.log('props.columns-------------------> : ', props.columns);


</script>

<style scoped lang="scss">
.ala-select-table-wrapper {

  .ala-select-customer {

    .placeholder {
      color: var(--el-text-color-placeholder);
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
</style>