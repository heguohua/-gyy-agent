/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-08-22 18:14:45
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-22 18:14:51
 * @FilePath: /1-low-coding/packages/ala-editor/vite-env.d.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
interface ImportMeta {
    glob: (pattern: string) => Record<string, () => Promise<unknown>>;
}