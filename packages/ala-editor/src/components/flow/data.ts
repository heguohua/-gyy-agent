/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-04 22:48:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/data.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import StartIcon from './assets/start.svg'
import UserTaskIcon from './assets/user-task.svg'
import CustomTaskIcon from './assets/custom-task.svg'
import DecisionIcon from './assets/decision.svg'
import ForkIcon from './assets/fork.svg'
import JoinIcon from './assets/join.svg'
import EndIcon from './assets/end.svg'
import WfSubProcessIcon from './assets/sub-process.svg'
// import SubProcessIcon from './assets/sub-process.svg'
export const patternItems = [
  {
    type: 'snaker:start',
    text: '开始节点',
    label: '开始',
    properties: {},
    sort: 10,
    icon: StartIcon
  },
  {
    type: 'snaker:task',
    text: '用户任务',
    label: '用户',
    properties: {},
    sort: 20,
    icon: UserTaskIcon
  },
  {
    type: 'snaker:decision',
    label: '条件',
    properties: {},
    sort: 30,
    icon: DecisionIcon
  },
  {
    type: 'snaker:fork',
    label: '分支',
    properties: {},
    sort: 40,
    icon: ForkIcon
  },
  {
    type: 'snaker:join',
    label: '合并',
    properties: {},
    sort: 50,
    icon: JoinIcon
  },
  {
    type: 'snaker:wfSubProcess',
    text: '子流程',
    label: '子流程',
    properties: {},
    sort: 60,
    icon: WfSubProcessIcon
  },
  {
    type: 'snaker:custom',
    text: '自定义任务',
    label: '自定义',
    properties: {},
    sort: 70,
    icon: CustomTaskIcon
  },
  {
    type: 'snaker:end',
    text: '结束',
    label: '结束',
    properties: {},
    sort: 80,
    icon: EndIcon
  },

]
// {
//   type: 'snaker:subProcess',
//   text: '',
//   label: '子流程',
//   sort: 90,
//   properties: {},
//   icon: SubProcessIcon
// }