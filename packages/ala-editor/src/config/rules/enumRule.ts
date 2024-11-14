/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 20:30:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:31:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/enumRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";


// { enum: ['option1', 'option2'], message: '必须选择预定义的选项', trigger: 'change' }
export default interface enumRule extends baseRule {
    /**
     * 字符串可选项
     */
    enum: Array<String>,
}

