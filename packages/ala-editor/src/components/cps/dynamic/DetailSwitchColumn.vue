<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-03 11:46:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSwitchColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value" :class="clazz()">{{ showValue }}</p>

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
        type: null as any,
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

const isActive = ref(false)

// Methods
const showValue = computed(() => {
    let value = props.value
    
    const activeText = props.formItem.formData.activeText.desktop
    const activeValue = props.formItem.formData.activeValue.desktop
    const inActiveText = props.formItem.formData.inActiveText.desktop
    const inActiveValue = props.formItem.formData.inActiveValue.desktop


    if (value === activeValue) {
        value = activeText
        isActive.value = true
    }
    if (value === inActiveValue) {
        value = inActiveText
        isActive.value = false
    }
    return value
})

const clazz = () => {
    return isActive.value ? 'positive' : 'negative'
}
</script>

<style scoped lang="scss">
.positive {
    color: var(--el-color-success-dark-2);
}

</style>
