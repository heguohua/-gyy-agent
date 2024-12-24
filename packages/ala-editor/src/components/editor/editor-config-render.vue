<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 15:05:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-24 10:20:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-config-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-render">
        <el-form label-width="36%">
            <div class="" v-for="( item, index ) in list" :key="bType + '-' + index" :class="bem('render')" @click="">
                <!-- <component v-if="getComponent(item)" :is="getComponent(item)" :data="item" -->
                <component v-if="getComponent(item)" :is="getComponent(item)" :data="item" v-bind="item.properties.desktop.other"
                    :viewport="editorStore.viewport[bType]" @callback="callback" :key="bType + '-' + item.id"
                    :bType="bType" />
            </div>
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

</script>

<style scoped lang="scss">
.editor-config-render {
    :deep(.el-form-item__label){
        padding-right: 4px;
    }
}
</style>