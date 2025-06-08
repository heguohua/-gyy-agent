import { AlaField } from "@/config/fieldSchemas"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:49:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-08 10:56:29
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/fromConfig.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export default interface FormConfig {
    formAttr: { [key: string]: any }
    detailAttr: { [key: string]: any }
    formFields: Array<AlaField>
}
