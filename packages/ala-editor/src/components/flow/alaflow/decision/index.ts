/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-05 22:10:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/alaflow/decision/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { GraphModel, h, NodeConfig, PolygonNode, PolygonNodeModel } from '@logicflow/core'
import { nodeStyleHandle } from '../tool'

class DecisionModel extends PolygonNodeModel {
  static extendKey = 'DecisionModel';

  constructor(data: NodeConfig, graphModel: GraphModel) {
    if (!data.text) {
      data.text = ''
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40
      }
    }
    super(data, graphModel)
    this.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25]
    ]
  }

  getNodeStyle(): {
    [x: string]: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  } {
    const style = super.getNodeStyle()
    return nodeStyleHandle(this, style)
  }

}

class DecisionView extends PolygonNode {
  static extendKey = 'DecisionNode';
  
  getShape(): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, points } = model
    const style = model.getNodeStyle()
    return h(
      'g',
      {
        transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
      },
      h('polygon', {
        ...style,
        x,
        y,
        points
      }),
      h('path', {
        fill: style.stroke,
        d:
          'M17.7,19.6l-2.3,5l-2.3-5h-2.6l3.6,8.7v3.4h2.4v-3.4l3.6-8.7H17.7z M31.2,25.3l2.4,6.4H36V19.6h-2.4V26l-2.4-6.4h-2.4v12.1h2.4V25.3z M20.3,31.7h2.5l3.5-12.1h-2.4L20.3,31.7z',
      })
    )
  }
}

const Decision = {
  type: 'snaker:decision',
  view: DecisionView,
  model: DecisionModel
}

export { DecisionView, DecisionModel }
export default Decision
