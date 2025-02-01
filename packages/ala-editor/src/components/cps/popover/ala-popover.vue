<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-31 19:05:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-01 09:55:45
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/popover/ala-popover.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-popover">
        <el-popover placement="right" :trigger="trigger" @show="show" popper-class="ala-popover-class" :hide-after="0"
            :show-after="200" :teleported="false">
            <template #reference>
                <img v-if="src" :src="src" :style="{ width: imageWidth, height: imageHeight }" />
                <p v-if="text">{{ text }}</p>
            </template>
            <slot></slot>
        </el-popover>
    </div>
</template>

<script setup lang="ts">

// State
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    imageWidth: {
        type: String,
        default: '16px'
    },
    imageHeight: {
        type: String,
        default: '16px'
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

</script>

<style lang="scss">
.ala-popover {
    .ala-popover-class {
        width: auto !important;
    }
}
</style>
