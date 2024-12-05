/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-05 22:35:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/alaflow/subProcess/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { GroupNode } from '@logicflow/extension'
import { nodeStyleHandle } from '../tool'

class SubProcessView extends GroupNode.view {
}
class SubProcessModel extends GroupNode.model {
  initNodeData (data: any) {
    super.initNodeData(data)
    this.isRestrict = true
    this.resizable = true
    this.foldable = false
    this.width = 500
    this.height = 300
    this.foldedWidth = 100
    this.foldedHeight = 50
    this.radius = 4
  }

  getNodeStyle ():{
    [x: string]: any;
    width?: number;
    height?: number;
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    } {
    const style = super.getNodeStyle()
    return nodeStyleHandle(this, style)
  }
}

const SubProcess = {
  type: 'snaker:subProcess',
  view: SubProcessView,
  model: SubProcessModel
}

export { SubProcess, SubProcessModel }
export default SubProcess
