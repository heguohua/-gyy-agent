<template>
    <el-form :model="formData" :label-width="labelWidth" :rules="rules" ref="formRef">
        <AlaFormItems v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="fields" :data="formData"
            :closeContent="closeContent" :formAttr="formAttr" :moduleName="moduleName" :operationType="operationType"
            :tipTitle="tipTitle" @formItemChangeCallback="formItemChangeCallback" :showSaveButton="showSaveButton"
            :showInitiateButton="showInitiateButton" />
    </el-form>

</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
        default: null
    },
    formData: {
        type: Object,
    },
    rules: {
        type: Object,
    },
    fields: {
        type: Array<AlaField>,
    },
    formAttr: {
        type: Object,
        default: () => ({})
    },
    url: {
        type: String
    },
    updateUrl: {
        type: String
    },
    beforeSave: {
        type: Function,
        default: null
    },
    showSaveButton: {
        type: Boolean,
        default: false
    },
    showInitiateButton: {
        type: Boolean,
        default: false
    }
})

// 解构 formAttr，同时保持 formAttr 的响应式
const { labelWidth } = toRefs(props.formAttr)


// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const formRef = ref()
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            
            ElMessageBox.confirm(
                saveContent(),
                props.tipTitle,
                {
                    confirmButtonText: t('buttons.confirm'),
                    cancelButtonText: t('buttons.cancel'),
                    type: 'warning',
                })
                .then(async () => {
                    logger.info("点击【确认】按钮，弹出提示信息框，用户选择【确认保存】按钮，当前表单数据为：", props.formData);


                    // 表单验证成功，可以进行表单提交操作
                    logger.info(`表单验证通过`);

                    let data = props.formData
                    if (props.beforeSave) {
                        data = props.beforeSave(data)
                    }

                    // 1、保存表单数据
                    // 2、发起流程
                    const response = await postData(data)


                    if (response) {

                        // 清空 formData
                        u.clear(props.formData)
                        logger.info("点击【确认】按钮，弹出提示信息框，用户选择【确认保存】按钮，数据提交成功后当前表单数据为：", props.formData);

                        // 关闭弹窗
                        showDrawer.value = false

                        emit("confirm", props.formData)

                    }
                })
                .catch(() => {
                    logger.info("点击【确认保存】按钮，弹出提示信息框，用户选择【继续编辑】按钮");
                })

        } else {
            // 表单验证失败，阻止提交
            logger.error(`【 表单验证 不通过 】`);
            notify.error(t('pop.warm_title'), "表单数据不正确，请修改")
        }
    });
}


const operationType = computed(() => {
    return !props.formData?.id ? t('buttons.add') : t('buttons.edit');
})

const closeContent = computed(() => {
    const content = t('pop_content.close', { content: operationType.value + ' ' + props.moduleName })
    return content
})
const saveContent = () => {
    const content = t('pop_content.flow_start', { content: props.moduleName })
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
    props.fields?.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})


const postData = async (item: any): Promise<any> => {

    // 保存数据并刷新分页列表
    // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口
    const id = item.id ? item.id : (item.columns?.id)

    const url = id ? props.updateUrl : props.url
    if (id) {
        logger.info(`【 更新数据 】，url${url}，数据对象：`, item);
    } else {
        logger.info(`【 新增数据 】，url${url}，数据对象：`, item);
    }
    const result = await alaPost(u.url(url || ''), item, false, id ? 'put' : '').then((data: any) => {
        const response = data;
        emit("refresh", response)
        notify.success(t('pop.warm_title'), "申请单提交成功，请等待审批。")
        return response
    });

    return result
}


const emit = defineEmits(["confirm", "refresh"])

const formItemChangeCallback = (data: any) => {
    console.log('data-callback:', data);
    u.merged(props.formData || {}, data)
    console.log('props.formData:', props.formData);

}

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