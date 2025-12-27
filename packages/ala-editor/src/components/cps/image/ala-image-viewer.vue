<template>
    <div class="image-viewer">
        <!-- 左箭头 -->
        <div class="arrow left" :class="{ disabled: !hasPrev }" @click="prev">
            <img class="left-arrow" src="/ai/left-arrow.svg" />
        </div>

        <!-- 图片 -->
        <img class="image" :src="currentImage" alt="image" />

        <!-- 右箭头 -->
        <div class="arrow right" :class="{ disabled: !hasNext }" @click="next">
            <img class="right-arrow" src="/ai/left-arrow.svg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import u from '@/utils/u';
import { computed, ref, watch } from 'vue'

const props = defineProps({
    images: {
        type: Array<string>,
        default: () => []
    }
})

const currentIndex = ref(0)

/** 当前图片 */
const currentImage = computed(() => {

    const image = props.images[currentIndex.value]

    return image
})


/** 是否有上一张 */
const hasPrev = computed(() => currentIndex.value > 0)

/** 是否有下一张 */
const hasNext = computed(() => currentIndex.value < props.images.length - 1)

/** 上一张 */
const prev = () => {
    if (!hasPrev.value) return
    currentIndex.value--
}

/** 下一张 */
const next = () => {
    if (!hasNext.value) return
    currentIndex.value++
}

/** 当图片数组变化时，防止越界 */
watch(() => props.images, (newImages) => {
    if (!newImages) {
        return
    }

    if (currentIndex.value >= newImages.length) {
        currentIndex.value = newImages.length - 1
    }
})
</script>

<style scss scoped>
.image-viewer {
    position: relative;
    width: 100%;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    user-select: none;


    /* 箭头公共样式 */
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        cursor: pointer;
        user-select: none;
        padding: 8px;
        background: rgb(64, 158, 255, 0.6);
        border-radius: 50%;
        transition: opacity 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        .left-arrow {
            width: 38px;
            margin: 18px 6px;
        }

        .right-arrow {
            width: 38px;
            margin: 18px 6px;
            transform: rotateY(180deg);
        }

        &:hover {
            background: rgba(64, 158, 255, 0.8);
        }
    }

    /* 图片 */
    .image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    /* 左右位置 */
    .left {
        left: 10px;
    }

    .right {
        right: 10px;
    }

    /* 禁用状态 */
    .disabled {
        opacity: 0.3;
        cursor: not-allowed;
        pointer-events: none;
    }

}
</style>