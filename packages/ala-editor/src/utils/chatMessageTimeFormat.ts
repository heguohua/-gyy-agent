/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-03-15 15:54:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-15 15:56:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/chatMessageTimeFormater.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
const getWeekday = (date: Date): string => {
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekdays[date.getDay()];
}

const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

const formatDateShort = (date: Date): string => {
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${month}月${day}日`;
}

const formatDateLong = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}年${month}月${day}日`;
}

export const chatMessageTimeFormat = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (date >= todayStart) {
        return formatTime(date); // 今天：hh:mm
    } else if (date >= yesterdayStart) {
        return `昨天 ${formatTime(date)}`; // 昨天：昨天 hh:mm
    } else if (date >= weekAgo) {
        return getWeekday(date) + ' ' + `${formatTime(date)}`; // 一周内：星期几
    } else if (date >= monthAgo) {
        return formatDateShort(date) + ' ' + `${formatTime(date)}`; // 一个月内：MM:dd
    } else {
        return formatDateLong(date) + ' ' + `${formatTime(date)}`; // 一个月以上：yyyy-MM-dd
    }
}