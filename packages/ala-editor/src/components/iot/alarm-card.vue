<template>
    <div class="ala-alarm-card">
        
        <div class="header">
            <p>{{ type }}</p>
            <p>{{ time }}</p>
            <p>{{ camera }}</p>
        </div>

        <div class="images">
            <p>{{ images }}</p>
        </div>

        <div class="footer">
            <p>{{ confirmStatus }}</p>
            <p>{{ pushStatus }}</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    images: {
        type: Array<string>,
        default: () => []
    },
    type: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    camera: {
        type: String,
        default: ''
    },
    confirmStatus: {
        type: String,
        default: ''
    },
    pushStatus: {
        type: String,
        default: ''
    },
})
// State


// Methods

</script>

<style scoped lang="scss"></style>