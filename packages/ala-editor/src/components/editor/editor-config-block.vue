<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 15:54:19
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-config-block.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-block">
        <editor-config-render :list="configFormItemList" @callback="callback" :bType="bType">
            <div class="" v-if="!editorStore.currentSelect[bType]">
                <el-empty description="请在左侧拖入组件后，点击选中组件" :bType="bType">
                    <template #image>
                        <v-icon class="icon" icon="dragBlank" />
                    </template>
                </el-empty>
            </div>
        </editor-config-render>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import { blockSchemas, BlockSchemaKeys } from '@/config/schemas';
import { updateBlockConfigFormData } from './nested';
import { BaseBlock } from '@/types/editorType';
import { cloneDeep, merge, mergeWith } from 'lodash';
import u from '@/utils/u';

// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

const configFormItemList = ref<BaseBlock[]>([])

const editorStore = useEditorStore()


// Methods

/**
 * 1、监听 editorStore 中保存的 baseBlock 变量，有变化后及时更新 config 区域的动态表单
 * 2、监听 editorStore 中保存的 viewport 变量，有变化后及时更新 config 区域的动态表单
 */
watch(() => editorStore.currentSelect[bType], () => {

    const currentBaseBlock = editorStore.currentSelect[bType]

    logger.info(`bType[ ${bType} ],editor-config-block组件 【 监听到 】 editorStore 中 currentSelect 或 viewport 发生变化,即将渲染 editor-config 面板, currentBaseBlock值为`, currentBaseBlock);

    const code = currentBaseBlock?.code as BlockSchemaKeys
    if(!code) return

    logger.info(`bType[ ${bType} ],当前block code : ${code}`);

    // 根据当前基础组件的code获取当前基础组件的schema
    const blockSchema = blockSchemas[code]
    // 获取单个组件的属性列表
    const properties = blockSchema.properties
    if (!currentBaseBlock || !properties) {
        logger.error(`bType[ ${bType} ],currentBaseBlock 和 properties均不存在`);
        configFormItemList.value = []
        return
    }

    const { formData, id } = currentBaseBlock


    // logger.info('当前block的 baseBlock 属性：', currentBaseBlock);
    // logger.info('当前block的 blockSchema 属性：');
    // console.log('blockSchema:', properties);

    const listResult = Object.fromEntries(Object.entries(properties).map((oneProperty) => {
        // console.log('oneProperty', oneProperty);
        const [propertyName, propertyValue] = oneProperty
        const full_properties = [propertyName, { ...propertyValue, id, key: propertyName, formData: formData }]
        // console.log('oneProperty 添加 block属性 转换后', full_properties);
        return full_properties;
    }))

    // console.log('总properties转换后listResult:', listResult);

    const form_items = [...Object.values(listResult)] as BaseBlock[]
    // console.log('总properties转换后 form_items :', form_items);

    configFormItemList.value = form_items

}, {
    immediate: true,
    deep: true
})

const customMerge = (objValue: any, srcValue: any) => {
    if (Array.isArray(srcValue)) {
        return srcValue; // 直接替换数组
    }
};

/**
 * 接受子组件传递的参数值，然后更新 editorStore 中保存的 BaseBlock[]
 * @param params 
 */
// const callback = (params: { data: object, id: string }) => {
const callback = (params: { data: { cols: any }, id: string }) => {

    const { data, id } = params

    if (!id) {
        logger.error(`bType[ ${bType} ],【 错误，错误，错误 】接收到 config form item 数据更新，但是其所属组件【 id为空 】,params：`, params);
        return
    }

    const blockConfig = editorStore.blockConfig[bType] || []

    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 即将更新editorStore中的 blockConfig 和 currentSelect 】,nodeId[${id}],接收到回调参数params：`, params);

    // todo 这里要进行 cols 变化判断
    const currentSelect = editorStore.currentSelect[bType]

    // 注意，注意，注意：当前对象不是可嵌套对象，那么直接更新，查找时要注意是否是被嵌套对象
    // 注意，注意，注意：当前对象是可嵌套，那么同时更新 cols
    const newBlockConfig = updateBlockConfigFormData(blockConfig, id, editorStore.viewport[bType], data)

    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 马上更新editorStore中的 blockConfig 】,nodeId[${id}],更新前editorStore.blockConfig`, editorStore.blockConfig[bType]);
    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 马上更新editorStore中的 blockConfig 】,nodeId[${id}],新的 blockConfig`, newBlockConfig);
    // console.log('新的 blockConfig ===>', newBlockConfig);

    editorStore.setBlockConfig(newBlockConfig, bType)

    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 已更新editorStore中的 blockConfig 】,nodeId[${id}],更新后editorStore.blockConfig`, editorStore.blockConfig[bType]);

    // merge(editorStore.currentSelect?.formData, data);


    //  ###################  下面是更新 editorStore.currentSelect 和 blockConfig 没关系

    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 马上更新editorStore中的 currentSelect 】,nodeId[${id}]`);

    // 组装更新数据
    const updatedParams = {
        formData: data,
    }

    // 判断当前对象是否是嵌套对象，如果是嵌套对象则同步变更 children 数组
    // 如果是嵌套组件，还要初始化children数组
    let children = undefined
    if (currentSelect?.nested && currentSelect.code === 'column') {
        if (data.cols) {

            // 先 clone 一份 editorStore 中存储的 currentSelect.children 
            let oldChildrens = cloneDeep(currentSelect.children)

            if (!oldChildrens) {
                logger.warn(`bType[ ${bType} ],【 错误，错误，错误 】嵌套对象 currentSelect 中 children 属性不存在，初始化为二维空数组[[],[]]，currentSelect：`, currentSelect);
                oldChildrens = [[], []]
            }

            const newFormDataCols = data.cols.desktop
            // const oldCols = oneBlockConfig.formData?.cols.desktop
            // const oldChildrens = oneBlockConfig.children ||[]
            logger.info(`bType[ ${bType} ],currentSelect.childrens原有列数量[ ${oldChildrens.length} ]，新cols列数量[ ${newFormDataCols.length} ]`);

            if (oldChildrens.length > newFormDataCols.length) {

                // 说明当前用户删减了列数目
                const count = oldChildrens.length - newFormDataCols.length
                logger.info(`bType[ ${bType} ],用户【 删减了列数目 】，删减数量[ ${count}]，删减前children数据：`, oldChildrens);
                children = oldChildrens?.slice(0, -count)
                logger.info(`bType[ ${bType} ],用户【 删减了列数目 】，删减数量[ ${count}]，删减后children数据：`, children);

            } else if (oldChildrens.length < newFormDataCols.length) {

                // 说明用户增加了列数
                const count = newFormDataCols.length - oldChildrens.length
                const diff = Array.from({ length: count }, () => [])
                logger.info(`bType[ ${bType} ],用户【 新增了列数目 】，新增数量[ ${count}]，新增前children数据：`, oldChildrens);
                oldChildrens.push(...diff)
                logger.info(`bType[ ${bType} ],用户【 新增了列数目 】，新增数量[ ${count}]，新增后children数据：`, oldChildrens);

                children = oldChildrens

            } else {
                logger.info(`bType[ ${bType} ],【 列数目 无变化 】，列数量[ ${oldChildrens.length}]，children数据：`, oldChildrens);

            }

        }
    }
    if (children && children.length > 0) {
        // mergeWith(updatedParams, { children }, customMerge)
        logger.warn(`bType[ ${bType} ],当前currentSelect中【 children 有变化 】，需要更新，更新前 updatedParams：`, updatedParams);
        logger.warn(`bType[ ${bType} ],当前currentSelect中【 children 有变化 】，需要更新，更新 children：`, children);
        mergeWith(updatedParams, { children }, customMerge)
        logger.warn(`bType[ ${bType} ],当前currentSelect中【 children 有变化 】，需要更新，更新后 updatedParams：`, updatedParams);
    } else {
        logger.warn(`bType[ ${bType} ],当前currentSelect中【 children 无变化 】，不需要更新，updatedParams：`, updatedParams);
    }

    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 马上更新editorStore中的 currentSelect 】,nodeId[${id}],更新前editorStore.currentSelect`, editorStore.currentSelect[bType]);
    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 马上更新editorStore中的 currentSelect 】,nodeId[${id}],更新数据 updatedParams`, updatedParams);
    mergeWith(editorStore.currentSelect[bType], updatedParams, customMerge);
    editorStore.setCurrentSelect(currentSelect, bType)
    logger.info(`bType[ ${bType} ],editor-config-block组件 接收到 子组件callback,【 已更新editorStore中的 currentSelect 】,nodeId[${id}],更新后editorStore.currentSelect`, editorStore.currentSelect[bType]);


}


</script>

<style scoped lang="scss">
.editor-config-block {
    width: 100%;
}
</style>