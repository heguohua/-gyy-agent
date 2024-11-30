<template>
  <el-dialog
          title="导入流程数据(同时支持xml/json)"
          v-model="dialogVisible"
          width="60%"
          @close="handleClose"
          class="m-dialog-import-data"
          :append-to-body="true">
    <div style="height:440px;overflow-y:scroll;">
    <el-input v-model="graphJsonStr" :rows="20" type="textarea"></el-input>
  </div>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-dropdown placement="top" trigger="click" style="float: left;" v-if="localStorageLfData.length" @command="handleCommand">
        <el-button link type="primary">选择<el-icon class="el-icon--right"><ArrowDown /></el-icon></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :key="item.value" v-for="item in localStorageLfData" :command="item.value">
              {{item.label}}&nbsp;&nbsp;
              <el-icon @click="handleRemove(item.value)"><RemoveFilled/></el-icon>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineExpose, computed, unref, defineEmits } from 'vue'
import { ElInput, ElDialog, ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon, ElMessage } from 'element-plus'
import { ArrowDown, RemoveFilled } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
const graphJsonStr = ref('')
// 定义外部事件
const emits = defineEmits(['on-submit'])
// 显示，由父组件调用
const show = () => {
  dialogVisible.value = true
}
const refreshFlag = ref(1)
// 本地保存数据
const localStorageLfData = computed<Array<any>>(() => {
  const res : any = []
  if (refreshFlag.value > 0) {
    Object.keys(window.localStorage).forEach(key => {
      if (key.startsWith('LFDATA###')) {
        const arr = key.split('###')
        res.push({
          value: key,
          label: arr[2]
        })
      }
    })
  }
  return res
})
// 处理确定按钮事件
const handleSubmit = () => {
  if (unref(graphJsonStr)) {
    emits('on-submit', unref(graphJsonStr))
    dialogVisible.value = false
  } else {
    ElMessage.error('导入数据不能为空')
  }
}
// 处理导入选项选中事件
const handleCommand = (key: string) => {
  graphJsonStr.value = window.localStorage.getItem(key) || ''
}
// 处理删除事件
const handleRemove = (key: string) => {
  window.localStorage.removeItem(key)
  refreshFlag.value++
}
const handleClose = () => {
  dialogVisible.value = false
  graphJsonStr.value = ''
}
/**
 * 刷新
 */
const refresh = () => {
  refreshFlag.value++
}
defineExpose({
  show,
  refresh
})
</script>
