<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-25 08:51:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-30 21:37:11
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/camera/page-table-algorithm-card.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

    <PageDynamicTableCustomizationSimplest className="aiAlgorithms" :beforeQuery="beforeQuery"
        :pageSize="[8, 12, 16, 20, 30, 40, 50, 100]" :defaultPageSize="12" ref="pageList">

        <template #header>

        </template>

        <template #default="{ row, formConfigItems }">

            <!-- <AlgorithmCard :alarmType="row.alarmType[0].dictLabel" :time="formatTime(row.time)" :camera="row.device[0]"
                :images="row.images" :confirmStatus="row.confirmStatus" :confirmResult="row.confirmResult"
                :pushStatus="row.pushStatus" :formConfigItems="formConfigItems" @handle="handle(row, formConfigItems)"
                :key="row.id" /> -->
            <AlgorithmCard :cnName="row.cnName" :info="row.info" :images="row.images" :formConfigItems="formConfigItems"
                :alarmType="row.alarmType[0].dictLabel" :key="row.id" @handle="handle(row, formConfigItems)"/>

        </template>
    </PageDynamicTableCustomizationSimplest>

    <AlarmHandle ref="alarmHandle" title="AI告警确认" :aiAlarmRecord="aiAlarmRecord" :images="images"
        :formConfigItems="formConfigItems" @refresh="refresh" />


</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import { alaDownload } from '@/utils/req';
import u from '@/utils/u';


const beforeQuery = (params: any) => {
    const p = u.merged(params, {})
    return p
}

const formatTime = (time: number) => {
    return date.formatDateTime(time, date.F_YYYY_MM_DD_HH_mm_ss)
}

const pageList = ref()

const alarmHandle = ref()
const aiAlarmRecord = ref()
const formConfigItems = ref<Array<any>>()

interface AFile {
    id: number,
    fid: string,
    fileName: string
    classify: string
    url: string
}
interface Image {
    src: string,
    fid: string
}

const images = ref<Array<string>>([])

const handle = (row: any, fConfigItems: Array<any>) => {

    // aiAlarmRecord.value = row
    // formConfigItems.value = fConfigItems

    console.log('row:',row);
    


}

const refresh = () => {
    pageList.value.refresh()
}

</script>
