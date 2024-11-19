/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:05:56
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-19 13:22:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/schemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import imageSchema from '@/components/cps/image/schema'
import fileSchema from '@/components/cps/file/schema'
import columnSchema from '@/components/cps/column/schema'

const _allSchemas = {
    image: imageSchema,
    configFile: fileSchema,
    configColumn: columnSchema
}


// type BlockSchemas = {
//     image: TObject<{
//         display: TObject<{
//             desktop: TBoolean;
//             mobile: TBoolean;
//         }>;
//         src: TObject<{
//             desktop: TString;
//             mobile: TString;
//         }>;
//         link: TObject<...>;
//         width: TObject<...>;
//         height: TObject<...>;
//     }>;
//     file: TObject<...>;
//     column: TObject<...>;
// }
export type BlockSchemas = typeof _allSchemas

// type BlockSchemaKeys = "file" | "image" | "column"
export type BlockSchemaKeys = keyof BlockSchemas


export const blockSchemas = _allSchemas


import _AlaPageSchema, { type AlaPageSchema } from '@/config/page-schemas'

export type AlaPageFormSchema = AlaPageSchema
export const pageSchemas = _AlaPageSchema

