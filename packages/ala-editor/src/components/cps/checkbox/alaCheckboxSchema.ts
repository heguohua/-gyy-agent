/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 23:03:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 23:04:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/checkbox/alaCheckboxSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import AlaItemSchema from "@/config/alaItemSchema";
import AlaSchema from "@/config/alaSchema";

export default interface AlaCheckboxSchema extends AlaSchema {
    other: {
        items: Array<AlaItemSchema>
    }
}


