/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-03 22:01:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/systemLog.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailImage, alaDetailInput, alaDetailRadio, alaDetailSelectTable, alaDetailSelectTree, alaDetailTextarea } from "../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"
import colors from "@/utils/colors"

export const systemLog: FormConfig = {
    formAttr: {

    },
    formFields: [


    ],
    detailAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('moduleName', "模块名"),
        alaDetailInput('bizId', "业务侧ID"),
        alaDetailInput('operationType', "操作类型"),
        alaDetailInput('remoteAddr', "客户端IP"),
        alaDetailInput('clientType', "客户端类型", 1, false, { columnWidth: { desktop: '140' } }),
        alaDetailInput('userAgent', "浏览器类型" ),
        alaDetailInput('requestUri', "请求URL" ),
        alaDetailInput('methodType', "请求方法类型" ),
        alaDetailTextarea('params', "请求参数" ),
        alaDetailInput('remark', "接口备注信息" ),
        alaDetailInput('beforeValue', "修改前的值" ),

        alaDetailRadio('success', "接口执行状态", [{ '成功': 1 }, { '失败': 2, 'color': colors.danger }], undefined, undefined, { columnWidth: { desktop: '150' } }),


        alaDetailInput('createdByUserName', "操作账号" ),
        alaDetailInput('createdName', "操作人"),
        alaDetailDate('createdTime', "操作时间", 'YYYY-MM-DD HH:mm:ss'),

        alaDetailTextarea('msg', '其他信息', 200),
        alaDetailTextarea('exception', '异常信息', 200),

    ],
    pageApi: '/log/operationLog/page',
    pageFields: [
        alaDetailInput('moduleName', "模块名", 1, true, { columnWidth: { desktop: '250' } }),
        alaDetailInput('bizId', "业务侧ID", 1, false, { columnWidth: { desktop: '150' } }),
        alaDetailInput('operationType', "操作类型", 1, false, { columnWidth: { desktop: '150' } }),
        alaDetailInput('remoteAddr', "客户端IP", 1, false, { columnWidth: { desktop: '200' } }),
        alaDetailInput('clientType', "客户端类型", 1, false, { columnWidth: { desktop: '150' } }),
        alaDetailRadio('success', "接口执行状态", [{ '成功': 1 }, { '失败': 2, 'color': colors.danger }]),

        alaDetailInput('createdName', "操作人" ),
        alaDetailDate('createdTime', "操作时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'log'

}


