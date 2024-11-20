/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-20 09:37:23
 * @FilePath: /1-low-coding/packages/ala-editor/src/store/useEditorStore.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BaseBlock, BasePage, Viewport } from '@/types/editorType'
import { BaseBlockNull } from '@/types/editorType'
import { defineStore } from 'pinia'
import { logger } from '@/utils/logger'
import u from '@/utils/u'
import { cloneDeep, merge, mergeWith } from 'lodash'

const customMerge = (objValue: any, srcValue: any) => {
    if (Array.isArray(srcValue)) {
        return srcValue; // 直接替换数组
    }
};

export const useEditorStore = defineStore('editorStore', {
    state: () => ({
        viewport: 'desktop' as Viewport,
        globalParams: ref<Record<string, any>>({}),
        currentSelect: null as BaseBlockNull,
        configPanelShow: false,
        blockConfig: [] as BaseBlock[],
        pageConfig: { formData: {} } as BasePage,
    }),
    getters: {
        isMobileViewport: (state) => state.viewport === 'mobile'
    },
    actions: {
        setViewport(value: Viewport) {
            logger.info(`更新 viewport : ${value}`);
            this.viewport = value
            this.updateGlobalParams("viewport", value)
        },
        setCurrentSelect(value: BaseBlockNull) {
            logger.info(`currentSelect: `, value);
            this.currentSelect = value
            // u.merged(this.currentSelect，value)
            // merge(this.currentSelect,value)
        },
        setConfigPanelShow(value: boolean) {
            logger.info(`更新 configPanelShow : `, value);
            this.configPanelShow = value
        },
        setBlockConfig(value: BaseBlock[]) {
            logger.info(`更新 blockConfig : `, value);
            this.blockConfig = value
            // merge(this.blockConfig,value)
        },
        setPageConfig(value: BasePage) {
            logger.info(`更新 pageConfig : `, value);
            this.pageConfig = value
            // merge(this.pageConfig,value)
            
        },
        addToBlockConfigIfNotExist(block: BaseBlock) {
            if (block.parent) {
                // 说明是被嵌套的组件
                // 根据 block.parent 查找嵌套父组件，然后根据索引值更新相应索引的元素
                const [pid, index] = block.parent.split('-')
                if (pid && index) {
                    // 根据 pid 查找嵌套父组件
                    let parentBlock = undefined
                    for (let i = 0; i < this.blockConfig.length; i++) {
                        if (this.blockConfig[i].id === pid) {
                            parentBlock = this.blockConfig[i]
                        }
                    }
                    if (parentBlock) {
                        // 根据索引更新父组件中相应组件的值
                        if (parentBlock.children && parentBlock.children.length > 0) {

                            // 查找 children 数组中索引为 index 的子数组
                            const childArray = parentBlock.children[Number.parseInt(index)]
                            if (childArray && childArray.length > 0) {
                                // 然后遍历子数组，根据id匹配子元素，找到了则直接更新，如果没找到则直接追加
                                let oldBlockConfig = undefined
                                let rowNo = null
                                for (let j = 0; j < childArray.length; j++) {
                                    if (childArray[j].id === block.id) {
                                        oldBlockConfig = childArray[j]
                                        rowNo = j
                                    }
                                }
                                if (!oldBlockConfig) {
                                    logger.info(`向 parentBlock.children 中【 追加 】 block，parent id[ ${parentBlock.id} ]，所属列[ ${index} ]，所属行[ ${index} ]`, block);
                                    childArray.push(block)
                                } else {
                                    logger.info(`parentBlock.children 中已存在 id为【 ${block.id} 】的Block，parent id[ ${parentBlock.id} ]，所属列[ ${index} ]，所属行[ ${rowNo} ]`, block);
                                }

                            } else {
                                logger.error(`【 错误，错误，错误 】parentBlock.children[index]子数组不存在，当前组件数据对象，block：`, block);
                                logger.error(`父组件数据对象，parentBlock：`, parentBlock);
                            }

                            // logger.info(`editorStore中 id为【 ${parentBlock.id} 】的blockConfig children 更新前`, parentBlock.children);
                            // parentBlock.children[Number.parseInt(index)] = [block, {}]
                            // logger.info(`editorStore中 id为【 ${parentBlock.id} 】的blockConfig children 更新后`, parentBlock.children);

                            // mergeWith(parentBlock.children[Number.parseInt(index)], data, customMerge)
                        } else {
                            logger.error(`【 错误，错误，错误 】parentBlock.children数组不存在，当前组件数据对象：`, block);
                            logger.error(`父组件数据对象：`, parentBlock);
                        }
                    } else {
                        logger.error(`【 错误，错误，错误 】根据组件pid【 ${pid} 】没有在blockConfig找到父组件，当前组件数据对象：`, block);
                    }
                } else {
                    logger.error(`【 错误，错误，错误 】组件pid不完整，pid【 ${block.parent} 当前组件数据对象：`, block);
                }

            } else {
                // 说明是非嵌套组件
                let oldBlockConfig = undefined
                for (let i = 0; i < this.blockConfig.length; i++) {
                    if (this.blockConfig[i].id === block.id) {
                        oldBlockConfig = this.blockConfig[i]
                    }
                }
                // 不存在则添加
                // todo 这里需要添加排序逻辑
                if (!oldBlockConfig) {
                    logger.info(`向 editorStore.blockConfig中【 追加 】 block`, block);
                    this.blockConfig.push(block)
                } else {
                    logger.info(`editorStore.blockConfig中已存在 id为【 ${block.id} 】的Block，code【 ${block.code} 】，不执行追加操作`);
                }
            }

        },
        updateGlobalParams(key: string, value: any) {
            this.globalParams[key] = value
        }
    }
}
)

