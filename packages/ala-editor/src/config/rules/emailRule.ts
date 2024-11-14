/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 20:30:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:34:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/emailRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";


// {
//   type: 'email', // 验证邮箱格式
//   message: '请输入正确的邮箱地址',
//   trigger: 'blur' // 失去焦点时触发
// }
export default interface emailRule extends baseRule {
    /**
     * 邮箱格式
     */
    type: 'email',
}

