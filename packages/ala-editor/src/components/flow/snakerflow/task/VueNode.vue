<template>
    <el-card style="height:calc(100% - 2px);">
      <template #header>
        <div class="card-header">
          <div class="card-header-title" :span="showHelp?20:24">
            <span>{{ text?.value }}</span>
          </div>
          <div class="card-header-icon" :span="4" v-if="showHelp">
            <el-icon style="float: right;cursor: pointer;" @click="handleClick"><QuestionFilled /></el-icon>
          </div>
        </div>
      </template>
      <div class="container">
        <div class="content-column">
          参与人：<a href="javascript:;" @click="handleArrowRightIconClick" :title="properties.assigneeText || properties.assignee">{{ properties.assigneeText || properties.assignee }}</a>
        </div>
        <div v-if="!viewer" class="icon-column" @click="handleArrowRightIconClick">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
    </el-card>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits, ref, PropType } from 'vue'
import { ElCard, ElIcon } from 'element-plus'
import { QuestionFilled, ArrowRight } from '@element-plus/icons-vue'
import { WfConfig } from '../../types'
import { ColorEnum } from '../../enums'
const props = defineProps({
  text: {
    type: [Object],
    default: () => ({})
  },
  properties: {
    type: Object,
    default: () => ({})
  },
  model: {
    type: Object,
    default: () => ({})
  },
  wfConfig: {
    type: Object as PropType<WfConfig>,
    default () {
      return {}
    }
  },
  viewer: { // 是否只读状态
    type: Boolean
  },
  showHelp: { // 是否显示帮助
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['helpClick'])
const cardHeaderBgColor = computed(() => {
  if (props.properties?.state === 'active') {
    return props.wfConfig.activeColor || ColorEnum.activeColor
  } else if (props.properties?.state === 'history') {
    return props.wfConfig.historyColor || ColorEnum.historyColor
  }
  return ColorEnum.primaryColor
})
const cardHeaderColor = ref('#ffffff')
const showHelp = computed(() => {
  return props.viewer && props.showHelp !== false
})
const handleClick = (e: Event) => {
  e.stopPropagation()
  emits('helpClick', {
    e: e,
    type: 'QuestionFilled',
    data: props.model
  })
}
const handleArrowRightIconClick = (e: Event) => {
  (e as any).arrowClick = true
}
</script>
<style scoped>
::v-deep .el-card__header {
  /* 你的样式 */
  background-color: v-bind('cardHeaderBgColor');
  padding: 0px;
  padding-left: 16px;
  font-size: 14px;
  text-align: left;
  line-height: 32px;
  color: v-bind('cardHeaderColor');
}
.card-header {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::v-deep .el-card__body {
  text-align: left;
  font-size: 12px;
  padding: 0px;
  padding-left: 16px;
  height: calc(100% - 32px)
}
.container {
  display: flex;
  align-items: center; /* 保持顶部对齐，避免挤压 */
  height: 100%;
}
.card-header-icon {
  width: 15px; /* 固定宽度 */
  height: 30px;
  flex-shrink: 0; /* 防止在空间不足时收缩 */
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 8px;
}

.card-header-title {
  flex-grow: 1; /* 自适应宽度，填充剩余空间 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-column {
  width: 15px; /* 固定宽度 */
  height: 30px;
  flex-shrink: 0; /* 防止在空间不足时收缩 */
  cursor: pointer;
  display: flex;
  align-items: center;
}

.content-column {
  flex-grow: 1; /* 自适应宽度，填充剩余空间 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-column a {
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 使用父元素的颜色，或者直接指定一个颜色，如 color: #000; */
  outline: none; /* 移除在一些浏览器中点击链接后出现的轮廓 */
  transition: color 0.3s ease; /* 可选：平滑过渡颜色变化 */
}
</style>
