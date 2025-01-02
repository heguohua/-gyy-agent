<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-02 15:24:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-tab-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-tab-wrapper">

        <AlaDrawer v-model="showDrawer" :title="title" :width="width" :direction="direction" @beforeClose="handleClose">
            <template #content>
                123
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                </div>
            </template>
        </AlaDrawer>

    </div>

</template>

<script setup lang="ts">
import { DrawerProps } from 'element-plus';
import { ref } from 'vue'

// State
const props = defineProps({
    title: {
        type: String,
    },
    width: {
        type: String,
        default: "500"
    }
})



const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const direction = ref<DrawerProps['direction']>('rtl')

// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const handleClose = (done: () => void) => {
    done()
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    showDrawer.value = false
}

</script>
<style scoped lang="scss"></style>
