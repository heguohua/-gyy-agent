import { BaseEdgeModel, BaseNodeModel } from '@logicflow/core'
import { ProcessModel } from '../types'
import { ColorEnum } from '../enums'

/**
 * 节点样式处理方法
 * @param {*}} _this
 * @param {*} style
 * @returns
 */
export const nodeStyleHandle = (_this: BaseNodeModel, style: {
  [x: string]: any;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}): {
  [x: string]: any;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
} => {
  if (_this.properties.state === 'active') {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.activeColor || ColorEnum.activeColor
  } else if (_this.properties.state === 'history') {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.historyColor || ColorEnum.historyColor
  } else {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.primaryColor || ColorEnum.primaryColor
  }
  return style
}

/**
 * 边样式处理方法
 * @param {*}} _this
 * @param {*} style
 * @returns
 */
export const edgeStyleHandle = (_this: BaseEdgeModel, style: {
  [x: string]: any;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}): {
  [x: string]: any;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
} => {
  if (_this.properties.state === 'active') {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.activeColor || ColorEnum.activeColor
  } else if (_this.properties.state === 'history') {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.historyColor || ColorEnum.historyColor
  } else {
    style.stroke = _this.graphModel.wfProps?.wfConfig?.edgePrmaryColor || ColorEnum.edgePrimaryColor
  }
  return style
}

/**
 * 解析xml成Dom对象
 * @param {} xml
 * @returns
 */
export const parseXml2Dom = (xml: string): any => {
  let xmlDoc = null
  if (window.DOMParser) {
    const parser = new DOMParser()
    xmlDoc = parser.parseFromString(xml, 'text/xml')
  } else {
    // Internet Explorer
    // eslint-disable-next-line no-undef
    xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
    xmlDoc.async = false
    xmlDoc.loadXML(xml)
  }
  return xmlDoc
}

// 节点标签
const NODE_NAMES = ['start', 'task', 'decision', 'end', 'custom', 'join', 'fork', 'subProcess', 'wfSubProcess']

// 流程节点属性
const PROCESS_ATTR_KEYS = ['name', 'displayName', 'instanceUrl', 'expireTime', 'instanceNoClass', 'preInterceptors', 'postInterceptors']

// 节点属性
const NODE_ATTR_KEYS = ['name', 'displayName', 'form', 'assignee', 'assignmentHandler', 'taskType', 'performType',
  'preInterceptors', 'postInterceptors', 'reminderTime', 'reminderRepeat',
  'expireTime', 'autoExecute', 'callback', 'expr', 'handleClass',
  'clazz', 'methodName', 'args', 'layout', 'g', 'version', 'form']

// 变迁节点属性
const TRANSITION_ATTR_KEYS = ['name', 'displayName', 'to', 'expr', 'g']

/**
 * 将snaker的定义文件转成LogicFlow支持的数据格式
 * @param {*} xml
 * @returns
 */
export const xml2LogicFlowJson = (xml: string): any => {
  const graphData = {
    nodes: [] as BaseNodeModel[],
    edges: [] as BaseNodeModel[]
  } as ProcessModel
  const xmlDoc = parseXml2Dom(xml)
  const processDom = xmlDoc.getElementsByTagName('process')
  if (!processDom.length) {
    return graphData
  }
  let value = null
  // 解析process属性
  PROCESS_ATTR_KEYS.forEach(key => {
    value = processDom[0].getAttribute(key)
    if (value) {
      graphData[key] = value
    }
  })
  let nodeEles: any = null
  let node: any = null
  let lfNode: any = {}
  // 解析节点
  NODE_NAMES.forEach(key => {
    nodeEles = processDom[0].getElementsByTagName(key)
    if (nodeEles.length) {
      for (let i = 0, len = nodeEles.length; i < len; i++) {
        node = nodeEles[i]
        lfNode = {
          type: 'snaker:' + (key === 'subProcess' ? 'wfSubProcess' : key),
          properties: {}
        }
        // 处理节点
        NODE_ATTR_KEYS.forEach(attrKey => {
          value = node?.getAttribute(attrKey)
          if (value) {
            if (attrKey === 'name') {
              lfNode.id = value
            } else if (attrKey === 'layout') {
              const attr = value.split(',')
              if (attr.length === 4) {
                lfNode.x = attr[0]
                lfNode.y = attr[1]
                lfNode.properties.width = attr[2] <= 0 ? 100 : attr[2]
                lfNode.properties.height = attr[3] <= 0 ? 50 : attr[3]
              }
            } else if (attrKey === 'displayName') {
              lfNode.text = value
            } else {
              lfNode.properties[attrKey] = value
            }
          }
        })
        // 处理扩展属性
        if (key === 'task') {
          const fieldEles = node.getElementsByTagName('field')
          if (fieldEles.length) {
            const fieldEle = fieldEles[0]
            const field = {
            }
            const attr = fieldEle.getElementsByTagName('attr')
            for (let iii = 0; iii < attr.length; iii++) {
              field[attr[iii].getAttribute('name')] = attr[iii].getAttribute('value')
            }
            lfNode.properties.field = field
          }
        }
        graphData.nodes.push(lfNode)
        // 处理边
        let transitionEles = null
        let transitionEle = null
        let edge: any = {}
        if (key !== 'end') {
          transitionEles = node.getElementsByTagName('transition')
          for (let j = 0, lenn = transitionEles.length; j < lenn; j++) {
            transitionEle = transitionEles[j]
            edge = {}
            edge.id = transitionEle.getAttribute('name')
            edge.type = 'snaker:transition'
            edge.sourceNodeId = lfNode.id
            edge.targetNodeId = transitionEle.getAttribute('to')
            edge.text = {
              value: transitionEle.getAttribute('displayName') ? transitionEle.getAttribute('displayName') : ''
            }
            edge.properties = {}
            const expr = transitionEle.getAttribute('expr')
            if (expr) {
              edge.properties.expr = expr
            }
            const g = transitionEle.getAttribute('g')
            if (g) {
              const points = g.split(';')
              if (points.length >= 2) {
                edge.pointsList = []
                points.forEach((item: any) => {
                  const pointArr = item.split(',')
                  edge.pointsList.push({
                    x: Number(pointArr[0]),
                    y: Number(pointArr[1])
                  })
                })
                edge.startPoint = edge.pointsList[0]
                edge.endPoint = edge.pointsList[edge.pointsList.length - 1]
              }
            }
            graphData.edges.push(edge)
          }
        }
      }
    }
  })

  return graphData
}
/**
 * 将LogicFlow的数据转成snaker的定义文件
 * @param {*} data(...processInfo,nodes,edges)
 * @returns
 */
export const logicFlowJsonToXml = (data: ProcessModel): string => {
  let xml = ''
  // data的数据由流程定义文件信息+logicFlow数据构成
  // 先构建成流程对象
  const processObj = {
    name: data.name, // 流程定义名称
    displayName: data.displayName, // 流程定义显示名称
    instanceUrl: data.instanceUrl, // 实例启动Url
    expireTime: data.expireTime, // 期望完成时间
    instanceNoClass: data.instanceNoClass, // 实例编号生成类
    preInterceptors: data.preInterceptors, // 节点前置拦截器
    postInterceptors: data.postInterceptors // 节点后置拦截器
  }
  /**
   * 获取所有子流程
   */
  const getSubProcessNodes = () => {
    return data.nodes.filter((node) => {
      return node.type === 'snaker:subProcess'
    })
  }
  /**
   * 获取开始节点
   * @returns
   */
  const getStartNode = () => {
    const subProcessNodes = getSubProcessNodes()
    return data.nodes.find((node) => {
      // 是开始节点，且非子流程中的开始节点
      return node.type === 'snaker:start' && !subProcessNodes.some((item: any) => {
        return item.children.includes(node.id)
      })
    })
  }
  /**
   * 获取当前节点的所有下一个节点集合
   * @param {*} id 当前节点名称
   * @returns
   */
  const getNextNodes = (id: string) => {
    return data.edges.filter(edge => {
      return edge.sourceNodeId === id
    }).map(edge => {
      return data.nodes.find((node) => {
        return node.id === edge.targetNodeId
      })
    })
  }
  /**
   * 获取节点所有输出边
   * @param {*} id
   * @returns
   */
  const getTransitions = (id: string) => {
    return data.edges.filter((edge) => {
      return edge.sourceNodeId === id
    }).map(edge => {
      return {
        name: edge.id,
        displayName: (edge.text instanceof String || edge.text === undefined) ? edge.text : edge.text.value,
        to: edge.targetNodeId, // 目地节点id
        expr: edge.properties.expr, // 表达式
        g: edge.pointsList.map((point: { x: string; y: string; }) => { // 转换点集合
          return point.x + ',' + point.y
        }).join(';')
      }
    })
  }
  /**
   * 构建节点属性
   * @param {}} node
   * @returns
   */
  const buildNode = (node: any) => {
    let field
    if (node.properties.field && Object.keys(node.properties.field).length) {
      field = {
        name: 'ext',
        displayName: '扩展属性',
        attr: Object.keys(node.properties.field).map(key => {
          return {
            name: key,
            value: node.properties.field[key]
          }
        })
      }
    }
    return {
      name: node.id,
      displayName: (node.text instanceof String || node.text === undefined) ? node.text : node.text.value,
      layout: node.x + ',' + node.y + ',' + (node.properties.nodeSize?.width || node.properties.width || (node.type === 'snaker:subProcess' ? '500' : '120')) + ',' + (node.properties.nodeSize?.height || node.properties.height || (node.type === 'snaker:subProcess' ? '300' : '80')),
      ...node.properties,
      transition: getTransitions(node.id),
      field
    }
  }
  /**
   * 特殊字符转义
   * @param {*} text
   * @returns
   */
  const textEncode = (text: string) => {
    text = text.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return text
  }
  /**
   * 递归构建节点属性
   * @param {} node
   */
  const recursionBuildNode = (node: any) => {
    const nodeName = node.type.replace('snaker:', '')
    if (!processObj[nodeName + '_' + node.id]) {
      processObj[nodeName + '_' + node.id] = buildNode(node)
      const nextNodes = getNextNodes(node.id)
      nextNodes.forEach(nextNode => {
        recursionBuildNode(nextNode)
      })
    }
  }
  const startNode = getStartNode()
  if (!startNode) {
    // 开始节点不存在，xml不合法
    return ''
  }
  recursionBuildNode(startNode)
  xml = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
  xml += '<process '
  Object.keys(processObj).forEach(key => {
    const value = processObj[key]
    if (PROCESS_ATTR_KEYS.includes(key) && value) {
      xml += ' ' + key + '=' + '"' + textEncode(value) + '"'
    }
  })
  xml += '>\n'
  // 生成节点xml
  Object.keys(processObj).forEach(key => {
    const value = processObj[key]
    let nodeName = key.split('_')[0]
    if (NODE_NAMES.includes(nodeName)) {
      if (nodeName === 'wfSubProcess') {
        nodeName = 'subProcess'
      }
      xml += '\t<' + nodeName
      // 构造属性
      Object.keys(value).forEach(nodeAttrKey => {
        if (NODE_ATTR_KEYS.includes(nodeAttrKey) && value[nodeAttrKey]) {
          xml += ' ' + nodeAttrKey + '=' + '"' + textEncode(value[nodeAttrKey]) + '"'
        }
      })
      xml += '>\n\t'
      // 构建transition
      if (value.transition) {
        value.transition.forEach((tran: any) => {
          xml += '\t<transition'
          // transition属性
          Object.keys(tran).forEach(tranAttrKey => {
            if (TRANSITION_ATTR_KEYS.includes(tranAttrKey) && tran[tranAttrKey]) {
              xml += ' ' + tranAttrKey + '=' + '"' + textEncode(tran[tranAttrKey]) + '"'
            }
          })
          xml += '>'
          xml += '</transition>\n'
        })
      }
      if (value.field && nodeName === 'task') {
        xml += '\t<field name="' + value.field.name + '" displayName="' + value.field.displayName + '">\n'
        value.field.attr.forEach((attrItem: any) => {
          xml += '\t\t<attr name="' + attrItem.name + '" value="' + textEncode(attrItem.value) + '"></attr>\n'
        })
        xml += '\t</field>\n'
      }
      xml += '\t</' + nodeName + '>\n'
    }
  })
  xml += '</process>'
  // 构建子流程模型数据
  const buildSubProcessList = () => {
    const subProcessNodes = getSubProcessNodes()
    const subProcessModel = subProcessNodes.map(n => {
      const subModel = {
        name: n.id, // 流程定义名称
        displayName: n.properties.displayName, // 流程定义显示名称
        instanceUrl: n.properties.instanceUrl, // 实例启动Url
        expireTime: n.properties.expireTime, // 期望完成时间
        instanceNoClass: n.properties.instanceNoClass, // 实例编号生成类
        preInterceptors: n.properties.preInterceptors, // 节点前置拦截器
        postInterceptors: n.properties.postInterceptors, // 节点后置拦截器
        nodes: data.nodes.filter((item: any) => n.children.includes(item.id)),
        edges: data.edges.filter((item: any) => n.children.includes(item.id))
      }
      subModel.nodes.forEach((item: any) => {
        data.edges.forEach((edge: any) => {
          if (edge.sourceNodeId === item.id) {
            subModel.edges.push(edge)
          }
        })
      })
      return subModel
    })
    return subProcessModel
  }
  const subProcessList = buildSubProcessList()
  subProcessList.forEach((processModel: ProcessModel) => {
    xml += logicFlowJsonToXml(processModel).replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?>', '')
  })
  return xml
}
