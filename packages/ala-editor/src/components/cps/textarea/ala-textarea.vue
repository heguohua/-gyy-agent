<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-09 09:31:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/textarea/ala-textarea.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-textarea-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-input type="textarea" autosize :model-value="model" @input="handleChange" :placeholder="placeholder"
                :id="fieldName" class="ala-textarea-el-input" :disabled="isDisabled">

                <template #prefix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" />
                </template>

            </el-input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import u from '@/utils/u';


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
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    cleanNewlineCharacter: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const emits = defineEmits(['update:modelValue'])
const handleChange = (value: string) => {
    if (props.cleanNewlineCharacter) {
        value = u.cleanJsonString(value)
    }
    // 必须通知 v-model
    emits('update:modelValue', value)
}


const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})


// Methods

</script>

<style scoped lang="scss">
.ala-textarea-wrapper {
    :deep(.el-textarea__inner) {
        padding: 0px 11px;
        min-height: 64px !important;
        line-height: 1.4rem;
    }
}
</style>