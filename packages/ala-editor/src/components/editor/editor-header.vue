<template>
    <div class="header">
      <div class="header-left">
        <div class="back" @click="back">
          <v-icon-tooltip content="返回" icon="back" />
          <div class="header-title">页面</div>
        </div>
  
        <div class="line"></div>
  
        <v-select v-model="viewport" />
      </div>
      <div class="header-right">
        <el-button @click="submitPackage">
          <v-icon icon="save" />
          {{ packageId ? '更新' : '保存' }}套件
        </el-button>
        <el-button @click="preview">
          <v-icon icon="preview" />
          预览
        </el-button>
        <el-button v-if="!packageId" type="primary" @click="submit">
          <v-icon icon="publish" />
          发布
        </el-button>
      </div>
  
      <edit-header-confirm v-model="dialogFormVisible" prefix="页面" @create="create" />
      <edit-header-confirm v-model="packageDialogFormVisible" prefix="套件" @create="handlePackage" />
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 500;
    height: var(--edit-header-height);
    background: white;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .back {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 16px;
        flex-shrink: 0;
        .header-title {
          font-size: 14px;
          padding-left: 4px;
        }
      }
      .line {
        width: 1px;
        height: 20px;
        border-left: 1px solid var(--color-border);
        padding-right: 16px;
      }
    }
    .header-right {
      position: relative;
      padding-right: 16px;
    }
  }
  </style>
  