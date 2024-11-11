<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 14:09:24
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 16:01:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/LoadingBar/LoadingBar.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div ref="bar" v-show="isShow" class="loading-bar"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isShow = ref(false)
const show = () => {
    startLoading()
};

let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)
const startLoading = () => {
    isShow.value = true
    let dom = bar.value as HTMLDivElement;
    speed.value = 1
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 95) {
            speed.value += 2
            dom.style.width = speed.value + '%'
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1
            window.cancelAnimationFrame(timer.value)
        }
    })
}

const endLoading = () => {
    let dom = bar.value as HTMLDivElement;
    window.requestAnimationFrame(() => {
        speed.value = 100
        dom.style.width = speed.value + '%'
        setTimeout(() => {
            isShow.value = false
        }, 600)
    })
}

const hide = () => {
    endLoading()
};

// 暴露方法
defineExpose({ show, hide });
</script>

<style scoped lang="scss">
.loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #1d78ff96, var(--ala-color-blue));
    transition: width 0.3s, opacity 0.3s;
    opacity: 1;
    z-index: 999;
    width: 0px;
}

.loading-bar-enter-active,
.loading-bar-leave-active {
    transition: opacity 0.5s;
}

.loading-bar-enter,
.loading-bar-leave-to

/* .loading-bar-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>