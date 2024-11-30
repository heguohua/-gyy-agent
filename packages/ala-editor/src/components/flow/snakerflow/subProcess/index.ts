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
