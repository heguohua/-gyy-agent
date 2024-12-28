<template>
  <div class="ala-flow-designer" ref="lfElRef"></div>

  <PropertySetting ref="propertySettingRef" :extendAttrConfig="props.extendAttrConfig"
    :extendPropertyKeys="extendPropertyKeys" @change="handlePropertyChange">

    <template #[key]="data" v-for="(item, key) in $slots">

      <slot :name="key" v-bind="data || {}"></slot>

    </template>

  </PropertySetting>

  <DataDetail ref="dataDetailRef" />
  <ImportData ref="importDataRef" @on-submit="handleImportSubmit" />
  <HighLightData ref="highLightDataRef" @on-submit="handleHighLightSubmit" />

</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core'
import { Snapshot, DndPanel, SelectionSelect, Menu, Control, Group } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import { onMounted, Ref, ref, unref, defineProps, watch, defineExpose, defineEmits, PropType, version } from 'vue'
import { ProcessModel, PropertyEvent, WfConfig } from './types'
import PropertySetting from './PropertySetting'
import EventEmitter from '@logicflow/core/types/event/eventEmitter'
import { FlowElement, FlowAdapter } from './alaflow/index'
import { NodeTypeEnum, ColorEnum } from './enums'
import DataDetail from './Control/DataDetail.vue'
import ImportData from './Control/ImportData.vue'
import HighLightData from './Control/HighLightData.vue'
import { xml2LogicFlowJson } from './alaflow/tool'
import { version as EleVersion } from 'element-plus'
import { patternItems } from './data'
import { logger } from '@/utils/logger'


const emits = defineEmits(['change', 'save', 'init'])

// 定义挂载元素Ref
const lfElRef: Ref = ref(null)

// 属性面板操作
const propertySettingRef: Ref = ref(null)

// 查看数据弹窗
const dataDetailRef: Ref = ref(null)

// 导入数据弹窗
const importDataRef: Ref = ref(null)

// 导入高高弹窗
const highLightDataRef: Ref = ref(null)

// 定义LogicFlow实例
const lfInstance = ref(null) as Ref<LogicFlow | null>

// 当前操作节点/或边id
const currentOpId = ref('')

// 定义组件接收的参数
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => { }
  },
  config: {
    type: Object,
    default() {
      return {
        grid: true
      }
    }
  },
  highLight: { // 高亮数据
    type: Object,
    default() {
      return {
      }
    }
  },
  assigneeText: { // 参与人回显文本
    type: [Object, Array],
    default() {
      return {
      }
    }
  },
  viewer: { // 预览模式
    type: Boolean,
    default: false
  },
  extendAttrConfig: { // 扩展属性配置
    type: Object
  },
  showDoc: { // 是否显示文档
    type: Boolean,
    default: true
  },
  // 扩展的属性key
  extendPropertyKeys: {
    type: Array
  },
  wfConfig: { // 本流程设计器特定的配置，区别于config，config为LogicFlow的配置
    type: Object as PropType<WfConfig>,
    default() {
      return {} as WfConfig
    }
  },
  nodeRenderType: { // 节点渲染类型，html 和svg
    type: String as PropType<'svg' | 'html'>,
    default: 'svg'
  },
  taskNodeRender: { // 自定义节点渲染
    type: Function
  }
})

// 监听流程变化
watch(() => props.modelValue, () => {
  logger.info(`监听到【 modelValue值 】发生变化，即将重新渲染流程图`);
  reRender(props.modelValue.content)
}, {
  deep: true
})

// 监听高亮数据
watch(() => props.highLight, () => {
  setHighLight(props.highLight)
}, {
  deep: true
})

// 监听参与人回显数据
watch(() => props.assigneeText, () => {
  setAssigneeText(props.assigneeText)
}, {
  deep: true
})

const initDoc = () => {
  const lf = unref(lfInstance)

  if (!lf) return


  if (props.showDoc) {
    // 控制面板-码云
    // lf.extension.control.addItem({
    //   iconClass: 'lf-control-mayu',
    //   title: '',
    //   text: '码云',
    //   onClick: () => {
    //     window.location.href = 'https://gitee.com/mldong/snakerflow-designer-vue/tree/vue3/'
    //   }
    // })
  }
}

// 初始化
const init = () => {
  // 画布配置
  LogicFlow.use(Snapshot)
  LogicFlow.use(DndPanel)
  LogicFlow.use(SelectionSelect)
  LogicFlow.use(Menu)
  LogicFlow.use(Control)
  LogicFlow.use(FlowElement, props)
  LogicFlow.use(FlowAdapter, props)
  LogicFlow.use(Group)
  const defaultConfig: any = {
  }
  if (props.viewer) {
    // defaultConfig.isSilentMode = true
    defaultConfig.adjustEdge = false
    defaultConfig.adjustNodePosition = false
    defaultConfig.stopScrollGraph = true
    defaultConfig.stopMoveGraph = true
    defaultConfig.hoverOutline = false
    defaultConfig.hideAnchors = true
    defaultConfig.adjustNodePosition = false
    defaultConfig.stopMoveGraph = false
    defaultConfig.nodeTextEdit = false
    defaultConfig.edgeTextEdit = false
    defaultConfig.resizeNode = false
    defaultConfig.nodeSelectedOutline = false
  }

  lfInstance.value = new LogicFlow({
    container: unref(lfElRef),
    grid: true,
    ...props.config,
    ...defaultConfig,
    background: props.config.background || {
      backgroundColor: ColorEnum.backgroundColor
    }
  })

  // 实例化成功，方便提供外部注册
  emits('init', lfInstance.value)

  // 绑定流程设计器组件属性
  bindWfProps()

  // 初始化操作
  initOp()

  reRender(props.modelValue.content as ProcessModel)

  // 初始化事件
  initEvent()
}

// 绑定流程设计器组件属性
const bindWfProps = () => {
  const lf = unref(lfInstance)
  if (!lf) return
  lf.graphModel.wfProps = props
}

// 初始化操作
const initOp = () => {
  const lf = unref(lfInstance)
  if (!lf) return

  if (props.viewer) {
    // 预览模式时
    lf.extension.menu.setMenuConfig({
      nodeMenu: [],
      edgeMenu: []
    })

    // 删除上一步
    lf.extension.control.removeItem('undo')

    // 删除下一步
    lf.extension.control.removeItem('redo')

    initDoc()

    return
  }

  // 设置右键菜单
  lf.extension.menu.setMenuConfig({
    nodeMenu: [
      {
        text: '删除',
        callback(node: any) {
          // node为该节点数据
          lf.deleteNode(node.id)
        }
      }
    ]
  })

  // 控制面板-清空画布
  lf.extension.control.addItem({
    iconClass: 'lf-control-clear',
    title: 'clear',
    text: '清空',
    onClick: () => {
      lf.clearData()
    }
  })

  // 控制面板-添加查看按钮
  lf.extension.control.addItem({
    iconClass: 'lf-control-see',
    title: '',
    text: '查看',
    onClick: () => {
      const dataDetailElRef = unref(dataDetailRef)
      if (!dataDetailElRef) return
      const graphData = getGraphData()
      dataDetailElRef.show(graphData)
    }
  })

  // 控制面板-添加导入按钮
  lf.extension.control.addItem({
    iconClass: 'lf-control-import',
    title: '',
    text: '导入',
    onClick: () => {
      unref(importDataRef).show()
    }
  })

  // 控制面板-设置高亮数据
  lf.extension.control.addItem({
    iconClass: 'lf-control-setting',
    title: '',
    text: '设置高亮',
    onClick: () => {
      unref(highLightDataRef).show()
    }
  })

  // 控制面板-保存
  lf.extension.control.addItem({
    iconClass: 'lf-control-save',
    title: '',
    text: '保存',
    onClick: () => {
      const data = getGraphData()
      emits('save', data)
    }
  })

  initDoc()

  // 设置默认边
  lf.setDefaultEdgeType('snaker:transition')

  // 二次处理patternItems
  const wrapPatternItems = () => {
    Object.keys(props.wfConfig).forEach(key => {
      if (key in NodeTypeEnum) {
        Object.keys(props.wfConfig[key]).forEach(nodeConfigKey => {
          if (['type', 'text', 'icon', 'label', 'className', 'properties', 'callback', 'sort'].includes(nodeConfigKey)) {
            // 为节dndPanel的属性，则配置
            patternItems.forEach(item => {
              if (item.type === `snaker:${key}`) {
                if (nodeConfigKey === 'properties') {
                  item[nodeConfigKey] = {
                    ...item[nodeConfigKey],
                    ...props.wfConfig[key][nodeConfigKey]
                  }
                } else {
                  item[nodeConfigKey] = props.wfConfig[key][nodeConfigKey]
                }
              }
            })
          }
        })
      }
    })
    return patternItems.filter(item => {
      const nodeConfig = props.wfConfig[item.type.replace('snaker:', '')]
      return nodeConfig?.hide !== true
    })
  }

  lf.extension.dndPanel.setPatternItems([
    ...wrapPatternItems(),
    ...props.wfConfig?.extendDndPanel || []
  ].sort((a, b) => (a.sort || 99) - (b.sort || 99)))
}

// 初始化事件
const initEvent = () => {
  // 初始化事件
  const lf = unref(lfInstance)
  if (!lf) return

  const eventCenter: EventEmitter = lf.graphModel.eventCenter
  // 自定义事件
  if (props.nodeRenderType === 'html') {
    if (props.wfConfig.helpClick && typeof props.wfConfig.helpClick) {
      eventCenter.on('custom:helpClick', props.wfConfig.helpClick)
    }
  }

  if (props.viewer) return

  // 空白区右键事件-弹出流程属性表单
  eventCenter.on('blank:contextmenu', (args) => {

    if (props.wfConfig.blankContextmenu && typeof props.wfConfig.blankContextmenu === 'function') {

      props.wfConfig.blankContextmenu(lf, args)

    } else {

      propertySettingRef.value.show({
        name: lf.graphModel.name,
        displayName: lf.graphModel.displayName,
        expireTime: lf.graphModel.expireTime,
        instanceUrl: lf.graphModel.instanceUrl,
        instanceNoClass: lf.graphModel.instanceNoClass,
        preInterceptors: lf.graphModel.preInterceptors,
        postInterceptors: lf.graphModel.postInterceptors,
        type: 'process'
      })

    }
  })

  // 节点点击事件
  eventCenter.on('node:click', (args) => {

    if (args.data.type === 'snaker:subProcess') {
      // 子流程展开折叠时，不处理
      if (!args.e.srcElement.className.baseVal) {
        return
      }
    }

    currentOpId.value = args.data.id
    const nodeClick = props.wfConfig[args.data.type.replace('snaker:', '')]?.nodeClick || props.wfConfig.nodeClick

    if (nodeClick && typeof nodeClick === 'function') {

      nodeClick(lf, args)

    } else {

      // html节点特殊处理
      if (props.nodeRenderType === 'html' && [NodeTypeEnum.task].includes(args.data.type.replace('snaker:', ''))) {

        // 为箭头点击事件才处理
        if (args.e.arrowClick) {
          if (props.wfConfig.arrowClick && typeof props.wfConfig.arrowClick === 'function') {
            props.wfConfig.arrowClick(args)
          } else {
            propertySettingRef.value.show({
              ...args.data.properties,
              name: args.data.id,
              displayName: args.data.text?.value || args.data.properties.displayName,
              type: args.data.type
            })
          }
        }

      } else {

        propertySettingRef.value.show({
          ...args.data.properties,
          name: args.data.id,
          displayName: args.data.text?.value || args.data.properties.displayName,
          type: args.data.type
        })

      }
    }
  })

  // 边点击事件
  eventCenter.on('edge:click', (args) => {

    currentOpId.value = args.data.id
    if (props.wfConfig.edgeClick && typeof props.wfConfig.edgeClick === 'function') {

      props.wfConfig.edgeClick(lf, args)

    } else {

      propertySettingRef.value.show({
        ...args.data.properties,
        name: args.data.id,
        displayName: args.data.text?.value,
        type: args.data.type
      })

    }
  })

  // 节点大小改变事件
  lf.on('node:resize', ({ newNodeSize }) => {

    const nodeModel = lf.getNodeModelById(newNodeSize.id)
    if (nodeModel) {

      nodeModel.setProperties({
        width: parseInt(newNodeSize.width),
        height: parseInt(newNodeSize.height)
      })

    }
  })
}

// 重新渲染
const reRender = (data: any): void => {

  const lf = unref(lfInstance)
  if (!lf) {
    logger.error(`lf实例不存在，不渲染流程图`);
    return
  } else {
    logger.info(`lf实例存在，即将渲染流程图，数据体data：`, data);
  }
  lf.render(data)
  // 设置高亮
  setHighLight(props.highLight)
  // 设置参与人加显文本
  setAssigneeText(props.assigneeText)
}

// 处理属性值变化事件
const handlePropertyChange = (propertyEvent: PropertyEvent) => {

  const lf = unref(lfInstance)
  if (!lf) return

  if (propertyEvent.type === NodeTypeEnum.process) {

    // 流程属性
    lf.graphModel[propertyEvent.propertyName] = propertyEvent.propertyValue

  } else if (propertyEvent.type === NodeTypeEnum.subProcess) {

    // 子流程属性
    const nodeId = unref(currentOpId)
    if (propertyEvent.propertyName === 'name') {
      // 更新唯一标识
      if (!lf.getNodeModelById(propertyEvent.propertyValue)) {
        lf.changeNodeId(nodeId, propertyEvent.propertyValue)
        currentOpId.value = propertyEvent.propertyValue
      }
    } else {
      lf.setProperties(nodeId, {
        [propertyEvent.propertyName]: propertyEvent.propertyValue
      })
    }

  } else if (([
    NodeTypeEnum.custom,
    NodeTypeEnum.decision,
    NodeTypeEnum.end,
    NodeTypeEnum.fork,
    NodeTypeEnum.join,
    NodeTypeEnum.start,
    NodeTypeEnum.task,
    NodeTypeEnum.wfSubProcess
  ] as NodeTypeEnum[]).includes(propertyEvent.type)) {

    // 节点属性
    const nodeId = unref(currentOpId)
    // 节点信息
    if (propertyEvent.propertyName === 'name') {

      // 更新唯一标识
      if (!lf.getNodeModelById(propertyEvent.propertyValue)) {
        lf.changeNodeId(nodeId, propertyEvent.propertyValue)
        currentOpId.value = propertyEvent.propertyValue
      }

    } else if (propertyEvent.propertyName === 'displayName') {

      // 更新节点文本值
      lf.updateText(nodeId, propertyEvent.propertyValue)

    } else if (propertyEvent.propertyName === 'width' && [NodeTypeEnum.task, NodeTypeEnum.custom].includes(propertyEvent.type)) {

      // 宽度
      lf.setProperties(nodeId, {
        width: (Number.isNaN(propertyEvent.propertyValue) ? 120 : propertyEvent.propertyValue) as number
      })
      const nodeModel = lf.getNodeModelById(nodeId)
      if (nodeModel) {
        nodeModel.width = (Number.isNaN(propertyEvent.propertyValue) ? 120 : propertyEvent.propertyValue) as number
      }

    } else if (propertyEvent.propertyName === 'height' && [NodeTypeEnum.task, NodeTypeEnum.custom].includes(propertyEvent.type)) {

      // 高度
      lf.setProperties(nodeId, {
        height: (Number.isNaN(propertyEvent.propertyValue) ? 120 : propertyEvent.propertyValue) as number
      })

      const nodeModel = lf.getNodeModelById(nodeId)
      if (nodeModel) {
        nodeModel.height = (Number.isNaN(propertyEvent.propertyValue) ? 120 : propertyEvent.propertyValue) as number
      }

    } else if (propertyEvent.propertyName === 'field') {

      // 更新扩展属性
      lf.setProperties(nodeId, {
        field: JSON.stringify(propertyEvent.propertyValue)
      })

    } else {

      // 更新基础属性
      lf.setProperties(nodeId, {
        [propertyEvent.propertyName]: propertyEvent.propertyValue
      })

    }


  } else if (propertyEvent.type === NodeTypeEnum.transition) {

    // 边属性
    const edgeId = unref(currentOpId)
    if (propertyEvent.propertyName === 'name') {

      // 更新唯一标识
      if (!lf.getEdgeModelById(propertyEvent.propertyValue)) {
        lf.changeEdgeId(edgeId, propertyEvent.propertyValue)
        currentOpId.value = propertyEvent.propertyValue
      }

    } else if (propertyEvent.propertyName === 'displayName') {

      // 更新节点文本值
      lf.updateText(edgeId, propertyEvent.propertyValue)

    } else {

      // 更新基础属性
      lf.setProperties(edgeId, {
        [propertyEvent.propertyName]: propertyEvent.propertyValue
      })

    }
  }

  emits('change', getGraphData())

}

/**
 * 获取流程数据
 */
const getGraphData = () => {
  const lf = unref(lfInstance)
  if (!lf) return {}
  return lf.getGraphData()
}

/**
 * 处理导入提交事件
 */
const handleImportSubmit = (str: string) => {

  let data: any = null
  try {
    data = JSON.parse(str)
  } catch {
    try {
      data = xml2LogicFlowJson(str)
    } catch {
      return
    }
  }
  if (data && data.nodes && data.edges) {
    reRender(data)
  }
}

// 导入json
const importJson = (data: any) => {
  reRender(data)
}

// 导入xml
const importXml = (xml: any) => {
  reRender(xml)
}

// 刷新导入下拉数据
const refreshImport = () => {
  return unref(importDataRef)?.refresh()
}

// 导入高亮数据
const handleHighLightSubmit = (jsonStr: string) => {

  let data: any = null
  try {
    data = JSON.parse(jsonStr)
  } catch {
  }
  setHighLight(data)
}

/**
 * 设置高亮数据
 * @param data { "historyNodeNames": [], "historyEdgeNames": [], "activeNodeNames": []}
*/
const setHighLight = (data: any) => {

  const lf = unref(lfInstance)
  if (!lf) return

  // 设置历史节点
  if (data && data.historyNodeNames) {
    data.historyNodeNames.forEach((nodeName: string) => {
      lf.setProperties(nodeName, { state: 'history' })
    })
  }

  // 设置当前节点
  if (data && data.activeNodeNames) {
    data.activeNodeNames.forEach((nodeName: string) => {
      lf.setProperties(nodeName, { state: 'active' })
    })
  }

  // 设置历史边
  if (data && data.historyEdgeNames) {
    data.historyEdgeNames.forEach((edgeName: string) => {
      const edgeModel = lf.getEdgeModelById(edgeName)
      if (edgeModel) {
        edgeModel.setProperties({ state: 'history' })
      }
    })
  }
}

// 设置节点参与人文本
const setAssigneeText = (data: any, kvConfig = { valueKey: 'value', labelKey: 'label' }) => {

  const lf = unref(lfInstance)
  if (!lf || !data) return
  if (Array.isArray(data)) {

    data.forEach((item: any) => {
      lf.setProperties(item[kvConfig.valueKey], { assigneeText: item[kvConfig.labelKey] })
    })

  } else {

    Object.keys(data).forEach(key => {
      lf.setProperties(key, { assigneeText: data[key] })
    })

  }
}

onMounted(init)

// 导出提供给外部操作-$refs.xxx
defineExpose({
  getGraphData,
  refreshImport,
  importJson,
  importXml,
  setHighLight,
  setAssigneeText,
  getLfInstance: () => lfInstance.value,
  handleImportSubmit,
})

interface Define {
  id: number | undefined,
  name: string,
  displayName: string,
  content: string,
}


</script>

<style scoped>
.ala-flow-designer {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
<style>
.lf-dnd-shape {
  width: 32px;
  height: 32px;
  background-size: cover;
}

.lf-dnd-item {
  margin-bottom: 12px;
  padding: 0px 8px;
}

.lf-node:hover {
  cursor: pointer;
}

.lf-control-see {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1NjgyNDM0MzQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDE3MS4yODM2OTJjLTI1NS4wNTQ3NjkgMC00ODUuOTI3Mzg1IDMxMi40MzgxNTQtNDk2Ljc5NzUzOCAzMjcuMzI1NTM4bDAgMC42MzAxNTRDMjYuMDcyNjE1IDUxNC4xMjY3NjkgMjU2Ljk0NTIzMSA4MjYuNDg2MTU0IDUxMiA4MjYuNDg2MTU0YzI1NS4wMTUzODUgMCA0ODUuODg4LTMxMi4zOTg3NjkgNDk2Ljc5NzUzOC0zMjcuMzI1NTM4bDAtMC42MzAxNTRDOTk3LjkyNzM4NSA0ODMuNjgyNDYyIDc2Ny4wMTUzODUgMTcxLjI4MzY5MiA1MTIgMTcxLjI4MzY5Mkw1MTIgMTcxLjI4MzY5MnpNNTEyIDI5MS4yMDk4NDZjMTE0LjU2OTg0NiAwIDIwNy43NTM4NDYgOTMuMTA1MjMxIDIwNy43NTM4NDYgMjA3LjY3NTA3N1M2MjYuNTY5ODQ2IDcwNi42Mzg3NjkgNTEyIDcwNi42Mzg3NjljLTExNC41MzA0NjIgMC0yMDcuNzUzODQ2LTkzLjE4NC0yMDcuNzUzODQ2LTIwNy43NTM4NDZTMzk3LjQ2OTUzOCAyOTEuMjA5ODQ2IDUxMiAyOTEuMjA5ODQ2TTUxMiAzOTUuMjI0NjE1Yy01Ny4yNjUyMzEgMC0xMDMuNjYwMzA4IDQ2LjQzNDQ2Mi0xMDMuNjYwMzA4IDEwMy42NjAzMDhzNDYuMzk1MDc3IDEwMy42NjAzMDggMTAzLjY2MDMwOCAxMDMuNjYwMzA4YzU3LjIyNTg0NiAwIDEwMy42MjA5MjMtNDYuNDM0NDYyIDEwMy42MjA5MjMtMTAzLjY2MDMwOFM1NjkuMjI1ODQ2IDM5NS4yMjQ2MTUgNTEyIDM5NS4yMjQ2MTV6IiBwLWlkPSIxMzc5Ij48L3BhdGg+PC9zdmc+');
}

.lf-control-import {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1NjgyODQ5ODQ3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxODMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODg4LjMgNzU3LjRoLTUzLjhjLTQuMiAwLTcuNyAzLjUtNy43IDcuN3Y2MS44SDE5Ny4xVjE5Ny4xaDYyOS44djYxLjhjMCA0LjIgMy41IDcuNyA3LjcgNy43aDUzLjhjNC4yIDAgNy43LTMuNCA3LjctNy43VjE1OC43YzAtMTctMTMuNy0zMC43LTMwLjctMzAuN0gxNTguN2MtMTcgMC0zMC43IDEzLjctMzAuNyAzMC43djcwNi42YzAgMTcgMTMuNyAzMC43IDMwLjcgMzAuN2g3MDYuNmMxNyAwIDMwLjctMTMuNyAzMC43LTMwLjdWNzY1LjFjMC00LjMtMy41LTcuNy03LjctNy43eiIgcC1pZD0iMjE4NCI+PC9wYXRoPjxwYXRoIGQ9Ik05MDIgNDc2SDU4OHYtNzZjMC02LjctNy44LTEwLjUtMTMtNi4zbC0xNDEuOSAxMTJjLTQuMSAzLjItNC4xIDkuNCAwIDEyLjZsMTQxLjkgMTEyYzUuMyA0LjIgMTMgMC40IDEzLTYuM3YtNzZoMzE0YzQuNCAwIDgtMy42IDgtOHYtNTZjMC00LjQtMy42LTgtOC04eiIgcC1pZD0iMjE4NSI+PC9wYXRoPjwvc3ZnPg==');
}

.lf-control-clear {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1Nzg5MTYyODczIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODk5LjEgODY5LjZsLTUzLTMwNS42SDg2NGMxNC40IDAgMjYtMTEuNiAyNi0yNlYzNDZjMC0xNC40LTExLjYtMjYtMjYtMjZINjE4VjEzOGMwLTE0LjQtMTEuNi0yNi0yNi0yNkg0MzJjLTE0LjQgMC0yNiAxMS42LTI2IDI2djE4MkgxNjBjLTE0LjQgMC0yNiAxMS42LTI2IDI2djE5MmMwIDE0LjQgMTEuNiAyNiAyNiAyNmgxNy45bC01MyAzMDUuNmMtMC4zIDEuNS0wLjQgMy0wLjQgNC40IDAgMTQuNCAxMS42IDI2IDI2IDI2aDcyM2MxLjUgMCAzLTAuMSA0LjQtMC40IDE0LjItMi40IDIzLjctMTUuOSAyMS4yLTMwek0yMDQgMzkwaDI3MlYxODJoNzJ2MjA4aDI3MnYxMDRIMjA0VjM5MHogbTQ2OCA0NDBWNjc0YzAtNC40LTMuNi04LTgtOGgtNDhjLTQuNCAwLTggMy42LTggOHYxNTZINDE2VjY3NGMwLTQuNC0zLjYtOC04LThoLTQ4Yy00LjQgMC04IDMuNi04IDh2MTU2SDIwMi44bDQ1LjEtMjYwSDc3Nmw0NS4xIDI2MEg2NzJ6IiBwLWlkPSIyMDQ3Ij48L3BhdGg+PC9zdmc+');
}

.lf-control-save {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1Nzg5MTgwOTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDI2LjY2NjY2NyAxMjhoLTE0OS4zMzMzMzR2MjM0LjQ1MzMzM2MwIDEyLjA3NDY2NyA5LjQ1MDY2NyAyMS41NDY2NjcgMjEuMjA1MzM0IDIxLjU0NjY2N2gyOTguOTIyNjY2YzExLjYyNjY2NyAwIDIxLjIwNTMzMy05LjYgMjEuMjA1MzM0LTIxLjU0NjY2N1YxMjhoLTY0djE0OS41MDRjMCAyMy40NjY2NjctMTkuMTU3MzMzIDQyLjQ5Ni00Mi42MjQgNDIuNDk2aC00Mi43NTJBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA0MjYuNjY2NjY3IDI3Ny41MDRWMTI4ek0xOTIgODk2VjY2MS41NDY2NjdDMTkyIDYwMi40NzQ2NjcgMjM5Ljc4NjY2NyA1NTQuNjY2NjY3IDI5OC44MzczMzMgNTU0LjY2NjY2N2g0MjYuMzI1MzM0QTEwNi43MDkzMzMgMTA2LjcwOTMzMyAwIDAgMSA4MzIgNjYxLjU0NjY2N1Y4OTZoNDIuNTE3MzMzQTIxLjMxMiAyMS4zMTIgMCAwIDAgODk2IDg3NC43NTJWMjczLjY2NEw3NTAuMzM2IDEyOEg3MDR2MjM0LjQ1MzMzM2MwIDU4Ljk2NTMzMy00Ny43MDEzMzMgMTA2Ljg4LTEwNi41Mzg2NjcgMTA2Ljg4SDI5OC41Mzg2NjdBMTA2LjU2IDEwNi41NiAwIDAgMSAxOTIgMzYyLjQ1MzMzM1YxMjhIMTQ5LjI0OEEyMS4yNjkzMzMgMjEuMjY5MzMzIDAgMCAwIDEyOCAxNDkuNDgyNjY3djcyNS4wMzQ2NjZDMTI4IDg4Ni40MjEzMzMgMTM3LjU3ODY2NyA4OTYgMTQ5LjQ4MjY2NyA4OTZIMTkyek00Mi42NjY2NjcgMTQ5LjQ4MjY2N0ExMDYuNjAyNjY3IDEwNi42MDI2NjcgMCAwIDEgMTQ5LjI0OCA0Mi42NjY2NjdINzY4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgMzAuMTY1MzMzIDEyLjUwMTMzM2wxNzAuNjY2NjY3IDE3MC42NjY2NjdBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA5ODEuMzMzMzMzIDI1NnY2MTguNzUyQTEwNi42NDUzMzMgMTA2LjY0NTMzMyAwIDAgMSA4NzQuNTE3MzMzIDk4MS4zMzMzMzNIMTQ5LjQ4MjY2N0ExMDYuNzUyIDEwNi43NTIgMCAwIDEgNDIuNjY2NjY3IDg3NC41MTczMzNWMTQ5LjQ4MjY2N3ogbTcwNCA1MTIuMDQyNjY2YzAtMTIuMDEwNjY3LTkuNTM2LTIxLjUyNTMzMy0yMS41MDQtMjEuNTI1MzMzSDI5OC44MzczMzNDMjg2LjkzMzMzMyA2NDAgMjc3LjMzMzMzMyA2NDkuNiAyNzcuMzMzMzMzIDY2MS41NDY2NjdWODk2aDQ2OS4zMzMzMzRWNjYxLjU0NjY2N3oiIGZpbGw9IiMwMDAwMDAiIHAtaWQ9IjI4NDQiPjwvcGF0aD48L3N2Zz4=');
}

.lf-control-mayu {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAVtJREFUOE+tVUFywjAMlKDPIINp+gnf4CUlLyF9SfuT0pM/0ZR0wjNg1JEdGzuRDYf6iOLV7motEArHKKVs+bJ4BcRfIOz1+ftYuoNS0axetoB0AICtUO/tb4SNBD4DNKvnAyC2JRahRtTq889b/G0CaKr6M8OqhN/rodv4DwKgqep3ANhPbrK8kmf++w89dA3ftYCjZ8zOnz7nUdwwUUS4Y08dYFWfAMBN1Blui6FZTjASq/L3rHQPSDE778msUXlSDtBUNfvAnfw56qHbTWxwUZmfm6pR2UOAeujkvE5TQdSikLspwyQW2aG4QoPChO9KjjxOc7u8btC+1+uSp1zyMCYWGE+Hxtb4KcedLMNcZEKc5kRsuKVgB8BcSkZVnIzb8oiD7dgkS6G4ooT3nj49C+gkpF3LQfZVeTkEULdM/2d9+ZYPsM0uD/EFJMCXJwVICojWAIuve38BfxdTzW7ahNZAAAAAAElFTkSuQmCC');
}

.lf-control-join {
  width: 70px;
  height: 55px;
  background-repeat: no-repeat;
  background-size: 35px 30px;
  background-position: center;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAOVJREFUOE/lkkESgjAMRZPxIrhz1EPAUTiFZQWu0FPITeQQlnFnbxINU5iQmVKZYQc72v6X5P8grPzhyjzYKvBQU7JD+Cg/HSE03QWvS3zuPfTAUglT/keC/FVgq6Gs4bN3gU7eBUMRXTtrcK+Bpxs9ASDRBWdTPt6pRILqJ2yswVxCZUEJnQV60YM7Cfg4nLsBGt1DPxr7OfHKFxgLWYM966+RCaHSaZ9rSgmBfeTgsiG4IFAIWmswC4SSStikQx+A9IrH5BTH6joUvTIjMLDYQAR5V2CzeLGXCGJvoynHAPp+g8AvqvthFal5qd4AAAAASUVORK5CYII=');
}

.lf-control-fork {
  width: 70px;
  height: 55px;
  background-repeat: no-repeat;
  background-size: 35px 30px;
  background-position: center;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ2NDc3ODk0MjQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3MDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjk4LjQgNjI5LjI4TDgwNS4zMjggNzM2SDYwOS43NmMtNDYuOTQ0IDAtNzkuODI0LTIxLjA0LTEwNi42MjQtNjguOTEyLTIwLjE2LTM1Ljk4NC03My4zMjgtMTIyLjQ5Ni05OC4wOC0xNjIuNjg4IDI0Ljc1Mi00MC4xNzYgNzcuOTItMTI3LjA0IDk4LjA4LTE2My4wMDhDNTI5LjkyIDI5My41MzYgNTYyLjgxNiAyNzIgNjA5Ljc2IDI3MmgxOTUuODA4bC0xMDcuMTg0IDEwNy40NCA1Ni41NzYgNTYuNjg4IDIwMy42NDgtMjAzLjU4NEw3NTQuOTYgMjguOTZsLTU2LjU3NiA1Ni4zMkw4MDUuMzQ0IDE5Mkg2MDkuNzZjLTc2LjE0NCAwLTEzNS41MDQgMzcuMDI0LTE3Ni40MzIgMTEwLjA4LTE5LjQ3MiAzNC44LTczLjYxNiAxMjkuOTItOTcuNiAxNjEuOTJINDguMjA4bC0wLjE0NCA4MGgyODcuNjMyYzI0IDMyIDc4LjE0NCAxMjcuMTA0IDk3LjYzMiAxNjEuOTJDNDc0LjI0IDc3OC45NiA1MzMuNiA4MTYgNjA5Ljc2IDgxNmgxOTUuODA4bC0xMDcuMTg0IDEwNy40NCA1Ni41NzYgNTYuNjg4IDIwMy42NDgtMjAzLjU4NC0yMDMuNjQ4LTIwMy43MjgtNTYuNTc2IDU2LjQ4eiIgZmlsbD0iIzFCN0ZGRiIgcC1pZD0iMjcwMiI+PC9wYXRoPjwvc3ZnPg==');
}

.lf-control-setting {
  width: 70px;
  height: 55px;
  background-repeat: no-repeat;
  background-size: 35px 30px;
  background-position: center;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ5MDcyOTQyMTY5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5MzQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5AZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGZlZWRiYWNrLWljb25mb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZjI/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmMiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUudHRmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgidHJ1ZXR5cGUiKTsgfQo8L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTY3LjEgNDI2LjZsNTAuOS02Ny41Yy0xMC42LTM1LjYtMjQuNy02OS42LTQyLjItMTAxLjdsLTgzLjctMTEuOEM4MzEgMjM3LjEgNzgyLjkgMTg5IDc3NC4zIDEyNy44bC0xMS44LTgzLjdjLTMyLTE3LjQtNjYuMS0zMS42LTEwMS43LTQyLjJsLTY3LjUgNTAuOWMtMjQuNyAxOC42LTU0IDI3LjktODMuNCAyNy45cy01OC43LTkuMy04My40LTI3LjlMMzU5LjEgMmMtMzUuNiAxMC42LTY5LjYgMjQuNy0xMDEuNyA0Mi4ybC0xMS44IDgzLjdDMjM3LjEgMTg5IDE4OSAyMzcuMSAxMjcuOCAyNDUuN2wtODMuNyAxMS44Yy0xNy40IDMyLTMxLjYgNjYuMS00Mi4yIDEwMS43bDUwLjkgNjcuNUM5MCA0NzYgOTAgNTQ0IDUyLjkgNTkzLjRMMiA2NjAuOWMxMC42IDM1LjYgMjQuNyA2OS42IDQyLjIgMTAxLjdsODMuNyAxMS44YzYxLjIgOC42IDEwOS4zIDU2LjcgMTE3LjkgMTE3LjlsMTEuOCA4My43YzMyIDE3LjQgNjYuMSAzMS42IDEwMS43IDQyLjJsNjcuNS01MC45YzI0LjctMTguNiA1NC0yNy45IDgzLjQtMjcuOXM1OC43IDkuMyA4My40IDI3LjlsNjcuNSA1MC45YzM1LjYtMTAuNiA2OS42LTI0LjcgMTAxLjctNDIuMmwxMS44LTgzLjdjOC42LTYxLjIgNTYuNy0xMDkuMyAxMTcuOS0xMTcuOWw4My43LTExLjhjMTcuNC0zMiAzMS42LTY2LjEgNDIuMi0xMDEuN2wtNTAuOS02Ny41QzkzMCA1NDQgOTMwIDQ3NiA5NjcuMSA0MjYuNnpNNTExLjUgNzEwQzQwMS45IDcxMCAzMTMgNjIxLjEgMzEzIDUxMS41UzQwMS45IDMxMyA1MTEuNSAzMTMgNzEwIDQwMS45IDcxMCA1MTEuNSA2MjEuMSA3MTAgNTExLjUgNzEweiIgcC1pZD0iNDkzNSI+PC9wYXRoPjwvc3ZnPg==');
}

.lf-control-item {
  padding: 14px 10px 8px 10px;
}

.lf-control-item i {
  width: 16px;
  height: 16px;
}
</style>
