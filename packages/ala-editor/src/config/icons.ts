import { todo } from "node:test"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:44:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-17 10:42:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/icons.ts
 * @Description: 应用使用的所有 ICON 图标文件
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
const icon = {
  // 基础组件图标
  row: 'fluent:layout-row-two-16-regular',
  column: 'fluent:layout-column-two-split-right-16-regular',
  image: 'fluent:image-16-regular',
  video: 'fluent:video-clip-multiple-16-regular',
  text: 'fluent:text-bullet-list-square-edit-24-regular',
  swiper: 'fluent:app-recent-24-regular',
  blank: 'fluent:border-none-20-filled',
  canvas: 'fluent:draw-image-24-regular',

  // 平台图标
  allViewport: 'fluent:phone-desktop-24-regular',
  desktop: 'fluent:desktop-mac-32-regular',
  mobile: 'fluent:phone-16-regular',
  preview: 'fluent:open-20-filled',
  question: 'fluent:question-circle-12-regular',
  tips: 'fluent:info-24-regular',
  publish: 'fluent:cloud-arrow-up-24-regular',
  search: 'fluent:search-12-regular',
  block: 'fluent:app-folder-16-regular',
  blockActive: 'fluent:app-folder-16-filled',
  kit: 'fluent:layer-24-regular',
  kitActive: 'fluent:layer-24-filled',
  home: 'fluent:home-20-regular',
  homeActive: 'fluent:home-20-filled',
  user: 'fluent:person-circle-20-regular',
  userActive: 'fluent:person-circle-24-filled',
  create: 'fluent:add-circle-24-filled',
  upload: 'fluent:arrow-upload-16-filled',
  expand: 'fluent:panel-right-expand-16-regular',
  close: 'fluent:panel-left-expand-16-regular',
  contract: 'clarity:contract-line',
  seal: 'tdesign:seal',
  copy: 'fluent:save-copy-24-regular',
  delete: 'fluent:delete-24-regular',
  minus: 'zondicons:minus-outline',
  drag: 'fluent:grid-dots-20-regular',
  dragBlank: 'fluent:breakout-room-20-regular',
  add: 'fluent:add-16-regular',
  subtract: 'fluent:subtract-16-regular',
  back: 'fluent:chevron-left-20-filled',
  save: 'fluent:document-save-20-regular',
  down: 'mingcute:arrows-down-line',
  up: 'mingcute:arrows-up-line',
  // 系统登录页面400电话图标
  phone: 'solar:phone-broken',
  country_cn: 'noto-v1:flag-for-flag-china',
  country_en: 'icon-park-outline:english',
  country_ru: 'lucide-lab:russian-ruble-square',

  //菜单图标
  log: 'icon-park-outline:log',
  dict: 'streamline:dictionary-language-book',
  menu: 'hugeicons:menu-square',
  alaUser: 'ri:user-add-line',
  organization: 'charm:organisation',
  dept: 'fluent:organization-20-regular',
  role: 'oui:app-users-roles',
  team: 'ri:team-line',
  sysConfig: 'icon-park-outline:setting-config',
  customer: 'ix:customer',
  order: 'carbon:order-details',
  workspace: 'carbon:workspace-import',
  leave: 'ri:timeline-view',
  bill: 'stash:billing-info-light',
  money: 'hugeicons:money-bag-02',
  suggestion: 'iconoir:suggestion',
  // 无代码中心
  code: 'mingcute:code-fill',
  example: 'fa6-solid:democrat',
  // 配置列表
  code_config: 'line-md:document-code',
  code_page: 'icon-park-outline:page',// 页面设计
  code_form: 'fluent:form-sparkle-20-regular',// 表单设计
  code_screen: 'streamline:screensaver-monitor-wallpaper',// 表单设计
  flow_define: 'hugeicons:flow',// 流程定义
  flow_design: 'f7:flowchart',// 流程设计
  flow_start: 'heroicons:arrow-right-start-on-rectangle-16-solid',// 发起流程
  mine_start: 'token:meed',// 发起流程
  mine_todo: 'ix:tasks-open',// 发起流程
  mine_done: 'grommet-icons:task',// 发起流程
  mine_copy: 'fluent:document-copy-24-regular',// 发起流程
  instance: 'simple-icons:processwire',// 流程实例
  task: 'hugeicons:task-edit-01',// 流程实例

  // IM中心
  im: 'uiw:message',// im中心
  chatGroup: 'flowbite:users-group-outline',// 聊天群

  // 文件中心
  file: 'fa-regular:file-word',// 
  file_center: 'famicons:document-attach-outline',// 

  // 文件中心
  ai_assist: 'tdesign:service',// 
  ai_center: 'prime:microchip-ai',// 

  // 文件中心
  todo: 'hugeicons:task-edit-01',// 
  my_todo: 'ix:tasks-done',// 
  oa_center: 'material-symbols:work-history-outline',// 


  // 数据分析
  chart: "memory:chart-bar",

  // 系统 logo
  logo: "blocks-scale",

  // form 设计器图标
  input: "streamline:input-box",
  textarea: "bi:textarea-resize",
  number: "tabler:pentagon-number-6",
  radio: "eva:radio-button-on-outline",
  checkbox: "tabler:checkbox",
  select: "fluent:multiselect-20-filled",
  switch: "line-md:switch-off-to-switch-transition",
  slider: "iconoir:control-slider",
  star: "lucide:star",
  calendar: "system-uicons:calendar-date",
  time: "mingcute:time-duration-line",
  f_user: "gravity-ui:person",
  f_dept: "ci:users",
  line_x: "pepicons-pop:line-x",
  chapter: "fluent:app-title-24-regular",
  help: "proicons:question-circle",
  // f_role: "fluent:person-passkey-24-filled",
  f_role: "fluent:person-wrench-20-filled",
  f_duty: "fluent:person-ribbon-16-filled",
  f_phone:"meteor-icons:mobile",
  f_location:"ep:location",
  // money:"ri:money-cny-circle-line",
  f_cny:"fa:cny",
  f_usd:"fa:usd",
  f_card:"ion:id-card-outline",
  f_address:"mdi:address-marker-outline",
  f_city:"fluent:city-16-regular",
  f_wechat:"hugeicons:wechat",
  f_cascader:"typcn:flow-children",
  f_table:"si:table-line",
  f_counter:"mdi:counter",

  // 客户中心
  m_customer:"garden:customer-lists-fill-26",
  contact:"hugeicons:contact-02",
  clue:"icon-park-outline:clue",
  business:"mdi:business-outline",
  m_order:"ic:round-border-color",
  finance:"icon-park-outline:finance",
  payment_collection:"hugeicons:cashier",
  payment_in:"hugeicons:payment-01",
  payment_return:"mdi:credit-card-refund-outline",
  invoice:"basil:invoice-outline",
  payment_apply:"stash:hand-holding-dollar",
  payment:"streamline-freehand:credit-card-payment",
  payment_receive:"hugeicons:money-receive-square",
  customer_service:"ri:customer-service-2-fill",
  business_plane:"uil:plane-fly",
  business_credit:"majesticons:creditcard-hand-line",
  business_call:"fluent:person-call-16-regular",
  business_log:"octicon:log-24",

  // 供应链中心
  s_shop:"mingcute:shopping-cart-2-line",
  s_factory:"gravity-ui:factory",
  s_exam:"ph:exam-bold",
  kpi:"carbon:summary-kpi",
  requirement:"carbon:requirement-usage",
  product:"ic:outline-production-quantity-limits",
  inventory:"material-symbols:inventory-2-outline-rounded",
  inbound:"hugeicons:store-add-02",
  outbound:"mdi:truck-subtract-outline",
  goods_return:"streamline:return-2-solid",
  goods_shopping:"streamline-freehand:mobile-shopping-cart",
  goods_quotation:"solar:tag-price-outline",
  goods_inquiry:"solar:user-hand-up-broken",
  contacts:"streamline-plump:contact-phonebook-remix",

  // 采购产品中心
  goods:"lsicon:goods-outline",

  // BI中心
  dataset:"material-symbols:dataset-linked-outline",
  database:"fluent:database-plug-connected-20-regular",
  dashboard:"clarity:dashboard-outline-badged",
  screen:"ic:round-screenshot-monitor",
  table:"material-symbols-light:table-outline-sharp",
  b_copy:"ph:copy-simple",
  b_text:"mingcute:text-line",
  
  // IoT中心
  iot:"eos-icons:iot",
  point:"carbon:temperature-hot",
  model:"file-icons:3d-model",
  driver:"ix:connector-hex",
  equipment:"carbon:iot-platform",
  iotData:"carbon:data-reference",
  flag:"hugeicons:flag-01",
  flag_point:"solar:map-point-rotate-outline",
  info:"material-symbols:page-info-outline",
  iot_point:"icon-park-outline:setting-config",

  // 物流配送中心
  truck:"hugeicons:delivery-truck-01",
  enterprise:"carbon:enterprise",
  service:"streamline-freehand:security-it-service",
  survey:"wpf:survey",
  price:"solar:tag-price-outline",
  commission:"fluent-mdl2:commitments",
  commission_detail:"majesticons:checkbox-list-detail",
  commission_delivery:"iconamoon:delivery-fast",
  commission_calculator:"solar:calculator-linear",

  
  // 仓储中心
  logistics:"lsicon:management-stockout-filled",
  prediction:"material-symbols:batch-prediction-outline",
  tracking:"hugeicons:delivery-tracking-02",
  quality_testing:"fluent-mdl2:test-impact-solid",
  take_goods:"tdesign:undertake-transaction",
  good_outbound:"icon-park-outline:outbound",
  good_inbound:"fluent:picture-in-picture-exit-24-regular",
  package:"mingcute:package-line",
  good_inventory:"lsicon:inventory-filled",
  good_check:"icon-park-outline:check-in",
  good_win_loss:"carbon:chart-win-loss",
  alert:"fluent:alert-urgent-24-regular",

  // 基础数据
  basic_data:"uil:database-alt",
  no:"tabler:number",

  

}

export default icon

export type ConfigIcon = keyof typeof icon
