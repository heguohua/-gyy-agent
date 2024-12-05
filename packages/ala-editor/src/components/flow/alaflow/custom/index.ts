/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-30 08:52:32
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-05 22:26:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/flow/alaflow/custom/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { h, GraphModel, NodeConfig } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
import { nodeStyleHandle } from '../tool'
/**
 * 自定义节点
 */
class CustomModel extends RectResize.model {
  static extendKey = 'CustomModel';
  constructor (data: NodeConfig, graphModel: GraphModel) {
    super(data, graphModel)
    if (data.properties) {
      this.width = (data.properties.width ? data.properties.width : 120) as number
      this.height = (data.properties.height ? data.properties.height : 80) as number
    }
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

class CustomView extends RectResize.view {
  static extendKey = 'CustomNode';
  getLabelShape (): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 36,
        height: 36,
        viewBox: '0 0 36 36'
      },
      h('path', {
        fill: style.stroke,
        d: 'M5 20q-.825 0-1.412-.587T3 18V4q0-.825.588-1.412T5 2h14q.825 0 1.413.588T21 4v5.65q-.475-.225-.975-.363T19 9.076V4H5v9h4.2q.225.675.75 1.175t1.175.7q-.075.5-.1 1.013t.05 1.012q-.9-.175-1.687-.663T8 15H5v3h6.325q.175.55.4 1.05t.55.95zm0-2h6.325zm12.025 3l-.3-1.5q-.3-.125-.563-.262t-.537-.338l-1.45.45l-1-1.7l1.15-1q-.05-.3-.05-.65t.05-.65l-1.15-1l1-1.7l1.45.45q.275-.2.538-.337t.562-.263l.3-1.5h2l.3 1.5q.3.125.563.263t.537.337l1.45-.45l1 1.7l-1.15 1q.05.3.05.65t-.05.65l1.15 1l-1 1.7l-1.45-.45q-.275.2-.537.338t-.563.262l-.3 1.5zm1-3q.825 0 1.413-.587T20.025 16t-.587-1.412T18.025 14t-1.412.588T16.025 16t.588 1.413t1.412.587'
      })
    )
  }

  getResizeShape (): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
        ...style
      }),
      this.getLabelShape()
    ])
  }
}

const Custom = {
  type: 'snaker:custom',
  view: CustomView,
  model: CustomModel
}

export { CustomView, CustomModel }
export default Custom
