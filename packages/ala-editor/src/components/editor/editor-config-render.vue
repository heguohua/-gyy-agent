<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 15:05:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-03 10:38:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-config-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-render">
        <el-form label-width="36%">

            <el-collapse v-model="activeNames">

                <div class="" v-for="(item, index) in formItems" :key="bType + '-' + index" :class="bem('render')"
                    @click="">

                    <template v-if="item.code">

                        <!-- 说明是 config-collapse-item 组件 -->
                        <el-collapse-item :title="item.title" :name="item.title">

                            <template class="" v-for="(component, innerIndex) in item.components"
                                :key="bType + '-' + index+'-'+innerIndex">

                                <component v-if="getComponent(component)" :is="getComponent(component)"
                                    :data="component" v-bind="component.properties.desktop.other"
                                    :viewport="editorStore.viewport[bType]" @callback="callback"
                                    :key="bType + '-' + component.id" :bType="bType" />

                            </template>
                        </el-collapse-item>

                    </template>

                    <component v-else-if="getComponent(item)" :is="getComponent(item)" :data="item"
                        v-bind="item.properties.desktop.other" :viewport="editorStore.viewport[bType]"
                        @callback="callback" :key="bType + '-' + item.id" :bType="bType" />

                </div>

            </el-collapse>
            <!-- <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Consistency" name="1">
                    <div>
                        Consistent with real life: in line with the process and logic of real
                        life, and comply with languages and habits that the users are used to;
                    </div>
                    <div>
                        Consistent within interface: all elements should be consistent, such
                        as: design style, icons and texts, position of elements, etc.
                    </div>
                </el-collapse-item>
            </el-collapse> -->
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { alaConsts } from '@/config/alaConsts';
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';

const editorStore = useEditorStore()

const { name, bem } = createNamespace("config")

// State
const props = defineProps({
    list: {
        type: Array<any>,
        default: () => []
    },
    bType: {
        type: String,
        default: 'page'
    }
})
const bType = props.bType

// Methods
const getComponent = computed(() => {
    return (item: any) => {
        const code = item.properties[editorStore.viewport[bType]].code
        const title = item.properties[editorStore.viewport[bType]].title
        const componentName = alaConsts.COMPONENT_PREFIX + code
        logger.info(`bType[ ${bType} ],editor-config-render中渲染动态 属性表单 组件, code: ${componentName}, title: ${title}`);

        return componentName
    }
})


const emit = defineEmits(["callback"])

const callback = (data: any) => {
    logger.info(`bType[ ${bType} ],editor-config-render组件 接收到 子组件callback,即将调用父组件callback, data`, data);
    emit("callback", data)
}

const formItems = ref<Array<any>>([])

interface CollapseItem {
    title: string,
    code: string,
    components: Array<any>
}

watch(() => props.list, (items: any) => {
    if (items && items.length > 0) {

        const fItems: any[] = []
        let currentCollapseItem: CollapseItem = undefined as any

        items.forEach((item: any) => {

            const code = item.properties.desktop.code
            const title = item.properties.desktop.title

            if (code === 'config-collapse-item') {
                currentCollapseItem = { title, code, components: [] }
                fItems.push(currentCollapseItem)
            } else {
                if (!currentCollapseItem) {
                    fItems.push(item)
                } else {
                    currentCollapseItem.components.push(item)
                }
            }


        })

        console.log('fItems:', fItems);


        formItems.value = fItems
    }
}, {
    immediate: true
})


const activeNames = ref('')

const handleChange = (name: string) => {
    console.log('name:', name);
    console.log('activeNames:', activeNames.value);

}

</script>

<style scoped lang="scss">
.editor-config-render {
    :deep(.el-form-item__label) {
        padding-right: 4px;
    }

    :deep(.el-collapse) {
        border-bottom: none;


        .el-collapse-item__wrap {
            padding: 8px 4px;
        }

        .el-collapse-item__header {
            font-size: 0.9rem;
            padding-left: 8px;
            font-weight: normal
        }

        .el-collapse-item__header.is-active {
            color: var(--el-color-primary);
            font-weight: bold;
        }

        button {
            border-bottom: 1px solid var(--el-collapse-border-color);
        }
    }
}
</style>