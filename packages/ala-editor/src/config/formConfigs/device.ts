/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-28 22:25:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/device.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree } from "@/config/alaBuilders"
import { alaEmail, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitchImage } from "../alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const device: FormConfig = {
    formAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("deviceName", '设备名称', [alaRequired()]),
        alaBuildInput("deviceCode", '资产编号', [alaRequired()]),
        alaBuildSelectTable("profiles", "物模型", "/iot/profile/page", [{ prop: 'profileName', label: '模型名称', isQuery: true }, { prop: 'profileCode', label: '模型编号' }], { propertyName: 'profileName', valueName: 'id' }, undefined, {}, "请选择", 'model'),
    ],
    detailAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('deviceName', "设备名称", 1, true),
        alaDetailInput('deviceCode', "资产编号"),
        alaDetailSelectTable('profiles', "物模型", "profileName"),
        alaDetailInput('deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
        alaDetailSwitchImage('online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
    ],
    pageApi: '/iot/device/page',
    pageFields: [
        alaDetailInput('deviceName', "设备名称", 1, true),
        alaDetailInput('deviceCode', "资产编号"),
        alaDetailSelectTable('profiles', "物模型", "profileName", 1, false, { columnWidth: { desktop: '150' } }),
        alaDetailInput('deviceAreaGroup', "所在区域", 1, false, { deepColumnName: { desktop: 'name' } }),
        alaDetailSwitchImage('online', '在/离线状态', [{ value: true, src: '/iot/online.png', title: '在线' }, { value: false, src: '/iot/offline.png', title: '已离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),
        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'device'

}


