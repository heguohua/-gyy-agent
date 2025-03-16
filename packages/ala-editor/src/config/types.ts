/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-03-16 10:02:40
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-16 10:12:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/types.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export type AiMessage = {
    messageId: string
    messageType: string
    finishReason: string
    content: string
}
