<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:59:53
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 18:06:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/card/card-info.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-card">
        <div class="ala-card-image" :style="{ borderRadius: borderRadius, backgroundColor: backgroundColor }">
            <img :src="getImageSrc(imageSrc)" :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }" />
        </div>
        <div class="ala-card-content">
            <p class="title">
                {{ title }}
            </p>
            <p class="remark">
                {{ value }}

            </p>

        </div>
    </div>


</template>

<script setup lang="ts">
import { PropType } from 'vue';



// State
const props = defineProps({

    imageSrc: {
        type: String,
        default: ''
    },

    title: {
        type: String,
        default: ''
    },

    value: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },

    imageWidth: {
        type: Number,
        default: 36
    },
    imageHeight: {
        type: Number,
        default: 36
    },
    backgroundColor: {
        type: String,
        default: ''
    },
})

// 图片高度
const src = '/flow/'
const getImageSrc = (url: String) => {
    const imgSrc = url ? src + url : src + 'leave.svg'
    return imgSrc
}


const borderRadius = computed(() => {
    const r = (props.imageWidth + 12 * 2) / 2
    return r + 'px'
})

</script>

<style scoped lang="scss">
.ala-card {

    display: inline-flex;
    padding: 20px 30px;
    background: #ffffff;
    border-radius: 6px;
    transition: box-shadow 0.3s ease-in-out;
    align-items: center;

    &:hover {
        box-shadow:
            0 0 14px 4px rgb(243, 247, 250, 1),
    }

    .ala-card-image {
        padding: 12px;
        // background: radial-gradient(circle, rgb(64 158 255 / 93%) 50%, rgb(64 158 255 / 99%) 100%);
        margin-right: 16px;
        /* 平滑过渡效果 */
        transition: transform 0.3s ease;

        &:hover {
            /* 放大 0.1 倍 */
            transform: scale(1.1);
        }
    }

    .ala-card-content {
        text-align: left;

        .title {
            font-size: 1.1rem;
            font-weight: bold;
        }

        .remark {
            margin-top: 4px;
            font-size: 0.9rem;
            color: var(--el-text-color-regular);
        }
    }

    &:hover {
        cursor: pointer;
    }


}
</style>