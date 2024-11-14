/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 22:20:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/numberMinRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { type: 'number', min: 18, max: 100, message: '年龄在 18 到 100 岁之间', trigger: 'blur' }
export default interface numberMinRule extends baseRule {
    /**
     * 最小数值
     */
    min: Number;
    type: 'number';
}

