 
<template>
    <div class="editor">
        <EditorHeader/>
        <div class="container">
            <EditorBlock/>
            <EditorRender/>
            <EditorConfig/>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import EditorBlock from '@/components/editor/editor-block.vue'
import EditorHeader from '@/components/editor/editor-header.vue'

// State


// Methods

</script>

<style scoped lang="scss">
.editor {
    .container {
        background-color: red;
    }
}
</style>