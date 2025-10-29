/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-06-08 16:15:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-29 10:37:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/formConfigParser.ts
 * @Description: 
 * 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { alaBuildInput } from "@/config/alaBuilders";
import { date } from "@/utils/date";
import { alaPost } from "@/utils/req";
import u from "@/utils/u";
import { parseAi, parseCascade, parseChapter, parseCheckbox, parseChildTableCount, parseDate, parseDateRange, parseDivider, parseFile, parseFormTable, parseImage, parseInput, parseNumber, parseRadio, parseRating, parseSelect, parseSelectDict, parseSelectTable, parseSelectTree, parseSlider, parseSwitch, parseTextarea } from './formItemParser';
import { alaStrLengthRange, alaRequired, alaStrMax, alaStrMin, alaStrLength, alaNumberMin, alaNumberMax, alaNumberRange, alaPattern, alaEnumRule, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaLOrlOr8Or_, alaLl8_, alaPassword, alaCnTw, alaCn, alaTw } from "@/config/alaRules";
import baseRule from '@/config/rules/baseRule';
import { logger } from "@/utils/logger";
import { alaDetailBuild, alaDetailDate, alaDetailFlowInstanceState, alaDetailInput, alaDetailRadio, alaDetailSwitch } from "@/config/alaDetailBuilder";
import { dType } from "@/components/cps/dynamic/detailType";
import colors from "@/utils/colors";

interface Column { prop: string, label: string, formItem: any }

// 创建一个映射，将函数名字符串映射到函数引用
const ruleFunctions: { [key: string]: Function } = {
    alaRequired: alaRequired,
    alaStrMin: alaStrMin,
    alaStrMax: alaStrMax,
    alaStrLengthRange: alaStrLengthRange,
    alaStrLength: alaStrLength,
    alaNumberMin: alaNumberMin,
    alaNumberMax: alaNumberMax,
    alaNumberRange: alaNumberRange,
    alaPattern: alaPattern,
    alaEnumRule: alaEnumRule,
    alaEmail: alaEmail,
    alaPhone: alaPhone,
    alaUrl: alaUrl,
    alaCard: alaCard,
    alaNumber: alaNumber,
    alaLetter: alaLetter,
    alaLOrlOr8: alaLOrlOr8,
    alaLl8: alaLl8,
    alaLOrlOr8Or_: alaLOrlOr8Or_,
    alaLl8_: alaLl8_,
    alaPassword: alaPassword,
    alaCnTw: alaCnTw,
    alaCn: alaCn,
    alaTw: alaTw,
};
export interface LowcodingConfig {
    columns: Array<Column>
    baseFields: Array<any>
    formConfigItems: any
    addFormFields: Array<any>
    detailFields: Array<any>
    showAddButton: boolean
    showDeleteButton: boolean
    showEditButton: boolean
    showDisableButton: boolean
    showButtonsColumn: boolean
    formAttr: any
    className: string
    formType: string
    outApi: boolean
    outApiUrl: string
    outApiParams: string
}
export const formConfigParse = async (url: string, params: any): Promise<LowcodingConfig> => {

    const columns: Array<Column> = []

    // 基础查询条件
    const baseFields: Array<any> = ([])

    const formConfigItems: any = {}

    // 表单字段
    const addFormFields: Array<any> = []
    const detailFields: Array<any> = []

    let showAddButton = false
    let showDeleteButton = false
    let showEditButton = false
    let showDisableButton = false
    let showButtonsColumn = false
    let className = ''
    let formType = ''

    // 静态 api 接口相关配置
    let outApi = false
    let outApiUrl = ''
    let outApiParams = ''

    const formAttr = {
        formWidth: 400,
        columnNum: 1,
        labelWidth: 150,
        labelPosition: 'left',
        useFormTitle: false,
    }

    await alaPost(u.url(url || ''), params, false, '').then((response: any) => {

        if (response.code === 200) {

            const cf = response.data[0]
            className = cf.className

            const config = u.parseJson(cf.config)

            // 解析全部字段
            if (config.blockConfig?.form) {

                config.blockConfig?.form.forEach((item: { code: string, formData: any }) => {

                    const { code, formData } = { ...item }

                    // 首先添加 formConfigItem 配置
                    if (formData.fieldName?.desktop) {
                        // 屏蔽 ala-divider 此类没有
                        formConfigItems[formData.fieldName.desktop] = item
                    }

                    // 组装列表字段
                    if (formData.showInTable?.desktop) {
                        if (code === 'dateRange') {
                            const column = { prop: 'dateRange' + date.formatDateTime(new Date().getTime(), 'YYYYMMDDHHmmss'), label: formData.label.desktop, formItem: item }
                            columns.push(column)
                        } else {
                            const column = { prop: formData.fieldName.desktop, label: formData.label.desktop, formItem: item }
                            columns.push(column)
                            // 缓存每个字段的 formConfig 配置信息，供查询条件组装查询参数使用
                        }
                    }


                    // 组装详情页面字段
                    // 注意，注意，注意！这里需要保持和列表字段解析一致
                    if (code === 'dateRange') {
                        const column = { prop: 'dateRange' + date.formatDateTime(new Date().getTime(), 'YYYYMMDDHHmmss'), label: formData.label.desktop, formItem: item }
                        detailFields.push(column)
                    } else {
                        const column = { prop: formData.fieldName?.desktop, label: formData.label?.desktop, formItem: item }
                        detailFields.push(column)
                    }

                    // 组装基础查询字段
                    if (formData.showInSearch?.desktop) {
                        if (code === 'dateRange') {

                        } else {
                            baseFields.push(alaBuildInput(formData.fieldName.desktop, formData.label.desktop))
                        }
                    }

                    // 组装 form 表单字段
                    let formItem: any = {}

                    // 排除不需要添加单新增页面的字段
                    if (code === 'childTableCount') {
                        formItem = parseChildTableCount(formData)
                    } else {

                        if (code === 'input') {
                            formItem = parseInput(formData)
                        } else if (code === 'textarea') {
                            formItem = parseTextarea(formData)
                        } else if (code === 'radio') {
                            formItem = parseRadio(formData)
                        } else if (code === 'checkbox') {
                            formItem = parseCheckbox(formData)
                        } else if (code === 'date') {
                            formItem = parseDate(formData)
                        } else if (code === 'number') {
                            formItem = parseNumber(formData)
                        } else if (code === 'select') {
                            formItem = parseSelect(formData)
                        } else if (code === 'slider') {
                            formItem = parseSlider(formData)
                        } else if (code === 'rating') {
                            formItem = parseRating(formData)
                        } else if (code === 'switch') {
                            formItem = parseSwitch(formData)
                        } else if (code === 'divider') {
                            formItem = parseDivider(formData)
                        } else if (code === 'chapter') {
                            formItem = parseChapter(formData)
                        } else if (code === 'selectTable') {
                            formItem = parseSelectTable(formData)
                        } else if (code === 'selectDict') {
                            formItem = parseSelectDict(formData)
                        } else if (code === 'dateRange') {
                            // 类似于时间范围这种表单，需要 使用组件数据回调机制 动态更新具体form中的属性值，因此需要把属性字段名传递到具体组件中
                            formItem = parseDateRange(formData)
                            formItem.other.startFieldName = formData.startFieldName.desktop
                            formItem.other.endFieldName = formData.endFieldName.desktop
                        } else if (code === 'cascader') {
                            formItem = parseCascade(formData)
                        } else if (code === 'file') {
                            formItem = parseFile(formData)
                        } else if (code === 'image') {
                            formItem = parseImage(formData)
                        } else if (code === 'selectTree') {
                            formItem = parseSelectTree(formData)
                        } else if (code === 'formTable') {
                            formItem = parseFormTable(formData)
                        } else if (code === 'ai') {
                            formItem = parseAi(formData)
                        } else {
                            logger.error(`【 错误，错误，错误 】发现未知类型[ ${code} ]的【 form字段 】`)
                            console.log('formData:', formData);
                        }

                        addFormFields.push(formItem)
                    }

                    const other = formItem.other || {}

                    if (item.formData.columnNum) {
                        formItem.columnNum = item.formData.columnNum.desktop
                    }

                    // 处理 组件 other 中的属性信息
                    if (item.formData.help && item.formData.help.desktop) {
                        other.help = item.formData.help.desktop
                    }
                    if (item.formData.icon && item.formData.icon.desktop) {
                        other.icon = item.formData.icon.desktop
                        other.iconWidth = item.formData.iconWidth.desktop
                        other.iconHeight = item.formData.iconHeight.desktop
                    }

                    formItem.other = other

                    // 解析表单验证规则
                    const rules: Array<baseRule> = []

                    // 非空验证条件
                    if (formData.required && formData.required.desktop) {
                        rules.push(alaRequired())
                    }

                    // 添加字符数最少、最多和范围验证
                    if (formData.strMin && formData.strMax && formData.strMin.desktop && formData.strMax.desktop) {
                        rules.push(alaStrLengthRange(formData.strMin.desktop, formData.strMax.desktop))
                    } else if (formData.strMin && formData.strMin.desktop) {
                        rules.push(alaStrMin(formData.strMin.desktop))
                    } else if (formData.strMax && formData.strMax.desktop) {
                        rules.push(alaStrMax(formData.strMax.desktop))
                    }

                    // 添加 数值最小、最大和范围验证
                    if (formData.numberMin && formData.numberMax && formData.numberMin.desktop && formData.numberMax.desktop) {
                        rules.push(alaNumberRange(formData.numberMin.desktop, formData.numberMax.desktop))
                    } else if (formData.numberMin && formData.numberMin.desktop) {
                        rules.push(alaNumberMin(formData.numberMin.desktop))
                    } else if (formData.numberMax && formData.numberMax.desktop) {
                        rules.push(alaNumberMax(formData.numberMax.desktop))
                    }

                    if (formData.rules && formData.rules.desktop) {
                        const functionName = ruleFunctions[formData.rules.desktop]
                        if (!functionName) {
                            logger.error(`【 错误，错误，错误 】${formData.rules.desktop} 函数不存在`);
                        } else {
                            rules.push(ruleFunctions[formData.rules.desktop]())
                        }
                    }

                    formItem.rules = rules

                });
            }

            if (config.pageConfig?.form) {
                const formData = config.pageConfig?.form.formData
                // 表单宽度 
                formAttr.formWidth = formData.width.desktop
                // 表单列数量
                formAttr.columnNum = formData.columnNum.desktop
                // 表单标签宽度
                formAttr.labelWidth = formData.labelWidth.desktop
                // 表单标签位置
                formAttr.labelPosition = formData.position.desktop
                // 是否启用表单中定义的标题栏
                formAttr.useFormTitle = formData.useFormTitle.desktop
                // 表单类型
                formType = formData.formType.desktop

                // 是否显示新增按钮

                // 是否显示新增按钮
                showAddButton = formData.showAddButton.desktop
                // 是否显示编辑按钮
                showDeleteButton = formData.showDeleteButton.desktop
                // 是否显示删除按钮
                showEditButton = formData.showEditButton.desktop
                // 是否显示删除按钮
                showDisableButton = formData.showDisableButton?.desktop || false
                // 是否显示按钮列
                showButtonsColumn = formData.showButtonsColumn.desktop

                // 当前模块是否是静态 api ？
                outApi = formData.outApi?.desktop || false
                outApiUrl = formData.outApiUrl?.desktop || ''
                outApiParams = formData.outApiParams?.desktop || '{}'
                if (outApi) {
                    // 当前模块是静态 api 模块，需要检查是否已配置 outApiUrl
                    if (!outApiUrl) {
                        const title = formData.title.desktop
                        u.error(`【 ${title} 】模块没有配置【 API地址 】，请联系管理员。`)
                    }
                }


                // 添加禁用、启用列
                if (showDisableButton) {
                    const d = alaDetailSwitch('adisable', '数据状态', '启用', 1, '禁用', 2, 1, false, { columnWidth: { desktop: '120' } })
                    columns.push(d)
                    detailFields.push(d)
                }

                // 如果当前表单是流程表单，则添加流程实例状态数据字段
                const showFlowStateColumn = formData.showFlowStateColumn?.desktop || false
                if (formType === 'flow' && showFlowStateColumn) {
                    // 流程实例状态，10-进行中，20-已通过，30-已撤回，40-强行中止，45-已拒绝，50-挂起，60-已退回，99-已废弃
                    const col = alaDetailFlowInstanceState('instanceState', "流程状态", [{ '进行中': 10, 'color': colors.primary }, { '已通过': 20, 'color': colors.success }, { '已拒绝': 45, 'color': colors.danger }, { '已退回': 60, 'color': colors.warning }, { '已撤回': 30, 'color': colors.info }], undefined, undefined, { columnWidth: { desktop: '120' } })

                    columns.push(col)
                    detailFields.push(col)
                }

                // 分页列表添加创建人、创建时间、更新人、更新时间字段
                const showCreatedBy = formData.showCreatedBy.desktop || false
                const showCreatedTime = formData.showCreatedTime.desktop || false
                const showUpdatedBy = formData.showUpdatedBy.desktop || false
                const showUpdatedTime = formData.showUpdatedTime.desktop || false

                const cb = alaDetailInput('createdName', "创建人", undefined, undefined, { columnWidth: { desktop: '120' } })
                const ub = alaDetailInput('updatedName', "更新人", undefined, undefined, { columnWidth: { desktop: '120' } })
                const ct = alaDetailDate('createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '180' } })
                const ut = alaDetailDate('updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '180' } })

                if (showCreatedBy) {
                    columns.push(cb)
                }
                if (showCreatedTime) {
                    columns.push(ct)
                }
                if (showUpdatedBy) {
                    columns.push(ub)
                }
                if (showUpdatedTime) {
                    columns.push(ut)
                }


                detailFields.push(cb)
                detailFields.push(ct)
                detailFields.push(ub)
                detailFields.push(ut)

            }




        }
    });

    return {
        columns,
        baseFields,
        formConfigItems,
        addFormFields,
        detailFields,
        showAddButton,
        showDeleteButton,
        showEditButton,
        showDisableButton,
        showButtonsColumn,
        formAttr,
        className,
        formType,
        outApi,
        outApiUrl,
        outApiParams,
    }
}