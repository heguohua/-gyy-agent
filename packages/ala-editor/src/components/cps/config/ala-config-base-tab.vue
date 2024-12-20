<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-23 16:25:10
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-20 09:25:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-base-tab.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>
    <div class="config-base-tab">
        <div class="container">
            <div class="list">
                <div class="item" v-for="(item, index) in data" :key="bType + '-' + index"
                    :class="{ 'is-active': select === item.value }" @click="tabClick(item)">
                    <slot :item="item" :index="index"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ref, toRefs } from 'vue'

import { useEditorStore } from '@/store/useEditorStore';
const editorStore = useEditorStore()


const props = defineProps({
    data: {
        type: Array as () => Array<any>,
        default: () => []
    },
    bType: {
        type: String,
        default: 'page'
    }
})

// State
const bType = props.bType

const { data } = toRefs(props)

/**
 * 查找默认选中组件
 */
const defaultItem = props.data.find((item) => {
    if (item.default) {
        return item
    }
})
logger.info(`bType[ ${bType} ],config-base-tab组件,查找默认显示组件 item :`, defaultItem);
const select = ref(defaultItem ? defaultItem?.value : '')


const emit = defineEmits(["change"])

const tabClick = (item: any) => {
    select.value = item.value
    emit('change', item.value)
}

</script>

<style scoped lang="scss">
.config-base-tab {
    width: 100%;
    .container {
        width: inherit;
        padding: 0px 10%;
        background: var(--color-config-block-bg);
        border-radius: var(--border-radius);

        .list {
            display: flex;
            padding: 4px 2px;
            justify-content: space-between;

            .item {
                margin: 0 2px;
                justify-items: center;
                align-self: center;

                &.is-active {
                    :deep(.image-box) {
                        background: white;

                    }
                }
            }

            :deep(.image-box) {
                width: 30px;
                height: 30px;
                padding: 5px;

                &:hover {
                    background: white;
                }
            }
        }
    }
}
</style>