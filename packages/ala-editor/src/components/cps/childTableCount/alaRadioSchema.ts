/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 23:01:40
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 10:44:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/radio/alaRadioSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import AlaItemSchema from "@/config/alaItemSchema";
import AlaSchema from "@/config/alaSchema";

export default interface AlaRadioSchema extends AlaSchema {
    other: {
        items: Array<AlaItemSchema>
    }
}


