/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:11:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/strMaxRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
export default interface strMaxRule extends baseRule {
    /**
     * 字符串最大长度
     */
    max: Number;
}

