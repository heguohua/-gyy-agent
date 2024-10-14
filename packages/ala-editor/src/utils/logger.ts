import { date } from './date';

// utils/Logger.ts
export class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }
  getCallerFileName(): string {
    const stack = new Error().stack || '';
    const lines = stack.split('\n');
    let file_name = 'no file name';
    if (lines.length > 3) {
      const fourthLine = lines[3].trim(); // 移除首尾空格
        const file_name_match = fourthLine.match(/[^/?]+(?=\?)/);
        if (file_name_match) {
          file_name = file_name_match[0];
      }
    }

    return file_name;
  }

  log(message: any, ...optionalParams: any[]) {
    const timestamp = date.getCurrentDateTime();
    const file_name = this.getCallerFileName();
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}`;
    this.outputConsole(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }

  loge(message: any, ...optionalParams: any[]) {
    const timestamp = date.getCurrentDateTime();
    const file_name = this.getCallerFileName();
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}`;
    this.outputConsoleError(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }

  logw(message: any, ...optionalParams: any[]) {
    const timestamp = date.getCurrentDateTime();
    const file_name = this.getCallerFileName();
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}`;
    this.outputConsoleWarn(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }


  logg(message: any, ...optionalParams: any[]) {
    const timestamp = date.getCurrentDateTime();
    const file_name = this.getCallerFileName();
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}`;
    this.outputConsoleGreen(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }

  private outputConsole(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined') {
      console.log(message, ...optionalParams);
    }
  }

  private outputConsoleError(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined') {
      console.log(`%c${message}`, 'color: red; font-weight: bold;');
    }
  }

  private outputConsoleWarn(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined') {
      console.log(`%c${message}`, 'color: orange;');
    }
  }
  private outputConsoleGreen(message: string, optionalParams: any[]) {
    // 在浏览器控制台输出日志
    if (typeof window !== 'undefined') {
      console.log(`%c${message}`, 'color: green; font-weight: bold;');
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

// 创建一个全局日志实例
export const logger = new Logger('ala-app');
