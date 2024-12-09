<template>
    <div class="editor-config" ref="target" :class="{ 'is-show': editorStore.configPanelShow[bType] }">
        <div class="icon-group">
            <v-icon-tooltip class="" :icon="editorStore.configPanelShow[bType] ? 'contract' : 'expand'"
                :content="editorStore.configPanelShow[bType] ? '收齐侧边栏' : '展开侧边栏'" @click.native="panelSwitch" />
            <div class="content">
                <transition-group name="fade">
                    <div :key="bType + 'tg'">


                        <div class="title-buttons">
                            <div class="title-button">
                                快捷操作
                            </div>
                        </div>
                        <div class="buttons">
                            <el-button @click="handleClear()" v-if="true" class="button">
                                清空
                            </el-button>
                            <el-button type="primary" @click="handleSave()" v-if="true" class="button">
                                保存
                            </el-button>
                            <el-button type="primary" @click="handlePublish()" v-if="true" class="button">
                                发布
                            </el-button>
                        </div>

                        <el-tabs type="border-card" class="ala-editor-config-tab" v-model="activeTabName">

                            <el-tab-pane label="页面配置项" name="page">
                                <editor-config-page :bType="bType" />
                            </el-tab-pane>

                            <el-tab-pane label="组件配置项" name="block">
                                <editor-config-block :bType="bType" />
                            </el-tab-pane>

                        </el-tabs>


                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
const editorStore = useEditorStore()

// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

const activeTabName = ref('page')

watch(() => editorStore.currentSelect[bType], (value) => {

    if (value) {
        logger.info(`bType[ ${bType} ],editor-config组件 【 监听到 】 editorStore.currentSelect 发生变化,即将切换 editor-config 面板为 显示状态, 变化值为`, value);
        editorStore.setConfigPanelShow(true, bType)
        activeTabName.value = 'block'
    } else {
        logger.info("bType[ ${bT    ype} ],editor-config组件 【 监听到 】 editorStore.currentSelect 发生变化,但变化值不存在,不切换 editor-config 面板显示状态");
    }

}, {
    deep: true
})

// Methods
const panelSwitch = () => {
    editorStore.setConfigPanelShow(!editorStore.configPanelShow[bType], bType)
}

const handleClear = () => {
    // 设置 currentSelect 为null，editor-config会自动切换配置面板为 页面配置
    editorStore.setCurrentSelect(null, bType)
    editorStore.setBlockConfig([], bType)
    editorStore.setPageConfig(u.merged({}, { formData: {} }), bType)

}

const handleSave = () => {

    const url = "/l/lowcodingConfig/add"
    const updateUrl = "/l/lowcodingConfig/update"

    const config = {
        blockConfig: { [bType]: editorStore.blockConfig[bType] },
        pageConfig: { [bType]: editorStore.pageConfig[bType] }
    }

    const id = editorStore.pageConfig[bType].id

    const realUrl = id ? updateUrl : url

    if (config.blockConfig && config.blockConfig[bType] && config.blockConfig[bType].length > 0) {

        const data = {
            name:editorStore.pageConfig[bType].formData?.title.desktop, 
            config: u.tojson(config) 
        }
        if (id) {
            u.merged(data, { id })
        }

        logger.info(`新增/更新数据，url【 ${url} 】，数据对象：`, config);
        alaPost(u.url(realUrl || ''), data, false, id ? 'put' : '').then((response: any) => {
            if (response.code === 200) {
                notify.success("温馨提示：", `保存【 ${bType} 】成功`)
            }
        });
    } else {
        notify.warn("温馨提示：", `【 ${bType} 】不存在需要保存的数据！`)
    }



}

const handlePublish = () => {
    console.log('发布: ===============');

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

    --icon-group-width: 96%;
    --icon-group-width-left: 2%;

    --el-input-inner-height: calc(var(--el-input-height, 24px) - 2px);

    :deep .el-form-item {
        font-size: 0.8rem;
        margin-bottom: 8px;
        font-size: 0.8rem;

        .el-form-item__label {
            font-size: inherit;
            text-align: right;
        }


        .el-input__inner {
            height: 24px;
            line-height: 24px;
            font-size: inherit;
        }


    }

    &.is-show {
        right: 0;
        transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    }

    .icon-group {
        position: absolute;
        // left: calc(-48px + var(--icon-group-width-left));
        top: 2px;
        width: var(--icon-group-width);
        padding: 0px 2%;

        .content {
            overflow-x: hidden;
            overflow-y: auto;
            width: 100%;
            height: 100%;
            // left: calc(48px - var(--icon-group-width-left));
            // position: relative;



            :deep(.el-tabs--border-card) {
                border: 0;
            }

            :deep(.el-tabs__content) {
                padding: 0;
            }

            :deep(.el-form-item__label-wrap) {
                width: 20%;
                justify-content: end;
            }

            div {
                .title-buttons {
                    background: var(--color-block-hover);
                    font-size: 1rem;
                    padding: 4px;
                    margin-bottom: 12px;

                    .title-button {
                        font-weight: 400;
                    }
                }

                .buttons {
                    .button {
                        padding: 0px 18px;
                        font-size: 0.9rem;
                        height: 28px;
                    }
                }

                .ala-editor-config-tab {
                    margin-top: 12px;

                    :deep(.el-tabs__header) {
                        background-color: var(--color-block-hover);
                        margin-bottom: 12px;
                    }

                    :deep(.el-tabs__nav) {
                        width: 100%;
                    }

                    :deep(.el-tabs__item) {
                        height: 32px;
                        padding: 0px;
                        flex: 1;
                        border: none;

                    }

                    :deep(.is-active) {
                        border-bottom: 2px solid var(--el-color-primary);
                    }
                }

                .titles {
                    background: var(--color-block-hover);
                    font-size: 1rem;
                    margin: 12px 0px;
                    padding: 4px;

                    .title {
                        font-weight: 400;
                    }
                }



            }
        }

        .icon {
            cursor: pointer;
            width: 32px;
            height: 32px;
            padding: 3px;
            border-radius: var(--border-radius-editor);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            transition: all 0.2s linear;
            border: 1px solid var(--color-border);
            background: white;
            left: -48px;
            position: absolute;

            &+.icon {
                margin-top: 10px;
            }

            &:hover {
                background: var(--color-icon-hover);
                transition: all 0.2s linear;
                border-radius: var(--border-radius-editor);

            }

            :deep(.image-box) {
                width: 32px;
                height: 32px;
                border-radius: var(--border-radius-editor);
                // background:red;
            }
        }
    }


}

</style>