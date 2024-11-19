/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-19 09:37:18
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
        },
        setConfigPanelShow(value: boolean) {
            logger.info(`更新 configPanelShow : `, value);
            this.configPanelShow = value
        },
        setBlockConfig(value: BaseBlock[]) {
            logger.info(`更新 blockConfig : `, value);
            this.blockConfig = value
        },
        setPageConfig(value: BasePage) {
            logger.info(`更新 pageConfig : `, value);
            this.pageConfig = value
        },
        addBlockConfigNotExist(value: BaseBlock) {
            let oldBlockConfig = undefined
            for (let i = 0; i < this.blockConfig.length; i++) {
                if (this.blockConfig[i].id === value.id) {
                    oldBlockConfig = this.blockConfig[i]
                }
            }
            // 不存在则添加
            if (!oldBlockConfig) {
                logger.info(`向 editorStore.blockConfig中【 追加 】 block`, value);
                this.blockConfig.push(value)
            } else {
                logger.info(`editorStore.blockConfig中已存在 id为【 ${value.id} 】的Block，code【 ${value.code} 】，不执行追加操作`);
            }
        },
        updateGlobalParams(key: string, value: any) {
            this.globalParams[key] = value
        }
    }
}
)

