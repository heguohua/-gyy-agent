/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:16:41
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 17:16:42
 * @FilePath: /low-coding/packages/ala-editor/src/utils/nanoid.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { customAlphabet } from 'nanoid'


/**
 * @Description: 随机id生成
 * @param length 长度
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:17:20
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/utils/nanoid.ts
 */
export const nanoid = (length = 8) => {
    const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', length)
    return nanoid()
  }
  
  /**
   * @Description: 延迟函数
   * @param delay 延迟时间
   * @Author: darcy.zhang
   * @Email: tech.darcy.zhang@outlook.com
   * @Date: 2024-10-17 17:17:33
   * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/utils/nanoid.ts
   */
  export const sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
  
