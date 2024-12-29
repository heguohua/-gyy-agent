<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-29 23:14:35
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectDictColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <!-- <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
<p class="value">{{ showValue }}</p> -->

    <template v-if="isDetailColumn">
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <p class="detail-link value" @click="showDetail">{{ showValue() }}</p>
    </template>
    <template v-else>
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <p class="value">{{ showValue() }}</p>

    </template>


</template>

<script setup lang="ts">
import u from '@/utils/u';


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
        type: Array,
        default: []
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
const showValue = () => {
    const values = toRaw(props.value)

    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    const results: string[] = []

    if (values && values.length > 0) {        
        values.forEach((v: any) => {
            results.push(v[propertyName])
        })
    }
    return results.join('，')
}

const emit = defineEmits(['showDetail'])
const showDetail = () => {
    emit('showDetail', props.data)
}

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

</script>

<style scoped lang="scss">
.detail-link {
    color: var(--el-menu-active-color);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        font-weight: 500;
    }
}
</style>
