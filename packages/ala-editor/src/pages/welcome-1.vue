<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 22:32:55
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 21:04:30
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
          <div class="ala-card-image" :style="{ background: item.backgroundColor }">
            <img :src="getImageSrc(item.imageSrc)" />
          </div>
          <p class="title">
            {{ item.title }}
          </p>
        </div>

        <div class="remark">
          {{ item.num }}
        </div>
        <hr class="line" />
        <div class="add">
          <p class="week">本周新增：<i :style="{ color: '#409eff', fontWeight: 500 }">{{ item.weekNum }}</i>
          </p>
          <p class="today">今日新增：<i :style="{ color: '#409eff', fontWeight: 500 }">{{ item.dayNum }}</i></p>
        </div>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import colors from '@/utils/colors';

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
    imageSrc: 'leave.svg',
    title: '待办任务总数',
    num: 99,
    backgroundColor: colors.warning,
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: 'leave.svg',
    title: '超时任务总数',
    num: 99,
    backgroundColor: colors.warning,
    weekNum: 20,
    dayNum: 5,
  },
  {
    imageSrc: 'leave.svg',
    title: '驳回任务总数',
    num: 99,
    backgroundColor: colors.warning,
    weekNum: 20,
    dayNum: 5,
  },
]

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
    width: 300px;
    display: inline-block;
    padding: 20px 30px;
    background: #ffffff;
    border-radius: 8px;
    transition: box-shadow 0.3s ease-in-out;

    .ala-card-title {
      display: flex;
      column-gap: 8px;


      .ala-card-image {
        display: inline-flex;
        width: 36px;
        height: 36px;
        border-radius: 16px;
        align-items: center;
        justify-items: center;
        justify-content: center;


        img {
          width: 22px;
          height: 22px;
        }

        &:hover {
          /* 放大 0.1 倍 */
          transform: scale(1.1);
        }
      }

      .title {
        color: #373737;
        font-size: 1rem;
      }
    }


    &:hover {
      box-shadow:
        0 0 14px 4px rgb(249, 249, 249),
    }

    .line {
      border-color: rgba(239, 239, 239, 0.4);
    }

    .add {
      font-size: 0.9rem;
      color: #A2A2A2;
      display: flex;
      align-items: center;
      justify-items: center;
      column-gap: 16px;

      .week {
        display: inline-block;
        flex: 1;
        text-align: left;

        i {
          font-size: 1.1rem;
        }
      }

      .today {
        display: inline-block;
        flex: 1;
        text-align: right;

        i {
          font-size: 1.1rem;
        }
      }
    }



    .remark {
      font-size: 1.8rem;
      color: var(--el-menu-text-color);
      font-weight: bold;
      left: -22px;
      position: relative;
      line-height: 2rem;

    }


  }
}
</style>