/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:05:56
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-20 16:41:05
 * @FilePath: /low-coding/packages/ala-editor/src/config/schemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import imageSchema from '@/components/cps/image/schema'
import fileSchema from '@/components/cps/file/schema'
import AlaColumnSchema from '@/components/cps/column/schema'

const _allSchemas = {
    image: imageSchema,
    file: fileSchema,
    column: AlaColumnSchema
}

export type BlockSchemas = typeof _allSchemas

export type BlockSchemaKeys = keyof BlockSchemas


export const blockSchemas = _allSchemas

