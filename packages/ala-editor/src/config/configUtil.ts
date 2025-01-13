import { Type } from "@sinclair/typebox"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-13 10:37:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 10:38:17
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/configUtil.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export const configTitle = (title: string) => {
    const title_title = Type.String({
        code: "config-title",
        title,
    })
    return title_title
}