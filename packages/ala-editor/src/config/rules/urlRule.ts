/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 20:30:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:41:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/urlRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";


// {
//   type: 'url', // 验证URL格式
//   message: '请输入正确的URL地址',
//   trigger: 'blur' // 失去焦点时触发
// }
export default interface urlRule extends baseRule {
    /**
     * URL格式
     */
    type: 'url',
}

