/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-08 10:58:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/systemUser.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildPassword, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"

const systemUser: FormConfig = {
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
        alaBuildSelectTree("organizationId", "所属部门", "/u/organization/tree", {}, { propertyName: 'name', valueName: 'id', childrenName: 'children' }, undefined, "请选择用户所属部门", {
            clearable: true,
            checkStrictly: true,
        }),

    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    }
}


export default systemUser