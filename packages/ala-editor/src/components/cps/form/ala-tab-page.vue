<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-26 11:52:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-tab-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-tab-wrapper">

        <AlaDrawer v-model="showDrawer" :title="title" :width="width" :direction="direction" @beforeClose="handleClose">
            <template #content>

                <el-tabs v-model="activeName" class="ala-tabs" @tab-click="handleClick" :stretch="true">
                    <el-tab-pane :label="item.title" :name="item.title" class="ala-tab-pane"
                        v-for="(item, index) in tabs" :key="item.title">

                        <component v-if="showDrawer" :is="getComponent(item.code)" v-bind="item.props"
                            @close="cancelClick" :previewParams="previewParams" />

                    </el-tab-pane>

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
    props: { [key: string]: any },
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
    },
    previewParams: {
        type: Object as any
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
    if (done) {
        done()
    }
}

const emits = defineEmits(['refresh'])
/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    showDrawer.value = false
    emits('refresh')
}

const activeName = ref(props.tabs[0].title)

const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
}

const getComponent = ((code: string) => {
    return code
})

</script>
<style scoped lang="scss">
.ala-tab-wrapper {

    :deep(.el-drawer__body) {
        padding-top: 6px;
    }

    .ala-tabs {

        width: 100%;
        height: 100%;

        :deep(.el-tabs__nav-wrap) {
            display: inline-flex;
        }

        .el-tabs__content {
            padding: 32px;
            color: #6b778c;
            font-size: 32px;
            font-weight: 600;
        }

        :deep(.ala-tab-pane) {
            height: 100%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
                /* 设置滚动条的宽度 */
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            &::-webkit-scrollbar-thumb {
                background: #e2e2e2;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #e2e2e2;
            }
        }
    }
}
</style>
