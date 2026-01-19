<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 11:21:47
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/date/ala-date.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-date-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label v-if="label">
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <!-- 注意，注意，注意 el-date-picker 中必须使用 @update:model-value 更新数据值-->
            <el-date-picker :model-value="model" :disabled-date="disabledDate" :type="dateType"
                :placeholder="placeholder" :size="size" @update:model-value="handleChange"
                :picker-options="pickerOptions" :id="fieldName" :format="format" :disabled="isDisabled" />

        </el-form-item>

    </div>
</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';


const size = ref<'default' | 'large' | 'small'>('default')

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
    dateType: {
        type: String as () => "date" | "year" | "years" | "month" | "months" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange",
        default: 'date'
    },
    pickerOptions: {
        type: Object,
        default: {
            firstDayOfWeek: 1
        }
    },
    // 被选择日期返参格式化表达式
    format: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    // 可选择日期范围限定的开始日期
    start: {
        type: String,
        default: ''
    },
    // 可选择日期范围限定的结束日期
    end: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    },
    daysBefore: {
        type: Number,
        default: () => -1
    },
    daysAfter: {
        type: Number,
        default: () => -1
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: [String, Number] as PropType<number | string>,
    default: ''
})


const handleChange = (value: Date | null) => {


    if (value) {

        let milliseconds = value.getTime(); // 使用getTime()方法获取毫秒数
        // const day = date.format(value, props.format);
        model.value = milliseconds

    } else {
        model.value = ''
        // logger.error("注意，注意，注意：当前选择日期后为null");
    }
}

const disabledDate = (time: Date) => {


    // 1、根据传递的 start 和 end 设置
    if (props.start && props.end) {
        return time.getTime() < new Date(props.start).getTime() || time.getTime() > new Date(props.end).getTime();
    }

    if (!props.start && props.end) {
        return time.getTime() > new Date(props.end).getTime();
    }

    if (props.start && !props.end) {
        return time.getTime() < new Date(props.start).getTime();
    }


    // 2、根据 不早于X天、不晚于多少天判断
    const oneDay = 24 * 60 * 60 * 1000
    const currentTime = new Date().getTime()
    if (props.daysBefore > -1 && props.daysAfter > -1) {
        const before = oneDay * (props.daysBefore + 1)
        const after = oneDay * props.daysAfter
        return time.getTime() < (currentTime - before) || time.getTime() > (currentTime + after)
    }

    if (props.daysBefore === -1 && props.daysAfter > -1) {
        const after = oneDay * props.daysAfter
        return time.getTime() > (currentTime + after)
    }

    if (props.daysBefore > -1 && props.daysAfter === -1) {
        const before = oneDay * (props.daysBefore + 1)
        return time.getTime() < (currentTime - before)
    }


    return false;

}

// Methods

const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})

</script>

<style scoped lang="scss">
.ala-date-wrapper {
    :deep(.el-form-item__label) {
        justify-content: right;
    }

    :deep(.el-date-editor--date) {
        width: 100%;
    }
}
</style>