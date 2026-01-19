<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 11:19:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/childTableCount/ala-child-table-count.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-child-table-count-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName" class="minHeight">
            <!-- <span :class="clasz">{{ label }}</span> -->
            <template #label>
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <div class="ala-child-table-count-item">
                <i :style="styles">10</i> 条
            </div>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { PropType } from 'vue';

// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    },
    colors: {
        type: Array<string>,
    },
    backgroundNum: {
        type: String,
    },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: [String, Number, Boolean, undefined] as PropType<string | number | boolean | undefined>
})

logger.info(`bType[ $bType ],ala-child-table-count组件被渲染, props :`, props);


const styles = computed(() => {
    const styles: { [key: string]: any } = { fontWeight: 'bold' }
    styles['color'] = props.colors?.[0]
    return styles
})

</script>

<style scoped lang="scss">
.ala-child-table-count-wrapper {

    .ala-child-table-count-group {
        display: inline-flex;
        gap: 16px;
        min-height: 32px;

        .ala-child-table-count-item {
            height: inherit;
        }

        :deep(.el-radio) {
            display: inline-flex;
            align-items: center;
        }
    }

    .label-left {
        display: inline-block;
    }

    .label-top {
        display: block;
    }

}
</style>