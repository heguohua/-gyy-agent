/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-02-01 19:36:41
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-02 08:34:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/alaType.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export default class alaType {
    public static getIconByColumnType(type: string): string {
        const tmp = type.toUpperCase()
        switch (tmp) {
            case "CHAR":
            case "VARCHAR":
            case "TEXT":
            case "TINYTEXT":
            case "MEDIUMTEXT":
            case "LONGTEXT":
            case "ENUM":
            case "ANY":
            case "STRING":
                return "/dataset/text.svg"; // 文本
            case "DATE":
            case "TIME":
            case "YEAR":
            case "DATETIME":
            case "TIMESTAMP":
            case "DATEV2":
            case "DATETIMEV2":
            case "DATETIME2":
            case "DATETIMEOFFSET":
            case "SMALLDATETIME":
            case "DATETIME64":
                return "/dataset/date.svg"; // 时间
            case "INT":
            case "SMALLINT":
            case "MEDIUMINT":
            case "INTEGER":
            case "BIGINT":
            case "LONG": // 增加了LONG类型
            case "INT2":
            case "INT4":
            case "INT8":
            case "int2":
            case "int4":
            case "int8":
            case "INT16":
            case "INT32":
            case "INT64":
            case "UINT8":
            case "UINT16":
            case "UINT32":
            case "UINT64":
            case "TINYINT":
                return "/dataset/number.svg"; // 整型
            case "NUMBER":
            case "FLOAT":
            case "DOUBLE":
            case "DECIMAL":
            case "REAL":
            case "MONEY":
            case "NUMERIC":
            case "float4":
            case "float8":
            case "FLOAT4":
            case "FLOAT8":
            case "DECFLOAT":
            case "FLOAT32":
            case "FLOAT64":
                return "/dataset/decimal.svg"; // 浮点
            case "BIT":
            case "BOOL":
            case "BOOLEAN":
                return "/dataset/boolean.svg"; // 布尔
            default:
                return "/dataset/text.svg";
        }

    }
}