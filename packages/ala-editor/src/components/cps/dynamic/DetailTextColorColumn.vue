<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:23:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTextColorColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ minWidth: labelWidth }">
        <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" :alaComponent="formItem.code"
                    :alaFieldName="formItem.formData.fieldName.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
    </p>
    <p class="value">
        <i :style="styles">{{ value }}</i>
    </p>

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
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

const styles = computed(() => {

    let value = props.value
    const colors: { [key: string]: string } = props.formItem.formData.colors.desktop
    const background: { [key: string]: string } = props.formItem.formData.background?.desktop

    if (background) {
        const color = colors[value + '']
        return { background: colors[value + ''], color: color ? '#fff' : '' }
    } else {
        const color = colors[value + '']
        return { color: color ? color : '', fontWeight: 'bold' }
    }

})

const emit = defineEmits(['showDetail', 'refresh'])
const showDetail = () => {
    emit('showDetail', props.data)
}
</script>

<style scoped lang="scss">
.value {
    i {
        border-radius: 4px;
        padding: 1px 8px;
        display: inline-block;

    }
}
</style>
