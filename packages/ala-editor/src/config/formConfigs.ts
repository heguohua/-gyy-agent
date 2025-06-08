/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:02:26
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-08 15:55:17
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { systemUser } from "@/config/formConfigs/systemUser"
import FormConfig from "@/config/formConfigs/formConfig"
import { logger } from "@/utils/logger"


const formConfigs = {
    systemUser
}


const selectTableConfig = new Map<string, FormConfig>()


/**
 * 根据 pageApi url查找对应的FormConfig信息
 * @param url 
 * @returns 
 */
export const getDetailConfig = (url: string) => {
    let config = selectTableConfig.get(url)
    if (!config) {
        // 遍历所有 formConfigs 根据url查找
        Object.entries(formConfigs).forEach(value => {
            const [k, v] = value
            if (v.pageApi === url) {
                config = v
                selectTableConfig.set(url, config!)
            }
        })

    }
    if (!config) {
        // 没找到当前模块对应的 FormConfig 则给出提示信息
        logger.error(`【 错误，错误，错误 】根据[ ${url} ]没有找到当前模块注册的FormConfig`)
    }
    return config
}


export const setDetailConfig = (url: string, config: FormConfig) => {
    selectTableConfig.set(url, config)
}

export default formConfigs