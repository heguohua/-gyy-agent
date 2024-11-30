import { NodeTypeEnum } from './enums'
export interface ProcessModel {
  // 流程名称
  name: string;
  // 流程显示名称
  displayName: string;
  // 过期时间
  expireTime: string;
  // 启动流程实例url或表单key
  instanceUrl: string;
  // 自定义流程实例流水号类
  instanceNoClass: string;
  // 当前图上所有节点的model
  nodes: BaseNodeModel[];
   // 当前图上所有边的model
  edges: BaseEdgeModel[];
  // 节点前置拦截器
  preInterceptors: string;
  // 节点后置拦截器
  postInterceptors: string;
}
export interface FlowFormModel extends ProcessModel {
  type: string;
  preInterceptors: string,
  postInterceptors: string,
  id: string,
  x: number,
  y: number,
  properties: {},
  clazz: string,
  methodName: string,
  args: string,
  expr: string,
  handleClass: string,
  form: string,
  assignee: string,
  assignmentHandler: string,
  taskType: string,
  performType: string,
  reminderTime: string,
  reminderRepeat: string,
  autoExecute: string,
  callback: string,
  width: number,
  height: number,
  field: any,
  fieldStr: string,
  version: number
}
export interface PropertyEvent {
  type: NodeType,
  propertyName: string,
  propertyValue: any,
}
export type WfPanelItem = {
  type?: string;
  text?: string;
  icon?: string;
  label?: string;
  className?: string;
  properties?: Record<string, any>;
  callback?: (lf: LogicFlow, container: HTMLElement) => void;
  hide?: boolean;
  nodeClick?: (lf: LogicFlow, args: any) => void
  sort?: number; // 排序
}
// 创建一个映射类型来将NodeTypeEnum的每个成员映射到WfPanelItem
type NodeTypeToConfig<T> = {
  [K in keyof T]?: T[K] extends string ? WfPanelItem : never;
};
export interface WfConfig extends NodeTypeToConfig<NodeTypeEnum> {
  extendDndPanel?: WfPanelItem [] // 扩展的拖拽面板
  nodeClick?: (lf: LogicFlow, args: any) => void // 节点点击事件
  edgeClick?: (lf: LogicFlow, args: any) => void // 边点击事件
  blankContextmenu?: (lf: LogicFlow, args: any) => void // 空白区域右键事件
  primaryColor?: string, // 主题色
  activeColor?: string, // 进行时节点颜色
  historyColor?: string // 历史节点/边颜色
  edgePrmaryColor?: string // 边主题色
  showHelp?: boolean // 是否显示帮助
  helpClick?: (args: any) => void // 帮助点击事件处理
  arrowClick?: (args: any) => void // 右箭头点击事件处理
}
