<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-19 10:18:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/date-range/ala-date-range.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-date-range-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="startFieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <!-- 注意，注意，注意 el-date-picker 中必须使用 @update:model-value 更新数据值-->
            <el-date-picker :model-value="localModel" :disabled-date="disabledDate" :type="dateType"
                :placeholder="placeholder" :size="size" @update:model-value="handleChange"
                :picker-options="pickerOptions" :disabled="isDisabled" />
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
    startFieldName: {
        type: String,
        default: 'startFieldName'
    },
    endFieldName: {
        type: String,
        default: 'endFieldName'
    },
    help: {
        type: String,
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



const fieldName = computed(() => {
    const fn = props.startFieldName + '_' + props.endFieldName
    return fn
})


const emit = defineEmits(["formItemChangeCallback"])

const localModel = ref<Array<any>>([])
watch(() => props.data, () => {

    const arr: number[] = []
    if (props.data && props.data?.[props.startFieldName] && props.data?.[props.endFieldName]) {
        const startDate = props.data?.[props.startFieldName]
        const endDate = props.data?.[props.endFieldName]
        arr.push(startDate, endDate)
    }

    localModel.value = arr

}, {
    immediate: true,
    deep: true
})


const startValue = ref(0)
const endValue = ref(0)

const handleChange = (value: Date | null) => {

    if (value) {

        if (Array.isArray(value)) {
            const dates: Number[] = []
            for (let i = 0; i < value.length; i++) {
                const day = value[i]
                let milliseconds = day.getTime();
                dates.push(milliseconds)
                if (i === 0) {
                    startValue.value = milliseconds
                } else if (i === 1) {
                    endValue.value = milliseconds
                }
            }

            localModel.value = dates

            console.log('fieldName:', fieldName);
            console.log('localModel.value:', localModel.value);

            // 表单数据更新回调

            emit("formItemChangeCallback", {
                [props.startFieldName]: startValue.value,
                [props.endFieldName]: endValue.value,
            })
        } else {
            logger.error(`范围选择日期，选择后日期值不正确`);
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

const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})


</script>

<style scoped lang="scss">
.ala-date-range-wrapper {
    :deep(.el-form-item__label) {
        justify-content: right;
    }

    :deep(.el-date-editor--date) {
        width: 100%;
    }
}
</style>