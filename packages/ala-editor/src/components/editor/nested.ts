import { BlockSchemaKeys, BlockSchemas } from "@/config/schemas"
import { BaseBlock, Viewport } from "@/types/editorType"
import { logger } from "@/utils/logger"
import { nanoid } from "@/utils/nanoid"
import { cloneDeep, mergeWith } from "lodash"
/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 16:04:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-20 18:09:53
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/nested.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

/**
 * @Description: column 嵌套 class，用来在move方法中判断当前组件是否可以被嵌套
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:00:45
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const nestedClass = "nested-container"

/**
 * @Description: 多个 draggable 组件的group名，只有相同group名字的组件才能相互拖拽
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:00:38
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const dragGroup = 'blocks'

/**
 * @Description: 监听 draggable的移动事件，判断目标元素是否可以通过拖拽添加当前元素
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 16:59:09
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const move = (e: any) => {
    const classList = Array.from(e?.to?.classList)
    const isRelatedNested = classList?.includes(nestedClass)
    if (e?.draggedContext?.element?.nested && isRelatedNested) return false
    return true
}

/**
 * @Description: 被 draggable 对象clone函数
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:18:51
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const clone = (e: object) => {
    return cloneDeep({ ...e, id: nanoid(8) })
}

const customMerge = (objValue: any, srcValue: any) => {
    if (Array.isArray(srcValue)) {
        return srcValue; // 直接替换数组
    }
};

/**
 * 更新 editorStore 中 blockConfig 中某个子元素 formData 的方法
 * @param editorStoreBlockConfig 
 * @param nodeId 
 * @param viewport 
 * @param data 
 * @returns 
 */
export const updateBlockConfigFormData = (editorStoreBlockConfig: BaseBlock[], nodeId: string, viewport: Viewport, data: { cols: any }) => {

    const array = cloneDeep(editorStoreBlockConfig)

    // 更具 nodeId 查找需要更新的节点，找到返回即可

    let oneBlockConfig = undefined

    for (let i = 0; i < array.length; i++) {

        const oneLevel = array[i]
        if (oneLevel.id === nodeId) {
            oneBlockConfig = oneLevel
        } else {

            if (oneLevel.nested) {

                // 在 children [[],[],[]] 中查找
                const oneLevelNestedBlock = oneLevel.children
                if (oneLevelNestedBlock && oneLevelNestedBlock.length > 0) {

                    for (let j = 0; j < oneLevelNestedBlock?.length; j++) {

                        const columnChildrens = oneLevelNestedBlock[j]

                        if (columnChildrens && columnChildrens.length > 0) {
                            // 再循环内层查找元素
                            for (let k = 0; k < columnChildrens?.length; k++) {
                                const rowChildren = columnChildrens[j]
                                if (rowChildren.id === nodeId) {
                                    oneBlockConfig = rowChildren
                                    // 终止第三层循环
                                    break
                                }
                            }
                        }
                        // 终止第二层循环
                        if (oneBlockConfig) {
                            break
                        }
                    }
                }

            }
        }

        // 如果已找到匹配的元素，则直接跳出所有循环
        if (oneBlockConfig) {
            break
        }



    }
    // 调用 update 方法更新
    if (oneBlockConfig) {
        update(oneBlockConfig, nodeId, viewport, data)
    } else {
        logger.error(`【 错误，错误，错误 】没有找到 id为[ ${nodeId} ]的blockConfig元素，viewport[ ${viewport} ]，data：`, data);

    }
    return array
}


const update = (oneBlockConfig: BaseBlock, nodeId: string, viewport: Viewport, data: { cols: any }) => {

    if (oneBlockConfig.id === nodeId) {

        // 1、先更新所有对象都存在的 formData
        const formData = oneBlockConfig.formData
        if (formData) {
            logger.info('blockConfig.formData更新前', oneBlockConfig.formData);
            mergeWith(formData, data, customMerge)
            logger.info('blockConfig.formData更新后', oneBlockConfig.formData);


            // 更新 blockConfig 中嵌套对象的 children 数组
            // if(){

            // }

        } else {
            logger.error(`nodeId [${nodeId}],viewport[${viewport}] formData not exists! editor-config-render传递的数据：`, data);
        }

        // 2、再更新嵌套对象存在的 children
        let children = undefined
        // 如果是可嵌套组件，那么就同时更新children
        if (oneBlockConfig.nested && oneBlockConfig.code === 'column') {
            // 说明当前是列组件更新，则需要判断 cols 存不存在，如果存在，则需要同时更新children数据
            if (data.cols) {

                // 先 clone 一份 editorStore 中存储的 blockConfig.children 
                let oldChildrens = cloneDeep(oneBlockConfig.children)
                if (!oldChildrens) {
                    logger.warn(`【 错误，错误，错误 】嵌套对象 oneBlockConfig 中 children 属性不存在，初始化为二维空数组[[],[]]，oneBlockConfig：`, oneBlockConfig);
                    oldChildrens = [[], []]
                }
                const newFormDataCols = data.cols.desktop
                // const oldCols = oneBlockConfig.formData?.cols.desktop
                // const oldChildrens = oneBlockConfig.children ||[]
                logger.info(`blockConfig.childrens原有列数量[ ${oldChildrens.length} ]，新cols列数量[ ${newFormDataCols.length} ]`);

                if (oldChildrens.length > newFormDataCols.length) {

                    // 说明当前用户删减了列数目
                    const count = oldChildrens.length - newFormDataCols.length
                    logger.info(`用户【 删减了列数目 】，删减数量[ ${count}]，删减前children数据：`, oldChildrens);
                    children = oldChildrens?.slice(0, -count)
                    logger.info(`用户【 删减了列数目 】，删减数量[ ${count}]，删减后children数据：`, children);

                } else if (oldChildrens.length < newFormDataCols.length) {

                    // 说明用户增加了列数
                    const count = newFormDataCols.length - oldChildrens.length
                    const diff = Array.from({ length: count }, () => [])
                    logger.info(`用户【 新增了列数目 】，新增数量[ ${count}]，新增前children数据：`, oldChildrens);
                    oldChildrens.push(...diff)
                    logger.info(`用户【 新增了列数目 】，新增数量[ ${count}]，新增后children数据：`, oldChildrens);

                    // 临时变量，仅用作后续赋值使用
                    children = oldChildrens

                } else {
                    logger.info(`【 列数目 无变化 】，列数量[ ${oldChildrens.length}]，children数据：`, oldChildrens);
                }
            }
        }

        if (children && children.length > 0) {
            logger.warn(`当前blockConfig中【 children 有变化 】，需要更新，更新前 blockConfig：`, oneBlockConfig);
            logger.warn(`当前blockConfig中【 children 有变化 】，需要更新，更新 children：`, children);
            mergeWith(oneBlockConfig, { children }, customMerge)
            logger.warn(`当前blockConfig中【 children 有变化 】，需要更新，更新后 blockConfig：`, oneBlockConfig);
        } else {
            logger.warn(`当前blockConfig中【 children 无变化 】，不需要更新，oneBlockConfig：`, oneBlockConfig);
        }

        // return array

    }
}

/**
 * 更新 editorStore 中 blockConfig 中某个子元素 children 大小的方法
 * @param editorStoreBlockConfig 
 * @param nodeId 
 * @param viewport 
 * @param data 
 * @returns 
 */
export const updateBlockConfigChildrenSize = (editorStoreBlockConfig: BaseBlock[], nodeId: string, viewport: Viewport, size: number) => {
    const array = cloneDeep(editorStoreBlockConfig)
    for (let i = 0; i < array.length; i++) {
        const oneBlockConfig = array[i]
        if (oneBlockConfig.id === nodeId) {
            let children = oneBlockConfig.children
            if (children) {
                if (size > 0) {
                    // 说明当前是 扩充 列数目
                    mergeWith(children, Array.from({ length: size }, () => { }), customMerge)
                } else {
                    // 说明当前是 缩减 列数目
                    // 确保n不会超出数组的长度
                    const start = Math.max(0, children.length - size);
                    children = children.slice(0, start);
                }

                logger.info(`editorStore中blockConfig【 第 ${i} 个 】index元素[ id : ${oneBlockConfig.id} ] children 更新前`, oneBlockConfig.children);
                mergeWith(oneBlockConfig, { children }, customMerge)
                logger.info(`editorStore中blockConfig【 第 ${i} 个 】index元素[ id : ${oneBlockConfig.id} ] children 更新后`, oneBlockConfig.children);

                return array
            } else {
                logger.error(`nodeId [${nodeId}],viewport[${viewport}] children not exists! 当前blockConfig节点数据 :`, oneBlockConfig);
            }
        }
    }

    return array
}



/**
 * 由于涉及到 schema 相关属性读取，因此此方法略显复杂
 */
export const getConfigFormItemList = (editorStore, blockSchemas: BlockSchemas): any[] => {

    const currentBaseBlock = editorStore.currentSelect

    logger.info(`editor-config-block组件 【 监听到 】 editorStore 中 currentSelect 或 viewport 发生变化,即将渲染 editor-config 面板, currentBaseBlock值为`, currentBaseBlock);

    const code = currentBaseBlock?.code as BlockSchemaKeys

    logger.info(`当前block code : ${code}`);

    // 根据当前基础组件的code获取当前基础组件的schema
    const blockSchema = blockSchemas[code]
    // 获取单个组件的属性列表
    const properties = blockSchema.properties
    if (!currentBaseBlock || !properties) {
        return []
    }

    const { formData, id } = currentBaseBlock

    logger.info('当前block的 baseBlock 属性：', currentBaseBlock);

    logger.info('当前block的 blockSchema 属性：');
    console.log('blockSchema:', properties);



    // list.value = Object.values(properties).map((oneProperty, index) => {
    //     console.log('oneProperty', oneProperty);
    //     console.log('Object.entries(oneProperty.properties)', Object.entries(oneProperty.properties));
    //     // 通过 Object.entries 将对象的所有属性转换成 [[属性名,属性值],,,] 格式
    //     return Object.fromEntries(Object.entries(oneProperty.properties).map(([propertyName, propertyValue]) => {
    //         // console.log(key, value);
    //         const full_properties = [propertyName, { ...(propertyValue as Object), id, key: propertyName, formData: formData ? formData[propertyName] || {} : {} }]
    //         console.log('Object.entries(oneProperty.properties)转换后', full_properties);
    //         return full_properties;
    //     }))
    // })

    const listResult = Object.fromEntries(Object.entries(properties).map((oneProperty) => {
        // console.log(key, value);
        console.log('oneProperty', oneProperty);
        const [propertyName, propertyValue] = oneProperty
        const full_properties = [propertyName, { ...(propertyValue as Object), id, key: propertyName, formData: formData?.[propertyName] || {} }]
        console.log('oneProperty 添加 block属性 转换后', full_properties);
        return full_properties;
    }))

    console.log('总properties转换后listResult:', listResult);

    // const form_items = reactive([...Object.values(listResult)])
    const form_items = [...Object.values(listResult)] as BaseBlock[]
    console.log('总properties转换后 form_items :', form_items);

    return form_items
}
