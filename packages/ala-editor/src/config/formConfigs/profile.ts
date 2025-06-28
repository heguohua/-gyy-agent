/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-28 22:39:14
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/profile.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitchImage } from "../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const profile: FormConfig = {
    formAttr: {
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("profileName", '模型名称', [alaRequired()]),
    ],
    detailAttr: [],
    detailFields: [
        alaDetailInput('profileName', "模型名称", 1, true),
        alaDetailInput('profileGroup', "模型分类", 1, false, { deepColumnName: { desktop: 'name' } }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
    
    ],
    pageApi: '/iot/profile/page',
    pageFields: [
        alaDetailInput('profileName', "模型名称", 1, true),
        alaDetailInput('profileCode', "模型编号"),
        alaDetailInput('profileGroup', "模型分类", 1, false, { deepColumnName: { desktop: 'name' } }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate( 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'profile'

}


