/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-09 12:10:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/store/useEditorStore.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BaseBlock, BasePage, Viewport } from '@/types/editorType'
import { BaseBlockNull } from '@/types/editorType'
import { defineStore } from 'pinia'
import { logger } from '@/utils/logger'



export const useEditorStore = defineStore('editorStore', {
    state: () => ({
        viewport: {
            page: 'desktop' as Viewport,
            form: 'desktop' as Viewport,
            screen: 'desktop' as Viewport,
        } as Record<string, Viewport>,
        globalParams: {
            page: ref<Record<string, any>>({}),
            form: ref<Record<string, any>>({}),
            screen: ref<Record<string, any>>({}),
        } as Record<string, Ref<Record<string, any>>>,
        currentSelect: {
            page: null as BaseBlockNull,
            form: null as BaseBlockNull,
            screen: null as BaseBlockNull,
        } as Record<string, BaseBlockNull>,
        configPanelShow: {
            page: false,
            form: false,
            screen: false,
        } as Record<string, Boolean>,
        blockConfig: {
            page: [] as BaseBlock[],
            form: [] as BaseBlock[],
            screen: [] as BaseBlock[],
        } as Record<string, BaseBlock[]>,
        pageConfig: {
            page: { formData: {} } as BasePage,
            form: { formData: {} } as BasePage,
            screen: { formData: {} } as BasePage,
        } as Record<string, BasePage>,
    }),
    getters: {
        isMobileViewport: (state) => (type: string) => {
            return state.viewport[type] === 'mobile'
        }
    },
    actions: {
        setViewport(value: Viewport, bType: string) {
            logger.info(`更新 viewport : ${value}`);
            this.viewport[bType] = value
            this.updateGlobalParams("viewport", value, bType)
        },
        setCurrentSelect(value: BaseBlockNull, bType: string) {
            logger.info(`currentSelect: `, value);
            this.currentSelect[bType] = value
            // u.merged(this.currentSelect，value)
            // merge(this.currentSelect,value)
        },
        setConfigPanelShow(value: boolean, bType: string) {
            logger.info(`更新 configPanelShow : `, value);
            this.configPanelShow[bType] = value
        },
        setBlockConfig(value: BaseBlock[], bType: string) {
            logger.info(`更新 blockConfig : `, value);
            this.blockConfig[bType] = value
            // merge(this.blockConfig,value)
        },
        setPageConfig(value: BasePage, bType: string) {
            logger.info(`更新 pageConfig : `, value);
            this.pageConfig[bType] = value
            // merge(this.pageConfig,value)

        },
        addToBlockConfigIfNotExist(block: BaseBlock, bType: string) {
            if (block.parent) {
                // 说明是被嵌套的组件
                // 根据 block.parent 查找嵌套父组件，然后根据索引值更新相应索引的元素
                const [pid, index] = block.parent.split('-')
                if (pid && index) {
                    // 根据 pid 查找嵌套父组件
                    let parentBlock = undefined
                    const bc = this.blockConfig[bType]
                    for (let i = 0; i < bc.length; i++) {
                        if (bc[i].id === pid) {
                            parentBlock = bc[i]
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
                const bc = this.blockConfig[bType];
                for (let i = 0; i < bc.length; i++) {
                    if (bc[i].id === block.id) {
                        oldBlockConfig = bc[i]
                    }
                }
                // 不存在则添加
                // todo 这里需要添加排序逻辑
                if (!oldBlockConfig) {
                    logger.info(`向 editorStore.blockConfig中【 追加 】 block`, block);
                    bc.push(block)
                } else {
                    logger.info(`editorStore.blockConfig中已存在 id为【 ${block.id} 】的Block，code【 ${block.code} 】，不执行追加操作`);
                }
            }

        },
        updateGlobalParams(key: string, value: any, bType: string) {
            this.globalParams[bType].value[key] = value
        }
    }
}
)

// export const useEditorStore = defineStore('editorStore', {
//     state: () => ({
//         viewport: {
//             desktop: 'desktop',
//             mobile: 'mobile'
//         } as Record<string, Viewport>,
//     }),
//     getters: {
//         isMobileViewport: (state) => state.viewport.mobile === 'mobile'
//     },
//     actions: {
//         setViewport(value: Viewport, bType: string) {
//             logger.info(`更新 viewport 的 ${bType} 为 : ${value}`);
//             this.viewport[bType] = value;
//         },
//     }
// });