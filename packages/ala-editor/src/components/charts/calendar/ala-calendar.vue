<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-15 22:37:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/calendar/ala-calendar.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-calendar-wrapper">

    <div v-if="props.showMonth && dateType === '月'" label="月" name="月" class="ala-calendar-month">
      <div class="header" v-if="props.showHeader">
        <div class="left">
          <div class="switch-button">
            <p :class="dateType === '月' ? 'is-select' : ''" @click="handleSwitchDateType('月')" v-if="props.showMonth">月
            </p>
            <p @click="handleSwitchDateType('周')" v-if="props.showWeek">周
            </p>
            <p @click="handleSwitchDateType('日')" v-if="props.showDay">日
            </p>
          </div>

        </div>
        <div class="right">
          <AlaDate v-model="month" placeholder="请选择月份" dateType="month" format="YYYY-MM" />
          <p @click="handleSwitchCurrentMonth()">本月</p>

        </div>
      </div>
      <el-calendar v-model="today" class="ala-calendar" :first-day-of-week="2">
        <!-- 自定义日期格子 -->
        <template #date-cell="{ data }">
          <div class="cell-content">
            <div>{{ data.day.split('-')[2] }}</div>
            <div v-if="events[data.day]" class="event-tag">
              {{ events[data.day] }}
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
    <div v-if="props.showWeek && dateType === '周'" label="周" name="周" class="ala-calendar-week">
      <div class="header" v-if="props.showHeader">
        <div class="left">
          <div class="switch-button">
            <p @click="handleSwitchDateType('月')" v-if="props.showMonth">月
            </p>
            <p :class="dateType === '周' ? 'is-select' : ''" @click="handleSwitchDateType('周')" v-if="props.showWeek">周
            </p>
            <p @click="handleSwitchDateType('日')" v-if="props.showDay">日
            </p>
          </div>

        </div>
        <div class="right">
          <!-- alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())), -->
          <!-- <AlaDate v-model="month" placeholder="请选择周" dateType="week" format="yyyy 第 WW 周"/>  -->
          <p @click="handleSwitchCurrentMonth()">本周</p>
        </div>
      </div>
      <div class="ala-week">
        <AlaWeek :date="new Date().getTime()" />
      </div>
    </div>
    <div v-if="props.showDay && dateType === '日'" label="日" name="日" class="ala-calendar-day">
      <div class="header" v-if="props.showHeader">
        <div class="left">
          <div class="switch-button">
            <p @click="handleSwitchDateType('月')" v-if="props.showMonth">月
            </p>
            <p @click="handleSwitchDateType('周')" v-if="props.showWeek">周
            </p>
            <p :class="dateType === '日' ? 'is-select' : ''" @click="handleSwitchDateType('日')" v-if="props.showDay">日
            </p>
          </div>

        </div>
        <div class="right">
          <!-- alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())), -->
          <AlaDate v-model="month" placeholder="请选择月份" dateType="date" />
          <p @click="handleSwitchCurrentMonth()">今日</p>

        </div>
      </div>
      <div class="ala-day">
        day
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// 设置 日历开始列为从星期一开始
import { ElConfigProvider, dayjs } from 'element-plus'
import { getLowcodingConfigByClassName } from '@/config/formConfigs';
dayjs.en.weekStart = 1

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
  params: {
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: Number,
    default: 100,
  },
  firstDayOfWeek: {
    type: Number,
    default: 1
  },
  isFormDesign: {
    type: Boolean,
    default: false
  },
  showMonth: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: false
  },
  showWeek: {
    type: Boolean,
    default: false
  },
  showDay: {
    type: Boolean,
    default: false
  }
})

interface item {
  name: string,
  value: string,
}

const items = ref<Array<item>>([])

const activeTab = ref('month')
const tabList = ref<Array<string>>([
])

const month = ref(new Date().getTime())
const today = ref(new Date())
const dateType = ref('月')

const handleSwitchDateType = (dt: string) => {
  dateType.value = dt
}

const model = defineModel({
  type: [Number, String, Boolean] as PropType<number | string | boolean>,
  default: ''
})



const apiUrl = ref("")

const query = () => {

  const formData = props.formData

  // Methods
  const url = apiUrl.value
  const params = props.params || {}
  logger.info(`从 api 加载下拉组件数据，url【 ${url} 】，查询参数：`, params);
  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {


    // dateName: {
    //   type: String,
    // },
    // valueName: {
    //   type: String,
    // },
    // colorName: {
    //   type: String,
    //   default: ""
    // },
    // data_time: {
    //   type: Number,
    //   default: 60000
    // }

    const className = formData.className.desktop
    const dateName = formData.dateName.desktop
    const valueName = formData.valueName.desktop
    const colorName = formData.colorName.desktop
    const data_time = formData.data_time.desktop
    alaPost(u.url(url), u.merged({ "tableName": className },params), false, '').then((data: any) => {
      const response = data;
      if (response.data) {
        console.log('response.data: ---> ', response);
      }
    });
  }
}

const handleSwitchCurrentMonth = () => {

}
// 如果不添加该判断条件那么在form设计器中拖拽并放置该组件后会立马请求后端 / 路径Api，网关则会报错并重定向前端页面到 /login 
// const isFormDesign = computed(() => props.isFormDesign)
// if (!isFormDesign.value) {
//   query()
// }

// watch(() => isFormDesign.value, (v) => {
//   if (v) {
//     // 说明是form表单设计页面
//     query()
//   }
// })

// 这里存放每个日期的自定义数据（可动态）
const events = {
  '2025-10-15': '🔥 发布会',
  '2025-10-18': '🎉 团建',
  '2025-10-25': '📦 发货日'
}

interface Column { prop: string, label: string, formItem: any }
// const columns = ref<Array<Column>>([])
const detailFields: any = ref([])


onMounted(async () => {

  const formData = props.formData
  const className = formData.className.desktop
  const configs = await getLowcodingConfigByClassName(className || "")

  console.log('configs:--->', configs);

  // columns.value = configs.columns
  // baseFields.value = configs.baseFields
  // formConfigItems.value = configs.formConfigItems
  // addFormFields.value = configs.addFormFields
  detailFields.value = configs.detailFields
  // showAddButton.value = configs.showAddButton
  // showDeleteButton.value = configs.showDeleteButton
  // showEditButton.value = configs.showEditButton
  // showDisableButton.value = configs.showDisableButton
  // showButtonsColumn.value = configs.showButtonsColumn
  // formType.value = configs.formType
  // u.merged(formAttr.value, configs.formAttr)
  const url = formData.url.desktop

  if (url) {
    // 说明是 静态api模块
    apiUrl.value = url
  } else {
    apiUrl.value = "/l/dynamic/list"
  }

  query()

})
</script>

<style scoped lang="scss">
.ala-calendar-wrapper {

  .header {
    display: flex;
    padding: 8px 0px;
    /* Safari */
    -webkit-user-select: none;
    /* Firefox */
    -moz-user-select: none;
    /* IE/Edge */
    -ms-user-select: none;
    /* 标准语法 */
    user-select: none;

    .left {
      display: flex;
      width: 50%;


      .switch-button {
        display: inline-flex;
        border: 1px solid #E5E7EC;
        border-radius: 4px;
        cursor: pointer;


        p {
          width: 38px;
          text-align: center;
          font-size: 0.9rem;
          background: #fff;
          padding: 4px 0px;

          &:hover {
            color: var(--el-color-primary)
          }

          &:not(:first-child) {
            border-left: 1px solid #E5E7EC;
          }

        }

        :first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        :last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .is-select {
          background: none;
          color: var(--el-color-primary);
        }
      }


    }

    .right {
      display: flex;
      width: 50%;
      align-items: center;
      justify-content: right;
      padding-right: 20px;

      :deep(.el-form-item--default) {
        margin-bottom: 0px;
      }

      p {
        text-align: center;
        font-size: 0.9rem;
        background: #fff;
        padding: 4px 16px;
        border: 1px solid #E5E7EC;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary)
        }
      }

    }
  }

  .ala-calendar-month {


    .ala-calendar {
      border-radius: 8px;
      border: 1px solid #E5E7EC;

      :deep(.el-calendar-table th) {
        color: #409eff;
        font-weight: bold;
      }

      :deep(.el-calendar-table .is-today) {
        color: #f56c6c;
        font-weight: bold;
      }

    }
  }


}
</style>