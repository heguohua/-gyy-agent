<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 13:49:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectTableColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="select-table">
        <div class="ala-select-table-value" v-for="(item, index) in showValue">
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">

// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Array<any>,
        default: []
    }
})

// Methods
const showValue = computed(() => {
    const values = props.value
    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    const results: string[] = []

    if (values && values.length > 0) {
        values.forEach((v: string) => {
            results.push(v[propertyName])
        })
    }
    return results
})

</script>

<style scoped lang="scss">
.select-table {
    display: block !important;

    .ala-select-table-value {
        background-color: var(--el-fill-color);
        padding: 0px 4px;
        border-radius: 3px;
        display: inline-block;
        margin-bottom: 2px;
    }
}
</style>
