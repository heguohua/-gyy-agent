<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ src: string }>()

</script>

<template>
  
  <img :src="src" class="ala-img" />

</template>

<style scoped>
img{
  width: 200px;
  height: 100px;
  background: rgb(255, 0, 0,0.1);
  padding: 50px;
}
</style>
