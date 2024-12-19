<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-11 22:34:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/date/ala-date.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-date-picker-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <!-- 注意，注意，注意 el-date-picker 中必须使用 @update:model-value 更新数据值-->
            <el-date-picker :model-value="model" :disabled-date="disabledDate" :type="dateType"
                :placeholder="placeholder" :size="size" @update:model-value="handleChange"
                :picker-options="pickerOptions" :id="fieldName" />

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
    }
})

const model = defineModel({
    type: [String, Number, Array<String>, Date] as const,
    default: Object
})

const handleChange = (value: Date | null) => {

    if (value) {

        if (Array.isArray(value)) {
            const dates: String[] = []
            value.forEach((day) => {
                const dy = date.format(day, props.format);
                dates.push(dy)
            })
            console.log('dates:', dates);
            model.value = dates
        } else {
            const day = date.format(value, props.format);
            console.log('day:', day);
            model.value = day
        }

    } else {
        logger.error("注意，注意，注意：当前选择日期后为null");
    }
}

const disabledDate = (time: Date) => {

    if (props.start && props.end) {
        return time.getTime() < new Date(props.start).getTime() || time.getTime() > new Date(props.end).getTime();
    }

    if (!props.start && props.end) {
        return time.getTime() > new Date(props.end).getTime();
    }

    if (props.start && !props.end) {
        return time.getTime() < new Date(props.start).getTime();
    }
    return false;

}

// Methods

</script>

<style scoped lang="scss">
.ala-date-picker-wrapper {
    :deep .el-form-item__label {
        justify-content: right;
    }
    :deep(.el-date-editor--date){
        width: 100%;
    }
}
</style>