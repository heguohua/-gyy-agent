/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-09 18:14:29
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-17 16:31:17
 * @FilePath: /1-low-coding/packages/ala-editor/src/types/menuType.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export default interface Menu {
    id: string,
    icon: string,
    name: string,
    width: string,
    height: string,
    url: string,
    fullPath?: string,
    code: string,
    children: Array<Menu>,
}