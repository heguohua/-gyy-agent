/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:05:56
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-30 19:32:53
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/schemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import imageSchema from '@/components/cps/image/schema'
import fileSchema from '@/components/cps/file/schema'
import configColumnSchema from '@/components/cps/column/schema'
import columnSchema from '@/components/cps/column/schema'

// 注册表单 schema
import InputSchema from '@/components/cps/input/formSchema'
import TextareaSchema from '@/components/cps/textarea/formSchema'
import HiddenSchema from '@/components/cps/hidden/formSchema'
import PasswordSchema from '@/components/cps/password/formSchema'
import NumberSchema from '@/components/cps/number/formSchema'
import RadioSchema from '@/components/cps/radio/formSchema'
import CheckboxSchema from '@/components/cps/checkbox/formSchema'
import SelectSchema from '@/components/cps/select/formSchema'
import SwitchSchema from '@/components/cps/switch/formSchema'
import SliderSchema from '@/components/cps/slider/formSchema'
import RatingSchema from '@/components/cps/rating/formSchema'
import DateSchema from '@/components/cps/date/formSchema'
import DateRangeSchema from '@/components/cps/date-range/formSchema'
import SelectApiSchema from '@/components/cps/select-api/formSchema'
import SelectDictSchema from '@/components/cps/select-dict/formSchema'
import SelectTreeSchema from '@/components/cps/select-tree/formSchema'
import SelectTableSchema from '@/components/cps/select-table/formSchema'
import DividerSchema from '@/components/cps/divider/formSchema'
import ChapterSchema from '@/components/cps/chapter/formSchema'
import CascaderSchema from '@/components/cps/cascader/formSchema'

// 图表相关组件
import AlaLineChartSchema from '@/components/charts/line-chart/formSchema'


const _allSchemas = {
    image: imageSchema,
    configFile: fileSchema,
    column: columnSchema,
    configColumnSchema: configColumnSchema,

    // 注册表单组件
    input: InputSchema,
    textarea: TextareaSchema,
    hidden: HiddenSchema,
    password: PasswordSchema,
    number: NumberSchema,
    radio: RadioSchema,
    checkbox: CheckboxSchema,
    select: SelectSchema,
    switch: SwitchSchema,
    slider: SliderSchema,
    rating: RatingSchema,
    date: DateSchema,
    dateRange: DateRangeSchema,
    selectApi: SelectApiSchema,
    selectDict: SelectDictSchema,
    selectTree: SelectTreeSchema,
    selectTable: SelectTableSchema,
    divider: DividerSchema,
    chapter: ChapterSchema,
    cascader: CascaderSchema,

    // 注册 图表 组件
    lineChart:AlaLineChartSchema,
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


import _AlaPageSchemaForm, { type AlaPageSchemaForm } from '@/config/page-schemas-form'
import _AlaPageSchemaPage, { type AlaPageSchemaPage } from '@/config/page-schemas-page'
import _AlaPageSchemaScreen, { type AlaPageSchemaScreen } from '@/config/page-schemas-screen'

export type AlaPageFormSchemaForm = AlaPageSchemaForm
export type AlaPageFormSchemaPage = AlaPageSchemaPage
export const pageSchemasForm = _AlaPageSchemaForm
export const pageSchemasPage = _AlaPageSchemaPage
export const screenSchemasPage = _AlaPageSchemaScreen

