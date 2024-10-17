/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-16 16:55:10
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 19:55:33
 * @FilePath: /low-coding/packages/ala-editor/src/types/editor.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// import type { BlockSchemaFormData } from '@/config/schema'

export type Viewport = 'mobile' | 'desktop'

export interface BaseBlock {
  /**
   * id 区分组件
   */
  id?: string
  /**
   * 组件名
   */
  code?: string
  /**
   * 物料区标题
   */
  name?: string
  /**
   * 物料区图标
   */
  icon?: string
  /**
   * 是否是嵌套组件
   */
  nested?: boolean
  /**
   * 嵌套子项
   */
  children?: BaseBlock[][]
  /**
   * 配置内容
   */
  // formData?: Partial<BlockSchemaFormData[keyof BlockSchemaFormData]>
  /**
   * 父组件code
   */
  parent?: string
}


export type BaseBlockNull = BaseBlock | null