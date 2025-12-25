/*
* @Author: darcy.zhang , tech.darcy.zhang@outlook.com
* @Date: 2025-12-25 19:24:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 21:09:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/alaParams.ts
* @Description: 
* 
* Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
*/

import u from "@/utils/u";

// 1）input组件：String
export function addInput(params: Map<string, any>, fieldName: string, value: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“input”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 2）ratio组件：String
export function addRatio(params: Map<string, any>, fieldName: string, value: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“ratio”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 3）number组件：Number
export function addNumber(params: Map<string, any>, fieldName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“number”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 4）checkbox组件：List，[String]
export function addCheckbox(params: Map<string, any>, fieldName: string, ...values: Array<string>) {
    u.isEmpty(fieldName, "字段名不存在");
    if (values == null || values.length == 0) {
        u.isEmpty(undefined, `字段名【 ${fieldName} 】、表单类型“checkbox”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    }
    params.set(fieldName, values
        .filter((s): s is string => s != null && s.trim() !== "")
        .join(","));
    return params;
}

// 5）date组件： Long
export function addDate(params: Map<string, any>, fieldName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“date”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 6）datetime组件： {min:111,max:222}
export function addDatetime(params: Map<string, any>, fieldName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“datetime”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 7）dateRange组件：Long start, Long end
export function addDateRange(params: Map<string, any>, fieldName: string, start: number, end: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(start, `字段名【 ${fieldName} 】、表单类型“dateRange”，开始时间值为空"`);
    u.isEmpty(end, `字段名【 ${fieldName} 】、表单类型“dateRange”，结束时间值为空"`);
    params.set(`%sStart"`, start);
    params.set(`%sEnd"`, end);
    return params;
}

// 8）textarea组件： String
export function addTextarea(params: Map<string, any>, fieldName: string, value: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“textarea”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 9）select组件： String
export function addSelect(params: Map<string, any>, fieldName: string, value: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“select”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 10）selectApi组件：
export function addSelectApi(params: Map<string, any>, fieldName: string, propertyName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(propertyName, `字段名【 ${fieldName} 】、表单类型“selectApi”，propertyName值为空，如确定该字段值不存在，请不要填写该字段"`);
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“selectApi”，value值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, [
        { [propertyName]: value }
    ]);
    return params;
}

// 11）select-dict组件：
export function addSelectDict(params: Map<string, any>, fieldName: string, propertyName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(propertyName, `字段名【 ${fieldName} 】、表单类型“selectDict”，propertyName值为空，如确定该字段值不存在，请不要填写该字段"`);
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“selectDict”，value值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, u.tojson([
        { [propertyName]: value }
    ]));
    return params;
}

// 12）selectTree组件：
export function addSelectTree(params: Map<string, any>, fieldName: string, propertyName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(propertyName, `字段名【 ${fieldName} 】、表单类型“selectTree”，propertyName值为空，如确定该字段值不存在，请不要填写该字段"`);
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“selectTree”，value值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, u.tojson([
        { [propertyName]: value }
    ]));
    return params;
}

// 13）select-table组件：
export function addSelectTable(params: Map<string, any>, fieldName: string, id: number, displayName: string, displayValue: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(id, `字段名【 ${fieldName} 】、表单类型“selectTree”，id为空，如确定该字段值不存在，请不要填写该字段"`);
    u.isEmpty(displayName, `字段名【 ${fieldName} 】、表单类型“selectTree”，displayName为空，如确定该字段值不存在，请不要填写该字段"`);
    u.isEmpty(displayValue, `字段名【 ${fieldName} 】、表单类型“selectTree”，displayValue为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, [{
        id,
        [displayName]: displayValue
    }
    ]);
    return params;
}

// 14）slider组件：
export function addSlider(params: Map<string, any>, fieldName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“slider”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 15）rating组件：{min:111,max:222}或{eq:123}
export function addRating(params: Map<string, any>, fieldName: string, value: number) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“rating”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 16）switch组件：String
export function addSwitch(params: Map<string, any>, fieldName: string, value: string) {
    u.isEmpty(fieldName, "字段名不存在");
    u.isEmpty(value, `字段名【 ${fieldName} 】、表单类型“switch”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    params.set(fieldName, value);
    return params;
}

// 17）cascader组件：
export function addCascader(params: Map<string, any>, fieldName: string, ...values: Array<string>) {
    u.isEmpty(fieldName, "字段名不存在");
    if (values == null || values.length == 0) {
        u.isEmpty(undefined, `字段名【 ${fieldName} 】、表单类型“checkbox”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    }
    params.set(fieldName, u.tojson(values
        .filter((s): s is string => s != null && s.trim() !== "")));
    return params;
}

// 18）cascaderDict组件：
export function addCascaderDict(params: Map<string, any>, fieldName: string, ...values: Array<string>) {
    u.isEmpty(fieldName, "字段名不存在");
    if (values == null || values.length == 0) {
        u.isEmpty(undefined, `字段名【 ${fieldName} 】、表单类型“checkbox”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    }
    params.set(fieldName, u.tojson(values
        .filter((s): s is string => s != null && s.trim() !== "")));
    return params;
}

// 19）image 组件
export function addImages(params: Map<string, any>, fieldName: string, ...values: Array<any>) {
    u.isEmpty(fieldName, "字段名不存在");
    if (values == null || values.length == 0) {
        u.isEmpty(undefined, `字段名【 ${fieldName} 】、表单类型“image”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    }

    // 校验每一个 FileParamsVo 对象的值是否都不为空

    for (let i = 0; i < values.length; i++) {

        const v = values[i];
        const id: number = v.id;
        const fid: string = v.fid;
        const classify: string = v.classify;
        const fileName: string = v.fileName;
        const url: string = v.url;

        const num: number = i + 1;

        u.isEmpty(id, `字段名【 ${fieldName} 】、表单类型“image”，第【${num}】个图片，【id】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(fid, `字段名【 ${fieldName} 】、表单类型“image”，第【% d】个图片，【fid】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(classify, `字段名【 ${fieldName} 】、表单类型“image”，第【${num}】个图片，【classify】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(fileName, `字段名【 ${fieldName} 】、表单类型“image”，第【% d】个图片，【fileName】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(url, `字段名【 ${fieldName} 】、表单类型“image”，第【${num}】个图片，【url】字段值为空，如确定该字段值不存在，请不要填写该字段"`);

    }


    params.set(fieldName, u.tojson(values));
    return params;
}

// 20）file 组件
export function addFiles(params: Map<string, any>, fieldName: string, ...values: Array<any>) {
    u.isEmpty(fieldName, "字段名不存在");
    if (values == null || values.length == 0) {
        u.isEmpty(undefined, `字段名【 ${fieldName} 】、表单类型“file”，值为空，如确定该字段值不存在，请不要填写该字段"`);
    }

    // 校验每一个 FileParamsVo 对象的值是否都不为空

    for (let i = 0; i < values.length; i++) {

        const v = values[i];
        const id: number = v.id;
        const fid: string = v.fid;
        const classify: string = v.classify;
        const fileName: string = v.fileName;
        const url: string = v.url;

        const num: number = i + 1;

        u.isEmpty(id, `字段名【 ${fieldName} 】、表单类型“file”，第【${num}】个图片，【id】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(fid, `字段名【 ${fieldName} 】、表单类型“file”，第【% d】个图片，【fid】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(classify, `字段名【 ${fieldName} 】、表单类型“file”，第【${num}】个图片，【classify】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(fileName, `字段名【 ${fieldName} 】、表单类型“file”，第【% d】个图片，【fileName】字段值为空，如确定该字段值不存在，请不要填写该字段"`);
        u.isEmpty(url, `字段名【 ${fieldName} 】、表单类型“file”，第【${num}】个图片，【url】字段值为空，如确定该字段值不存在，请不要填写该字段"`);

    }

    params.set(fieldName, u.tojson(values));
    return params;
}
