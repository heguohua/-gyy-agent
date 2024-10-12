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
