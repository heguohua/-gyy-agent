<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 17:51:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/SwitchColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    {{ showValue }}
</template>

<script setup lang="ts">

// State
const props = defineProps({
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: String,
        default: ''
    }
})

// Methods
const showValue = computed(() => {
    let value = props.value
    const activeText = props.formItem.formData.activeText.desktop
    const activeValue = props.formItem.formData.activeValue.desktop
    const inActiveText = props.formItem.formData.inActiveText.desktop
    const inActiveValue = props.formItem.formData.inActiveValue.desktop
    if (value === activeValue) {
        value = activeText
    }
    if (value === inActiveValue) {
        value = inActiveText
    }
    return value
})

</script>

<style scoped lang="scss"></style>
