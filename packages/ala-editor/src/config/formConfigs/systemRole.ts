/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-01 11:27:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/systemRole.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildPassword, alaBuildRadio, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailRadio, alaDetailSelectTree, alaDetailTextarea } from "../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"
import colors from "@/utils/colors"
// 所有数据
// 本部门及下级部门
// 本部门
// 仅本人
export const systemRole: FormConfig = {
    formAttr: {
        formWidth: 700,
        columnNum: 1,
        labelWidth: 120,
        labelPosition: 'right',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '角色名', [alaRequired()]),
        // alaBuildRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1 }, { '本部门及下级部门': 2 }, { '本部门': 3 }, { '仅本人': 4 }], [alaRequired()]),
        alaBuildRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1 }, { '本部门': 3 }, { '仅本人': 4 }], [alaRequired()]),
        alaBuildTextarea("remark", "备注", [], "请输入角色备注"),
    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('name', "角色名"),
        // alaDetailRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1, 'color': colors.danger }, { '本部门及下级部门': 2, 'color': colors.warning }, { '本部门': 3, 'color': colors.primary }, { '仅本人': 4, 'color': colors.info }], undefined, undefined, { columnWidth: { desktop: '100' } }),
        alaDetailRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1, 'color': colors.danger }, { '本部门': 3, 'color': colors.primary }, { '仅本人': 4, 'color': colors.info }], undefined, undefined, { columnWidth: { desktop: '100' } }),
        alaDetailTextarea('remark', '备注', 200),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

    ],
    pageApi: '/u/role/page',
    pageFields: [
        alaDetailInput('name', "角色名", 1, true),
        // alaDetailRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1, 'color': colors.danger }, { '本部门及下级部门': 2, 'color': colors.warning }, { '本部门': 3, 'color': colors.primary }, { '仅本人': 4, 'color': colors.info }], undefined, undefined, { columnWidth: { desktop: '200' } }),
        alaDetailRadio('dataAuthority', "数据权限范围", [{ '所有数据': 1, 'color': colors.danger }, { '本部门': 3, 'color': colors.primary }, { '仅本人': 4, 'color': colors.info }], undefined, undefined, { columnWidth: { desktop: '200' } }),
        alaDetailTextarea('remark', '备注', 200),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'role'

}


