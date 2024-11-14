/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:47:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/strLengthRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { len: 3, message: '字符串只能是3个字符', trigger: 'blur' }
export default interface strLengthRule extends baseRule {
    /**
     * 字符串长度精确为3个
     */
    len: Number
}

