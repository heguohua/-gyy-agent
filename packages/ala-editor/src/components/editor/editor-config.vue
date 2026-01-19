<template>
    <div class="editor-config" ref="target" :class="{ 'is-show': editorStore.configPanelShow[bType] }">
        <div class="icon-group">
            <v-icon-tooltip class="" :icon="editorStore.configPanelShow[bType] ? 'close' : 'expand'"
                :content="editorStore.configPanelShow[bType] ? '收起侧边栏' : '展开侧边栏'" @click.native="panelSwitch" />
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
                        </div>

                        <el-tabs type="border-card" class="ala-editor-config-tab" v-model="activeTabName">

                            <el-tab-pane label="页面配置项" name="page">
                                <editor-config-page :bType="bType" />
                            </el-tab-pane>

                            <el-tab-pane label="组件配置项" name="block" class="ala-pane-block">
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
import validate from '@/utils/validate';
import { keysOf } from 'element-plus/es/utils';
const editorStore = useEditorStore()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
        logger.info("bType[ ${bType} ],editor-config组件 【 监听到 】 editorStore.currentSelect 发生变化,但变化值不存在,不切换 editor-config 面板显示状态");
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


    // 先进行 参数校验
    const config = {
        blockConfig: { [bType]: editorStore.blockConfig[bType] },
        pageConfig: { [bType]: editorStore.pageConfig[bType] }
    }


    // 页面验证
    // 验证标题是否为空
    // 验证 模块名 是否为空、是否已存在

    // 
    const blockConfig = editorStore.blockConfig[bType] || []
    const pageConfig = editorStore.pageConfig[bType].formData as any

    if (pageConfig) {

        const fieldNames = Object.keys(pageConfig)

        for (let i = 0; i < fieldNames.length; i++) {

            const fieldName = fieldNames[i]
            const rules = pageConfig[fieldName].rules
            const fieldValue = pageConfig[fieldName].desktop
            const title = pageConfig[fieldName].title

            if (rules && rules.length > 0) {

                let passed = true
                let message = ''

                for (let j = 0; j < rules.length; j++) {

                    const rl = rules[j]
                    let checkResult = undefined
                    message = rl.message

                    if (rl.name === 'required') {
                        checkResult = validate.required(fieldValue)
                    } else if (rl.name === 'pattern') {
                        checkResult = validate.pattern(fieldValue, rl.pattern)
                    } else if (rl.name === 'min') {
                        checkResult = validate.min(fieldValue, rl.length)
                    } else if (rl.name === 'max') {
                        checkResult = validate.max(fieldValue, rl.length)
                    }

                    // 终止循环
                    if (!checkResult) {
                        passed = false
                        break
                    }
                }

                if (!passed) {
                    // 说明有校验未通过的规则，显示提示信息
                    const tip = '页面配置项【 ' + (title.startsWith("t('") ? t(title) : title) + ` 】 ${message} ！`
                    u.error(tip, t('pop.warm_title'))
                }

            }

        }

    }

    if (blockConfig && blockConfig.length > 0) {

        const fullFieldNames = new Map<string, any>();

        for (let b = 0; b < blockConfig.length; b++) {

            const oneFormItem = blockConfig[b].formData



            if (oneFormItem) {

                if (oneFormItem.fieldName) {
                    const fieldName = oneFormItem.fieldName.desktop
                    const existedField = fullFieldNames.get(fieldName)
                    if (existedField) {
                        // 说明存在重复字段名的表单组件
                        // 给出提示信息，并终止循环
                        console.log('existedField:', existedField);
                        const newFieldLabel = oneFormItem.label.desktop
                        const existedFieldLabel = existedField.label.desktop
                        // notify.error(t('pop.warm_title'), `“${newFieldLabel}”和“${existedFieldLabel}”字段名重复！`)
                        u.error(`“${newFieldLabel}”和“${existedFieldLabel}”字段名重复！`, t('pop.warm_title'))

                    } else {
                        // 将新字段缓存到 map 中
                        fullFieldNames.set(fieldName, oneFormItem)
                    }
                }



                const fieldNames = Object.keys(oneFormItem)

                for (let i = 0; i < fieldNames.length; i++) {


                    const fieldName = fieldNames[i]
                    const rules = oneFormItem[fieldName].rules
                    const fieldValue = oneFormItem[fieldName].desktop
                    const fieldTitle = oneFormItem[fieldName].title

                    if (rules && rules.length > 0) {

                        let passed = true
                        let message = ''

                        for (let j = 0; j < rules.length; j++) {

                            const rl = rules[j]
                            let checkResult = undefined
                            message = rl.message

                            if (rl.name === 'required') {
                                checkResult = validate.required(fieldValue)
                            } else if (rl.name === 'pattern') {
                                checkResult = validate.pattern(fieldValue, rl.pattern)
                            } else if (rl.name === 'min') {
                                checkResult = validate.min(fieldValue, rl.length)
                            } else if (rl.name === 'max') {
                                checkResult = validate.max(fieldValue, rl.length)
                            }

                            // 终止循环
                            if (!checkResult) {
                                passed = false
                                break
                            }
                        }

                        if (!passed) {
                            // 说明有校验未通过的规则，显示提示信息
                            const fieldLabel = oneFormItem.label.desktop
                            const tip = '组件配置项【 “' + (fieldLabel.startsWith("t('") ? t(fieldLabel) : fieldLabel) + '”组件的“' + (fieldTitle.startsWith("t('") ? t(fieldTitle) : fieldTitle) + `” 】 ${message} ！`
                            u.error(tip, t('pop.warm_title'))
                        }
                    }
                }
            }

        }
    }

    const url = "/l/lowcodingConfig/add"
    const updateUrl = "/l/lowcodingConfig/update"

    const id = editorStore.pageConfig[bType].id

    const realUrl = id ? updateUrl : url

    if (config.blockConfig && config.blockConfig[bType] && config.blockConfig[bType].length > 0) {

        const data = {
            name: editorStore.pageConfig[bType].formData?.title.desktop,
            className: editorStore.pageConfig[bType].formData?.moduleName.desktop,
            formType: editorStore.pageConfig[bType].formData?.formType.desktop,
            config: u.tojson(config)
        }
        if (id) {
            u.merged(data, { id })
        }

        logger.info(`新增/更新数据，url【 ${url} 】，数据对象：`, config);
        alaPost(u.url(realUrl || ''), data, false, id ? 'put' : '').then((response: any) => {
            if (response.code === 200) {
                notify.success("温馨提示：", `保存【 ${bType} 】成功`)
                if (!id) {
                    u.merged(editorStore.pageConfig[bType], { id: response.data.id })
                }
            }
        });
    } else {
        notify.warn("温馨提示：", `【 ${bType} 】不存在需要保存的数据！`)
    }



}


</script>

<style scoped lang="scss">
.editor-config {

    position: fixed;
    z-index: 200;
    top: var(--edit-header-height);
    right: -330px;
    width: 330px;
    background: white;
    border-left: 1px solid var(--color-border);
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    height: calc(100vh - var(--edit-header-height));

    --icon-group-width: 96%;
    --icon-group-width-left: 2%;

    --el-input-inner-height: calc(var(--el-input-height, 24px) - 2px);

    :deep(.el-form-item) {
        font-size: 0.8rem;
        margin-bottom: 14px;
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

        .el-form-item__error {
            padding-top: 0px;
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
                    margin-bottom: 200px;


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

                    :deep(.el-tabs__item.is-active) {
                        border-bottom: 2px solid var(--el-color-primary);
                    }

                    :deep(.el-tabs__content) {
                        overflow-y: auto;
                        height: calc(100vh - 200px);
                        padding-bottom: 100px;

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

        .ala-card-content {
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