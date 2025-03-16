<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-16 10:01:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/App.vue
 * @Description: APP.vue 主文件
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala">
        <!-- <Layout v-if="checkLogin" /> -->
        <AlaElConfigProvider>
            <Layout v-if="checkLogin" />
            <Login v-else />
        </AlaElConfigProvider>
    </div>
</template>

<script setup lang="ts">
import { alaConsts } from '@/config/alaConsts';
import Layout from '@/pages/layout/layout.vue';
import Login from '@/pages/login.vue';
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';
import u from '@/utils/u';
import { WebSocketClient } from '@/utils/websocket';
import { useAlaStore } from '@/store/ala-store';
const alaStore = useAlaStore()

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

// 建立 ws 连接
let ws: WebSocketClient

onMounted(() => {
    const wsUrl = u.wsUrl()
    ws = new WebSocketClient(wsUrl);
    ws.on('ws:message', (event: MessageEvent) => {

        const outMessage = u.parseJson(event.data)
        const message = u.parseJson(outMessage.content)
        if (message.messageType && message.messageType === 'ai_full') {
            // 当前是ai智能体回复的完整消息体
            alaStore.set('ai_message', message)
        } else if (message.content === 'pong') {
            console.log('接收到 ws 服务端【 心跳回复 】');
        }



    });
});

onUnmounted(() => {
    if (ws) {
        ws.close();
    }
});


</script>
<style lang="scss" scoped></style>
