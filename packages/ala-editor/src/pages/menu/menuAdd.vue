<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 13:06:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <el-form :model="formData" label-width="120px" :rules="rules">
        <AlaFormItems v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :data="formData"
            :closeContent="closeContent" :columnWidth="500" :columnNum="1" labelPosition="left" :moduleName="moduleName"
            :operationType="operationType" />
    </el-form>

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildSlider, alaBuildSwitch } from '@/config/alaBuilders';
import { date } from '@/utils/date';

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
    bornDate:'',
    registerTime:'',
})


// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################

// 基础查询条件
const basicFields = [
    alaBuildRawInput('AlaCustomerizationComponentDemo', '自定义文本框', [alaRequired()], '请输入内容'),
    alaBuildInput("username", "用户名", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
    alaBuildPassword("password", "密码", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
    alaBuildNumber("age", "年龄", [alaRequired(), alaNumber(), alaNumberRange(18, 99)]),
    alaBuildRadio('gender', "性别", [{ '男': 'man' }, { '女': 'men' }, { '未知': 'unknown' }], [alaRequired()]),
    alaBuildCheckbox('color', "偏好色系", [{ '红色': 'red' }, { '绿色': 'green' }, { '黄色': 'yellow' }], [alaRequired()]),
    alaBuildSelect('channel', "购票渠道", [{ '拼多多': 'pin' }, { '美团': 'mei' }, { '淘票票': 'yellow' }], [alaRequired()]),
    alaBuildSwitch('status', "账号状态", '正常', '禁用', [alaRequired()]),
    alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    alaBuildDate('registerTime', "认证时间", 'datetime', "YYYY-MM-DD HH:mm:ss", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    alaBuildSlider('weight', "大概体重", 40, 200, 5, [alaRequired()]),
    alaBuildRating('score', "整体评分", 10, [alaRequired()], true),
]


// ##########################  以下是公共方法，不需要修改 start #########################################

const operationType = computed(() => {
    return props.id === 0 ? '新增' : '编辑';
})

const closeContent = computed(() => {
    const content = `您确定要关闭【 ${operationType.value}${props.moduleName} 】页面吗？`
    return content
})
const saveContent = () => {
    const content = `您确定要保存【 ${props.moduleName} 】信息吗？`
    return content
}

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
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【继续编辑】按钮");
        })

}


// 验证规则（ 第一种编码方式 ）
// const rules = {
//     customerization: [alaPassword(), alaRequired()],
//     age: [alaNumber()],
//     password: [alaRequired(), alaLl8_()]
// }

// 根据 表单field 自动构建element-plus的rules规则配置项
// 验证规则（ 第二种编码方式 ）
const rules = computed(() => {
    const ruless: { [key: string]: object } = {}
    basicFields.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})

// ##########################  以下是公共方法，不需要修改 end #########################################

// ##########################  以下是冗余示例代码  #########################################

// 基础查询条件
// const basicFields = [
    // { componentName: 'AlaCustomerizationComponentDemo', label: '自定义文本框', placeholder: '自定义文本框', fieldName: 'customerization' },
    // { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
    // { componentName: 'AlaNumber', label: '数值', placeholder: '请输入数值', fieldName: 'age' },
    // { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
    // { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
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
// ]


</script>

<style scoped lang="scss"></style>