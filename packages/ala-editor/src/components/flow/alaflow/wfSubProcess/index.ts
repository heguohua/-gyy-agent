import { GraphModel, h, NodeConfig } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
import { nodeStyleHandle } from '../tool'
class WfSubProcessModel extends RectResize.model {
  static extendKey = 'WfSubProcess';
  constructor (data: NodeConfig, graphModel: GraphModel) {
    super(data, graphModel)
    if (data.properties) {
      this.width = (data.properties.width ? data.properties.width : 120) as number
      this.height = (data.properties.height ? data.properties.height : 80) as number
    }
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

class WfSubProcessView extends RectResize.view {
  static extendKey = 'WfSubProcessNode';
  getLabelShape ():h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: '0 0 1024 1024'
      },
      [h('path', {
        fill: style.stroke,
        d: 'M960 224v576H64V224h896z m-32 32H96v512h832V256z'
      }),
      h('path', {
        fill: style.stroke,
        d: 'M224 224v576H64V224h160zM192 256H96v512h96V256zM960 224v576h-160V224h160z m-32 32h-96v512h96V256z'
      })]
    )
  }

  getResizeShape ():h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    return h('g', {}, [
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height
      }),
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        width: 6,
        height: height
      }),
      h('rect', {
        ...style,
        x: x + width / 2 - 6,
        y: y - height / 2,
        width: 6,
        height: height
      })
      // .getLabelShape()
    ])
  }
}

const WfSubProcess = {
  type: 'snaker:wfSubProcess',
  view: WfSubProcessView,
  model: WfSubProcessModel
}

export { WfSubProcessView, WfSubProcessModel }
export default WfSubProcess
