<template>
    <div class="image-viewer">
        <!-- 左箭头 -->
        <div class="arrow left" :class="{ disabled: !hasPrev }" @click="prev">
            ◀
        </div>

        <!-- 图片 -->
        <img class="image" :src="currentImage" alt="image" />

        <!-- 右箭头 -->
        <div class="arrow right" :class="{ disabled: !hasNext }" @click="next">
            ▶
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
    images: string[]
    defaultIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
    defaultIndex: 0,
})

const currentIndex = ref(props.defaultIndex)

/** 当前图片 */
const currentImage = computed(() => {
    return props.images[currentIndex.value]
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
watch(
    () => props.images,
    (newImages) => {
        if (currentIndex.value >= newImages.length) {
            currentIndex.value = newImages.length - 1
        }
    }
)
</script>

<style scoped>
.image-viewer {
    position: relative;
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    overflow: hidden;
}

/* 图片 */
.image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

/* 箭头公共样式 */
.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    padding: 8px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    transition: opacity 0.2s;
}

.arrow:hover {
    background: rgba(0, 0, 0, 0.6);
}

/* 左右位置 */
.arrow.left {
    left: 10px;
}

.arrow.right {
    right: 10px;
}

/* 禁用状态 */
.arrow.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

</style>