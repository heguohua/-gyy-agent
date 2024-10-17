<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:22:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 20:49:31
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="edit-render">
        <editor-render-drag :list="list" :group="dragGroup" class="render">

        </editor-render-drag>
        <el-empty class="empty" v-if="!list?.length" description="请拖拽左侧组件到此处">
            <template #image>
                <v-icon class="icon" icon="dragBlank" />
            </template>
        </el-empty>
    </div>
</template>

<script setup lang="ts">
import { BaseBlock } from '@/types/editorType';
import { dragGroup } from './nested';

const list = ref<BaseBlock[]>([])

// State


// Methods

</script>

<style scoped lang="scss">
.edit-render {
    // container-type: inline-size;
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--edit-header-height));
    margin-left: var(--edit-block-width);
    margin-top: var(--edit-header-height);
    background: white;

    &.is-mobile {
        width: 375px;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        margin-top: calc(var(--edit-header-height) + 20px);
        margin-bottom: 20px;
        transform: translateX(10px);
    }

    .empty {
        position: absolute;
        z-index: 0;
        top: 0;
        top: 0;
        width: inherit;
    }

    .render {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
}
</style>