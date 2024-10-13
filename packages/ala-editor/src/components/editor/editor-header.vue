<template>
  <div class="header">
    <div class="header-left">
      <div class="back" @click="back">
        <v-icon-tooltip content="返回" icon="back" />
        <div class="header-title">页面</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="header-right">
      <el-button @click="preview">
        <v-icon icon="preview" />
        预览
      </el-button>
      <el-button v-if="!packageId" type="primary" @click="submit">
        <v-icon icon="publish" />
        发布
      </el-button>
    </div>

  </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue';


const a = ref(1)
console.log(a)
console.log(a);
const b=reactive(3)
const c=reactive(9)
console.log(c);


</script>

<style scoped lang="scss"></style>