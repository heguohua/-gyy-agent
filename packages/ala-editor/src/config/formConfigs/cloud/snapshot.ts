/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-03 18:37:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/snapshot.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailImage, alaDetailInput, alaDetailSelectTable, alaDetailSelectTree } from "../../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const snapshot: FormConfig = {
    formAttr: {
        formWidth: 500,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'right',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '快照名称', [alaRequired()]),
        alaBuildSelectTable("cloudServers", "云主机", "/c/cloudServers/page", [{ prop: 'name', label: '云主机名', isQuery: true }, { prop: 'specifications', label: '备注' }], { propertyName: 'name', valueName: 'id' }, undefined, {}, "请选择云服务器", "cloudServers", 36, 23, false, true, true),
    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('name', "快照名称"),
        alaDetailSelectTable('cloudServers', "云主机", "name", 1, false, { columnWidth: { desktop: '200' }, url: { desktop: '/c/cloudServers/page' } }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    pageApi: '/c/snapshot/page',
    pageFields: [
        alaDetailInput('name', "快照名称", 1, true, { columnWidth: { desktop: '150' } }),
        alaDetailSelectTable('cloudServers', "云主机", "name", 1, false, { columnWidth: { desktop: '200' }, url: { desktop: '/c/cloudServers/page' } }),
        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'snapshot'

}


