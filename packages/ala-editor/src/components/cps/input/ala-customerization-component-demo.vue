<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 11:55:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/input/ala-customerization-component-demo.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-customerization-component-demo-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName" ref="formItemRef">
            <input :value="model" :placeholder="placeholder" @input="handleChange"></input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { useFormItem } from 'element-plus';

const { formItem } = useFormItem()
console.log('formItem:',formItem);

debugger
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

const formItemRef = ref(null)
onMounted(() => {
    console.log('model:', model);

})

watch(model, async (value) => {
    // logger.warn("监控到自定义组件 value 发生变化", value);
    console.log('props:',props);
    console.log('formItemRef:',formItemRef);
    await formItemRef?.value?.validate()
    debugger
    formItem?.validate?.('change');
})

const emit = defineEmits(['callback', 'update:modelValue'])

const handleChange = (event:Event) => {
    // model.value = value
    const target = event.target as HTMLInputElement;
    console.log('value:', target.value);
    console.log('formItemRef:',formItemRef);
    model.value = target.value
}

// Methods

</script>

<style scoped lang="scss"></style>