/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:21:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/numberRangeRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import numberMaxRule from "./numberMaxRule";
import numberMinRule from "./numberMinRule";



// { min: 3, max: 6, message: '数值在3~6之间', trigger: 'blur' }
export default interface numberRangeRule extends numberMinRule, numberMaxRule {
}

