<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-25 08:25:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSwitchImageColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value" v-if="isDetailPage">
        <img :src="showValue" :width="height" :title="title" /> 【 {{ imageTitle }} 】
    </p>
    <p class="value" v-else>
        <img :src="showValue" :width="height" :title="title" />
    </p>

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
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

// Methods


const height = computed(() => {
    const height = props.formItem.formData.height
    return height ? height : '20px'
})
const title = computed(() => {
    return imageTitle.value
})

const imageSrc = ref('')
const imageTitle = ref('')

const showValue = computed(() => {
    let value = props.value
    const items = props.formItem.formData.items.desktop


    if (items) {
        items.forEach((item: any) => {

            Object.keys(item).forEach((key: string) => {
                if (item[key] === value) {
                    value = key
                    if (item.src) {
                        imageSrc.value = item.src
                        imageTitle.value = item.title
                    } else {
                        imageSrc.value = ''
                    }
                }
            })

        })
    }
    return imageSrc.value
})

</script>

<style scoped lang="scss"></style>
