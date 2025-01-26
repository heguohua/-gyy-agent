<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-24 10:14:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-block-drag.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <draggable :list="list" :group="group" :sort="sort" animation="200" item-key="id" ghost-class="ghost-class"
        class="edit-block-drag" :clone="clone" :move="move">

        <template #item="{ element }">

            <div class="block-item">
                <v-icon class="block-icon" :icon="element.icon" />
                <div class="block-name">{{ element.name }}</div>
            </div>

        </template>

    </draggable>

</template>

<script setup lang="ts">

import { move, clone, dragGroup } from "@/components/editor/nested"

const props = defineProps({
    list: {
        type: Array,
        required: true,
        default: () => []
    },
    group: {
        type: [String, Object],
        default: 'group'
    },
    sort: {
        type: Boolean,
        default: false
    },
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

// State

// Methods

</script>

<style scoped lang="scss">
.edit-block-drag {
    display: flex;
    flex-wrap: wrap;

    .block-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: grab;
        width: 33.333%;
        aspect-ratio: 1 / 1;
        text-align: center;
        border-radius: var(--border-radius);
        align-items:center;

        &:active {
            cursor: grabbing;
        }

        &:hover {
            background: var(--color-block-hover);
            border: 1px solid var(--color-border);
        }

        .block-icon {
            width: 20px;
            height: 20px;
            margin: 0 auto;
        }

        .block-name {
            font-size: 0.8rem;
            line-height: 0.8rem;
            padding-top: 4px;
        }
    }
}

.ghost-class {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    background: var(--color-active-bg);
    border: 1px solid var(--color-active-text);

    img,
    svg {
        width: 20px;
        height: 20px;
        margin: 0 auto;
    }
}
</style>