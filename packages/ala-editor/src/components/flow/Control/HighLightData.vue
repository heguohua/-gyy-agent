<template>
  <el-dialog
          title="导入高亮数据(json)"
          v-model="dialogVisible"
          width="60%"
          @close="handleClose"
          class="m-dialog-high-light-data"
          :append-to-body="true">
    <div style="height:440px;overflow-y:scroll;">
    <el-input v-model="highLightStr" :rows="20" type="textarea"></el-input>
  </div>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineExpose, unref, defineEmits } from 'vue'
import { ElDialog, ElButton, ElMessage, ElInput } from 'element-plus'
const dialogVisible = ref(false)
const highLightStr = ref('')
// 定义外部事件
const emits = defineEmits(['on-submit'])
// 显示，由父组件调用
const show = () => {
  dialogVisible.value = true
}

// 处理确定按钮事件
const handleSubmit = () => {
  if (unref(highLightStr)) {
    emits('on-submit', unref(highLightStr))
    dialogVisible.value = false
  } else {
    ElMessage.error('导入数据不能为空')
  }
}
const handleClose = () => {
  dialogVisible.value = false
  highLightStr.value = ''
}
defineExpose({
  show
})
</script>
