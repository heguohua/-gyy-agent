<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:22:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 17:50:19
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <editor-render-drag :list="list" :group="dragGroup" class="render">

    </editor-render-drag>
    <el-empty class="empty" v-if="!list?.length" description="请拖拽左侧组件到此处">
        <template #image>
            <v-icon class="icon" icon="dragBlank" />
        </template>
    </el-empty>
</template>

<script setup lang="ts">
import { BaseBlock } from '@/types/edit';
import { dragGroup } from './nested';

const list = ref<BaseBlock[]>([])

// State


// Methods

</script>

<style scoped lang="scss"></style>