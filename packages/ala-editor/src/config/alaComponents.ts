/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-18 16:11:31
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 08:59:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaComponents.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import AlaImage from '@/components/cps/image/ala-image.vue';
import AlaEmpty from '@/components/cps/empty/ala-empty.vue';
import AlaFile from '@/components/cps/file/ala-file.vue';
import AlaLink from '@/components/cps/link/ala-link.vue';
import AlaColumn from '@/components/cps/column/ala-column.vue';


// 注册表单组件
import AlaConfigInput from '@/components/cps/config/ala-config-input.vue';
import AlaConfigObject from '@/components/cps/config/ala-config-object.vue';
import AlaConfigItemProperty from '@/components/cps/config/ala-config-itemProperty.vue';
import AlaConfigFiles from '@/components/cps/config/ala-config-files.vue';
import AlaConfigTextarea from '@/components/cps/config/ala-config-textarea.vue';
import AlaConfigColumn from '@/components/cps/config/ala-config-column.vue';
import AlaConfigViewport from '@/components/cps/config/ala-config-viewport.vue';
import AlaConfigBaseTab from '@/components/cps/config/ala-config-base-tab.vue';
import AlaConfigKeyValue from '@/components/cps/config/ala-config-key-value.vue';
import AlaConfigNumber from '@/components/cps/config/ala-config-number.vue';
import AlaConfigBoolean from '@/components/cps/config/ala-config-boolean.vue';
import AlaConfigSelect from '@/components/cps/config/ala-config-select.vue';
import AlaConfigSelectApi from '@/components/cps/config/ala-config-select-api.vue';
import AlaConfigInt from '@/components/cps/config/ala-config-int.vue';
import AlaConfigRadio from '@/components/cps/config/ala-config-radio.vue';
import AlaConfigCheckbox from '@/components/cps/config/ala-config-checkbox.vue';
import AlaConfigFormRules from '@/components/cps/config/ala-config-form-rules.vue';
import AlaConfigTitle from '@/components/cps/config/ala-config-title.vue';
import AlaConfigColor from '@/components/cps/config/ala-config-color.vue';
import AlaConfigColors from '@/components/cps/config/ala-config-colors.vue';
import AlaConfigTextareaJson from '@/components/cps/config/ala-config-textarea-json.vue';
import AlaConfigCollapseItem from '@/components/cps/config/ala-config-collapse-item.vue';
import AlaConfigImage from '@/components/cps/config/ala-config-image.vue';

// form 表单组件
import AlaInput from '@/components/cps/input/ala-input.vue';
import AlaTextarea from '@/components/cps/textarea/ala-textarea.vue';
import AlaSlider from '@/components/cps/slider/ala-slider.vue';
import AlaPassword from '@/components/cps/password/ala-password.vue';
import AlaRadio from '@/components/cps/radio/ala-radio.vue';
import AlaCheckbox from '@/components/cps/checkbox/ala-checkbox.vue';
import AlaSelect from '@/components/cps/select/ala-select.vue';
import AlaSwitch from '@/components/cps/switch/ala-switch.vue';
import AlaDate from '@/components/cps/date/ala-date.vue';
import AlaDateRange from '@/components/cps/date-range/ala-date-range.vue';
import AlaRating from '@/components/cps/rating/ala-rating.vue';
import AlaCustomerizationComponentDemo from '@/components/cps/input/ala-customerization-component-demo.vue';
import AlaNumber from '@/components/cps/number/ala-number.vue';
import AlaHidden from '@/components/cps/hidden/ala-hidden.vue';
import AlaSelectApi from '@/components/cps/select-api/ala-select-api.vue';
import AlaSelectDict from '@/components/cps/select-dict/ala-select-dict.vue';
import AlaSelectTable from '@/components/cps/select-table/ala-select-table.vue';
import AlaSelectTree from '@/components/cps/select-tree/ala-select-tree.vue';
import AlaDivider from '@/components/cps/divider/ala-divider.vue';
import AlaChapter from '@/components/cps/chapter/ala-chapter.vue';
import AlaFormLabel from '@/components/cps/form-label/ala-form-label.vue';
import AlaCascader from '@/components/cps/cascader/ala-cascader.vue';
import AlaCascaderDict from '@/components/cps/cascader-dict/ala-cascader-dict.vue';
import AlaFormTable from '@/components/cps/form-table/ala-form-table.vue';
import AlaChildTableCount from '@/components/cps/childTableCount/ala-child-table-count.vue';
import AlaAi from '@/components/cps/ai/ala-ai.vue';
import AlaRelation from '@/components/cps/relation/ala-relation.vue';
import AlaRelationSubForm from '@/components/cps/relation/ala-relation-sub-form.vue';
import AlaSelectRelation from '@/components/cps/select-relation/ala-select-relation.vue';

// 列表、详情页字段渲染组件
import DetailInputColumn from '@/components/cps/dynamic/DetailInputColumn.vue';
import DetailDateColumn from '@/components/cps/dynamic/DetailDateColumn.vue';
import DetailSwitchColumn from '@/components/cps/dynamic/DetailSwitchColumn.vue';
import DetailSwitchImageColumn from '@/components/cps/dynamic/DetailSwitchImageColumn.vue';
import DetailXiaoshuColumn from '@/components/cps/dynamic/DetailXiaoshuColumn.vue';
import DetailNumberColumn from '@/components/cps/dynamic/DetailNumberColumn.vue';
import DetailRadioColumn from '@/components/cps/dynamic/DetailRadioColumn.vue';
import DetailRatingColumn from '@/components/cps/dynamic/DetailRatingColumn.vue';
import DetailSelectTableColumn from '@/components/cps/dynamic/DetailSelectTableColumn.vue';
import DetailSelectDictColumn from '@/components/cps/dynamic/DetailSelectDictColumn.vue';
import DetailSelectApiColumn from '@/components/cps/dynamic/DetailSelectApiColumn.vue';
import DetailSelectTreeColumn from '@/components/cps/dynamic/DetailSelectTreeColumn.vue';
import DetailSliderColumn from '@/components/cps/dynamic/DetailSliderColumn.vue';
import DetailSelectColumn from '@/components/cps/dynamic/DetailSelectColumn.vue';
import DetailCheckboxColumn from '@/components/cps/dynamic/DetailCheckboxColumn.vue';
import DetailTextareaColumn from '@/components/cps/dynamic/DetailTextareaColumn.vue';
import DetailDateRangeColumn from '@/components/cps/dynamic/DetailDateRangeColumn.vue';
import DetailChapterColumn from '@/components/cps/dynamic/DetailChapterColumn.vue';
import DetailDividerColumn from '@/components/cps/dynamic/DetailDividerColumn.vue';
import DetailTimelineColumn from '@/components/cps/dynamic/DetailTimelineColumn.vue';
import AlaDetail from '@/components/cps/form/ala-detail.vue';
import AlaDetailNoDrawer from '@/components/cps/form/ala-detail-no-drawer.vue';
import AlaDetailNoDrawerForms from '@/components/cps/form/ala-detail-no-drawer-forms.vue';
import AlaDetailNoDrawerTasks from '@/components/cps/form/ala-detail-no-drawer-tasks.vue';
import AlaDetailPage from '@/components/cps/form/ala-detail-page.vue';
import AlaDetailCard from '@/components/cps/form/ala-detail-card.vue';
import AlaDetailNoDrawerFormsHandle from '@/components/cps/form/ala-detail-no-drawer-forms-handle.vue';
import DetailImageColumn from '@/components/cps/dynamic/DetailImageColumn.vue';
import DetailTextColorColumn from '@/components/cps/dynamic/DetailTextColorColumn.vue';
import DetailCascaderColumn from '@/components/cps/dynamic/DetailCascaderColumn.vue';
import DetailFileColumn from '@/components/cps/dynamic/DetailFileColumn.vue';
import DetailFormTableColumn from '@/components/cps/dynamic/DetailFormTableColumn.vue';
import DetailChildTableCountColumn from '@/components/cps/dynamic/DetailChildTableCountColumn.vue';
import DetailFlowInstanceStateColumn from '@/components/cps/dynamic/DetailFlowInstanceStateColumn.vue';
import DetailVideoHLSColumn from '@/components/cps/dynamic/DetailVideoHLSColumn.vue';
import AlaDialog from '@/components/cps/dialog/ala-dialog.vue';

// 流程引擎相关组件
import ProcessDesign from '@/pages/process/processDesign.vue';
import ProcessPreview from '@/pages/process/processPreview.vue';


// IoT平台相关组件
import PointCard from '@/components/iot/pointCard.vue';


// 图表相关组件
import AlaLineChart from '@/components/charts/line-chart/ala-line-chart.vue';
import AlaMultiLineChart from '@/components/charts/line-chart/ala-multi-line-chart.vue';
import AlaBarChart from '@/components/charts/bar-chart/ala-bar-chart.vue';
import AlaCard1 from '@/components/charts/cards/ala-card-1.vue';


export default {
    AlaCustomerizationComponentDemo,

    // 页面组件
    AlaImage,
    AlaEmpty,
    AlaLink,
    AlaColumn,
    AlaFile,

    // editor-config 区域表单组件
    AlaConfigInput,
    AlaConfigObject,
    AlaConfigItemProperty,
    AlaConfigFiles,
    AlaConfigTextarea,
    AlaConfigColumn,
    AlaConfigViewport,
    AlaConfigBaseTab,
    AlaConfigKeyValue,
    AlaConfigNumber,
    AlaConfigBoolean,
    AlaConfigSelect,
    AlaConfigSelectApi,
    AlaConfigInt,
    AlaConfigRadio,
    AlaConfigCheckbox,
    AlaConfigFormRules,
    AlaConfigTitle,
    AlaConfigColor,
    AlaConfigColors,
    AlaConfigTextareaJson,
    AlaConfigCollapseItem,
    AlaConfigImage,


    // ALA架构表单组件
    AlaInput,
    AlaTextarea,
    AlaSlider,
    AlaPassword,
    AlaRadio,
    AlaCheckbox,
    AlaSelect,
    AlaSwitch,
    AlaDate,
    AlaDateRange,
    AlaRating,
    AlaNumber,
    AlaHidden,
    AlaSelectApi,
    AlaSelectDict,
    AlaSelectTable,
    AlaSelectTree,
    AlaDivider,
    AlaChapter,
    AlaFormLabel,
    AlaCascader,
    AlaCascaderDict,
    AlaFormTable,
    AlaChildTableCount,
    AlaAi,
    AlaRelation,
    AlaRelationSubForm,
    AlaSelectRelation,

    // ALA架构列表、详情组件
    DetailInputColumn,
    DetailDateColumn,
    DetailSwitchColumn,
    DetailSwitchImageColumn,
    DetailXiaoshuColumn,
    DetailNumberColumn,
    DetailRadioColumn,
    DetailRatingColumn,
    DetailSelectTableColumn,
    DetailSelectDictColumn,
    DetailSelectApiColumn,
    DetailSelectTreeColumn,
    DetailSliderColumn,
    DetailSelectColumn,
    DetailCheckboxColumn,
    DetailTextareaColumn,
    DetailDateRangeColumn,
    DetailChapterColumn,
    DetailDividerColumn,
    DetailTimelineColumn,
    AlaDetail,
    AlaDetailNoDrawer,
    AlaDetailNoDrawerForms,
    AlaDetailNoDrawerTasks,
    AlaDetailPage,
    AlaDetailCard,
    AlaDetailNoDrawerFormsHandle,
    DetailImageColumn,
    DetailTextColorColumn,
    DetailCascaderColumn,
    DetailFileColumn,
    DetailFormTableColumn,
    DetailChildTableCountColumn,
    DetailFlowInstanceStateColumn,
    DetailVideoHLSColumn,
    AlaDialog,

    // 流程引擎相关组件
    ProcessDesign,
    ProcessPreview,

    // 图标相关
    AlaLineChart,
    AlaMultiLineChart,
    AlaBarChart,
    AlaCard1,

    // IoT平台相关
    PointCard,

}


