<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-08-04 19:15:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-04 21:07:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/video/ala-video-hls.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-video-hls">
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls autoplay playsinline muted></video>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import Hls from 'hls.js'
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

const videoPlayer = ref(null)
let player = null

onMounted(() => {
    
    console.log('props.url:',props.url);
    
    const video = videoPlayer.value

    if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(props.url)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play()
        })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari
        video.src = props.url
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
    }

    player = videojs(video, {
        autoplay: props.autoplay,
        controls: props.controls,
        fluid: props.fluid,
        preload: 'auto'
    })
})

onBeforeUnmount(() => {
    if (player) {
        player.dispose()
    }
})
</script>