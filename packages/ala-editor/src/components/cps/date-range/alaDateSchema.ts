/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 23:01:40
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 11:15:57
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/date/alaDateSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import AlaSchema from "@/config/alaSchema";

export default interface AlaDateSchema extends AlaSchema {

    other: {
        [key: string]: string
    }

}


