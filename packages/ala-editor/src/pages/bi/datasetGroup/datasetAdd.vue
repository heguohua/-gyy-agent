<template>


    <AlaFullScreen v-model="model" :fullscreen="true" :showClose="false">

        <template #header>
            <div class="header">
                <div class="left">
                    <v-icon-tooltip icon="back" content="返回" @click="close" />
                    <ala-input class="dataset-input" />
                </div>
                <div class="right">
                    <AlaButton :showButton="true" name="saveAndBack" @save="handleSaveAndBack()" buttonType="default" />
                    <AlaButton :showButton="true" name="save" @save="handleSave()" buttonType="primary" />
                </div>
            </div>
        </template>


        <template #middle>

            <div class="middle">
                <div class="left">
                    left
                </div>
                <div class="right">
                    <div class="table" :style="{ height: `${tableHeight}px` }">
                        table
                    </div>
                    <div class="resizer" @mousedown="startResize">
                        <div class="resizer-button">

                        </div>
                    </div>
                    <div class="preview" :style="{ height: `${previewHeight}px` }">
                        <el-tabs v-model="activeName" class="ala-tabs" @tab-click="handleClick" :stretch="true">
                            <el-tab-pane label="数据预览" name="dataPreview" class="ala-tab-pane">
                                数据预览
                            </el-tab-pane>

                            <el-tab-pane label="批量设置" name="batchConfig" class="ala-tab-pane">
                                批量设置
                            </el-tab-pane>

                        </el-tabs>
                    </div>
                </div>
            </div>

        </template>

    </AlaFullScreen>


</template>

<script setup lang="ts">
import { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

// State


// Methods
const height = window.innerHeight
const unitHeight = window.innerHeight / 3
const tableHeight = ref(unitHeight) // 初始顶部区域高度
const previewHeight = ref(unitHeight * 2 - 16) // 初始底部区域高度
let isResizing = false

const startResize = (e: MouseEvent) => {
    isResizing = true
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
    if (isResizing) {
        const newTopHeight = e.clientY - 100 // 假设顶部距离窗口顶部100px
        const newBottomHeight = height - newTopHeight // 假设整个容器高度为400px
        if (newTopHeight > 100 && newBottomHeight > 100) { // 限制最小高度
            tableHeight.value = newTopHeight
            previewHeight.value = newBottomHeight
        }
    }
}

const stopResize = () => {
    isResizing = false
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
}


onMounted(() => {
    document.addEventListener('mouseup', stopResize)
})

onUnmounted(() => {
    document.removeEventListener('mouseup', stopResize)
})

const model = defineModel({
    type: Boolean
})

const activeName: any = ref("")
const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.paneName
}

const close = () => {
    model.value = false
}

const handleSave = () => {

}

const handleSaveAndBack = () => {

}

</script>

<style scoped lang="scss">
.header {
    // background: var(--el-color-primary);
    height: 50px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(31, 35, 41, 0.15);

    .left {
        display: flex;
        align-items: center;
        justify-content: left;
        justify-items: center;
        width: 50%;
        padding-left: 4px;


        :deep(.el-form-item) {
            margin: 0px;

            input {
                height: 26px;
                line-height: 26px;
            }
        }

        .dataset-input {}
    }

    .right {
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: right;
        justify-items: center;
        padding-right: 26px;

        :deep(button) {
            padding: 14px 22px;
        }
    }
}

.middle {
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .left {
        width: 300px;
        height: 100%;
        border-right: 1px solid rgba(31, 35, 41, 0.15);
    }


    .right {
        width: calc(100% - 300px);
        height: 100%;

        .table {
            height: 40%;
            background: var(--ala-color-bg);
        }

        .resizer {
            height: 16px;
            display: flex;
            align-items: center;
            justify-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }

            .resizer-button {
                width: 100px;
                height: 6px;
                border-radius: 3px;
                display: inline-block;
                background: rgba(31, 35, 41, 0.1);
            }
        }

        .preview {
            height: calc(60% - 10px);

            .ala-tabs {
                :deep(.el-tabs__item) {
                    height: 30px;
                }

                .ala-tab-pane {}
            }
        }
    }
}
</style>