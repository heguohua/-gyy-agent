<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:45:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 20:10:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/lowcoding/screen-design-editor.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-calendar">
        <AlaCalendar :show-month="true" :show-week="true" :show-day="true" />
    </div>
</template>



<script setup lang="ts">
import { queryLoveMessage } from '@/utils/tuwei';
import { logger } from '@/utils/logger';
import { useEditorStore } from '@/store/useEditorStore';
import { baseBlocks, seniorBlocks } from "@/config/blocks"
import { useI18n } from 'vue-i18n';
import LogicFlow from '@logicflow/core';
const { t } = useI18n();

import { ref } from 'vue'
const value = ref(new Date())
// State
const editorStore = useEditorStore()

// 初始化 LogicFlow

</script>

<style scoped lang="scss">
.ala-mind-map-editor {}
</style>