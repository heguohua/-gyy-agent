/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-12 22:52:47
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/app.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildSwitch, alaBuildTextarea } from "@/config/alaBuilders"
import { alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailDate, alaDetailImage, alaDetailInput, alaDetailSwitch, alaDetailTextarea } from "../alaDetailBuilder"

export const app: FormConfig = {
    formAttr: {
        formWidth: 500,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'right',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '应用名称', [alaRequired()]),
        alaBuildSwitch('adisable', "应用状态", '启用', '禁用', 1, 2, [alaRequired()]),
        alaBuildTextarea("remark", "应用介绍", [], "请输入备注", {}),
        alaBuildImage("logo", '应用图标', [alaRequired()], "请选择应用图标", {
            oneLevel: 'system',
            secondLevel: 'application',
            columnWidth: '100',
            imageWidth: '100%',
        })
    ],
    detailAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('name', "应用名称", 1, true),
        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailTextarea('remark', '应用介绍', 200),
        alaDetailImage('logo', "应用图标", 1, false, {
            columnWidth: { desktop: '140' },
        }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

    ],
    pageApi: '/u/app/page',
    pageFields: [
        alaDetailInput('name', "应用名称", 1, true),
        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailTextarea('remark', '应用介绍', 200),
        alaDetailImage('logo', "应用图标", 1, false, {
            columnWidth: { desktop: '140' },
        }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'applicationMenu'

}


