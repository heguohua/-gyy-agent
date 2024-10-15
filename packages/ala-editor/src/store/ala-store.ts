/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 09:10:44
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:21:18
 * @FilePath: /low-coding/packages/ala-editor/src/store/ala-store.ts
 * @Description: 全局统一的 状态共享 工具类
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { defineStore } from 'pinia';

interface StoreInterface<T> {
  [key: string]: T;
}

const stores: StoreInterface<any> = {};

export const useAlaStore = defineStore('ala-store', {
  state: () => ({
    // 初始状态
    values: stores,
  }),

  actions: {
    // 动态设置状态的方法
    set<T>(key: string, value: T) {
      // 更新状态
      this.values[key] = value;
    },
    // 动态获取状态的方法
    get(key: string) {
      // 检查 Pinia 中是否存在该状态
      if (this.values[key] !== undefined) {
        return this.values[key];
      } else {
        // 如果 Pinia 中不存在，则尝试从 localStorage 中获取
        const value = localStorage.getItem(key);
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          this.values[key] = parsedValue;
          return parsedValue;
        }
      }
      return null;
    },
    // 动态重置状态的方法
    reset(key:string) {
      // 重置 Pinia 中的状态
      this.values.$delete(this.values, key);
    },
  },
})();
