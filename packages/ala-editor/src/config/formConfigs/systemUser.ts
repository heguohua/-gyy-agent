/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-07 17:45:25
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/systemUser.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailSelectTree } from "../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const systemUser: FormConfig = {
    formAttr: {
        formWidth: 500,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'right',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("scabbard", '登录账号', [alaRequired()]),
        alaBuildPassword("sword", '登录密码', []),
        alaBuildInput("nickName", '用户昵称', [alaRequired()]),
        alaBuildInput("mobile", '手机号', [alaRequired(), alaPhone()]),
        alaBuildInput("email", '邮箱', [alaRequired(), alaEmail()]),
        alaBuildDate("entryDate", "入职时间", "date", "YYYY-MM-DD", [alaRequired()], "", "", "请选择入职时间"),
        alaBuildInput("iconPath", '用户头像', []),
        alaBuildSelectTree("organization", "所属部门", "/u/organization/tree", {}, { propertyName: 'name', valueName: 'id', childrenName: 'children' }, undefined, "请选择用户所属部门", {
            clearable: true,
            checkStrictly: true,
        }),
        alaBuildSelectTable("roles", "角色", "/u/role/page", [{ prop: 'name', label: '角色名', isQuery: true }, { prop: 'remark', label: '备注' }], { propertyName: 'name', valueName: 'id' }, undefined, {}, "请选择授权角色")

    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('scabbard', "登录账号", 1, true),
        alaDetailInput('nickName', "用户昵称"),
        alaDetailInput('mobile', "手机号"),
        alaDetailInput('email', "邮箱"),
        alaDetailDate('entryDate', "入职时间", 'YYYY-MM-DD'),
        alaDetailInput('iconPath', "用户头像"),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailSelectTree('organization', "所属部门", 'orgName')

    ],
    pageApi: '/u/user/page',
    pageFields: [
        alaDetailInput('scabbard', "登录账号", 1, true, { columnWidth: { desktop: '120' } }),
        alaDetailInput('nickName', "用户昵称", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailInput('mobile', "手机号", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailInput('email', "邮箱"),
        alaDetailInput('iconPath', "用户头像", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate('entryDate', "入职时间", 'YYYY-MM-DD', 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailSelectTree('organization', "所属部门", 'orgName')
    ],
    moduleName: 'user'

}


