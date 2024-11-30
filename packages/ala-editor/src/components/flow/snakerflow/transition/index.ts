import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { edgeStyleHandle } from '../tool'

class TransitionModel extends PolylineEdgeModel {
  static extendKey = 'TransitionModel';
  getEdgeStyle (): {
    [x: string]: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    } {
    const style = super.getEdgeStyle()
    return edgeStyleHandle(this, style)
  }
}

class TransitionView extends PolylineEdge {
  static extendKey = 'TransitionEdge';
}

const Transition = {
  type: 'snaker:transition',
  view: TransitionView,
  model: TransitionModel
}

export { TransitionView, TransitionModel }
export default Transition
