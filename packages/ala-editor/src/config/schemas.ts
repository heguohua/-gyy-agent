/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:05:56
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 11:21:10
 * @FilePath: /low-coding/packages/ala-editor/src/config/schemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import imageSchema from '@/components/cps/image/schema'
import fileSchema from '@/components/cps/file/schema'

const _allSchemas = {
    image: imageSchema,
    file: fileSchema,
}

export type BlockSchemas = typeof _allSchemas

export type BlockSchemaKeys = keyof BlockSchemas

export const blockSchema = _allSchemas

