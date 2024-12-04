/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-04 22:42:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/enums.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export enum NodeTypeEnum {
  process = 'process',
  custom = 'custom',
  decision = 'decision',
  end = 'end',
  fork = 'fork',
  join = 'join',
  start = 'start',
  task = 'task',
  transition = 'transition',
  subProcess = 'subProcess',
  wfSubProcess = 'wfSubProcess',
  ignore = 'ignore',
}
export enum ColorEnum {
  primaryColor = '#1D78FF', // 主题色
  edgePrimaryColor = '#1D78FF', // 主题色
  activeColor = '#FA7E55', // 进行时节点颜色
  historyColor = '#28C7A3', // 历史节点/边颜色
  backgroundColor = '#FFFFFF' // 画布背景颜色
}
