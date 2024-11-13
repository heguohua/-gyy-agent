<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 17:23:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <AlaAddForm v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :data="formData"
        :closeContent="closeContent" />
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';

// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const props = defineProps({
    closeTitle: {
        type: String,
        default: '温馨提示：'
    },
    moduleName: {
        type: String,
        default: ''
    },
    id: {
        type: Number,
        default: 0
    },
})


const formData = reactive({
    input: 'input-123'
})

// Methods



// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################


// 基础查询条件
const basicFields = [
    { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
    { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
    // { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
    { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    // { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    // { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
    // { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch', other: { activeText: "开", inActiveText: "关" } },
    // {
    //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date', other: {
    //         dateType: "datetimerange",
    //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
    //     }
    // },
    // { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider', other: { min: 2, max: 10, step: 1, } },
    // { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating', other: { max: 8, allowHalf: true } },
]


// ##########################  以下是公共方法，不需要修改  #########################################
const closeContent = computed(() => {
    const operationType = props.id === 0 ? '新增' : '编辑'
    const content = `您确定要关闭【 ${operationType}${props.moduleName} 】页面吗？`
    return content
})
const saveContent = () => {
    const content = `您确定要保存【 ${props.moduleName} 】信息吗？`
    return content
}


// : {
//         type: String,
//         default: '您确定要关闭新增页面吗？'
//     },


const emit = defineEmits(["confirm"])

const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);

    ElMessageBox.confirm(
        saveContent(),
        props.closeTitle,
        {
            confirmButtonText: '确认保存',
            cancelButtonText: '继续编辑',
            type: 'warning',
        })
        .then(() => {
            showDrawer.value = false
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【确认保存】按钮，当前表单数据为：", formData);
        })
        .catch(() => {
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【取消关闭】按钮");
        })

}


</script>

<style scoped lang="scss"></style>