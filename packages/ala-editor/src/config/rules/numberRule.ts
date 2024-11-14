/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:12:43
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:54:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/rules/numberRule.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import baseRule from "./baseRule";



// { type: 'number', message: '请输入纯数字', trigger: 'blur' }
export default interface numberRule extends baseRule {
    /**
     * 校验类型
     */
    type: 'number',
}

