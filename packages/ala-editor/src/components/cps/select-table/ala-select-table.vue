<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-07 12:52:32
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
        <p class="placeholder">请选择{{ label }}</p>
      </div>
      <div class="ala-select-customer-icon">
        <v-icon class="icon" icon="f_user" @click="openDialog" />
        <!-- <v-icon class="icon" icon="f_dept" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_role" @click="openDialog" /> -->
        <!-- <v-icon class="icon" icon="f_duty" @click="openDialog" /> -->
      </div>
    </el-form-item>

    <el-dialog v-model="dialogShow" width="80%" :append-to-body="true">
      <div class="dialog-content">
        <div class="left-panel">
          <!-- 分页列表 -->
          <PageTableSelect ref="pageRef" :url="url" :columns="columns" :params="params" :showSelectCheckbox="true"
            :tipTitle="$t('pop.warm_title')" />

        </div>
        <div class="right-panel">
          <!-- 勾选的数据列表 -->
          <el-table :data="selectedData">
          </el-table>
          <el-button @click="removeSelected">删除</el-button>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
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
  width: {
    type: Number,
    default: 250,
  },
  fieldName: {
    type: String,
    default: ''
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
const columns = computed(() => {
  return [
    { prop: 'name', label: t('module.menu.name') },
    { prop: 'delFlag', label: t('common.enable') },
  ]
})

// Methods
const url = props.url
const params = props.params
logger.info(`从 api 加载下拉组件数据，url【 ${url} 】，查询参数：`, params);

alaPost(u.url(url), params, false, '').then((data: any) => {
  const response = data;
  if (response.data) {
    const item_s: Array<item> = []
    response.data.forEach((item: any) => {
      const name = item[props.itemProperty.propertyName]
      const value = item[props.itemProperty.valueName]
      item_s.push({ name, value })
    })
    u.merged(items.value, item_s)
  }

});

const dialogShow = ref(false)
const openDialog = () => {
  console.log('111:', 111);

  dialogShow.value = true;
}

</script>

<style scoped lang="scss">
.ala-select-table-wrapper {
  .ala-select-customer {
    input {}

    .placeholder {
      color: var(--el-text-color-placeholder);
    }
  }

  .ala-form-item-border {}

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

    .icon {}
  }

  .dialog-content {
    z-index: 10000;

    .left-panel {}

    .right-panel {}
  }
}
</style>