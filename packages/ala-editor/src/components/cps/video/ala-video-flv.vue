<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-08-04 19:15:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-24 08:56:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/video/ala-video-flv.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-video-flv">
        <!-- <video ref="videoPlayer" class="video-js vjs-default-skin" controls autoplay playsinline muted></video> -->

        <video ref="videoRef" controls autoplay muted style="width: 100%; height: 100%; background: black" />

    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

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


const videoRef = ref(null)
let flvPlayer = null

onMounted(() => {

    console.log('props.url:','http://localhost:5173/v/38148_2025_12_19_08.ts.flv');
    
    if (flvjs.isSupported()) {
        flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost:5173/v/live?url=/Users/darcy/Downloads/38148_2025_12_19_08.ts&&&isLocal=true',
            isLive: true,          // 直播流
            hasAudio: true,
            hasVideo: true
        }, {
            // enableWorker: true,    // 使用 Web Worker
            stashInitialSize: 128  // 降低首帧延迟
        })

        flvPlayer.attachMediaElement(videoRef.value)
        flvPlayer.load()
        flvPlayer.play()
    } else {
        console.error('当前浏览器不支持 flv.js')
    }
})

onBeforeUnmount(() => {
    if (flvPlayer) {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
    }
})

</script>