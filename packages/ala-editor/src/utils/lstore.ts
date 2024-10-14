import { logger } from "./logger";

class lstore {
  /**
   * 存储数据到 localStorage
   * @param key 存储数据的键
   * @param value 存储的数据
   */
  static setItem(key: string, value: any): void {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      logger.error('lstore.setItem error:', error);
    }
  }

  /**
   * 从 localStorage 获取数据
   * @param key 获取数据的键
   * @returns 获取到的数据
   */
  static getItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    } catch (error) {
      logger.error('lstore.getItem error:', error);
      return null;
    }
  }

  /**
   * 从 localStorage 删除数据
   * @param key 删除数据的键
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 清除所有 localStorage 数据
   */
  static clear(): void {
    localStorage.clear();
  }
}

export default lstore;
