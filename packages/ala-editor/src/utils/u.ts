/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 20:45:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-04 18:23:25
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/u.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import notify from "@/utils/notify"
import pako from 'pako'
import WarnException from "@/utils/WarnException"
import { cloneDeep, merge } from "lodash";
import { logger } from "./logger";
const profile = import.meta.env.VITE_PROFILE
const ws_url = import.meta.env.VITE_WS_URL
const video_url = import.meta.env.VITE_VIDEO_URL

export default class u {

    // 生成uuid
    public static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 自动拼接访问路径代理前缀
     */
    public static videoUrl() {
        return video_url
    }

    /**
     * 自动拼接访问路径代理前缀
     */
    public static wsUrl() {
        return ws_url
    }

    /**
     * 自动拼接访问路径代理前缀
     */
    public static url(url: string) {
        return profile + url
    }
    /**
     * 检查任一对象是否不存在
     * @param obj 
     * @returns 
     */
    public static isNull(obj: any) {
        if (!obj) {
            return true
        }
        return false
    }

    /**
     * 检查任一对象是否为不存在，如果不存在则给出提示消息
     * @param obj 
     * @param remark 
     * @param title 
     */
    public static checkNull(obj: any, i18nKey: string, t: Function, title = "t('pop.warm_title')") {
        if (this.isNull(obj)) {
            const notifyTitle = (title.startsWith("t('") || title.startsWith('t("') ? t(title.slice(3, -2)) : title)
            const content = (i18nKey.startsWith("t('") || i18nKey.startsWith('t("') ? t(i18nKey.slice(3, -2)) : i18nKey) + '“ 不存在 ” ！'
            notify.error(notifyTitle, content)
            throw `${title}`
        }
    }


    /**
     * 当前参数是否是False，为False给出提示消息
     * @param obj 
     * @param remark 
     * @param title 
     */
    public static checkTrue(obj: boolean, i18nKey: string, t: Function, title = "t('pop.warm_title')") {
        if (obj) {
            const notifyTitle = (title.startsWith("t('") || title.startsWith('t("') ? t(title.slice(3, -2)) : title)
            const content = (i18nKey.startsWith("t('") || i18nKey.startsWith('t("') ? t(i18nKey.slice(3, -2)) : i18nKey)
            notify.error(notifyTitle, content)
            throw `${title}`
        }
    }

    /**
     * 对象深度clone方法
     * @param e object
     * @returns 
     */
    public static cloned(obj: object) {
        return cloneDeep({ ...obj })
    }

    /**
     * 对象深度clone方法
     */
    public static clonedAny<T>(obj: T): T {
        return cloneDeep(obj)
    }

    /**
     * 对象深度 合并 方法
     * @param target 
     * @param source 
     * @returns 
     */
    public static merged(target: object, source: object) {
        return merge(target, source)
    }

    /**
     * 清空对象所有属性
     * @param obj 
     */
    public static clear(obj: Record<string, any> | undefined) {
        if (obj) {
            Object.keys(obj).forEach(key => {
                delete obj[key];
            });
        }

    }

    /**
     * 使用 params 对象中的字段变量 格式化模板字符串 source
     * 使用示例：
     * format("这是第一个参数{name},这是第二个参数{age}",{name:'张三'，age:18})
     * 输出结果：这是第一个参数张三,这是第二个参数18
     * @params obj 
     */
    public static format(target: string, params: { [key: string]: any }): string {
        logger.error(`格式化字符串入参`, target, params);

        return target.replace(/\{(\w+)\}/g, (_, key) => {
            return key in params ? String(params[key]) : '';
        })
    }

    public static resetState(obj: any) {
        Object.keys(obj).forEach(key => {
            // 排除原型链上的属性和索引，只清空自定义属性
            if (obj.hasOwnProperty(key)) {
                obj[key] = null; // 或者 state[key] = undefined; 或者 state[key] = '';
            }
        });


    }

    /**
     * 将对象转为json字符串
     * @param obj 
     * @returns 
     */
    public static tojson(obj: any) {
        return JSON.stringify(obj);
    }


    /**
     * 将对象转为json字符串，并且属性按照字母自然顺序正序排序
     * @param obj 
     * @returns 
     */
    public static toSortedJson(obj: any): string {
        const seen = new WeakSet();

        function helper(value: any): string {
            // 处理原始类型
            if (value === null || typeof value !== "object") {
                return JSON.stringify(value);
            }

            // 防止循环引用
            if (seen.has(value)) {
                throw new TypeError("Converting circular structure to JSON");
            }

            seen.add(value);

            // 数组处理
            if (Array.isArray(value)) {
                const arrItems = value.map(item => helper(item));
                seen.delete(value);
                return `[${arrItems.join(",")}]`;
            }

            // 对象处理，按 key 排序
            const keys = Object.keys(value).sort();
            const keyValuePairs: string[] = [];

            for (const key of keys) {
                const v = value[key];
                // 忽略 undefined、函数、Symbol（与 JSON.stringify 行为一致）
                if (v !== undefined && typeof v !== "function" && typeof v !== "symbol") {
                    keyValuePairs.push(`${JSON.stringify(key)}:${helper(v)}`);
                }
            }

            seen.delete(value);
            return `{${keyValuePairs.join(",")}}`;
        }

        return helper(obj);
    }

    /**
     * 将 字符串 转为对象
     * @param str 
     * @returns 
     */
    public static parseJson(str: string) {
        return JSON.parse(str);
    }

    /**
     * 去除 JSON字符串 中所有的换行符、空格符
     * @param str 
     * @returns 
     */
    public static cleanJsonString(str: string) {
        const cleanedString = str.replace(/[\s\n\r]+/g, '');
        return cleanedString;
    }


    /**
     * 
     * @param label 解析国际化字符串
     * @param t 
     * @returns 
     */
    public static parseI18n(label: string, t: Function) {
        if (label.startsWith('t("') || label.startsWith("t('")) {
            return t(label.slice(3, -2));
        } else {
            return label
        }
    }

    /**
     *  非空校验
     * @param data 数据
     * @param i18nKey 国际化key或者提示信息
     * @param t 
     * @returns 
     */
    public static checkEmpty(data: any, i18nKey: string, t: Function, title = "t('pop.warm_title')") {
        if (!data) {
            const notifyTitle = (title.startsWith("t('") || title.startsWith('t("') ? t(title.slice(3, -2)) : title)
            const content = (i18nKey.startsWith("t('") || i18nKey.startsWith('t("') ? t(i18nKey.slice(3, -2)) : i18nKey) + '“ 不存在 ” ！'
            notify.error(notifyTitle, content)
            throw `${title}`
        }
    }

    /**
     *  去除 收尾 空格
     * @param data 数据
     * @returns 
     */
    public static trim(data: string) {
        return data.trim()
    }

    /**
     * 根据正则表达式判断是否匹配
     * @param data 
     * @param pattern 
     * @returns 
     */
    public static pattern(data: string, pattern: RegExp) {
        if (!data) {
            return false
        }
        let result = false
        if (pattern.test(data)) {
            result = true
        }
        return result
    }


    /**
     * 抛出异常
     * @param remark 
     * @param title 
     */
    public static error(remark: any, title = "温馨提示：") {
        notify.error(title, remark)
        throw new WarnException({ title, remark })
    }

    /**
     * 从一个对象中深度取值，如
     * const aaa = {instance: {user: {name: 123}}};
     * const path = 'instance.user.name';
     * @param data 
     * @param path 
     * @returns 
     */
    public static deepValue(data: object, path: string): string {
        // 将路径字符串拆分成属性名数组
        const pathParts = path.split('.');

        // 使用 reduce 方法遍历路径数组，动态访问对象属性
        const value = pathParts.reduce((obj: { [key: string]: any }, key) => {
            // 判断变量是否为字符串
            if (typeof obj === 'string') {
                try {
                    // 尝试将字符串转换为对象
                    obj = JSON.parse(obj);
                } catch (error) {
                    // 如果转换失败，说明字符串不是有效的JSON格式，返回原字符串
                    console.error('字符串转换为对象失败：', error);
                    return obj;
                }
            }
            return obj && obj[key]
        }, data);

        return value + ''
    }

    /**
     * 计算 2个时间戳 之间的差值，返参 { days: number, hours: number, minutes: number }
     * @param timestamp1 
     * @param timestamp2 
     * @returns 
     */
    public static timeDiff(timestamp1: number, timestamp2: number): { days: number, hours: number, minutes: number } {
        // 计算时间差（单位：毫秒）
        const timeDifference = Math.abs(timestamp1 - timestamp2);

        // 将时间差转换为分钟数
        const minutes = Math.floor(timeDifference / (1000 * 60));

        // 计算天数
        const days = Math.floor(minutes / (60 * 24));

        // 计算剩余的小时数
        const remainingHours = Math.floor((minutes % (60 * 24)) / 60);

        // 计算剩余的分钟数
        const remainingMinutes = minutes % 60;

        // 根据天数、小时数是否为0来拼接返回结果
        return { days, hours: remainingHours, minutes: remainingMinutes }
    }

    /**
     * Base64加密
     * @param str 
     * @returns 
     */
    public static base64Encode(str: string): string {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    /**
     * Base64解密
     * @param str 
     * @returns 
     */
    public static base64Decode(str: string): string {
        return decodeURIComponent(escape(window.atob(str)));
    }

    /**
     * 判断一个方法是同步函数还是异步函数
     * @param fn 
     * @returns 
     */
    public static isAsyncFunction(fn: Function): boolean {
        return fn.constructor.name === 'AsyncFunction';
    }

    /**
     * 将 嵌套对象转换成单层级对象
     * @param obj 
     * @param prefix 
     * @returns 
     */
    public static flattenObject(obj: { [key: string]: any }, prefix: string = '') {
        let result = {} as { [key: string]: any };

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    // 如果值是对象，递归处理
                    const nestedResult = u.flattenObject(value, newKey);
                    result = { ...result, ...nestedResult };
                } else {
                    // 如果值不是对象，直接添加到结果中
                    result[newKey] = value;
                }
            }
        }

        return result;
    }


    /**
     * flattenObject 的逆向方法
     * @param obj 
     * @returns 
     */
    public static unFlattenObject(obj: { [key: string]: any }) {
        const result: { [key: string]: any } = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const keys = key.split('.');
                let current = result;
                for (let i = 0; i < keys.length - 1; i++) {
                    const k = keys[i];
                    if (!current[k] || (typeof current[k]) != 'object') {
                        current[k] = {};
                    }
                    current = current[k];
                }

                current[keys[keys.length - 1]] = value;
            }
        }

        return result;
    }


    public static async copy(textToCopy: string) {
        // 创建一个临时的 textarea 元素
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed'; // 防止滚动到页面底部
        textarea.style.opacity = '0'; // 隐藏 textarea
        document.body.appendChild(textarea);

        // 选中并复制内容
        textarea.select();
        document.execCommand('copy');

        // 移除临时的 textarea 元素
        document.body.removeChild(textarea);
    };

    public static parseNameByValue(items: Array<any>, value: string) {
        let v = value
        if (items) {
            items.forEach((item: any) => {
                for (const [key, val] of Object.entries(item)) {
                    if (val === v) {
                        v = key
                    }
                }
            })
        }
        return v
    }


    /**
     * 根据 一个数组中对象的某个属性的值为key，快速将一个数组转化为 Map 方式
     * @param items 
     * @param keyName 
     * @returns 
     */
    public static array2Map<T extends { [key: string]: any }, K extends keyof T>(items: T[], keyName: K): Map<T[K], T> {

        const map = new Map<T[K], T>();

        for (const item of items) {
            const key = item[keyName];
            const value = u.cloned(item) as T;
            map.set(key, value);
        }

        return map
    }



    public static randomizeProperty<T extends Record<string, any>>(data: T[], key: keyof T, decimalNum = 0): T[] {
        return data.map(item => {
            const value = item[key];

            // 确保这个值是数字
            if (typeof value !== 'number') {
                throw new Error(`属性 "${String(key)}" 的值不是数字，无法进行随机乘法`);
            }

            const multiplier = Math.random() * 2; // 0 到 2 之间的随机数
            return {
                ...item,
                [key]: Number((value * multiplier).toFixed(decimalNum))
            };
        });
    }


    /**
     * 数组 行转列
     * @param data 
     * @returns 
     */
    public static transpose2DArray<T>(data: T[][]): T[][] {
        if (data.length === 0) return [];

        const rowCount = data.length;
        const colCount = data[0].length;

        const result: T[][] = [];

        for (let col = 0; col < colCount; col++) {
            const newRow: T[] = [];
            for (let row = 0; row < rowCount; row++) {
                newRow.push(data[row][col]);
            }
            result.push(newRow);
        }

        return result;
    }



    public static mergeIntoEach<T extends object, U extends object>(sourceArray: T[], additional: U): (T & U)[] {
        return sourceArray.map(item => ({
            ...item,
            ...additional
        }));
    }


    public static sortByProperty<T>(array: T[], key: keyof T, descending: boolean = false): T[] {
        return [...array].map((item, index) => ({ ...item, originalIndex: index }))
            .sort((a, b) => {
                const valA = a[key];
                const valB = b[key];

                if (valA == null && valB == null) return 0;
                if (valA == null) return descending ? 1 : -1;
                if (valB == null) return descending ? -1 : 1;

                if (valA < valB) return descending ? 1 : -1;
                if (valA > valB) return descending ? -1 : 1;
                return 0;
            });
    }


    public static renameKeyInArray<T extends Record<string, any>>(
        array: T[],
        oldKey: string,
        newKey: string
    ): Array<Omit<T, typeof oldKey> & Record<typeof newKey, any>> {
        return array.map(item => {
            const { [oldKey]: oldValue, ...rest } = item;
            return {
                ...rest,
                [newKey]: oldValue,
            };
        });
    }

    public static convertPropertyToNumber<T extends Record<string, any>>(
        array: T[],
        key: string,
        decimalNum = 0,
    ): Array<Omit<T, typeof key> & Record<typeof key, number>> {
        return array.map(item => {
            const value = item[key];
            const numberValue = value === '' ? 0 : Number(Number(value).toFixed(decimalNum));
            return {
                ...item,
                [key]: isNaN(numberValue) ? 0 : numberValue,
            };
        });
    }

    public static convertStringToNumber(value: string, decimalNum = 0): number {
        const numberValue = value === '' ? 0 : Number(Number(value).toFixed(decimalNum));
        return isNaN(numberValue) ? 0 : numberValue
    }

    /**
     * 从文件名中提取文件后缀
     * @param filename 文件名，如 "example.pdf" 或 "archive.tar.gz"
     * @returns 文件后缀（不包含 .），如 "pdf" 或 "gz"，若无后缀则返回空字符串
     */
    public static fileExtension(filename: string): string {
        if (typeof filename !== 'string') return '';
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
            return '';
        }
        return filename.slice(lastDotIndex + 1).toLowerCase();
    }

    /**
     * 查找一个数值num位于形如 "1,3,6,88,908"字符串的哪个区间
     * @param inputStr 
     * @param num 
     * @returns 
     */
    public static findIntervalIndex(inputStr: string, num: number): number {
        const numbers = inputStr.split(',').map(Number);

        for (let i = 0; i < numbers.length - 1; i++) {
            const left = numbers[i];
            const right = numbers[i + 1];

            if (num >= left && num < right) {
                return i;
            }
        }

        return -1; // 不属于任何区间
    }


    /**
     * 将 File 转成 Base64 DataURL
     */
    public static readFileAsBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })

    /**
     * 压缩 base64 字符串
     * @param base64Str 
     * @returns 
     */
    public static compressBase64(base64Str: string): string {
        const binary = atob(base64Str)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
        }

        const compressed = pako.gzip(bytes)
        return btoa(String.fromCharCode(...compressed))
    }

    /**
     * 解压 被压缩的base64 字符串
     * @param compressedBase64 
     * @returns 
     */
    public static decompressBase64(compressedBase64: string): string {
        const binary = atob(compressedBase64)
        const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)))
        const decompressed = pako.ungzip(bytes)
        return btoa(String.fromCharCode(...decompressed))
    }

    /**
     * 数字计数 特效
     * @param param0 
     */
    public static animateNumber(
        {
            from = 0,
            to = 99.9,
            decimalNum = 0,
            duration = 2000,
            onUpdate,
            onFinish,
        }: {
            from?: number
            to?: number
            decimalNum?: number
            duration?: number
            onUpdate: (val: string) => void
            onFinish?: () => void
        },
    ) {
        const start = performance.now()

        const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1) // 0 → 1
            const value = from + (to - from) * progress
            onUpdate(value.toFixed(decimalNum))                       // 1 位小数

            if (progress < 1) {
                requestAnimationFrame(tick)
            } else {
                onFinish?.()
            }
        }

        requestAnimationFrame(tick)
    }


    /**
     * 原地将数组顺序反转（会修改原数组），并返回该数组
     */
    public static reverseInPlace<T>(arr: T[]): T[] {
        return arr.reverse();        // Array.prototype.reverse() 就地操作
    }

    /**
         * 将数值转化成千位分隔符方式
         */
    public static formatWithThousandsSeparator(number: number) {
        if (typeof number !== 'number') {
            number = Number(number);
            if (isNaN(number)) return '';
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

}

