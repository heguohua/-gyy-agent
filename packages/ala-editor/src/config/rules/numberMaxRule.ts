/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 21:57:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/numberMaxRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { type: 'number', min: 18, max: 100, message: '年龄在 18 到 100 岁之间', trigger: 'blur' }
export default interface numberMaxRule extends baseRule {
    /**
     * 最大数值
     */
    max: Number;
    type: 'number';
}

