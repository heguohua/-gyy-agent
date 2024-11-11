<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 14:13:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/App.vue
 * @Description: APP.vue 主文件
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala">
        <!-- <Layout v-if="checkLogin" /> -->
        <Layout v-if="checkLogin" />
        <Login v-else />
    </div>
</template>

<script setup>
import { alaConsts } from './config/alaConsts';
import Layout from './pages/layout/layout.vue';
import Login from './pages/login.vue';
import { logger } from './utils/logger';
import lstore from './utils/lstore';

const checkLogin = computed(() => {
    let isLogined = false;
    if (lstore.getItem(alaConsts.is_logined_key)) {
        isLogined = true;
        logger.warn("用户登录状态检测：已登录，直接渲染Layout页面");
    } else {
        logger.warn("用户登录状态检测：未登录，渲染Login页面");
    }
    return isLogined;
})
</script>
<style lang="scss" scoped></style>
