<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-02-01 21:04:01
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-01 21:38:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/blank/ala-blank-image.vue
 * @Description:
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-blank-image">
        <img :src="src" />
        <p>{{ title }}</p>
    </div>
</template>

<script setup lang="ts">

// State
const props = defineProps({
    src: {
        type: String,
        default: '/nothing-none.png'
    },
    title: {
        type: String,
        default: '没有要展示的数据。。。'
    },
})

// Methods

</script>

<style scoped lang="scss">
.ala-blank-image {

    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 100%;
    opacity: 0.9;

    padding-top: 30px;

    img {
        max-width: 126px;
    }

    p {}
}
</style>