<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-14 15:55:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/button/ala-button.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <el-button :size="size" :type="buttonType" @click="handleClick" v-if="displayButton()">
    {{ $t('buttons.' + name) }}
  </el-button>
</template>

<script setup lang="ts">

// State
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: "small",
  },
  buttonType: {
    type: String,
    default: null,
  },
  showButton: {
    type: Boolean,
    default: false,
  }
})

const displayButton = () => {
  return props.showButton;
}

const emit = defineEmits()

const handleClick = () => {
  emit(props.name)
}

</script>

<style scoped lang="scss"></style>