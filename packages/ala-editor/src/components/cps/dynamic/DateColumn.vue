<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 17:14:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    {{ formatDateTime(value, formItem.formData.format.desktop) }}
</template>

<script setup lang="ts">

// State
defineProps({
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Number,
        default: 0
    }
})

// Methods
const formatDateTime = (timestamp: number, formatString: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const formatMap: { [key: string]: any } = {
        'YYYY': year,
        'MM': month < 10 ? '0' + month : month,
        'DD': day < 10 ? '0' + day : day,
        'HH': hour < 10 ? '0' + hour : hour,
        'mm': minute < 10 ? '0' + minute : minute,
        'ss': second < 10 ? '0' + second : second
    };

    return formatString.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => formatMap[match]);
}
</script>

<style scoped lang="scss"></style>
