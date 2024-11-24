<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:45:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-24 18:16:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/lowcoding/form-design-editor.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor">
        <!-- <EditorHeader /> -->

        <div class="container" :class="classes">

            <EditorBlock :bType="bType" :menuList="menuList" :baseBlocks="baseFields" :seniorBlocks="seniorFields" />

            <EditorRender :bType="bType" />

            <EditorConfig :bType="bType" />
            <!-- <button @click="getLoveMessage()">Change</button> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { queryLoveMessage } from '@/utils/tuwei';
import { logger } from '@/utils/logger';
import { useEditorStore } from '@/store/useEditorStore';
import { baseFields, seniorFields } from "@/config/formItems"
import { useI18n } from 'vue-i18n';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import notify from '@/utils/notify';
const { t } = useI18n();
const route = useRoute()

// State
const bType = 'form'
const editorStore = useEditorStore()

// Methods
const classes = computed(() => {
    return { "mobile-background": editorStore.isMobileViewport(bType) }
})


interface Menu {
    icon: string,
    iconActive: string,
    name: string,
}
const menuList = computed(() => {
    return [
        {
            icon: "block",
            iconActive: "blockActive",
            name: t("module.lowcoding.baseName")
        },
        {
            icon: "kit",
            iconActive: "kitActive",
            name: t("module.lowcoding.kitName")
        }
    ]
})


const formData = ref({})

// 加载编辑时的初始化数据
onActivated(() => {
    if (route.query.id) {

        const url = "/l/lowcodingConfig/get"

        const params = { id: route.query.id }
        logger.info(`从后台加载【 ${bType} 】配置数据，url【 ${url} 】，数据对象：`, params);

        get(u.url(url || ''), params).then((response: any) => {
            const { data: { config, id } } = response.data;

            const conf = u.parseJson(config)

            const blockConfig = conf["blockConfig"][bType]
            const pageConfig = conf["pageConfig"][bType]

            // 向 pageConfig 添加 id ，供 editor-config 页面保存数据用于判断当前是新建还是编辑操作
            pageConfig["id"] = route.query.id
            
            editorStore.setBlockConfig(blockConfig.slice(0,10), bType)
            editorStore.setPageConfig(pageConfig, bType)

        });
    }
})

</script>

<style scoped lang="scss">
.editor {
    width: 100%;
    overflow-x: hidden;
    user-select: none;
    --edit-header-height: 100px;
    --edit-block-width: 300px;
    --border-radius-editor: 4px;

    .container {
        display: flex;
        width: 100%;
        min-width: 100%;

        &.mobile-background {
            background: var(--color-bg);
        }
    }
}
</style>