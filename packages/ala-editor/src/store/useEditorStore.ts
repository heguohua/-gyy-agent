/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-21 17:14:42
 * @FilePath: /low-coding/packages/ala-editor/src/store/useEditorStore.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BaseBlock, Viewport } from '@/types/editorType'
import { BaseBlockNull } from '@/types/editorType'
import { defineStore } from 'pinia'
import { logger } from '@/utils/logger'

export const useEditorStore = defineStore('editorStore', {
    state: () => ({
        viewport: 'desktop' as Viewport,
        currentSelect: null as BaseBlockNull,
        configPanelShow: false,
        blockConfig: [] as BaseBlock[]
    }),
    getters: {
        isMobileViewport: (state) => state.viewport === 'mobile'
    },
    actions: {
        setViewport(value: Viewport) {
            logger.info(`更新 viewport : ${value}`);
            this.viewport = value
        },
        setCurrentSelect(value: BaseBlockNull) {
            logger.info(`currentSelect: `, this.currentSelect);
            this.currentSelect = value
        },
        setConfigPanelShow(value: boolean) {
            logger.info(`更新 configPanelShow : `, value);
            this.configPanelShow = value
        },
        setBlockConfig(value: BaseBlock[]) {
            logger.info(`更新 blockConfig : `, value);
            this.blockConfig = value
        }
    }
}
)

