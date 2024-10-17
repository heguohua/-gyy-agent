import { TSchema, Type } from "@sinclair/typebox"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:43:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 14:44:50
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/utils/schemaAllViewport.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export const schemaAllViewport = <T extends TSchema>(params: T) => {
    return Type.Object({
        desktop: params,
        mobile: params,
    })
}