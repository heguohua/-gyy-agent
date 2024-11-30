<template>
  <el-dialog
          title="查看流程数据"
          v-model="dialogVisible"
          width="60%"
          @opened="handleOpened"
          @close="handleClose"
          class="m-dialog-data-detail"
          :append-to-body="true">
    <div style="height: 60vh;overflow-y:scroll;">
      <el-tabs v-model="activeName">
      <el-tab-pane label="json" name="json">
        <vue-json-pretty :data="graphData.json"></vue-json-pretty>
      </el-tab-pane>
      <el-tab-pane label="xml" name="xml">
        <pre style="text-align:left;">{{xml}}</pre>
      </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <el-button type="primary" class="m-flow-btn-copy" :data-clipboard-text="copyJsonContent">复制JSON</el-button>
      <el-button type="primary" class="m-flow-btn-copy" :data-clipboard-text="xml">复制XML</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineExpose, computed, unref, onBeforeUnmount } from 'vue'
import { ElDialog, ElTabs, ElTabPane, ElMessage, ElButton } from 'element-plus'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import Clipboard from 'clipboard'
const dialogVisible = ref(false)
const activeName = ref('json')
const graphData = ref({} as any)
const clipboard = ref(null as any)
const xml = computed(() => {
  return unref(graphData)?.xml
})

const copyJsonContent = computed(() => {
  return JSON.stringify(unref(graphData)?.json, null, 2)
})
const show = (data: any) => {
  dialogVisible.value = true
  graphData.value = data
}
const handleOpened = () => {
  // 这里使用选择器，因为直接使用.m-flow-btn-copy复制会失效(原因示明)
  const copyEl = document.querySelectorAll('.m-flow-btn-copy')
  clipboard.value = new Clipboard(copyEl, {
    // 复制需要临时创建一个textarea文件，可以放在自定义的.m-dialog-data-detail内
    container: document.querySelector('.m-dialog-data-detail') as Element
  })
  clipboard.value.on('success', function (e: any) {
    ElMessage.success('复制成功')
    e.clearSelection()
  })
  clipboard.value.on('error', function () {
    ElMessage.error('复制失败')
  })
}
const handleClose = () => {
  if (clipboard.value) {
    clipboard.value.destroy()
  }
}
onBeforeUnmount(() => {
  if (clipboard.value) {
    clipboard.value.destroy()
  }
})
defineExpose({
  show
})
</script>
