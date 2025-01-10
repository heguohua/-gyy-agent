<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-10 11:39:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailImageColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <template v-if="isDetailColumn">
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <div v-for="(url, index) in value" :key="index" class="ala-image detail-link" @click="showDetail">
            <img class="image" :src="url" :style="{ width: width, height: height }" />
        </div>
    </template>
    <template v-else>
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <div v-for="(url, index) in value" :key="index" class="ala-image">
            <img class="image" :src="url" :style="{ width: width, height: height }" />
        </div>
    </template>

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
        type: Array<string>,
        default: () => ([])
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

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})
console.log('value:', props.value);

const emit = defineEmits(['showDetail'])
const showDetail = () => {
    emit('showDetail', props.data)
}

// Methods

const width = computed(() => {
    return props.formItem.formData.width?.desktop || ''
})

const height = computed(() => {
    return props.formItem.formData.height?.desktop || ''
})

</script>

<style scoped lang="scss">
.ala-image {
    display: inline-flex;
    align-items:center;
    justify-content: center;
}




</style>
