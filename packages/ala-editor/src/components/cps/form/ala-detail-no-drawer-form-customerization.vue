<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-27 21:33:57
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-no-drawer-form-customerization.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-detail-no-drawer-form-customerization">
        <el-form :model="formData" :label-width="labelWidth" :rules="rules" ref="formRef">

            <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index"
                :style="columnWidth(item)">
                <component :is="item.componentName" :alaComponent="item.componentName" :label="item.label" :item="item"
                    :position="item.other?.position ? item.other.position : labelPosition"
                    :placeholder="item.placeholder" v-bind="item.other" v-model="formData[item.fieldName]"
                    :fieldName="item.fieldName" :data="formData" @formItemChangeCallback="formItemChangeCallback"
                    @update:modelValue="handleModelValueChange(item.fieldName, $event)" :ref="setItemRef(index)"
                    :noEditable="formData.id ? (item.other?.noEditable != undefined ? item.other?.noEditable : undefined) : undefined" />
            </div>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// State

const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    closeContent: {
        type: String,
        default: '您确定要关闭新增页面吗？'
    },
    moduleName: {
        type: String,
        default: ''
    },
    fields: {
        type: Array<AlaField>,
        default: []
    },
    formData: {
        type: Object,
    },
    operationType: {
        type: String,
        default: ''
    },
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 500,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'left',
            useFormTitle: false,
        })
    },
    showSaveButton: {
        type: Boolean,
        default: true
    },
    showCancelButton: {
        type: Boolean,
        default: true
    },
    showInitiateButton: {
        type: Boolean,
        default: false
    },
    outApi: {
        type: Boolean,
        default: false
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
    }

})

const isHidden = (item: { componentName: string, other?: any }) => {

    if (item.componentName === 'AlaHidden') {
        return 'ala-form-base-item-hidden'
    } else if (item.other && item.other.fullWidth) {
        return 'ala-form-base-item-full-width'
    } else {
        return 'ala-form-base-item'
    }
}

const showDrawer = defineModel({
    type: Boolean,
    default: false
})


const emit = defineEmits(["confirm", "formItemChangeCallback", "cancel", "refresh"])

const formItemChangeCallback = (data: any) => {
    emit("formItemChangeCallback", data)
}

// Methods
// ##########################  以下是公共方法，不需要修改  #########################################


// 解构 formAttr，同时保持 formAttr 的响应式
const { formWidth, labelWidth, labelPosition, columnNum } = toRefs(props.formAttr)

const columnWidth = (item: any) => {

    const paddingWidth = 20

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth.value} ]，form labelWidth[ ${labelWidth.value} ]，form columnNum[ ${columnNum.value} ]，form paddingWidth[ ${paddingWidth} ]`);

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth.value - paddingWidth) / columnNum.value)

    const occupiedColumnNum = item.columnNum || 1
    columnWidth = columnWidth * occupiedColumnNum

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

/**
 * 将形如 user.name 类型的 fieldName 转换为对象属性形式，并赋值给 data 对象
 * @param fieldName 
 * @param value 
 */
const handleModelValueChange = (fieldName: string, value: any) => {

    if (fieldName.indexOf('.') > -1) {

        // 说明是多层级属性，则动态更改内嵌属性的值
        const propertyNames = fieldName.split('.')
        let tmp: any = value

        for (let i = propertyNames.length - 1; i >= 0; i--) {
            const obj = Object.create(null);
            obj[propertyNames[i]] = tmp
            tmp = obj
        }

        let data = props.formData
        u.merged(data!, tmp)

    }
}

const childRefs = ref<{ [key: number]: any }>({})

// 返回一个函数作为 ref 名称设置器
const setItemRef = (index: number) => (el: any) => {
    if (el) childRefs.value[index] = el
}

const rules = computed(() => {
    const ruless: { [key: string]: object } = {}
    props.fields?.forEach(field => {
        if (field.rules) {
            ruless[field.fieldName] = field.rules
        }
    })
    return ruless
})

const formRef = ref()
const save = () => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", props.formData);

    formRef.value.validate(async (valid: boolean) => {

        console.log('rules:', rules);
        console.log('valid:', valid);

        if (!valid) {
            // 表单验证失败，阻止提交
            logger.error(`【 表单验证 不通过 】`);
            notify.error(t('pop.warm_title'), "表单数据不正确，请修改")

        } else {

            //保存数据
            let data = props.formData

            if (props.beforeSave) {
                if (u.isAsyncFunction(props.beforeSave)) {
                    data = await props.beforeSave(data)
                } else {
                    data = props.beforeSave(data)
                }
            }

            const response = await postData(data)

            if (response) {

                // 清空 formData
                u.clear(props.formData)
                logger.info("点击【确认】按钮，弹出提示信息框，用户选择【确认保存】按钮，数据提交成功后当前表单数据为：", props.formData);

                emit("refresh", props.formData)

            }

        }
    });
}


const postData = async (item: any): Promise<any> => {

    // 保存数据并刷新分页列表
    // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口
    const id = item.id ? item.id : (item.columns?.id)

    let params = item

    const url = id ? props.updateUrl : props.url
    if (id) {
        logger.info(`【 更新数据 】，url${url}，数据对象：`, item);
    } else {
        logger.info(`【 新增数据 】，url${url}，数据对象：`, item);
    }

    if (props.outApi) {
        //说明是静态api模块
        params = { ...item.columns }
    }

    const result = await alaPost(u.url(url || ''), params, false, id ? 'put' : '').then((data: any) => {
        const response = data;
        emit("refresh", response)
        notify.success(t('pop.warm_title'), "保存成功")
        return response
    });

    return result
}

defineExpose({
    save
})

</script>
<style scoped lang="scss">
.ala-detail-no-drawer-form-customerization {

    .ala-form-base-item {
        display: inline-block;
    }

    .ala-form-base-item-full-width {
        width: 100%;
    }

    .ala-form-base-item-hidden {
        display: none;
    }

    :deep(.el-form-item__label) {
        justify-content: end;
    }

}
</style>
<style lang="scss">
.ala-detail-no-drawer-form-customerization {
    .ala-drawer {

        .ala-form-base-item {
            display: inline-block;
        }

        .ala-form-base-item-full-width {
            width: 100%;
        }

        .ala-form-base-item-hidden {
            display: none;
        }

    }
}
</style>
<style lang="scss">
.ala-detail-no-drawer-form-customerization {

    .ala-drawer {

        .el-drawer__header {
            display: flex;
            padding: 0px !important;
            margin: 0px !important;
            color: #3d446e !important;
            font-size: 1.1rem !important;
            background: #F9F9FA !important;
            padding: 4px 0px !important;
        }

        .el-drawer__body {
            text-align: left;
            display: flex;
            overflow-y: auto;
            flex-wrap: wrap;
            padding: 20px 26px;
            align-items: flex-start;
            align-content: flex-start;
            padding-bottom: 30px;
            column-gap: 8px;
            // justify-content: space-around;

            &::-webkit-scrollbar {
                width: 4px;
                /* 设置滚动条的宽度 */
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            &::-webkit-scrollbar-thumb {
                background: #b2b2b2;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #b2b2b2;
            }

        }

        .el-drawer__footer {
            padding-bottom: 6px;

            .ala-drawer-buttons {
                display: flex;
                align-items: center;
                justify-content: end;
                justify-items: center;
                column-gap: 8px;

                .el-button {
                    margin-left: 0px;
                }
            }

        }

        .el-form-item__label {
            color: var(--el-text-color-regular);
            font-size: 0.9rem;
            font-weight: bold;
            justify-content: right;
            text-align: right;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__wrapper {
            width: 100% !important;
        }
    }
}
</style>