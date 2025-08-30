/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-30 17:48:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/cloudServers.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildChapter, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildSelectDict, alaBuildSelectTable, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaNumberRange, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailChapter, alaDetailDate, alaDetailInput, alaDetailNumber, alaDetailSelectDict, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitch, alaDetailSwitchImage, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"
import formConfigs from "@/config/formConfigs"

export const cloudServers: FormConfig = {
    formAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: true,
    },
    formFields: [
        alaBuildChapter('基本信息'),
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '云主机名', [alaRequired()]),
        alaBuildTextarea("specifications", "备注", [], "请输入备注"),

        alaBuildChapter('基础配额'),
        // alaBuildInput("osName", '操作系统', [alaRequired()]),
        alaBuildSelectDict("osName", "操作系统", { "dictValue": "osType" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [alaRequired()], "请选择操作系统", { clearable: true, noEditable: true }),

        alaBuildInput("innerIp", '内网IP地址', [alaRequired()], "请填写内网IP地址", { noEditable: true }),
        alaBuildNumber("cpuAmount", "CPU核心数", [alaRequired(), alaNumberRange(1, 200)], "请输入CPU最大线程数", { initValue: 4, precision: 0 }),
        alaBuildNumber("memoryAmount", "内存/GB", [alaRequired(), alaNumberRange(1, 2048)], "请输入内存", { initValue: 16, precision: 0 }),
        alaBuildNumber("osDiskAmount", "系统盘容量/GB", [alaRequired(), alaNumberRange(1, 2048)], "请输入系统盘容量", { initValue: 40, precision: 0 }),

        alaBuildChapter('调度策略', "", { noEditable: true }),
        alaBuildSelectTable("physicalServers", "物理服务器", "/c/physicalServers/page", [{ "prop": "name", "label": "主机名称", "isQuery": "true" }, { "prop": "cpuAmount", "label": "CPU总核心数" }, { "prop": "realCpuAmount", "label": "实用CPU核心数" }, { "prop": "memoryAmount", "label": "总内存/GB" }, { "prop": "realMemoryAmount", "label": "实用内存/GB" }], { propertyName: 'name', valueName: 'id' }, [], {}, "请选择计划运行当前云服务器的物理服务器", 'physicalServers', 30, 18, false, true, true, { noEditable: true })


    ],
    detailAttr: {
        formWidth: 600,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: true,
    },
    detailFields: [
        alaDetailChapter('基本信息'),
        alaDetailInput('name', "云主机名", 1, true),
        alaDetailInput('code', "云主机编码", 1, false),

        alaDetailSwitchImage('runningStatus', '开机/关机/离线', [{ value: 1, src: '/cloud/power-on.svg', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px' }),
        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, {}),
        alaDetailInput('cloudServersGroup', "业务组", 1, false, { deepColumnName: { desktop: 'name' } }),
        alaDetailTextarea('specifications', "备注"),

        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

        alaDetailChapter('基础配额'),
        alaDetailSelectDict('osName', "操作系统", 'dictLabel', 1, false, { columnWidth: { desktop: '260' } }),
        alaDetailInput('innerIp', "内网IP地址"),
        alaDetailNumber('cpuAmount', "CPU核心数", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('memoryAmount', "内存", 1, false, { unit: { desktop: 'GB' } }),
        alaDetailNumber('osDiskAmount', "系统盘容量", 1, false, { unit: { desktop: 'GB' } }),

        alaDetailChapter('调度策略'),
        alaDetailSelectTable('physicalServers', "物理服务器", "name", 1, false, { columnWidth: { desktop: '150' }, url: { desktop: '/c/physicalServers/page' } }),

    ],
    pageApi: '/c/cloudServers/page',
    pageFields: [

        alaDetailInput('name', "云主机名", 1, true, { columnWidth: { desktop: '150' } }),
        alaDetailInput('cloudServersGroup', "业务组", 1, false, { deepColumnName: { desktop: 'name' }, columnWidth: { desktop: '250' } }),
        alaDetailInput('innerIp', "内网IP地址", 1, false, { columnWidth: { desktop: '140' } }),
        alaDetailSwitchImage('runningStatus', '开机/关机/离线', [{ value: 1, src: '/cloud/power-on.svg', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px', columnWidth: { desktop: '165' } }),
        // alaDetailInput('osName', "操作系统", 1, false, { columnWidth: { desktop: '160' } }),\
        alaDetailSelectDict('osName', "操作系统", 'dictLabel', 1, false, { columnWidth: { desktop: '260' } }),
        alaDetailNumber('cpuAmount', "CPU核心数", 1, false, { columnWidth: { desktop: '130' }, unit: { desktop: '核' } }),
        alaDetailNumber('memoryAmount', "内存", 1, false, { columnWidth: { desktop: '100' }, unit: { desktop: 'GB' } }),
        alaDetailNumber('osDiskAmount', "系统盘容量", 1, false, { columnWidth: { desktop: '140' }, unit: { desktop: 'GB' } }),
        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '115' } }),
        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '110' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'cloudServers'

}


