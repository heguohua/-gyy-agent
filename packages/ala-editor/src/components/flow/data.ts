import StartIcon from './assets/start.png'
import UserTaskIcon from './assets/user-task.png'
import CustomTaskIcon from './assets/custom-task.png'
import DecisionIcon from './assets/decision.png'
import ForkIcon from './assets/fork.png'
import JoinIcon from './assets/join.png'
import EndIcon from './assets/end.png'
import WfSubProcessIcon from './assets/wf-sub-process.png'
import SubProcessIcon from './assets/sub-process.png'
export const patternItems = [
  {
    type: 'snaker:start',
    text: '开始',
    label: '开始节点',
    properties: {},
    sort: 10,
    icon: StartIcon
  },
  {
    type: 'snaker:task',
    text: '用户任务',
    label: '用户任务',
    properties: {},
    sort: 20,
    icon: UserTaskIcon
  },
  {
    type: 'snaker:custom',
    text: '自定义任务',
    label: '自定义任务',
    properties: {},
    sort: 30,
    icon: CustomTaskIcon
  },
  {
    type: 'snaker:decision',
    label: '条件判断',
    properties: {},
    sort: 40,
    icon: DecisionIcon
  },
  {
    type: 'snaker:fork',
    label: '分支',
    properties: {},
    sort: 50,
    icon: ForkIcon
  },
  {
    type: 'snaker:join',
    label: '合并',
    properties: {},
    sort: 60,
    icon: JoinIcon
  },
  {
    type: 'snaker:end',
    text: '结束',
    label: '结束节点',
    properties: {},
    sort: 70,
    icon: EndIcon
  },
  {
    type: 'snaker:wfSubProcess',
    text: 'snaker子流程',
    label: 'snaker子流程',
    properties: {},
    sort: 80,
    icon: WfSubProcessIcon
  },
  {
    type: 'snaker:subProcess',
    text: '',
    label: '子流程',
    sort: 90,
    properties: {},
    icon: SubProcessIcon
  }]
