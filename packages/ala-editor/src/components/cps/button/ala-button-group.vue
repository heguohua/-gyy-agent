<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-01 23:32:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/button/ala-button-group.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

  <el-dropdown class="ala-button-group">
    <span class="el-dropdown-link">
      ...
    </span>
    <template #dropdown>
      <el-dropdown-menu>

        <el-dropdown-item v-for="(item, index) in buttons" :key="u.uuid()">
          <AlaButton :showButton="true" :name="item.name" :handle="item.handle" :row="item.row"
            :buttonType="item.buttonType ? item.buttonType : 'primary'" :popConfirm="item.popConfirm" />
        </el-dropdown-item>

      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup lang="ts">
import u from '@/utils/u';

interface Button {
  name: String,
  buttonType?: String,
  popConfirm: Boolean,
  row: any,
  handle: Function,
}
// State
defineProps({
  buttons: {
    type: Array<Button>,
    default: () => ([])
  }
})


</script>

<style scoped lang="scss">
.ala-button-group {
  height: 100%;
  width: 30px;
  text-align: center;
  cursor: pointer;
  color: var(--el-color-primary);
  font-weight: bold;
  font-size: 1rem;

  .el-dropdown-link {
    width: 100%;
  }

}
</style>