<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-08 16:52:18
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
        <!-- <input type="hidden" :model-value="model" :id="fieldName"> -->
        <p class="placeholder" v-if="model.length === 0">{{ $t('form.p-select-1') }} {{ label }}</p>
        <p class="show-values" v-if="model.length != 0" v-html="showValue"></p>
      </div>
      <div class="ala-select-customer-icon">
        <v-icon class="icon" icon="f_user" @click="openDialog" />
        <!-- <v-icon class="icon" icon="f_dept" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_role" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_duty" @click="openDialog" /> -->
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
              :itemProperty="itemProperty" />

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
  },
  itemProperty: {
    type: Object as () => ItemProperty,
    default: () => ({})
  }
})

const model = defineModel({
  type: Array<any>,
  default: () => ([])
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
  pageListRef.value.clear()
  dialogShow.value = false

  selectedData.value = []

}

const generateValue = (value: string) => {
  return `<p class='ala-select-table-value'>${value}</p>`
}

/**
 * 点击确认按钮，更新 model value
 */
const showValue = ref()
function confirmClick() {

  const length = selectedData.value.length

  if (!selectedData.value || length <= 0) {

    notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.label + ' 】')

  } else {

    // 给 model 赋值
    const mv: any = []
    const sv: string[] = []
    const pi = props.itemProperty
    selectedData.value.forEach((item) => {
      selectedData.value = []
      mv.push({ [pi.valueName]: item[pi.valueName], [pi.propertyName]: item[pi.propertyName], })
      sv.push(generateValue(item[pi.propertyName]))
    })

    model.value = mv
    // 给显示标签赋值
    showValue.value = sv.join('')
    // 清空列表选择页面当前状态
    pageListRef.value.clear()
    // 关闭弹窗
    dialogShow.value = false

    selectedData.value = []

  }
}

const selectedData = ref([])
const selectedChange = (currentSelected: [never]) => {
  // if (items && items.length > 0) {
  //   if(selectedData.value && selectedData.value.length >0){
  //     useI18n

  //   }else{
  //     selectedData.value = items
  //   }
  // }
  console.log('currentSelected:', currentSelected);
  selectedData.value = currentSelected
  // if (currentSelected && currentSelected.length > 0) {

  //   if (selectedData.value && selectedData.value.length > 0) {

  //     const existedSelected = selectedData.value
  //     console.log('existedSelected:', existedSelected);

  //     // 比较当前选中的数据和上一次选中的数据
  //     const newlySelected = currentSelected.filter((currentItem: { id: number }) => {
  //       let existed = false
  //       existedSelected.forEach((existedItem: { id: number }) => {
  //         if (existedItem.id === currentItem.id) {
  //           existed = true
  //         }
  //       })
  //       return !existed
  //     });
  //     // const deselected = existedSelected.filter(item => !currentSelected.includes(item));
  //     const remainedData: any = []
  //     const deselected = existedSelected.filter((existedItem: { id: number }) => {
  //       let existed = false
  //       currentSelected.forEach((currentItem: { id: number }) => {
  //         if (existedItem.id === currentItem.id) {
  //           existed = true
  //           remainedData.push(currentItem)
  //         }
  //       })
  //       return !existed
  //     });

  //     // 由于 新的 currentSelected 和 原有的 existedSelected 2个数据间对比逻辑比较复杂，因此这里采用的是先移除“取消勾选的元素”，再追加新勾选的元素
  //     // 先移除“取消勾选的元素”
  //     if (deselected.length > 0) {
  //       // 直接移除
  //       logger.info('取消勾选的数据：', deselected);
  //       logger.info('还剩下勾选的数据：', remainedData);
  //       // 直接 替换 selectedData.value并追加新增的数据
  //       selectedData.value = remainedData
  //       logger.info(`使用 remainedData 替换 selectedData 后，selectedData.value 如下：`);
  //       console.log('selectedData.value:', selectedData.value);
  //     }

  //     // 再追加新勾选的元素
  //     if (newlySelected.length > 0) {
  //       // 直接添加
  //       logger.info('新勾选并即将追加的数据：', newlySelected);
  //       newlySelected.forEach(item => selectedData.value.push(item))
  //     }

  //     // items.forEach((i: never) => {
  //     //   selectedData.value.push(i)
  //     // })
  //     // console.log('selectedData.value:', selectedData.value);

  //   } else {
  //     selectedData.value = currentSelected
  //   }

  // }
  // querySelectedData(items)
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

    alaPost(u.url(listUrl || ''), { ids }, false, '').then((data: any) => {
      const response = data;
      console.log('response:', response);
      if (response.data && response.data.length > 0) {
        selectedData.value = response.data
      }
    });

    // const ips = props.itemProperty
    // onePageList.value.forEach((item) => {
    //   model.value.forEach((m) => {
    //     if (m[ips.valueName] === item[ips.valueName]) {
    //       table.value.toggleRowSelection(item, true);
    //     }
    //   })
    // })
  } else {
    logger.info(`初始化数据不存在，【 不初始化 已勾选项 】，model.value`, model.value);
  }
}


watch(() => dialogShow.value, (value) => {
  if (value) {
    querySelectedData(model.value as [{ id: number }])
  }
})

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