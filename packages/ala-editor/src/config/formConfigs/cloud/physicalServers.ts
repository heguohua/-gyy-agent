/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-25 17:59:56
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/physicalServers.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildSelectTable, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaNumberRange, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailDate, alaDetailInput, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitch, alaDetailSwitchImage, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"

export const physicalServers: FormConfig = {
    formAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    formFields: [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '主机名', [alaRequired()]),
        alaBuildInput("osName", '操作系统', [alaRequired()]),
        alaBuildInput("innerIp", '内网IP地址', [alaRequired()]),
        alaBuildNumber("cpuAmount", "CPU核心数", [alaRequired(), alaNumberRange(1, 200)], "请输入CPU最大线程数", { initValue: 5 }),
        alaBuildNumber("memoryAmount", "内存/GB", [alaRequired(), alaNumberRange(1, 2048)], "请输入内存", { initValue: 128 }),
        alaBuildNumber("reserveCpuAmount", "预留CPU核心数", [alaRequired(), alaNumberRange(1, 200)], "请输入预留CPU核心数", { initValue: 2 }),
        alaBuildNumber("reserveMemoryAmount", "预留内存/GB", [alaRequired(), alaNumberRange(1, 2048)], "请输入内存", { initValue: 8 }),
        alaBuildNumber("cpuOverIssueRadio", "CPU超发倍数", [alaRequired(), alaNumberRange(0, 10)], "请输入CPU超发倍数", { initValue: 0 }),
        alaBuildTextarea("specifications", "备注", [], "请输入备注"),

    ],
    detailAttr: {
        formWidth: 800,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    },
    detailFields: [
        alaDetailInput('name', "主机名", 1, true),
        alaDetailInput('osName', "操作系统"),
        alaDetailInput('innerIp', "内网IP地址"),
        alaDetailInput('cpuAmount', "CPU核心数"),
        alaDetailInput('memoryAmount', "内存/GB"),
        alaDetailInput('allocatedCpuAmount', "已分配CPU核心数"),
        alaDetailInput('allocatedMemoryAmount', "已分配内存/GB"),
        alaDetailInput('realCpuAmount', "实用CPU核心数"),
        alaDetailInput('realMemoryAmount', "实用内存/GB"),
        alaDetailInput('reserveCpuAmount', "预留CPU核心数"),
        alaDetailInput('reserveMemoryAmount', "预留内存/GB"),
        alaDetailInput('cpuOverIssueRadio', "CPU超发倍数"),

        alaDetailSwitchImage('online', '在/离线状态', [{ value: 1, src: '/cloud/power-on.png', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px', columnWidth: { desktop: '140' } }),

        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailTextarea('specifications', "备注"),

        alaDetailInput('createdName', "创建人"),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailInput('updatedName', "更新人"),
        alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),

    ],
    pageApi: '/c/physicalServers/page',
    pageFields: [

        alaDetailInput('name', "主机名", 1, true),
        alaDetailInput('osName', "操作系统", 1, false, { columnWidth: { desktop: '115' } }),
        alaDetailInput('innerIp', "内网IP地址", 1, false, { columnWidth: { desktop: '130' } }),
        alaDetailInput('cpuAmount', "CPU核心数", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailInput('memoryAmount', "内存/GB", 1, false, { columnWidth: { desktop: '110' } }),
        alaDetailInput('realCpuAmount', "实用CPU核心数", 1, false, { columnWidth: { desktop: '135' } }),
        alaDetailInput('realMemoryAmount', "实用内存/GB", 1, false, { columnWidth: { desktop: '130' } }),
        alaDetailInput('allocatedCpuAmount', "已分配CPU核心数", 1, false, { columnWidth: { desktop: '150' } }),
        alaDetailInput('allocatedMemoryAmount', "已分配内存/GB", 1, false, { columnWidth: { desktop: '135' } }),
        alaDetailInput('cpuOverIssueRadio', "CPU超发倍数", 1, false, { columnWidth: { desktop: '125' } }),

        alaDetailSwitchImage('online', '在/离线状态', [{ value: 1, src: '/cloud/power-on.png', title: '开机' }, { value: 2, src: '/cloud/power-off.png', title: '关机' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px', columnWidth: { desktop: '125' } }),

        alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '115' } }),

        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '110' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'physicalServers'

}


