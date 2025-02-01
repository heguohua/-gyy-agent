<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-01 22:49:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/table/ala-simple-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-simple-table-wrapper">
        <table>
            <thead class="thead">
                <tr>
                    <th v-for="(header, index) in headers" :key="index">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(header, index) in headers" :key="rowIndex + '-' + index">
                        {{ row[header.name] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';


interface Header {
    name: string, // 属性名
    label: string // 字段名
}

interface Row {
    [key: string]: any
}

// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    currentId: { // 当前被渲染组件ID
        type: String,
    },
    block: { // 当前被渲染组件 block
        type: Object,
    },
    bType: {
        type: String,
        default: 'page'
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    headers: {
        type: Array<Header>,
        default: () => ([])
    },
    rows: {
        type: Array<Row>,
        default: () => ([])
    },
})

const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init"])


// Methods

logger.info(`bType[ ${props.bType} ]，渲染 动态表格 ala-simple-table 组件，props：`, props);


// // 发送组件初始化消息




</script>

<style scoped lang="scss">
.ala-simple-table-wrapper {
    height: calc(100% - 70px);

    table {
        display: block;
        height: 100%;
        width: 100%;
        overflow-x: auto;

        .thead {
            background: var(--ala-color-bg);
            height: 38px;
            position: sticky;
            top: 0;
            tr {
                th {
                    text-align: left;
                    padding: 4px 8px;
                }
            }
        }

        tbody {
            // display: block;
            overflow-y: auto;

            tr {
                border-bottom: 1px solid var(--ala-color-bg);

                td {
                    text-align: left;
                    padding: 4px 8px;
                }
            }
        }
    }
}
</style>