<template>
    <el-form :model="formData" label-width="120px" :rules="rules">
        <AlaFormItems v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :data="formData"
            :closeContent="closeContent" :columnWidth="columnWidth" :columnNum="columnNum"
            :labelPosition="labelPosition" :moduleName="moduleName" :operationType="operationType" />
    </el-form>

</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';

// State

const props = defineProps({
    tipTitle: {
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
    formData: {
        type: Object,
    },
    rules: {
        type: Object,
    },
    basicFields: {
        type: Array<AlaField>,
    },
    columnWidth: {
        type: Number,
        default: 300
    },
    columnNum: {
        type: Number,
        default: 1
    },
    labelPosition: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    url: {
        type: String
    },
})


// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);

    ElMessageBox.confirm(
        saveContent(),
        props.tipTitle,
        {
            confirmButtonText: '确认保存',
            cancelButtonText: '继续编辑',
            type: 'warning',
        })
        .then(() => {
            showDrawer.value = false
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【确认保存】按钮，当前表单数据为：", props.formData);
            postData(props.formData)
            emit("confirm", props.formData)
        })
        .catch(() => {
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【继续编辑】按钮");
        })

}


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
    props.basicFields?.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})


const postData = (item: any) => {

    // 保存数据并刷新分页列表
    alaPost(u.url(props.url || ""), item, false).then((data: any) => {
        const response = data;
        console.log('response:', response);
        emit("refresh", response)
    });
}


const emit = defineEmits(["confirm", "refresh"])



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