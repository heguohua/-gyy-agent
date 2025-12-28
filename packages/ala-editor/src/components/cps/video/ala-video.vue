<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-12-28 22:03:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-28 22:06:06
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/video/ala-video.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-video">
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls autoplay playsinline muted></video>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * props 定义
 */
const props = defineProps < {
    url: string
} > ()

/**
 * video 元素引用
 */
const videoPlayer = ref < HTMLVideoElement | null > (null)

/**
 * 设置并播放视频
 */
const loadAndPlay = async (url: string) => {
    const video = videoPlayer.value
    if (!video || !url) return

    // 停止旧视频
    video.pause()

    // 关键：先清空 src，避免切换 url 不生效
    video.removeAttribute('src')
    video.load()

    // 设置新视频
    video.src = url
    video.load()

    try {
        await video.play()
    } catch (e) {
        // 自动播放被浏览器拦截（非静音等情况）
        console.warn('Video autoplay blocked:', e)
    }
}

/**
 * 初次挂载
 */
onMounted(() => {
    if (props.url) {
        loadAndPlay(props.url)
    }
})

/**
 * url 变化时自动切换视频
 */
watch(
    () => props.url,
    (newUrl) => {
        if (newUrl) {
            loadAndPlay(newUrl)
        }
    }
)

/**
 * 卸载时释放资源
 */
onBeforeUnmount(() => {
    const video = videoPlayer.value
    if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
    }
})
</script>

<style scoped>
video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>