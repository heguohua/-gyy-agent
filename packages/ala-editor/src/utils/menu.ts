/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 12:57:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-10 13:03:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/menu.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import Menu from "@/types/menuType";

export default class MenuUtil {
    static registerDynamicRouter(nodes: Menu[], level = 0): void {
        nodes.forEach(node => {
            console.log('  '.repeat(level) + `ID: ${node.id}, Name: ${node.name}`);
            this.registerDynamicRouter(node.children, level + 1);
        });
    }
}