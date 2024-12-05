/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-05 22:48:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/alaflow/transition/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BezierEdge, BezierEdgeModel } from '@logicflow/core'
import { edgeStyleHandle } from '../tool'

class TransitionModel extends BezierEdgeModel {
  static extendKey = 'TransitionModel';
  getEdgeStyle(): {
    [x: string]: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  } {
    const style = super.getEdgeStyle()
    return edgeStyleHandle(this, style)
  }
}

class TransitionView extends BezierEdge {
  static extendKey = 'TransitionEdge';
}

const Transition = {
  type: 'snaker:transition',
  view: TransitionView,
  model: TransitionModel
}

export { TransitionView, TransitionModel }
export default Transition
