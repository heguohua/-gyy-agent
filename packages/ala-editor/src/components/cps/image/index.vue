<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-11 09:06:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 16:00:36
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/image/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
  <div>
    <h2>这是一幅图片，标题颜色是红色</h2>
  </div>
  <!-- <img :src="src" class="ala-img" /> -->

</template>
<script lang="ts">
// import { defineComponent } from 'vue'
// defineProps<{ src: string }>()

// export default defineComponent({
//   name: "ala-image",
//   props: {
//     src: String
//   },
//   data() {
//     return {
//       value: 111
//     }
//   },
//   mounted() {
//     console.warn('warn 111')
//   }
// })
import { defineComponent, ref, h } from 'vue'
const ProTable = defineComponent({
  name: 'ProTable',
  props: {
    title: String
  },
  setup(props) {
    const count = ref(0)
    console.log(props)
  
  }
})

export default { ProTable }


</script>

<style scoped lang="scss"></style>
