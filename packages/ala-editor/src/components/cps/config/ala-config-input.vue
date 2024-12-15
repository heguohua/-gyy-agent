<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-15 18:04:11
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-input">
        <el-form-item :label="title" prop="aaa" :class="isRequired()" :rules="validateRules">
            <el-input v-model="input" name="aaa" :placeholder="placeholder" class="input" />
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import validate from '@/utils/validate';
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

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

console.log('data.value=================:', data.value);

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]
const input = ref('')

const isRequired = () => {
    return required ? 'is-required' : ''
}
interface Rule { name: string, message: string, pattern: any }

const validateRules = ref([
    {
        validator: (rule: any, value: any, callback: any) => {
            if (rules) {
                let passed = true
                let message = ''

                for (let i = 0; i < rules.length; i++) {
                    const rl = rules[i]
                    let checkResult = undefined
                    message = rl.message
                    if (rl.name === 'required') {
                        checkResult = validate.required(input.value)
                        console.log('required -----> 校验返参:', checkResult);
                    } else if (rl.name === 'pattern') {
                        // validate.pattern(input.value, rl.pattern, `【${title}】` + rl.message, t, callback)
                        checkResult = validate.pattern(input.value, rl.pattern)
                        console.log('pattern -----> 校验返参:', checkResult);
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
        logger.info(`bType[ ${bType} ],config-input组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        input.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(input, (value) => {
    value = u.trim(value)
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
    } else {
        data = { [props.viewport]: _value, required: required ? required : false, title, rules }
    }
    logger.info(`config-input组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
}, {
    immediate: true
})


watch(() => editorStore.globalParams[bType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })



// Methods

</script>

<style scoped lang="scss">
.config-input {
    :deep .el-input__wrapper {
        background: var(--color-config-block-bg);

        input {
            &::placeholder {
                font-size: 0.8rem;
            }
        }
    }

}
</style>
