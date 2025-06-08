<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-07 20:44:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectTableColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value">
    <div class="select-table">
        <div class="ala-select-table-value" v-for="(item, index) in showValue">
            {{ item }}
        </div>
    </div>
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
        type: Array<any>,
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
console.log('props:',props);
const formData = props.formItem.formData
const params = formData.params.desktop
const url = formData.url.desktop

// Methods
const showValue = computed(() => {
    const values = toRaw(props.value)
    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    const results: string[] = []

    if (values && values.length > 0) {
        values.forEach((v: string) => {
            results.push(v[propertyName])
        })
    }
    return results
})
function myInitLogic() {
  console.log("组件被创建时立即执行，不需要挂载");
}

// 组件一创建，setup 执行时就会自动调用
myInitLogic();
</script>

<style scoped lang="scss">
.select-table {
    display: flex;
    gap: 4px;

    .ala-select-table-value {
        background-color: var(--el-fill-color);
        padding: 0px 4px;
        border-radius: 3px;
        display: inline-block;
    }

    &:hover {
        color: var(--el-menu-active-color);
        cursor: pointer;
        font-weight: bold;
    }
}
</style>
