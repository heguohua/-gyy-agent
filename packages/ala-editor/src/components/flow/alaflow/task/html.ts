import { HtmlResize } from '@logicflow/extension'
import { createApp, h } from 'vue'
import VueNode from './VueNode.vue'
import { JSX } from 'preact'
import { GraphModel, NodeConfig, h as lfH } from '@logicflow/core'
class TaskModel extends HtmlResize.model {
  setAttributes () {
    this.text.editable = false // 禁止节点文本编辑
  }

  constructor (data: NodeConfig, graphModel: GraphModel) {
    super(data, graphModel)
    if (data.properties) {
      this.width = (data.properties.width ? data.properties.width : 120) as number
      this.height = (data.properties.height ? data.properties.height : 80) as number
    }
  }
}
class TaskView extends HtmlResize.view {
  app: any;
  isMounted: boolean
  r: any
  constructor (props: any) {
    super(props)
    const { properties, text } = props.model
    if (props.graphModel.wfProps.taskNodeRender && typeof props.graphModel.wfProps.taskNodeRender === 'function') {
      this.r = h(props.graphModel.wfProps.taskNodeRender(props))
    } else {
      this.r = h(VueNode, {
        properties,
        text,
        wfConfig: props.graphModel.wfProps.wfConfig,
        viewer: props.graphModel.wfProps.viewer,
        helpClick: props.graphModel.wfProps.helpClick,
        showHelp: props.graphModel.wfProps.wfConfig?.showHelp,
        model: props.model,
        onHelpClick: (e: any) => {
          props.graphModel.eventCenter.emit('custom:helpClick', e)
        }
      })
    }
    this.app = createApp({
      render: () => this.r
    })
    this.isMounted = false
  }

  shouldUpdate () {
    const data = {
      ...this.props.model.getProperties(),
      // isSelected: this.props.model.isSelected,
      // isHovered: this.props.model.isHovered,
      id: this.props.model.id,
      __textValue__: this.props.model.text.value
    }
    if (this.preProperties && this.preProperties === JSON.stringify(data)) return false
    this.preProperties = JSON.stringify(data)
    return true
  }

  setHtml (rootEl: HTMLElement) {
    if (!this.isMounted) {
      this.isMounted = true
      const node = document.createElement('div')
      node.style.width = '100%'
      node.style.height = '100%'
      rootEl.appendChild(node)
      this.app.mount(node)
    } else {
      this.r.component.props.properties = this.props.model.getProperties()
      this.r.component.props.text = this.props.model.text
      this.r.component.props.model = this.props.model
    }
  }

  getShape () {
    const {
      model: { isSelected },
      graphModel
    } = this.props
    const viewer = graphModel.wfProps.viewer
    return lfH('g', {}, [this.getResizeShape(), isSelected && !viewer ? this.getControlGroup() : ''])
  }

  getText (): '' | JSX.Element {
    return ''
  }
}
const Task = {
  type: 'snaker:task',
  view: TaskView,
  model: TaskModel
}

export { TaskView, TaskModel }
export default Task
