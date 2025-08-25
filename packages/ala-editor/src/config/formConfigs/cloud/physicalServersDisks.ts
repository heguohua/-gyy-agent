/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-25 23:00:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/physicalServersDisks.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildChapter, alaBuildDate, alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaNumberRange, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailImage, alaDetailInput, alaDetailNumber, alaDetailSelectTable, alaDetailSelectTree, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const physicalServersDisks: FormConfig = {
    formAttr: {
        formWidth: 750,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'right',
        useFormTitle: true,
    },
    formFields: [
        alaBuildChapter('基本信息'),
        alaBuildHidden('id'),
        alaBuildInput("name", '磁盘名称', [alaRequired()]),
        alaBuildTextarea("specifications", "备注", [], "请输入备注"),
        alaBuildNumber("diskAmount", "磁盘容量/GB", [alaRequired(), alaNumberRange(1, 1024000)], "请输入磁盘容量", { initValue: 1024, precision: 0 }),
        alaBuildNumber("reserveDiskAmount", "预留容量/GB", [alaNumberRange(1, 1024000)], "请输入磁盘预留容量", { initValue: 0, precision: 0 }),
        alaBuildSelectTable("physicalServers", "物理服务器", "/c/physicalServers/page", [{ prop: 'name', label: '主机名', isQuery: true }, { prop: 'specifications', label: '备注' }], { propertyName: 'name', valueName: 'id' }, undefined, {}, "请选择物理服务器"),

    ],
    detailAttr: {
        formWidth: 750,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: true,
    },
    detailFields: [

        alaDetailInput('name', "磁盘名称", 1, true, { columnWidth: { desktop: '150' } }),
        alaDetailTextarea('specifications', "备注"),
        alaDetailNumber('diskAmount', "磁盘容量/GB"),
        alaDetailNumber('reserveDiskAmount', "预留容量/GB"),
        alaDetailSelectTable('physicalServers', "物理服务器", "name", 1, false, { columnWidth: { desktop: '200' }, url: { desktop: '/c/physicalServers/page' }, }),

        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

    ],
    pageApi: '/c/physicalServersDisks/page',
    pageFields: [
        alaDetailInput('name', "磁盘名称", 1, true, { columnWidth: { desktop: '250' } }),
        alaDetailTextarea('specifications', "备注", 200, 1, false, { columnWidth: { desktop: '250' } }),
        alaDetailNumber('diskAmount', "磁盘容量/GB"),
        alaDetailNumber('reserveDiskAmount', "预留容量/GB"),
        alaDetailSelectTable('physicalServers', "物理服务器", "name", 1, false, { columnWidth: { desktop: '200' }, url: { desktop: '/c/physicalServers/page' }, }),
        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'physicalServersDisks'

}


