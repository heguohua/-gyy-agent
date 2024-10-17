<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 11:17:11
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-block.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-block">
        <div class="left">
            <div class="menu-item" v-for="( item, index ) in menuList" :key="index"
                :class="{ 'is-active': index === activeMenu }" @click="activeMenu = index">
                <v-icon class="menu-icon" :icon="index === activeMenu ? item.iconActive : item.icon" />

                <div class="menu-name">
                    {{ item.name }}
                </div>
            </div>

        </div>
        <div class="right">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="$t('p_editor.block.base.baseBlock')" name="1">
                    <div class="">
                        ddd
                    </div>
                </el-collapse-item>
                <el-collapse-item :title="$t('p_editor.block.base.seniorBlock')" name="2">
                    <div class="">
                        eee
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import i18n, { fetchLocaleMessages } from '@/utils/i18n/i18n';
const { global: { t } } = i18n

// State
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
            name: t("p_editor.block.base.name")
        },
        {
            icon: "kit",
            iconActive: "kitActive",
            name: t("p_editor.block.kit.name")
        }
    ]
})
console.log('menuList:', menuList);

const activeMenu = ref(0)
const activeNames = ref(["1", "2"])
const baseBlockList = ref([])
const seniorBlockList = ref([])

const handleChange = () => {

}
// Methods

</script>

<style scoped lang="scss">
.editor-block {
    position: fixed;
    top: var(--edit-header-height);
    left: 0;
    flex-shrink: 0;
    background: white;
    border-right: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-start;
    width: var(--edit-block-width);

    .left {
        width: 70px;
        height: calc(100vh - var(--edit-header-height));
        border-right: 1px solid var(--color-border);

        .menu-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            padding: 5.5px 0;
            border-radius: var(--border-radius);
            cursor: pointer;
            margin: 17px 5px;

            &.is-active,
            &:hover {
                background: var(--color-block-hover);
                border-radius: var(--border-radius);
            }

            .menu-icon {
                width: 30px;
                height: 30px;
                margin: 0 auto;
            }

            .menu-name {
                font-size: 14px;
                line-height: 14px;
                padding-top: 4px;
            }
        }
    }

    .right {
        flex: 1;
        height: calc(100vh - var(--edit-header-height));
        overflow: auto;
    }

    :deep(.el-collapse) {
        border: 0;
    }

    :deep(.el-collapse-item__header) {
        padding-left: 14px;
        font-size: 14px;
    }

    :deep(.el-collapse-item__content) {
        padding-left: 14px;
        padding-right: 14px;
        padding-bottom: 14px;
    }
}
</style>