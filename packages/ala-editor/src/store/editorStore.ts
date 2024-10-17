/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 19:59:33
 * @FilePath: /low-coding/packages/ala-editor/src/store/editor.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Viewport } from '@/types/editorType'
import { BaseBlockNull } from '@/types/editorType'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editorStore', {
    state: () => ({
        viewport: 'desktop' as Viewport,
        currentSelect: null as BaseBlockNull
    }),
    getters: {

    },
    actions: {
        setViewport(value: Viewport) {
            this.viewport = value
        },
        setCurrentSelect(value: BaseBlockNull) {
            this.currentSelect = value
        }
    }
}
)

