<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-25 08:51:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 22:51:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/camera/alarm-card.vue
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

            {{ row.images }}

        </template>
    </PageDynamicTableCustomizationSimplest>
</template>

<script setup lang="ts">
import u from '@/utils/u';


const beforeQuery = (params: any) => {
    const p = u.merged(params, {})
    return p
}

</script>

<style scoped lang="scss"></style>