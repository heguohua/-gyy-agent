/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 19:21:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/rules/required.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { required: true, message: '请输入自定义内容', trigger: 'change' }
export default interface requiredRule extends baseRule {
    /**
     * 是否必填项
     */
    required: boolean;
}

