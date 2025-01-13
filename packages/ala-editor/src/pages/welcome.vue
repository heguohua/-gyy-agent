<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 22:32:55
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 18:14:53
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/welcome.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-welcome">
    <div v-for="(item, index) in data" :key="index">
      <CardInfo :imageSrc="item.imageSrc" :imageWidth="imageWidth" :imageHeight="imageHeight" :title="item.title"
        :value="item.num" :backgroundColor="item.backgroundColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardInfo from '@/components/charts/card/card-info.vue';
import colors from '@/utils/colors';
import { ref } from 'vue'

const imageWidth = 28
const imageHeight = 28
const data = [
  {
    imageSrc: 'leave.svg',
    title: '流程总数',
    num: 99,
    backgroundColor: colors.primary,
  },
  {
    imageSrc: 'leave.svg',
    title: '异常流程',
    num: 99,
    backgroundColor: colors.danger,
  },
  {
    imageSrc: 'leave.svg',
    title: '超时流程',
    num: 99,
    backgroundColor: colors.warning,
  },
  {
    imageSrc: 'leave.svg',
    title: '运行中流程',
    num: 99,
    backgroundColor: colors.warning,
  },
  {
    imageSrc: 'leave.svg',
    title: '待办任务总数',
    num: 99,
    backgroundColor: colors.warning,
  },
  {
    imageSrc: 'leave.svg',
    title: '超时任务数',
    num: 99,
    backgroundColor: colors.warning,
  },
]

</script>

<style scoped lang="scss">
.ala-welcome {
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 16px;
  padding: 16px;
  flex-wrap: wrap;
}
</style>