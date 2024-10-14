<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <v-icon-tooltip content="返回" icon="back" />
        <div class="header-title">页面</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="header-right">
      <el-button>
        <v-icon icon="preview" />
        预览-{{ t('button') }}
      </el-button>
      <el-button type="primary">
        <v-icon icon="publish" />
        发布
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// console.log("t", t)
// console.log("t", t('button.yulan'))
</script>

<style scoped lang="scss"></style>