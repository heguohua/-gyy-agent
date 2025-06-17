<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-17 16:10:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailChildTableCountColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value" @click="handleClick"><i :style="style">
            {{ showValue }}</i>{{ unit }}

        <teleport to="body" v-if="showDetailPage">
            <AlaDetailPageTable :data="detailItem" v-model="showDetailPage" :fields="detailFields"
                :formAttr="formAttr" />
        </teleport>
        
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
        type: Number,
        default: () => 0
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

const style = computed(() => {
    const st = { marginRight: '6px' }

    let value = props.value || 0
    const backgroundNum = props.formItem.formData.backgroundNum?.desktop
    const colors = props.formItem.formData.colors?.desktop
    const index = u.findIntervalIndex(backgroundNum, value)

    if (colors && colors.length > 0) {
        u.merged(st, { color: colors[index] })
    }

    return st
})



// 2025-6-9 修复分页列表、详情页面值回显异常bug
const showValue = computed(() => {
    let value = props.value || 0
    return value
})

const unit = computed(() => {
    const unit = props.formItem.formData.unit?.desktop
    return unit
})



const detailItem = ref({})
const detailFields = ref<Array<any>>([])
const formAttr = reactive({
    formWidth: 800,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false
})

const showDetailPage = ref(false)

const handleClick = () => {
    showDetailPage.value = true
}

</script>

<style scoped lang="scss">
.value {
    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
}
</style>
