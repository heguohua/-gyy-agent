<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-24 08:41:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-24 09:00:19
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

/**
 * xgplayer 使用 CDN 方式加载
 * 如果你想用 npm 安装版本，我可以再给你一版
 */
let player = null
const playerRef = ref(null)
import u from '@/utils/u';

onMounted(async () => {
    // 动态加载 CSS
    const loadCss = (href) =>
        new Promise((resolve) => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = href
            link.onload = resolve
            document.head.appendChild(link)
        })

    // 动态加载 JS
    const loadScript = (src) =>
        new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = resolve
            document.body.appendChild(script)
        })

    await loadCss('https://unpkg.byted-static.com/xgplayer/3.0.23/dist/index.min.css')
    await loadScript('https://unpkg.byted-static.com/xgplayer/3.0.23/dist/index.min.js')
    await loadScript('https://unpkg.byted-static.com/xgplayer-flv/3.0.23/dist/index.min.js')

    // eslint-disable-next-line no-undef
    const { Player } = window
    // eslint-disable-next-line no-undef
    const FlvPlayer = window.FlvPlayer

    const config = {
        el: playerRef.value,
        url: 'http://100.127.203.57:2060/live?url=/Users/darcy/Downloads/38148_2025_12_19_08.ts&&&isLocal=true&&&ffmpeg=true',
        playsinline: true,
        poster: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
        isLive: true,
        plugins: [FlvPlayer]
    }

    player = new Player(config)
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