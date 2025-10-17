/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-17 15:49:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/lowcoding/lowcodingConfig.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailImage, alaDetailInput, alaDetailSelect, alaDetailSelectTable, alaDetailSelectTree } from "../../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"
import u from "@/utils/u"

const formTypes: Array<{ [key: string]: string }> = [
    { "列表表单": "pageForm" },
    { "流程表单": "flow" },
    { "大屏": "screen" },
]


export const lowcodingConfig: FormConfig = {
    formAttr: {

    },
    formFields: [

    ],
    detailAttr: {
    
    },
    detailFields: [

    ],
    pageApi: '/l/lowcodingConfig/page',
    pageFields: [
        alaDetailInput('name', "t('module.lowcoding.name')"),
        alaDetailSelect("formType", "t('module.lowcoding.pageType')", formTypes),
        alaDetailInput('className', "t('module.lowcoding.className')"),
        // alaDetailInput('version', "t('module.lowcoding.version')"),
        alaDetailInput('createdName', "t('common.createdBy')", 1, false, { columnWidth: { desktop: '140' } }),
        alaDetailDate('createdTime', "t('common.createdTime')", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),
        alaDetailInput('updatedName', "t('common.updatedBy')"),
        alaDetailDate('updatedTime', "t('common.updatedTime')", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'lowcodingConfig'

}


