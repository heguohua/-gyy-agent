<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:57:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-02 20:17:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/design.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <ProcessDesignNoCache :id="designId"/>
</template>

<script setup lang="ts">
import ProcessDesignNoCache from '@/pages/process/processDesign.vue';

const route = useRoute()

const designId = computed(() => {
    if (route.query.id) {
        return Number.parseInt(route.query.id as string)
    }
    return undefined
})


</script>

<style scoped lang="scss"></style>