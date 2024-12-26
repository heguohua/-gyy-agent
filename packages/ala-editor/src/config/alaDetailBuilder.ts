/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-26 09:38:46
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 09:40:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaDetailBuilder.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export function alaDetailBuild(componentName: string, value: any, formItem: Object, label?: string) {
    return {
        componentName: componentName,
        label: label,
        value: value,
        formItem: formItem,
    }
}
