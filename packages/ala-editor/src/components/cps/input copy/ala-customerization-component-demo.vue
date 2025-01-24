<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 13:31:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/input/ala-customerization-component-demo.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-customerization-component-demo-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName" ref="formItemRef" class="clasz">
            <input :value="model" :placeholder="placeholder" @input="handleChange" class="ala-raw-input" :id="fieldName"></input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ElFormItem } from 'element-plus';


// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})



// Methods
// 自定义组件 集成 element-plus 验证机制 
const formItemRef = ref<InstanceType<typeof ElFormItem>>()
watch(model, async () => {
    await formItemRef?.value?.validate('change')
})

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    model.value = target.value
}
</script>

<style scoped lang="scss">
.ala-customerization-component-demo-wrapper {
    .clasz {
        .ala-raw-input {
            height: calc(var(--el-input-height, 32px) - 2px);
            border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
        }
        :deep .el-form-item__content {
            border: 1px solid var(--color-border);
            box-shadow: 0 0 0 1px var(--color-border) inset;
            padding: 1px 11px;
        }
    }

    .is-error {
        :deep .el-form-item__content {
            box-shadow: 0 0 0 1px var(--el-color-danger) inset;
        }
    }
}
</style>