<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-12 19:11:45
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 19:59:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/search-panel/search-panel.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-search-panel">
        <div class="ala-search-item" v-for="(item, index) in fields" :key="u.uuid()">
            <component :is="item.name" :label="item.label" :position="item.position" :placeholder="item.placeholder"
                v-bind="item.other" v-model="item.model.value" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { AlaField } from '@/config/fieldSchemas';
import u from '@/utils/u';
import AlaRating from '../rating/ala-rating.vue';


// State
const props = defineProps({
    fields: {
        type: Array<AlaField>,
        default: []
    }
})

// Methods

</script>

<style scoped lang="scss"></style>