<template>
    <div class="editor">
        <EditorHeader />

        <div class="container">
            <EditorBlock />
            <EditorRender />
            <EditorConfig />
            <button @click="getLoveMessage()">Change</button>
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
    .container {
        background-color: red;
    }
}
</style>