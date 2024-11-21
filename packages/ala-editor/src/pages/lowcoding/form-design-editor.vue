<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:45:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 15:49:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/lowcoding/form-design-editor.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor">
        <!-- <EditorHeader /> -->

        <div class="container" :class="classes">
            <EditorBlock :bType="bType" :menuList="menuList" :baseBlocks="baseBlocks" :seniorBlocks="seniorBlocks" />
            <EditorRender :bType="bType" />
            <EditorConfig :bType="bType" />
            <!-- <button @click="getLoveMessage()">Change</button> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { queryLoveMessage } from '@/utils/tuwei';
import { logger } from '@/utils/logger';
import { useEditorStore } from '@/store/useEditorStore';
import { baseBlocks, seniorBlocks } from "@/config/blocks"
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const bType = 'form'
const editorStore = useEditorStore()

// Methods
const classes = computed(() => {
    return { "mobile-background": editorStore.isMobileViewport(bType) }
})


interface Menu {
    icon: string,
    iconActive: string,
    name: string,
}
const menuList = computed(() => {
    return [
        {
            icon: "block",
            iconActive: "blockActive",
            name: t("module.lowcoding.baseName")
        },
        {
            icon: "kit",
            iconActive: "kitActive",
            name: t("module.lowcoding.kitName")
        }
    ]
})



</script>

<style scoped lang="scss">
.editor {
    width: 100%;
    overflow-x: hidden;
    user-select: none;
    --edit-header-height: 100px;
    --edit-block-width: 300px;
    --border-radius-editor: 4px;

    .container {
        display: flex;
        width: 100%;
        min-width: 100%;

        &.mobile-background {
            background: var(--color-bg);
        }
    }
}
</style>