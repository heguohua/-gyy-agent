<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 13:34:45
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-textarea.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-input">
        <el-form-item :label="label">
            <el-input v-model="input" :placeholder="placeholder" class="input" />
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State

const input = ref('')

const props = defineProps({
    label: {
        type: String
    },
    placeholder: {
        type: String
    },
    callback: {
        type: String
    },
    bType: {
        type: String,
        default: 'page'
    }
})

const bType = props.bType

// Methods

</script>

<style scoped lang="scss">
.config-input {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
