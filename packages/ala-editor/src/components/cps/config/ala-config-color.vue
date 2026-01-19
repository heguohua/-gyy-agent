<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-13 14:27:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-color.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-color">
        <el-form-item :label="title" :class="isRequired()" :rules="validateRules" :prop="id">
            <!-- <el-input v-model="input" :placeholder="placeholder" class="input" :name="id" /> -->
            <el-color-picker v-model="color" show-alpha :predefine="predefineColors" :name="id" />
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import validate from '@/utils/validate';
import { log } from 'console';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const editorStore = useEditorStore()

const emit = defineEmits(["callback"])

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
    bType: {
        type: String,
        default: 'page'
    }
})

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]

const color = ref()

if (defaultValue) {
    color.value = defaultValue
}

const isRequired = () => {
    return required ? 'is-required' : ''
}
interface Rule { name: string, message: string, pattern: any, length: number }

const validateRules = ref([
    {
        validator: (rule: any, value: any, callback: any) => {
            logger.error(`执行表单规则校验`, rules);

            if (rules) {




                let passed = true
                let message = ''

                for (let i = 0; i < rules.length; i++) {

                    const rl = rules[i]
                    let checkResult = undefined
                    message = rl.message

                    if (rl.name === 'required') {
                        checkResult = validate.required(color.value)
                    } else if (rl.name === 'pattern') {
                        checkResult = validate.pattern(color.value, rl.pattern)
                    } else if (rl.name === 'min') {
                        checkResult = validate.min(color.value, rl.length)
                    } else if (rl.name === 'max') {
                        checkResult = validate.max(color.value, rl.length)
                    }

                    // 终止循环
                    if (!checkResult) {
                        passed = false
                        break
                    }
                }

                if (!passed) {
                    // 说明有校验未通过的规则，显示提示信息
                    callback(new Error(message))
                } else {
                    callback()
                }

            }
        },
        trigger: 'change'
    }
]);



watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-color组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        color.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-color组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(color, (value) => {
    // if (!value) return;
    if (value) {
        value = u.trim(value)
        let data = {}
        const _value = value || ''

        if (Object.values(formData || {}).length < 2) {
            data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
        } else {
            data = { [props.viewport]: _value, required: required ? required : false, title, rules }
        }
        logger.info(`config-color组件 input 发生变化,即将调用父组件callback, data`, data);
        emit("callback", {
            data: {
                [key]: data
            },
            id
        })
    }
}, {
    immediate: true
})


watch(() => editorStore.globalParams[bType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-color组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        color.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-color组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })



// Methods

</script>

<style scoped lang="scss">
.config-color {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg);

        input {
            &::placeholder {
                font-size: 0.8rem;
            }
        }
    }

}
</style>
