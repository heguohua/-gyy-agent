<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-01 21:33:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/button/ala-button-group.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <!-- <el-dropdown trigger="hover" @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="ellipsis">...</i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">按钮A</el-dropdown-item>
      <el-dropdown-item command="b">按钮B</el-dropdown-item>
      <el-dropdown-item command="c">按钮C</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->

  <el-dropdown>
    <span class="el-dropdown-link">
      ...
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">

interface Button {
  name: String,
  size: String,
  buttonType: String,
  showButton: Boolean,
}
// State
const props = defineProps({
  buttons: {
    type: Array<Button>,
    default: () => ([])
  }
})


const emit = defineEmits()

// const handleClick = () => {
//   emit(props.name)
// }

const handleCommand = (command: any) => {
  console.log('command:', command);

}

</script>

<style scoped lang="scss"></style>