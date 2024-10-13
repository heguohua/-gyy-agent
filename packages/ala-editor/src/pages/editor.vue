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

// State


// Methods

const a = ref(1)
console.log(a);

</script>

<style scoped lang="scss">
.editor {
    .container {
        background-color: red;
    }
}
</style>