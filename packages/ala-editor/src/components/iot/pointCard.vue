<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-06 10:15:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-06 11:32:07
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/iot/pointCard.vue
 * @Description: 

 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-iot-point-card">
        <div class="title">
            <v-icon class="image" icon="help" width="20" height="20" />
        </div>
        {{ data }}

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const props = defineProps({
    data: {
        type: Object
    }
})

// Methods

</script>

<style scoped lang="scss">
.ala-iot-point-card {

    display: inline-flex;
    flex-wrap: wrap;
    width: 32%;
    margin-right: 1%;
    margin-bottom: 1%;
    // background:red;
    border: 1px solid #dcdfe6;
    padding: 8px;
    border-radius: 4px;

    .title {
        width: 99%;
        height: 40px;
        border-bottom: 1px solid #dcdfe6;
        align-items:center;
        display: flex;

        :deep(svg) {
            color: red;
        }


    }

}
</style>