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
  primaryColor = '#3068EC', // 主题色
  edgePrimaryColor = '#C9CCD4', // 主题色
  activeColor = '#FA7E55', // 进行时节点颜色
  historyColor = '#28C7A3', // 历史节点/边颜色
  backgroundColor = '#FFFFFF' // 画布背景颜色
}
