<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-21 14:30:07
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/config/config-files.vue
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

defineProps({
    label: {
        type: String
    },
    placeholder: {
        type: String
    },
    callback: {
        type: String
    },
})


// Methods

</script>

<style scoped lang="scss">
.config-input {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
