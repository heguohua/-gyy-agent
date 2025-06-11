/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 11:04:17
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 16:00:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/logger.ts
 * @Description: 日志工具类，提供info、warn、success和error 4种类型日志
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { date } from './date';

// utils/Logger.ts
export class Logger {
  private prefix: string;
  private env_type: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.env_type = import.meta.env?.MODE
  }
  getCallerFileName(): string {
    const stack = new Error().stack || '';
    const lines = stack.split('\n');
    let file_name = 'no file name';
    if (lines.length > 3) {
      const fourthLine = lines[3].trim(); // 移除首尾空格
      const file_name_match = fourthLine.match(/[^/?]+(?=\?)/);

      const file_url_match = fourthLine.match(/\((.*?)\)/);
      const file_url = file_url_match ? file_url_match[1] : file_name;

      if (file_name_match) {
        file_name = file_name_match[0];
      } else {
        const match = fourthLine.match(/\/([^\/]+)$/);
        file_name = match ? match[1] : 'no file name';
        file_name = file_name.split(':')[0]
      }
    }
    return file_name.padEnd(40, ' ');
  }
  getCallerFileLink(): string {
    const stack = new Error().stack || '';
    const lines = stack.split('\n');
    let file_name = 'no file name';
    if (lines.length > 3) {
      const fourthLine = lines[3].trim(); // 移除首尾空格
      const file_name_match = fourthLine.match(/[^/?]+(?=\?)/);

      const file_url_match = fourthLine.match(/\((.*?)\)/);
      const file_url = file_url_match ? file_url_match[1] : file_name;

      if (file_name_match) {
        file_name = file_name_match[0];
      } else {
        const match = fourthLine.match(/\/([^\/]+)$/);
        // file_name = match ? match[1] : 'no file name';
        file_name = file_url
      }
    }

    return file_name;
  }
  /**
   * 打印 【 普通 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  info(message: any, ...optionalParams: any[]) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();

    message = typeof message === 'object' ? JSON.stringify(message) : message;
    const op: any = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === 'object' ? JSON.stringify(param) : param);
    });
    optionalParams = op;

    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsole(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  /**
   * 打印 【 错误 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  error(message: any, ...optionalParams: any[]) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();

    message = typeof message === 'object' ? JSON.stringify(message) : message;
    const op: any = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === 'object' ? JSON.stringify(param) : param);
    });
    optionalParams = op;

    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleError(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  /**
   * 打印 【 警告 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  warn(message: any, ...optionalParams: any[]) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();

    message = typeof message === 'object' ? JSON.stringify(message) : message;
    const op: any = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === 'object' ? JSON.stringify(param) : param);
    });
    optionalParams = op;

    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleWarn(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }

  /**
   * 打印 【 成功 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  success(message: any, ...optionalParams: any[]) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();

    message = typeof message === 'object' ? JSON.stringify(message) : message;
    const op: any = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === 'object' ? JSON.stringify(param) : param);
    });
    optionalParams = op;

    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleGreen(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }

  private outputConsole(message: string, optionalParams: any[]) {

    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined' && this.env_type === 'dev') {

      // 使用正则表达式匹配第一个【到最后一个】之间的所有内容
      const regex = /【(.*?)】/;
      const match = message.match(regex);

      if (match && match[1]) {
        // 将匹配到的内容设置为红色
        console.log(`%c${message.substring(0, match.index)}【%c${match[1]}%c】${message.substring(match.index + match[0].length)}`,
          '', // 匹配到的内容之前的样式（默认样式）
          'color: red;', // 【和】之间的内容设置为红色
          ''); // 【和】之间的内容之后的样式（默认样式）
      } else {
        // 如果没有匹配到【】，则直接输出原始字符串
        console.log(message);
      }

      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`    >> ${param}`));
      }
    }
  }

  private outputConsoleError(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined' && this.env_type === 'dev') {
      console.log(`%c${message}`, 'color: red; font-weight: bold;');
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, 'color: red;'));
      }
    }
  }

  private outputConsoleWarn(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined' && this.env_type === 'dev') {
      console.log(`%c${message}`, 'color: orange;');
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, 'color: orange;'));
      }
    }
  }
  private outputConsoleGreen(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined' && this.env_type === 'dev') {
      console.log(`%c${message}`, 'color: green; font-weight: bold;');
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, 'color: green;'));
      }
    }
  }

  private outputNodeConsole(message: string, optionalParams: any[]) {

    // 在 Node.js 控制台输出日志
    if (typeof process !== 'undefined' && typeof process.stdout !== 'undefined') {
      process.stdout.write(`${message}\n`);
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => process.stdout.write(`${param}\n`));
      }
    }
  }

}


// function getLogLevel(): string {
//   return import.meta.env.VITE_LOG_LEVEL || 'default';
// }

// 创建一个全局日志实例
export const logger = new Logger('ala-app');
