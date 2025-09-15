/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 10:50:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 18:48:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formConfigs/cloud/application.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { alaBuildChapter, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRelationSubForm, alaBuildSelect, alaBuildSelectDict, alaBuildSelectTable, alaBuildSelectTree, alaBuildTextarea } from "@/config/alaBuilders"
import { alaEmail, alaNumberRange, alaPhone, alaRequired } from "@/config/alaRules"
import FormConfig from "@/config/formConfigs/formConfig"
import { alaDetailBuild, alaDetailChapter, alaDetailDate, alaDetailInput, alaDetailNumber, alaDetailSelect, alaDetailSelectDict, alaDetailSelectTable, alaDetailSelectTree, alaDetailSwitch, alaDetailSwitchImage, alaDetailTextarea } from "@/config/alaDetailBuilder"
import { dType } from "@/components/cps/dynamic/detailType"
import formConfigs from "@/config/formConfigs"

const formAttr = {
    formWidth: 600,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: true,
}

export const appTypes: Array<{ [key: string]: string | number }> = [
    { 'MySQL单机': 'mysql-1m' },
    { 'MySQL主从集群': 'mysql-1m1s' },
    { 'Redis单机': 'redis-1m' },
    { 'Redis Sentinel集群': 'redis-sentinel' },
    { 'Kafka单机': 'kafka-1m' },
    { 'Kafka 3节点集群': 'kafka-3m' },
    { 'MinIO单机': 'minio-1m' },
    { 'MinIO 4节点集群': 'minio-4m' },
    { 'IoTDB 1C1D集群': 'iotdb-1c1d' },
    { 'IoTDB 3C3D集群': 'iotdb-3c3d' },
]

const getConfig = (title: string, index: number) => {
    return [
        alaBuildChapter(title),
        alaBuildSelectTable("cloudServers_" + index, "云主机", "/c/cloudServers/page", [{ prop: 'name', label: '云主机名', isQuery: true }, { prop: 'specifications', label: '备注' }], { propertyName: 'name', valueName: 'id' }, [alaRequired()], {}, "请选择云服务器", "cloudServers", 36, 23, false, true, true),
        alaBuildNumber("maxCpu_" + index, "最大使用CPU", [alaRequired()], "", { initValue: 0.5, min: 0.1, max: 16, precision: 1, step: 0.1 }),
        alaBuildNumber("maxMemory_" + index, "最大使用内存(m)", [alaRequired()], "", { initValue: 256, min: 128, max: 1024 * 32, precision: 0, step: 1 }),
        alaBuildTextarea("containerParam_" + index, "容器参数", [], "请输入容器参数"),
        alaBuildTextarea("remark_" + index, "备注", [], "请输入备注"),
    ]
}
export const application: FormConfig = {
    formAttr,
    formFields: [
        alaBuildChapter('基本信息'),
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '服务名称', [alaRequired()]),
        alaBuildSelect('type', "服务类型", appTypes, [alaRequired()], "请选择服务类型"),
        alaBuildTextarea("remark", "备注", [], "请输入备注"),

        alaBuildRelationSubForm("typeForm", "所选服务配置项表单", {
            watchFieldName: 'type',
            formAttr,
            subFormFields: {
                "mysql-1m": [
                    ...getConfig("部署信息", 1)
                ],
                "mysql-1m1s": [
                    ...getConfig("【 主节点 】部署信息", 1),
                    ...getConfig("【 从节点 】部署信息", 2),
                ],
            }
        })


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
    pageApi: '/c/application/page',
    pageFields: [

        alaDetailInput('name', "服务名称", 1, true, { columnWidth: { desktop: '250' } }),
        alaDetailSelect("type", "服务类型", appTypes, 1, false, { columnWidth: { desktop: '150' } }),

        alaDetailInput('cloudServersGroup', "业务组", 1, false, { deepColumnName: { desktop: 'name' }, columnWidth: { desktop: '250' } }),

        alaDetailSwitchImage('runningStatus', '运行中/已停止/离线', [{ value: 1, src: '/cloud/power-on.svg', title: '运行中' }, { value: 2, src: '/cloud/power-off.png', title: '已停止' }, { value: 3, src: '/iot/offline.png', title: '离线' }], 1, false, { height: '30px' }),

        alaDetailTextarea('url', '连接地址', 500, 200),
        alaDetailTextarea('info', '账号信息', 500, 200),


        // alaDetailInput('osName', "操作系统", 1, false, { columnWidth: { desktop: '160' } }),\
        // alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '115' } }),
        alaDetailInput('createdName', "创建人", 1, false, { columnWidth: { desktop: '110' } }),
        alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),

    ],
    moduleName: 'application'

}


