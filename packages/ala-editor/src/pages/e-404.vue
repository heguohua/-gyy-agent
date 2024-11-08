<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 20:07:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 20:15:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/e-404.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="not-found-page">
        <h1>404 - 页面未找到</h1>
        <p>抱歉，您访问的页面不存在。</p>
        <router-link to="/" class="home-link">返回首页</router-link>
    </div>
</template>

<script setup>
// 使用<script setup>语法简化组件定义
</script>

<style scoped lang="scss">
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

    .home-link {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #38a0fb;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #399ffa;
            transform: scale(1.02);
        }
    }
}
</style>