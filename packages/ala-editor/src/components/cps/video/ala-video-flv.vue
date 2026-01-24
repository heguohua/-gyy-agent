<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-08-04 19:15:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-24 10:41:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/video/ala-video-flv.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-video-flv">
        <div ref="playerRef" class="player-container"></div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
// 核心播放器
import Player from 'xgplayer'
// FLV 插件
import FlvPlayer from 'xgplayer-flv'

// 样式（必须引）
import 'xgplayer/dist/index.min.css'

// State
const props = defineProps({
    url: {
        type: String,
        default: () => ''
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    fluid: {
        type: Boolean,
        default: true
    }
})

const video_logo = import.meta.env.VITE_VIDEO_LOGO

const playerRef = ref(null)
let player = null

onMounted(() => {

    player = new Player({
        el: playerRef.value,
        url: props.url,
        isLive: true,
        playsinline: true,
        poster: '/charts/' + video_logo,
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
<style lang="scss" scoped>
.ala-video-flv {
    .player-container {
        width: 100% !important;
        // min-height: 800px;
    }
}
</style>
