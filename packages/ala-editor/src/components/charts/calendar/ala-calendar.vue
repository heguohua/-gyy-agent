<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-16 21:58:07
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
      <el-calendar v-model="today" class="ala-calendar">
        <!-- 自定义日期格子 -->
        <template #date-cell="{ data }">

          <AlaPopoverInfo :key="data.day">

            <template #shortContent>
              <div class="ala-calendar-cell-title">{{ data.day.split('-')[2] }}</div>
              <div v-for="(item, index) in events[data.day]?.slice(0, 6) || []" :key="item.id">
                {{ index + 1 }}、{{ u.truncateWithEllipsis(item.name, 12) }}
              </div>
            </template>

            <template #detailContent>
              <div v-for="(item, index) in events[data.day]" :key="'d-' + item.id" v-if="events[data.day]?.length > 0"
                @click="showDetail(item)">
                {{ index + 1 }}、{{ item.name }}
              </div>

              <div v-else class="ala-calendar-cell-detail-content-empty">
                没有明细数据。。。
              </div>
            </template>

          </AlaPopoverInfo>

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


  <AlaDetail :data="detailItem" v-model="showDetailPage" v-if="showDetailPage" :fields="detailFields"
    :formAttr="formAttrs" />

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
import AlaPopoverInfo from '@/components/cps/popover/ala-popover-info.vue';
import { date } from '@/utils/date';
import { string } from 'sql-formatter/dist/cjs/lexer/regexFactory';
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
const dataCache: any = ref({})
const query = () => {

  const year = today.value.getFullYear();
  const month = today.value.getMonth(); // 0 ~ 11

  // 当月第一天 00:00:00
  const firstDay = new Date(year, month, 1, 0, 0, 0, 0);
  const firstDayTimestamp = firstDay.getTime();
  // 当月最后一天 24:00:00 = 下一月的第一天 00:00:00
  const lastDay = new Date(year, month + 1, 1, 0, 0, 0, 0);
  const lastDayTimestamp = lastDay.getTime();

  const formData = props.formData

  // Methods
  const url = apiUrl.value
  const params = props.params || {}
  logger.info(`从 api 加载下拉组件数据，url【 ${url} 】，查询参数：`, params);

  if (!url) {
    notify.warn(t('pop.warm_title'), "当前选择框【 api链接 】不存在")
  } else {

    const className = formData.className.desktop
    const dateName = "a_" + formData.dateName.desktop
    const valueName = formData.valueName.desktop
    const colorName = formData.colorName.desktop
    const data_time = formData.data_time.desktop

    // 日期查询条件

    const pms = {
      "body": {
        "tableName": className,
        "conditions": [
          {
            column: dateName,
            operator: ">=",
            value: firstDayTimestamp,
          },
          {
            column: dateName,
            operator: "<=",
            value: lastDayTimestamp,
          }
        ]
      },
      "page": {
        "current": 1,
        "size": 200000,
        "orders": [
          {
            "column": "id",
            "asc": false
          }
        ]
      }
    }

    // u.merged({ "tableName": className, conditions }, params)

    alaPost(u.url(url), pms, false, '').then((response: any) => {
      const data = response.data?.list;
      if (data) {
        const evs: any = {}
        const dataCaches: any = {}
        for (let index in data) {
          const item = data[index]
          dataCaches[item.id] = item

          const d = date.YYYY_MM_DD(item[dateName])
          if (evs[d]) {
            evs[d].push({ id: item.id, name: item[valueName] })
          } else {
            evs[d] = [{ id: item.id, name: item[valueName] }]
          }

        }
        events.value = evs
        dataCache.value = dataCaches
      }
    });

  }
}

const handleSwitchCurrentMonth = () => {

}

// 这里存放每个日期的自定义数据（可动态）
const events: any = ref<any>({})
//   {
//   '2025-10-15': [{ id: 1, name: '🔥 发布会' }],
//   '2025-10-18': [{ id: 2, name: '🎉 团建' }],
//   '2025-10-25': [{ id: 3, name: '📦 发货日' }, { id: 3, name: '📦 去北京，拜访华兰集团董事长' }, { id: 4, name: '📦 去北京，拜访华兰集团董事长' }, { id: 5, name: '📦 去北京，拜访华兰集团董事长，拜访华兰集团董事长' },]
// }

const detailFields: any = ref([])
const detailItem = reactive({
  moduleName: '',
  item: {}
})


const showDetailPage = ref(false)
const formAttrs = ref()

onMounted(async () => {

  const formData = props.formData
  const className = formData.className.desktop
  detailItem.moduleName = t('menu.' + className)
  const configs = await getLowcodingConfigByClassName(className || "")

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
  formAttrs.value = configs.formAttr
  // u.merged(formAttr.value, configs.formAttr)
  const url = formData.url.desktop

  if (url) {
    // 说明是 静态api模块
    apiUrl.value = url
  } else {
    apiUrl.value = "/l/dynamic/page"
  }

  //刷新数据
  watch(() => today.value, (currentDay) => {
    query()
  }, {
    immediate: true
  })

})


const showDetail = (item: { id: number, name: string }) => {

  const formData = props.formData
  const className = formData.className.desktop

  console.log('item: -- className -> ', item, className);
  detailItem.item = dataCache.value[item.id]

  showDetailPage.value = true

}

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

  .ala-calendar-week {
    .header {
      .left {
        .switch-button {
          p {}

          .is-select {}
        }
      }

      .right {
        p {}
      }
    }

    .ala-week {}
  }

  .ala-calendar-day {
    .header {
      .left {
        .switch-button {
          p {}

          .is-select {}
        }
      }

      .right {
        p {}
      }
    }

    .ala-day {}
  }

  .ala-calendar-month {
    .header {
      .left {
        .switch-button {
          .is-select {}

          p {}
        }
      }

      .right {
        p {}
      }
    }

    .ala-calendar {
      .ala-calendar-cell-detail-content-empty {
        color: #e6a23c;
      }

      :deep(.el-calendar-table__row .current:hover) {
        background-color: var(--el-calendar-selected-bg-color);
        cursor: pointer;
      }

      :deep(.ala-calendar-cell-short-content) {
        display: flex;
        flex-direction: column;
      }

      :deep(.ala-calendar-cell-detail-content div) {
        width: 100%;
        flex: 1;
        /* 让文字区占满剩余空间 */
        word-break: break-all;
        /* 允许中文/英文自动换行 */
        white-space: normal;
        /* 保证换行生效 */
        line-height: 1.5;
        text-align: left;
        /* 避免多行文字居中 */
        margin-top: 0.5rem;

        &:hover {
          color: var(--el-color-primary);
          font-weight: bold;
        }
      }

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

      :deep(.el-calendar-day) {
        height: auto;
        min-height: 80px;
      }

    }
  }


}
</style>