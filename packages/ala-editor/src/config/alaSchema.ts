/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 22:59:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 23:00:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export default interface AlaSchema {
    /**
     * 组件名称
     */
    componentName: string;
    /**
     * 字段名
     */
    label: string;
    /**
     * placeholder 占位符
     */
    placeholder?: string;
    /**
     * 属性名
     */
    fieldName: string
}


