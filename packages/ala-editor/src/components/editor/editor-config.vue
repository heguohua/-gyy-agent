<template>
    <div class="editor-config" ref="target" :class="{ 'is-show': editorStore.configPanelShow }">
        <div class="icon-group">
            <v-icon-tooltip class="" :icon="editorStore.configPanelShow ? 'contract' : 'expand'"
                :content="editorStore.configPanelShow ? '收齐侧边栏' : '展开侧边栏'" @click.native="panelSwitch" />
            <div class="content">
                <transition-group name="fade">
                    <div :key="6666">
                        <div class="title" v-if="editorStore.currentSelect">
                            组件
                        </div>
                        <div class="title" v-else>
                            页面
                        </div>
                        <editor-config-block v-if="editorStore.currentSelect" />
                        <editor-config-page v-else />
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useEditorStore } from '@/store/useEditorStore';
const editorStore = useEditorStore()
// State

watch(() => editorStore.currentSelect, (value) => {
    if (value) {
        editorStore.setConfigPanelShow(true)
    }
})



// Methods
const panelSwitch = () => {
    editorStore.setConfigPanelShow(!editorStore.configPanelShow)
}

</script>

<style scoped lang="scss">
.editor-config {
    position: fixed;
    z-index: 200;
    top: var(--edit-header-height);
    right: -280px;
    width: 280px;
    background: white;
    border-left: 1px solid var(--color-border);
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    height: calc(100vh - var(--edit-header-height));

    &.is-show {
        right: 0;
        transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    }

    .icon-group {
        position: absolute;
        left: -48px;
        top: 16px;

        .icon {
            cursor: pointer;
            width: 32px;
            height: 32px;
            padding: 3px;
            border-radius: var(--border-radius);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            transition: all 0.2s linear;
            border: 1px solid var(--color-border);
            background: white;

            &+.icon {
                margin-top: 10px;
            }

            &:hover {
                background: var(--color-icon-hover);
                transition: all 0.2s linear;
            }

            :deep(.image-box) {
                width: 32px;
                height: 32px;
                // background:red;
            }
        }
    }

    .content {
        overflow-y: auto;
        width: 100%;
        height: 100%;

        .title {
            padding: 14px;
            font-size: 20px;
            font-weight: 600;
        }

        :deep(.el-tabs--border-card) {
            border: 0;
        }

        :deep(.el-tabs__content) {
            padding: 0;
        }
    }
}
</style>