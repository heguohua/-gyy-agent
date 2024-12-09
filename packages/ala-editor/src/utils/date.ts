/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 11:14:52
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-09 18:14:15
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/date.ts
 * @Description: 时间工具类
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
//日期工具类
//局部导入dayjs
import dayjs from 'dayjs';
type dt = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
// "date" | "year" | "years" | "month" | "months" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange"
export const AlaDateType = [
  { value: "date", name: "日期" },
  { value: "year", name: "年" },
  { value: "years", name: "多个年份" },
  { value: "month", name: "月份" },
  { value: "months", name: "多个月份" },
  { value: "dates", name: "多个日期" },
  { value: "week", name: "周" },
  { value: "datetime", name: "日期和时间" },
  { value: "datetimerange", name: "日期或时间范围" },
  { value: "daterange", name: "日范围" },
  { value: "monthrange", name: "月范围" },
  { value: "yearrange", name: "年范围" },
]
export const AlaDateFormat = [
  { name: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { name: "YYYY/MM/DD", value: "YYYY/MM/DD" },
  { name: "YYYYMMDD", value: "YYYYMMDD" },
  { name: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { name: "DD-MM-YYYY", value: "DD-MM-YYYY" },
  { name: "DDMMYYYY", value: "DDMMYYYY" },
  { name: "YYYY-MM-DD HH:mm:ss", value: "YYYY-MM-DD HH:mm:ss" },
  { name: "HH:mm:ss", value: "HH:mm:ss" },
  { name: "HH:mm", value: "HH:mm" },
  { name: "YYYY/MM/DD HH:mm:ss", value: "YYYY/MM/DD HH:mm:ss" },
  { name: "YYYYMMDD HHmmss", value: "YYYYMMDD HHmmss" },

  { name: "MM/DD/YYYY HH:mm:ss", value: "MM/DD/YYYY HH:mm:ss" },
  { name: "DD-MM-YYYY HH:mm:ss", value: "DD-MM-YYYY HH:mm:ss" },
  { name: "DDMMYYYY HHmmss", value: "DDMMYYYY HHmmss" },
]

export class date {

  /**
   * 获取毫秒数
   * @returns 
   */
  public static now() {
    return Date.now();
  }

  /**
   * 校检日期格式是否为YYYY-MM-DD这种格式
   * @param date
   * @returns {boolean}
   */
  public static isValidDate(date: Date) {
    return dayjs(date, 'YYYY-MM-DD', true).isValid();
  }

  /**
   * 校检日期格式是否为YYYY-MM-DD HH:mm:ss这种格式
   * @param date
   * @returns {boolean}
   */
  public static isValidDateTime(date: Date) {
    return dayjs(date, 'YYYY-MM-DD HH:mm:ss', true).isValid();
  }

  /**
   * 获取当前日期年月日,时间格式为YYYY-MM-DD
   * @returns {string}
   */
  public static currentDate_YYYY_MM_DD() {
    return dayjs(new Date()).format('YYYY-MM-DD');
  }

  /**
   * 获取当前日期年份,时间格式为YYYY
   * @returns {string}
   */
  public static currentYear() {
    return new Date().getFullYear();
  }

  /**
   * 获取当前日期年月日时分秒,时间格式为YYYY-MM-DD HH:mm:ss(24小时制,如果hh为小写表示为12小时制)
   * @returns {string}
   */
  public static currentDateTime_YYYY_MM_DD__HH_mm_ss() {
    return this.YYYY_MM_DD__HH_mm_ss(new Date());
  }

  /**
   * 将传过来的日期转换为YYYY-MM-DD这种格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  public static YYYY_MM_DD(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  /**
   * 将传过来的日期转换为YYYY-MM-DD HH:mm:ss这种格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  public static YYYY_MM_DD__HH_mm_ss(date: Date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 将传过来的日期转换为 自定义 格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  public static format(date: Date, ft: string) {
    return dayjs(date).format(ft);
  }

  /**
   * 将传过来的日期加X日期且时间格式为YYYY-MM-DD这种格式,如:getXAfterDate('2023-11-11',1,'day'),结果为2023-11-12
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  public static getXAfterDate(date: Date | string, num: number, dateType: dt) {
    return dayjs(date).add(num, dateType).format('YYYY-MM-DD');
  }

  /**
   * 将传过来的日期加X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXAfterDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-12 10:23:45
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  public static getXAfterDateTime(date: Date | string, num: number, dateType: dt) {
    return dayjs(date).add(num, dateType).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD这种格式,如:getXBeforeDate('2023-11-11',1,'day'),结果为2023-11-10
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  public static getXBeforeDate(date: Date | string, num: number, dateType: dt) {
    return dayjs(date).subtract(num, dateType).format('YYYY-MM-DD');
  }

  /**
   * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXBeforeDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-10 10:23:45
   * @param date:为传过来的日期
   * @param num:在当前日期加day,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  public static getXBeforeDateTime(date: Date | string, num: number, dateType: dt) {
    return dayjs(date).subtract(num, dateType).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 计算2个日期之间的差值
   * @param startDate:开始日期
   * @param endDate:结束日期,结束日期要比开始日期大
   * @param dateType:日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {number}
   */
  public static getDateDiff(startDate: Date | string, endDate: Date | string, dateType: dt) {
    return dayjs(endDate).diff(dayjs(startDate), dateType);
  }

  /**
   * 判断date1是否在date2之前,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  public static isBefore(date1: Date | string, date2: Date | string) {
    return dayjs(date1).isBefore(dayjs(date2));
  }

  /**
   * 判断date1是否在date2之后,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为true
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  public static isAfter(date1: Date | string, date2: Date | string) {
    return dayjs(date1).isAfter(dayjs(date2));
  }

  /**
   * 判断date1是否与date2相同,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  public static isSame(date1: Date | string, date2: Date | string) {
    return dayjs(date1).isSame(dayjs(date2));
  }

  /**
   * 将传过来的日期转为当年的1月1号或者当月的1号或者当周的周一
   * @param date:传过来日期
   * @param dateType,日期类型,为:year,month,week这3种
   * @returns {string}
   */
  public static getEarlyDaysDate(date: Date | string, dateType: dt) {
    return dayjs(date).startOf(dateType).format('YYYY-MM-DD');
  }

  /**
   * 将传过来的日期转为当年的12月31号或者当月的最后一天或者当周的周日
   * @param date:传过来日期
   * @param dateType,日期类型,为:year,month,week这3种
   * @returns {string}
   */
  public static getLastDaysDate(date: Date | string, dateType: dt) {
    return dayjs(date).endOf(dateType).format('YYYY-MM-DD');
  }

  /**
   * 获取2个日期之间的所有日期,包括开始日期和结束日期,如:getIntermediateDate('2023-12-01','2023-12-15',1,'day'))
   * @param startDate:开始日期
   * @param endDate:结束日期要大于开始日期
   * @param num:在开始日期上加num,int类型,如果dateType为day,num为1那么就是在开始日期上加一天
   * @param dateType,日期类型,类型如下:'minute','hour','day','week','month','year'这六种类型
   * @returns {*[]}
   */
  public static getIntermediateDate(startDate: Date | string, endDate: Date | string, num: number, dateType: dt) {
    //声明一个数组用来存放所有日期,默认把开始日期放进数组里面,不然少一个开始日期数据
    let daysArray = [startDate];
    //判断startDate是否在endDate之前
    while (date.isBefore(startDate, endDate)) {
      //如果开始日期在结束日期之前,那么就将开始日期加num,并重新赋值给开始日期,不然会死循环
      startDate = date.getXAfterDate(startDate, num, dateType);
      //将计算后的日期放进数组里面
      daysArray.push(startDate);
    }
    return daysArray;
  }
}
