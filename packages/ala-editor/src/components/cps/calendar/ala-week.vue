<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-02-03 22:13:45
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 22:24:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/calendar/ala-week.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-week">
        <el-button-group class="week-nav">
            <el-button @click="prevWeek">上一周</el-button>
            <el-button @click="nextWeek">下一周</el-button>
        </el-button-group>
        <div class="week-grid">
            <div v-for="day in daysOfWeek" :key="day" class="day-column">
                <div class="day-header">{{ day }}</div>
                <div v-for="hour in hours" :key="hour" class="hour-cell">{{ hour }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
dayjs.locale('zh-cn');
// State
const props = defineProps({
    date: {
        type: Number,
        default: () => (new Date().getTime())
    }
})

// Methods

const rows = ref<string[]>([])
const hours = ref<string[]>([])
const time = ref(props.date)

// 初始化周视图数据
const initWeekView = (date: number) => {
    const startOfWeek = dayjs(date).startOf('week')
    const endOfWeek = startOfWeek.add(6, 'day')
    daysOfWeek.value = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day').format('dd'))
    hours.value = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
};

// 切换到上一周
const prevWeek = () => {
    time.value = time.value - 604800000
    initWeekView(time.value) // 减去一周的时间（毫秒）
};

// 切换到下一周
const nextWeek = () => {
    time.value = time.value + 604800000
    initWeekView(time.value) // 加上一周的时间（毫秒）
};

// 初始化周视图
initWeekView(time.value)

</script>

<style scoped lang="scss">
.ala-week {
    display: flex;
    flex-direction: column;
    align-items: center;

    .week-nav {
        margin-bottom: 20px;
    }

    .week-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
    }

    .day-column {
        display: flex;
        flex-direction: column;
        align-items: center;

        .day-header {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .hour-cell {
            width: 50px;
            text-align: center;
        }
    }
}
</style>