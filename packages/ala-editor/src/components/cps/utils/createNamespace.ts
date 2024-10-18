import { logger } from "@/utils/logger"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-18 16:37:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 16:58:14
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/utils/createNamespace.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export function createNamespaceFn(prefix: string) {
    return (name: string) => {
        const componentName = `${prefix}-${name}`
        const createBemNamespace = (suffix?: string) => {
            let bemNamespace = null
            if (!suffix) {
                bemNamespace = componentName
            } else {
                bemNamespace = suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`
            }
            logger.info(`bemNamespace : ${bemNamespace}`);

            return bemNamespace
        }
        return {
            name: componentName,
            bem: createBemNamespace
        }
    }
}

export const createNamespace = createNamespaceFn('ala')


