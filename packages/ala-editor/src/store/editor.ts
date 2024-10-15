/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:03:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:21:47
 * @FilePath: /low-coding/packages/ala-editor/src/store/editor.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('editor', {
    state: () => ({
        count: 0
    }),
    getters: { double: (state) => state.count * 2 },
    actions: {
        setCount() {
            this.count++
        }
    }
}
)

