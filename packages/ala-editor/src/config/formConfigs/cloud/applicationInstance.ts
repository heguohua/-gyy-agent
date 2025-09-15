/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 18:14:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/applicationInstance.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildImage, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailImage, alaDetailInput, alaDetailNumber, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitchImage, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const applicationInstance: FormConfig = {
    formAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 180,
        labelPosition: 'right',
        useFormTitle: false,
    },
    formFields: [
  
    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 180,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('name', "实例名称", 1, true, { columnWidth: { desktop: '150' } }),

        alaDetailInput('application', "应用服务", 1, false, { columnWidth: { desktop: '200' } }),
        alaDetailNumber('maxCpu', "最大使用CPU", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('maxMemory', "最大使用内存", 1, false, { unit: { desktop: 'm' } }),

        alaDetailTextarea('containerParam', '容器参数', 200, 200),
        alaDetailTextarea('info', '容器信息', 500, 200),

        alaDetailSwitchImage('runningStatus', '运行中/已停止/离线', [{ value: 1, src: '/cloud/power-on.svg', title: '运行中' }, { value: 2, src: '/cloud/power-off.png', title: '已停止' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px' }),

        // alaDetailTextarea('remark', '备注', 50, 100),

        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

    ],
    pageApi: '/c/applicationInstance/page',
    pageFields: [
        alaDetailInput('name', "实例名称", 1, true, { columnWidth: { desktop: '150' } }),

        alaDetailInput('application', "应用服务", 1, false, { columnWidth: { desktop: '200' } }),
        alaDetailNumber('maxCpu', "最大使用CPU", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('maxMemory', "最大使用内存", 1, false, { unit: { desktop: 'm' } }),

        alaDetailTextarea('containerParam', '容器参数', 200, 200),
        alaDetailTextarea('info', '容器信息', 500, 200),

        alaDetailSwitchImage('runningStatus', '运行中/已停止/离线', [{ value: 1, src: '/cloud/power-on.svg', title: '运行中' }, { value: 2, src: '/cloud/power-off.png', title: '已停止' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px' }),

        // alaDetailTextarea('remark', '备注', 50, 100),


        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    moduleName: 'applicationInstance'

}


