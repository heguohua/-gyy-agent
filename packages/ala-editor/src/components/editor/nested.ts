import { BlockSchemaKeys, BlockSchemas } from "@/config/schemas"
import { BaseBlock, Viewport } from "@/types/editorType"
import { logger } from "@/utils/logger"
import { nanoid } from "@/utils/nanoid"
import { cloneDeep, merge } from "lodash"
/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 16:04:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 10:40:25
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/nested.ts
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


export const updateCurrentBlockConfig = (arr: BaseBlock[], nodeId: string, viewport: Viewport, data: object) => {
    const array = cloneDeep(arr)
    for (let i = 0; i < array.length; i++) {
        const element = array[i]
        if (element.id === nodeId) {
            const formData = element.formData
            if (formData) {
                logger.info('currentBlockConfig element.formData更新前', element.formData);
                merge(formData, data)
                logger.info('currentBlockConfig element.formData更新后', element.formData);
                return array
            } else {
                logger.error(`nodeId [${nodeId}],viewport[${viewport}] formData not exists! currentData :`, data);
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
