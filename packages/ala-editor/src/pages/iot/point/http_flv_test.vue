<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-24 08:41:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-24 17:45:15
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/http_flv_test.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 播放器容器 -->
    <div ref="playerRef" class="player-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
// 核心播放器
import Player from 'xgplayer'
// FLV 插件
import FlvPlayer from 'xgplayer-flv'

// 样式（必须引）
import 'xgplayer/dist/index.min.css'

const playerRef = ref(null)
let player = null

onMounted(() => {
    player = new Player({
        el: playerRef.value,
        url: 'http://127.0.0.1:2060/live?url=/Users/darcy/Downloads/38148_2025_12_19_08.ts&&&isLocal=true&&&ffmpeg=true&&&autoClose=true',
        isLive: true,
        playsinline: true,
        poster: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
        plugins: [FlvPlayer],
    })
})

onBeforeUnmount(() => {
    if (player) {
        player.destroy()
        player = null
    }
})
</script>

<style scoped>
.player-container {
    width: 100%;
    height: 100%;
}
</style>