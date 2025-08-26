/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-26 21:11:23
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/physicalServers.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildChapter, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaNumberRange, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailChapter, alaDetailDate, alaDetailInput, alaDetailNumber, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitch, alaDetailSwitchImage, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const physicalServers: FormConfig = {
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
        alaBuildInput("name", '主机名称', [alaRequired()]),
        alaBuildInput("osName", '操作系统', [alaRequired()]),
        alaBuildInput("innerIp", '内网IP地址', [alaRequired()]),
        alaBuildTextarea("specifications", "备注", [], "请输入备注"),
        alaBuildChapter('CPU配额'),
        alaBuildNumber("cpuAmount", "CPU核心数", [alaRequired(), alaNumberRange(1, 200)], "请输入CPU最大线程数", { initValue: 5, precision: 0 }),
        alaBuildNumber("reserveCpuAmount", "预留CPU核心数", [alaRequired(), alaNumberRange(1, 200)], "请输入预留CPU核心数", { initValue: 2, precision: 0 }),
        alaBuildNumber("cpuOverIssueRadio", "CPU超发倍数", [alaRequired(), alaNumberRange(0, 10)], "请输入CPU超发倍数", { initValue: 0 }),
        alaBuildChapter('内存配额'),
        alaBuildNumber("memoryAmount", "内存", [alaRequired(), alaNumberRange(1, 2048)], "请输入内存", { initValue: 128, precision: 0 }),
        alaBuildNumber("reserveMemoryAmount", "预留内存", [alaRequired(), alaNumberRange(1, 2048)], "请输入内存", { initValue: 8 }),

    ],
    detailAttr: {
        formWidth: 1800,
        columnNum: 2,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: true,
    },
    detailFields: [
        alaDetailChapter('基本信息', 2),
        alaDetailInput('name', "主机名称", 1, true),
        alaDetailInput('osName', "操作系统"),
        alaDetailInput('innerIp', "内网IP地址"),

        alaDetailSwitchImage('runningStatus', '开机/关机/离线', [{ value: 1, src: '/cloud/power-on.png', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px' }),

        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, {}),
        alaDetailInput('physicalServersGroup', "所在地区", 1, false, { deepColumnName: { desktop: 'name' } }),

        alaDetailTextarea('specifications', "备注", 1000, 2),

        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

        alaDetailChapter('CPU配额', 2),
        alaDetailNumber('cpuAmount', "CPU核心数", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('reserveCpuAmount', "预留CPU核心数", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('allocatedCpuAmount', "已分配CPU核心数", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('realCpuAmount', "实用CPU核心数", 1, false, { unit: { desktop: '核' } }),
        alaDetailNumber('cpuOverIssueRadio', "CPU超发倍数", 2, false, { unit: { desktop: '倍' } }),

        alaDetailChapter('内存配额', 2),
        alaDetailNumber('memoryAmount', "内存", 1, false, { unit: { desktop: 'GB' } }),
        alaDetailNumber('reserveMemoryAmount', "预留内存", 1, false, { unit: { desktop: 'GB' } }),
        alaDetailNumber('allocatedMemoryAmount', "已分配内存", 1, false, { unit: { desktop: 'GB' } }),
        alaDetailNumber('realMemoryAmount', "实用内存", 1, false, { unit: { desktop: 'GB' } }),

    ],
    pageApi: '/c/physicalServers/page',
    pageFields: [

        alaDetailInput('name', "主机名称", 1, true, { columnWidth: { desktop: '250' } }),
        alaDetailInput('osName', "操作系统", 1, false, { columnWidth: { desktop: '115' } }),
        alaDetailInput('innerIp', "内网IP地址", 1, false, { columnWidth: { desktop: '130' } }),
        alaDetailNumber('cpuAmount', "CPU核心数", 1, false, { columnWidth: { desktop: '130' }, unit: { desktop: '核' } }),
        alaDetailNumber('cpuOverIssueRadio', "CPU超发倍数", 1, false, { columnWidth: { desktop: '150' }, unit: { desktop: '倍' } }),
        alaDetailNumber('allocatedCpuAmount', "已分配CPU核心数", 1, false, { columnWidth: { desktop: '180' }, unit: { desktop: '核' } }),
        alaDetailNumber('realCpuAmount', "实用CPU核心数", 1, false, { columnWidth: { desktop: '165' }, unit: { desktop: '核' } }),
        alaDetailNumber('memoryAmount', "内存", 1, false, { columnWidth: { desktop: '115' }, unit: { desktop: 'GB' } }),
        alaDetailNumber('allocatedMemoryAmount', "已分配内存", 1, false, { columnWidth: { desktop: '160' }, unit: { desktop: 'GB' } }),
        alaDetailNumber('realMemoryAmount', "实用内存", 1, false, { columnWidth: { desktop: '145' }, unit: { desktop: 'GB' } }),

        alaDetailSwitchImage('runningStatus', '开机/关机/离线', [{ value: 1, src: '/cloud/power-on.png', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px', columnWidth: { desktop: '165' } }),

        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '115' } }),

        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '110' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'physicalServers'

}


