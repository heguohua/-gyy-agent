<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-25 08:51:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-27 17:39:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/camera/page-table-alarm-card.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

    <PageDynamicTableCustomizationSimplest className="aiAlarmRecords" :beforeQuery="beforeQuery"
        :pageSize="[8, 12, 16, 20]" :defaultPageSize="8" ref="pageList">

        <template #header>
            <div class="ccc">
                ddd
            </div>
        </template>

        <template #default="{ row, formConfigItems }">

            <AlarmCard :alarmType="row.alarmType[0].dictLabel" :time="formatTime(row.time)" :camera="row.device[0]"
                :images="row.images" :confirmStatus="row.confirmStatus" :confirmResult="row.confirmResult"
                :pushStatus="row.pushStatus" :formConfigItems="formConfigItems" @handle="handle(row,formConfigItems)" />

        </template>
    </PageDynamicTableCustomizationSimplest>

    <AlarmHandle ref="alarmHandle" title="AI告警确认" :aiAlarmRecord="aiAlarmRecord" :images="images" :formConfigItems="formConfigItems"/>


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

const handle = (row: any,fConfigItems:Array<any>) => {

    aiAlarmRecord.value = row
    formConfigItems.value = fConfigItems

    if (row.images) {

        const tmp_images = u.parseJson(row.images) || []

        const imgs: Array<string> = []

        tmp_images.forEach(async (image: AFile) => {

            const result = await alaDownload(u.url('/f/ossfile/download'), { fid: image.fid }).then((data: any) => {
                const response = data;
                return response
            })

            const blob = new Blob([result.data])
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64 = reader.result
                let imageType = u.fileExtension(image.fileName)
                if (imageType === 'svg') {
                    imageType = 'svg+xml'
                }
                if (typeof base64 === 'string') {
                    images.value.push(base64.replace('data:application/octet-stream', `data:image/${imageType}`))
                }
            }

            reader.onerror = (e) => {
                console.log('e:', e)
            }

            reader.readAsDataURL(blob) // 转成 base64

        })

        images.value = imgs

    }


    alarmHandle.value.openDialog()

    // pageList.value.refresh()

}

</script>

<style scoped lang="scss"></style>