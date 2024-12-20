<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:57:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-20 09:22:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/design.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <flow-designer ref='designerRef' v-model="flowData" @on-save="handleSave" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const flowData = ref({})
const handleSave = () => {

}
// Methods

</script>

<style scoped lang="scss"></style>