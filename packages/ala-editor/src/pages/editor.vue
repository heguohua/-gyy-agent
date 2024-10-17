<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:45:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 20:48:28
 * @FilePath: /low-coding/packages/ala-editor/src/pages/editor.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor">
        <EditorHeader />

        <div class="container">
            <EditorBlock />
            <EditorRender />
            <!-- <EditorConfig /> -->
            <!-- <button @click="getLoveMessage()">Change</button> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { useAlaStore } from '@/store/ala-store';
import { getUserInfo, login } from '../api/user';
import { queryLoveMessage } from '@/utils/tuwei';
import { logger } from '@/utils/logger';


// State


// Methods

// const a = ref(1)
// console.log(a);


// onMounted(async () => {
//     login({ "username": "admin", "password": "12345678" })
//     const res = await getUserInfo()
//     console.log('res.data', res);
// })


// onMounted(async () => {
//     login({ "username": "admin", "password": "123456789" })
//     const res = await getUserInfo()
//     console.log('res.data', res);
// })

async function getLoveMessage() {
    const msg = await queryLoveMessage()
    logger.info(msg)
}



</script>

<style scoped lang="scss">
.editor {
    width: 100%;
    overflow-x: hidden;
    user-select: none;
    --edit-header-height: 64px;
    --edit-block-width: 300px;

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