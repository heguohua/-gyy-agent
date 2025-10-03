<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-06 10:52:22
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailRadioColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value" :style="style">{{ showValue }}</p>

</template>

<script setup lang="ts">
import u from '@/utils/u'


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
        type: [String, Number, Boolean, Object] as PropType<string | number | boolean | object>,
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

const color = ref('')
const style = computed(() => {
    const st = {}

    if (color.value) {
        u.merged(st, { color: color.value, fontWeight: 'bold' })
    }

    return st
})


// 2025-6-9 修复分页列表、详情页面值回显异常bug
const showValue = computed(() => {
    const value = props.value
    const items = props.formItem.formData.items.desktop

    let v = undefined

    if (items) {
        items.forEach((item: any) => {

            Object.keys(item).forEach((key: string) => {

                if (item[key] === value) {
                    v = key
                    if (item.name) {
                        v = item.name
                    }
                    if (item.color) {
                        color.value = item.color
                    } else {
                        color.value = ''
                    }
                }
            })

        })
    }

    return v
})

</script>

<style scoped lang="scss"></style>
