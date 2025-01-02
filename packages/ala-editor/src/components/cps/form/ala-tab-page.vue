<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-02 17:41:08
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-tab-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-tab-wrapper">

        <AlaDrawer v-model="showDrawer" :title="title" :width="width" :direction="direction" @beforeClose="handleClose">
            <template #content>

                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :stretch="true">
                    <el-tab-pane :label="item.title" :name="item.title" class="ala-tab-pane"
                        v-for="(item, index) in tabs" :key="item.title">

                        {{ item.title }}

                    </el-tab-pane>
                    <!-- <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
                </el-tabs>

            </template>
            <!-- <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                </div>
            </template> -->
        </AlaDrawer>

    </div>

</template>

<script setup lang="ts">
import { DrawerProps, TabsPaneContext } from 'element-plus';
import { ref } from 'vue'

interface Tab {
    title: string,
    code: string,
    properties: { [key: string]: any },
}
// State
const props = defineProps({
    title: {
        type: String,
    },
    width: {
        type: String,
        default: "500"
    },
    tabs: {
        type: Array<Tab>,
        default: () => ([])
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

const activeName = ref(props.tabs[0].title)

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

</script>
<style scoped lang="scss">
.ala-tab-wrapper {

    :deep(.el-drawer__body) {
        padding-top: 6px;
    }

    .demo-tabs {

        width: 100%;

        :deep(.el-tabs__nav-wrap) {
            display: inline-flex;
        }

        .el-tabs__content {
            padding: 32px;
            color: #6b778c;
            font-size: 32px;
            font-weight: 600;
        }
    }
}
</style>
