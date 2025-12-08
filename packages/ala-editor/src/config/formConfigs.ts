/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:02:26
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-08 23:01:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { lowcodingConfig as lowcodingConfigs } from "@/config/formConfigs/lowcoding/lowcodingConfig"
import { applicationInstance } from "@/config/formConfigs/cloud/applicationInstance"
import { application } from "@/config/formConfigs/cloud/application"
import { snapshot } from "@/config/formConfigs/cloud/snapshot"
import { physicalServersDisks } from "@/config/formConfigs/cloud/physicalServersDisks"
import { cloudServers } from "@/config/formConfigs/cloud/cloudServers"
import { physicalServers } from "@/config/formConfigs/cloud/physicalServers"
import { systemUser } from "@/config/formConfigs/systemUser"
import { systemLog } from "@/config/formConfigs/systemLog"
import { systemRole } from "@/config/formConfigs/systemRole"
import { device } from "@/config/formConfigs/device"
import { camera } from "@/config/formConfigs/camera"
import { profile } from "@/config/formConfigs/profile"
import FormConfig from "@/config/formConfigs/formConfig"
import { logger } from "@/utils/logger"
import { formConfigParse, LowcodingConfig } from "@/pages/dynamic/formConfigParser"
import { alaPost } from "@/utils/req"
import u from "@/utils/u"


const formConfigs = {
    systemUser,
    systemLog,
    device,
    camera,
    profile,
    systemRole,
    physicalServers,
    cloudServers,
    physicalServersDisks,
    snapshot,
    application,
    applicationInstance,
    lowcodingConfig: lowcodingConfigs,
}


const selectTableConfig = new Map<string, FormConfig>()
const lowcodingConfigWithClassName = new Map<string, LowcodingConfig>()
const rawLowcodingConfigWithClassName = new Map<string, any>()
const lowcodingConfigWithId = new Map<number, LowcodingConfig>()


/**
 * 根据 pageApi url查找对应的FormConfig信息
 * @param url 
 * @returns 
 */
export const getFormConfigFromCache = (url: string) => {
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
    if (!config && url != '/l/dynamic/page' && url.startsWith('/')) {
        // 没找到当前模块对应的 FormConfig 则给出提示信息
        logger.error(`【 错误，错误，错误 】根据[ ${url} ]没有找到当前模块注册的FormConfig`)
    }
    return config
}


/**
 * 根据 className 查找对应的 LowcodingConfig 信息
 * @param className 
 * @returns 
 */
export const getLowcodingConfigByClassName = async (className: string): Promise<LowcodingConfig> => {
    let config = lowcodingConfigWithClassName.get(className)
    if (!config) {
        // 从后端api加载
        const list_url = "/l/lowcodingConfig/list"
        const list_params = { className }
        config = await formConfigParse(list_url, list_params)
        if (config) {
            lowcodingConfigWithClassName.set(className, config)
        }
    }
    if (!config) {
        // 没找到当前模块对应的 FormConfig 则给出提示信息
        logger.error(`【 错误，错误，错误 】根据ClassName[ ${className} ]没有从后端api加载到当前模块注册的LowcodingConfig`)
    }
    return config
}

/**
 * 根据 className 查找对应的 LowcodingConfig 信息
 * @param className 
 * @returns 
 */
export const getRawLowcodingConfigByClassName = async (className: string): Promise<any> => {
    let config = rawLowcodingConfigWithClassName.get(className)
    if (!config) {
        // 从后端api加载
        const lowcodingConfigUrl = '/l/lowcodingConfig/list'
        const lowcodingConfigParams = { className }
        config = await alaPost(u.url(lowcodingConfigUrl || ''), lowcodingConfigParams, false, '').then((response: any) => {
            const cfg = u.parseJson(response.data[0].config)
            return cfg
        })

        if (config) {
            rawLowcodingConfigWithClassName.set(className, config)
        }
    }
    if (!config) {
        // 没找到当前模块对应的 FormConfig 则给出提示信息
        logger.error(`【 错误，错误，错误 】根据ClassName[ ${className} ]没有从后端api加载到当前模块注册的LowcodingConfig`)
    }
    return config
}

/**
 * 根据 LowcodingConfig 模块 id 查找对应的 LowcodingConfig 信息
 * @param id 
 * @returns 
 */
export const getLowcodingConfigById = async (id: number): Promise<LowcodingConfig> => {
    let config = lowcodingConfigWithId.get(id)
    if (!config) {
        // 从后端api加载
        const list_url = "/l/lowcodingConfig/list"
        const list_params = { id }
        config = await formConfigParse(list_url, list_params)
        if (config) {
            lowcodingConfigWithId.set(id, config)
        }
    }
    if (!config) {
        // 没找到当前模块对应的 FormConfig 则给出提示信息
        logger.error(`【 错误，错误，错误 】根据ID[ ${id} ]没有从后端api加载到当前模块注册的LowcodingConfig`)
    }
    return config
}


export const setFormConfigToCache = (url: string, config: FormConfig) => {
    selectTableConfig.set(url, config)
}

export default formConfigs