<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 10:17:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/relation/ala-relation-sub-form.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div :class="isHidden(item)" v-for="(item, index) in fields" :key="item.fieldName + '-' + index"
        :style="columnWidth(item)">
        <component :is="item.componentName" :label="item.label"
            :position="item.other?.position ? item.other.position : labelPosition" :placeholder="item.placeholder"
            v-bind="item.other" v-model="data[item.fieldName]" :fieldName="item.fieldName" :data="data"
            @formItemChangeCallback="formItemChangeCallback"
            @update:modelValue="handleModelValueChange(fieldName + '.' + item.fieldName, $event)"
            :ref="setItemRef(index)" />
    </div>


</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { DrawerProps, ElMessageBox } from 'element-plus';
import { PropType, ref } from 'vue'

// State

const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    item: {
        type: Object as PropType<AlaField>,
        default: () => { }
    },
    fieldName: {
        type: String,
        default: ''
    },
    watchFieldName: {
        type: String,
        default: ''
    },
    moduleName: {
        type: String,
        default: ''
    },
    subFormFields: {
        type: Object as PropType<{ [key: string]: Array<AlaField> }>,
        default: () => { }
    },
    data: {
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
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }

})

const subFormFields = ref<Array<AlaField>>([])
const fields = computed(() => {
    return subFormFields.value
})

watch(() => props.data![props.watchFieldName], (v: any) => {
    console.log('v: --->', v);
    console.log('item: --->', props.item);

    subFormFields.value = props.subFormFields[v]
    console.log('item: --->', subFormFields.value);

}, {
    immediate: true,
    deep: true
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

const model = defineModel<any>({
    default: null
})

const emit = defineEmits(["confirm", "formItemChangeCallback", "cancel"])
const formItemChangeCallback = (data: any) => {
    emit("formItemChangeCallback", data)
}


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################
import { useI18n } from 'vue-i18n';


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

    console.log('fieldName:', fieldName);
    console.log('value:', value);

    if (fieldName.indexOf('.') > -1) {

        // 说明是多层级属性，则动态更改内嵌属性的值
        const propertyNames = fieldName.split('.')
        let tmp: any = value

        for (let i = propertyNames.length - 1; i >= 0; i--) {
            const obj = Object.create(null);
            obj[propertyNames[i]] = tmp
            tmp = obj
        }

        let data = props.data || {}
        u.merged(data, tmp)

    }

}

const childRefs = ref<{ [key: number]: any }>({})
// 返回一个函数作为 ref 名称设置器
const setItemRef = (index: number) => (el: any) => {
    if (el) childRefs.value[index] = el
}


</script>

<style lang="scss"></style>