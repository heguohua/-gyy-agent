<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-21 16:49:07
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/config/config-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-input">
        <el-form-item :label="title">
            <el-input v-model="input" :placeholder="placeholder" class="input" />
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ref } from 'vue'

const emit = defineEmits(["callback"])

// State


const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
})


const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder } = data.value.properties[props.viewport]
const input = ref('')


watch(() => formData, (value) => {
    input.value = value?.[props.viewport] || defaultValue
    logger.info(`config-input组件监听到 formData 发生变化,value?.[props.viewport]`, value?.[props.viewport]);
}, {
    immediate: true
})

watch(input, (value) => {
    let data = {}
    const _value = value || ''
    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value }
    } else {
        data = { [props.viewport]: _value }
    }
    logger.info(`config-input组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
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
