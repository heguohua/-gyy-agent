import Custom from './custom'
import Decision from './decision'
import End from './end'
import Fork from './fork'
import Join from './join'
import Start from './start'
import Task from './task'
import TaskHtml from './task/html'
import Transtion from './transition'
import SubProcess from './subProcess'
import { logicFlowJsonToSnakerXml, snakerXml2LogicFlowJson } from './tool'
import WfSubProcess from './wfSubProcess'

/**
 * snakerflow组件注册
 */
class FlowElement {
  static pluginName = 'snakerFlowElement';
  constructor ({ lf, props }: any) {
    lf.register(Custom)
    lf.register(Decision)
    lf.register(End)
    lf.register(Fork)
    lf.register(Join)
    lf.register(Start)
    if (props.nodeRenderType === 'html') {
      lf.register(TaskHtml)
    } else {
      lf.register(Task)
    }
    lf.register(Transtion)
    lf.register(SubProcess)
    lf.register(WfSubProcess)
  }
}
/**
 * snakerflow给你LogicFlow数据转换器
 */
class FlowAdapter {
  static pluginName = 'snakerFlowAdapter';
  constructor ({ lf } : { lf: any }) {
    lf.adapterIn = (userData: any) => {
      if (typeof userData === 'string') {
        userData = snakerXml2LogicFlowJson(userData)
      }
      userData = userData.json ? userData.json : userData
      // 对入参数据进行简单处理
      if (userData.nodes) {
        userData.nodes.forEach((node: any) => {
          if (typeof node.properties.field === 'object') {
            node.properties.field = JSON.stringify(node.properties.field)
          }
        })
      }
      // 将流程扩展属性绑定给lf图模型对象
      lf.graphModel.name = userData.name
      lf.graphModel.displayName = userData.displayName
      lf.graphModel.expireTime = userData.expireTime
      lf.graphModel.instanceUrl = userData.instanceUrl
      lf.graphModel.instanceNoClass = userData.instanceNoClass
      lf.graphModel.preInterceptors = userData.preInterceptors
      lf.graphModel.postInterceptors = userData.postInterceptors
      return userData
    }
    lf.adapterOut = (logicFlowData: any) => {
      const graphData = {
        name: lf.graphModel.name,
        displayName: lf.graphModel.displayName,
        expireTime: lf.graphModel.expireTime,
        instanceUrl: lf.graphModel.instanceUrl,
        instanceNoClass: lf.graphModel.instanceNoClass,
        preInterceptors: lf.graphModel.preInterceptors,
        postInterceptors: lf.graphModel.postInterceptors,
        ...logicFlowData
      }
      Object.keys(graphData).forEach((key: string) => {
        // 删除undefined的值
        if (graphData[key] === undefined) {
          delete graphData[key]
        }
      })
      // 处理一下field数据-stringjson==>obj
      graphData.nodes.forEach((node: any) => {
        if (node.type === 'snaker:task' && node.properties.field) {
          node.properties.field = JSON.parse(node.properties.field)
        }
      })
      const xml = logicFlowJsonToSnakerXml(graphData)
      return {
        json: graphData,
        xml
      }
    }
  }
}
export {
  FlowElement,
  FlowAdapter
}
