<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-31 19:05:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-18 17:30:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/popover/ala-popover-info.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-popover-info-wrapper">

        <div class="ala-calendar-cell-short-content" @mouseenter="showPopover($event)" @mouseleave="hidePopover()"
            @click.stop="">
            <slot name="shortContent" />

            <div class="ala-calendar-cell-detail-content" v-if="popoverStates.visible" :style="popoverStates.styles">
                <slot name="detailContent" />
            </div>
        </div>



    </div>

</template>

<script setup lang="ts">
import u from '@/utils/u'


// State
const props = defineProps({
    key: {
        type: String,
        default: () => ""
    },
    trigger: {
        type: String as PropType<'click' | 'hover' | 'focus'>,
        default: 'click'
    },
    teleported: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(["onShow"])

// Methods
const show = () => {
    emits('onShow')
}

const popoverStates: { [key: string]: any } = ref({
    visible: false,
    styles: {
        position: 'fixed',
    }
})

function showPopover(e: MouseEvent) {

    const position = u.getElementPositionInfo(e)

    if (!popoverStates.value.visible) {

        const ratio = 2
        u.merged(popoverStates.value, {
            visible: true,
            styles: {
                left: left(position, position?.width, ratio) + 'px',
                top: top(position, position?.height) + 'px',
                width: position?.width * ratio + 'px',
            }
        })
    }

}


const left = (position: any, width: number, ratio: number) => {
    const { distancesToWindow: { left, right }, center: { x } } = position
    if (left >= right) {
        // const l = left - (width) * ratio - width / 2
        const l = x - width / 2 - (width) * ratio
        return l
    } else {
        // const l = left + width - (left - x)
        const l = x + width / 2
        return l
    }
}

const top = (position: any, height: number) => {
    const { distancesToWindow: { top, bottom } } = position
    if (top >= bottom) {
        const t = top - height * 0.8
        return t
    } else {
        const t = top - height * 0.5
        return t
    }
}

function hidePopover() {
    // 可以选择不立即隐藏，让点击内部关闭
    u.merged(popoverStates.value, {
        visible: false,
    })
}

</script>

<style lang="scss">
.ala-popover-info-wrapper {
    position: relative;

    .ala-calendar-cell-detail-content {
        display: flex;
        background: #fff;
        border: 2px solid var(--el-border-color-lighter);
        z-index: 999999;
        border-radius: 4px;
        padding: 1rem 1.6rem;
        align-items: flex-start;
        flex-direction: column;
        max-height: 600px;
        overflow-y: auto;


        &::-webkit-scrollbar {
            width: 4px;
            /* 设置滚动条的宽度 */
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #cfcfcf;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #cfcfcf;
        }
    }
}
</style>
