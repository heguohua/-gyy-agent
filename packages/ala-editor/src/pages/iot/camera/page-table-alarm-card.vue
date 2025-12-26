<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-25 08:51:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-26 09:08:50
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/camera/page-table-alarm-card.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

    <PageDynamicTableCustomizationSimplest className="aiAlarmRecords" :beforeQuery="beforeQuery">

        <template #header>
            <div class="ccc">
                ddd
            </div>
        </template>

        <template #default="{ row }">

            <AlaAlarmCard :time="formatTime(row.time)" />

        </template>
    </PageDynamicTableCustomizationSimplest>
</template>

<script setup lang="ts">
import { AlaDateFormat, date } from '@/utils/date';
import u from '@/utils/u';
import { format } from 'd3';


const beforeQuery = (params: any) => {
    const p = u.merged(params, {})
    return p
}

const formatTime = (time: number) => {
    return date.formatDateTime(time, date.F_YYYY_MM_DD_HH_mm_ss)
}

</script>

<style scoped lang="scss"></style>