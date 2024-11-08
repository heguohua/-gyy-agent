<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 20:07:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 22:47:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/e-404.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="not-found-page">
        <h1>404 - 页面未找到</h1>
        <p>抱歉，您访问的页面不存在。</p>
        <button @click="goBack">返回</button>
    </div>
</template>

<script setup>
function goBack() {
    window.history.go(-2);
}
</script>

<style scoped>
.not-found-page {
    text-align: center;
    margin-top: 50px;

    h1 {
        font-size: 3rem;
    }

    p {
        margin-top: 0.5rem;
        font-size: 1.5rem;
    }

    button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #38a0fb;
        width: 100px;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.5s ease;

        &:hover {
            background-color: #399ffa;
            transform: scale(1.05);
        }
    }
}
</style>