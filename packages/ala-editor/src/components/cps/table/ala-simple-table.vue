<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-02 16:34:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/table/ala-simple-table.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-simple-table-wrapper">
        <AlaBlankImage v-if="rows.length == 0" title="没有查询到数据，请检查SQL是否书写正确" />
        <table v-if="rows.length > 0">
            <thead class="thead">
                <tr>
                    
                    <th v-for="(header, index) in headers" :key="index">
                        <AlaPopover :src="getIcon(header)" :imageWidth="iconWidth+'px'" :imageHeight="iconHeight+'px'" :text="header.name" trigger="hover">
                            <template #default>
                                {{ header.label }}
                            </template>
                        </AlaPopover>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(header, index) in headers" :key="rowIndex + '-' + index" :class="getTdClass(header)"
                        :data-full-text="row[header.name]">
                        {{ row[header.name] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import alaType from '@/utils/alaType';
import { logger } from '@/utils/logger';


interface Header {
    name: string, // 属性名
    label: string // 字段名
    type: string // 字段类型
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
        default: 16
    },
    iconHeight: {
        type: Number,
        default: 16
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


const getIcon = (header: Header) => {
    return alaType.getIconByColumnType(header.type)
}


const getTdClass = (header: Header) => {
    const alaTypee = alaType.getIconByColumnType(header.type)
    let clazz = ''
    if (alaTypee.indexOf('number') > 0) {
        clazz = 'number'
    } else if (alaTypee.indexOf('date') > 0) {
        clazz = 'date'
    } else if (alaTypee.indexOf('decimal') > 0) {
        clazz = 'decimal'
    } else {
        clazz = ''
    }
    return clazz
}




</script>

<style scoped lang="scss">
.ala-simple-table-wrapper {
    height: calc(100% - 70px);

    table {
        display: block;
        height: 100%;
        width: 100%;
        overflow-x: auto;
        table-layout: fixed;

        .thead {
            background: var(--ala-color-bg);
            height: 38px;
            position: sticky;
            top: 0;
            z-index: 2011;

            tr {
                th {
                    text-align: left;
                    padding: 4px 8px;
                    white-space: nowrap;
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
                    white-space: nowrap;

                    max-width: 250px;
                    /* 设置最大宽度 */
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                td:hover {
                    overflow: auto;
                    white-space: wrap;
                    background: var(--el-color-primary);
                    color: #fff;
                }

                // 数值 类型样式
                .number {
                    color: var(--el-color-success-dark-2);
                    font-weight: bold;
                }

                // 日期 类型样式
                .date {}

                // 小数 类型样式
                .decimal {}
            }

            tr:nth-child(even) {
                /* 设置偶数行的背景色 */
                background-color: var(--ala-color-bg);
            }

            tr:hover {
                background-color: var(--el-color-primary-light-9);
                cursor: pointer;
            }
        }
    }
}
</style>