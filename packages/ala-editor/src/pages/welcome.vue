<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 22:32:55
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-07 19:15:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/welcome.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-welcome">
    <template v-for="(item, index) in data" :key="index">
      <!-- <CardInfo :imageSrc="item.imageSrc" :imageWidth="imageWidth" :imageHeight="imageHeight" :title="item.title"
        :value="item.num" :backgroundColor="item.backgroundColor" /> -->

      <div class="ala-card">

        <div class="ala-card-title">
          <p class="title">
            {{ item.title }}
          </p>
          <p class="remark">
            {{ item.num }}
          </p>
          <p class="week">本周新增：<i :style="{ color: '#409eff', fontWeight: 500 }">{{ item.weekNum }}</i></p>
        </div>

        <div class="ala-card-image"
          :style="{ background: item.backgroundColor, boxShadow: '0 0 10px 5px ' + item.backgroundColor }">
          <img :src="getImageSrc(item.imageSrc)" />
        </div>

      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import colors from '@/utils/colors';
import { get } from '@/utils/req';
import u from '@/utils/u';

const src = ''
const getImageSrc = (url: String) => {
  const imgSrc = url ? src + url : src + 'leave.svg'
  return imgSrc
}


const data = [
  {
    imageSrc: '/welcome/process.svg',
    title: '流程总数',
    num: 99,
    backgroundColor: '#ecf5ff',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/complete.svg',
    title: '已完成流程数',
    num: 99,
    backgroundColor: '#f0f9eb',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/running.svg',
    title: '运行中流程数',
    num: 99,
    backgroundColor: '#ecf5ff',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/timeout.svg',
    title: '超时流程数',
    num: 99,
    backgroundColor: '#fdf6ec',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/hang-up.svg',
    title: '挂起流程数',
    num: 99,
    backgroundColor: '#fdf6ec',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/error.svg',
    title: '驳回流程数',
    num: 99,
    backgroundColor: '#fef0f0',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/error.svg',
    title: '退回流程数',
    num: 99,
    backgroundColor: '#fef0f0',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/todo.svg',
    title: '待办任务总数',
    num: 99,
    backgroundColor: '#ecf5ff',
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: '/welcome/timeout-task.svg',
    title: '超时任务数',
    num: 99,
    backgroundColor: '#fdf6ec',
    weekNum: 20,
    dayNum: 5,
  },
]

// const url = '/p/instance/statistic'
// get(u.url(url || ''), '').then((response: any) => {
//   // console.log('response.data.data:', response.data);

// });
</script>

<style scoped lang="scss">
.ala-welcome {
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 16px;
  padding: 4px 0px;
  flex-wrap: wrap;

  .ala-card {
    width: 230px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    gap: 16px;
    background: #fff;
    padding: 20px 10px;
    border-radius: 8px;

    .ala-card-title {
      width: 130px;

      .title {
        font-size: 0.9rem;
        color: var(--el-text-color-regular);
        line-height: 0.9rem;
      }

      .remark {
        font-size: 1.6rem;
        font-weight: bold;
        line-height: 1.6rem;
        margin-top: 8px;
        margin-bottom: 12px;
        color: var(--el-menu-text-color);
      }

      .week {
        font-size: 0.9rem;
        color: rgb(61 68 110 / 80%);

        i {}
      }
    }

    .ala-card-image {
      width: 60px;
      border-radius: 30px;
      height: 60px;
      display: flex;
      justify-items: center;
      align-items: center;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
      }
    }
  }


}
</style>