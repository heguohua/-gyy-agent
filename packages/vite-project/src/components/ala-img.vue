<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 10:20:32
 * @FilePath: /low-coding/packages/vite-project/src/components/ala-img.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<script setup lang="ts">

defineProps<{ src: string }>()

</script>

<template>
  <div>
    <h2>这是一幅图片，标题颜色是红色</h2>
  </div>
  <img :src="src" class="ala-img" />

</template>

<style scoped lang="scss">
div{
  h2{
    color: red
  }
}

img{
  width: 200px;
  height: 100px;
  background: #ff00001a;
  padding: 50px;
}
</style>
