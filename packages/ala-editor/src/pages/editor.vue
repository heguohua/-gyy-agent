<template>
    <div class="editor">
        <EditorHeader />

        <div class="container">
            <EditorBlock />
            <EditorRender />
            <EditorConfig />

        </div>

    </div>
</template>

<script setup lang="ts">
import { getUserInfo, login } from '../api/user';



// State


// Methods

const a = ref(1)
console.log(a);


// onMounted(async () => {
//     login({ "username": "admin", "password": "12345678" })
//     const res = await getUserInfo()
//     console.log('res.data', res);
// })


onMounted(async () => {
    login({ "username": "admin", "password": "123456789" })
    const res = await getUserInfo()
    console.log('res.data', res);
})


</script>

<style scoped lang="scss">
.editor {
    .container {
        background-color: red;
    }
}
</style>