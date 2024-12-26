<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 16:34:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailCheckboxColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }}</p>
    <p class="value">{{ showValue }}</p>
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
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    }
})

// Methods
const showValue = computed(() => {
    const values = props.value.split(',')
    const items = props.formItem.formData.items.desktop
    const results: string[] = []

    if (items) {
        items.forEach((item: any) => {
            values.forEach((v: string) => {
                if (item.value === v) {
                    results.push(item.name)
                }
            })
        })
    }
    return results.join('、')
})

</script>

<style scoped lang="scss"></style>
