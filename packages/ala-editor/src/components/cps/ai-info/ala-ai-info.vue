<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-12 20:37:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/ai-info/ala-ai-info.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-ai-info-wrapper">
        <el-form-item :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-input :model-value="model" @input="handleChange" :placeholder="placeholder" :id="fieldName"
                :disabled="isDisabled">

                <template #suffix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" @click="search" />
                </template>

            </el-input>
        </el-form-item>
    </div>


    <AlaDrawer v-model="showDrawer" :title="'【 详情 】'" :width="drawerWidth()" :direction="direction"
        @beforeClose="handleClose">
        <template #content>
            <div class="is-empty">
                没有查询到数据 1
            </div>
            <div class="is-empty">
                没有查询到数据 2
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
            </div>
        </template>
    </AlaDrawer>


</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { DrawerProps } from 'element-plus';


// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    currentId: { // 当前被渲染组件ID
        type: String,
    },
    block: { // 当前被渲染组件 block
        type: Object,
    },
    bType: {
        type: String,
        default: 'page'
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    },
    item: {
        type: Object,
        default: () => { }
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init", "formItemChangeCallback"])

const handleChange = (value: string) => {
    model.value = value
}

// Methods

logger.info(`bType[ ${props.bType} ]，渲染 动态表单 ala-ai-info 组件，props：`, props);


// // 发送组件初始化消息
if (props.bType === 'form') {
    // 组件挂载后再发送初始化消息
    watch(() => props.currentId, () => {
        logger.info(`向 editor-render-drag-form 组件【 发送初始化消息 】，当前组件 id[ ${props.currentId} ]`);

        emit('init', {
            pid: null,
            block: props.block,
        })
    }, {
        immediate: true
    })
}


const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})

const search = () => {
    console.log('props: ---> ', props);
    showDrawer.value = true
}

const showDrawer = ref(false)

// 计算css宽度
// 1、动态计算 drawer 宽度
const drawerWidth = (): string => {
    const paddingWidth = 66
    // let width = (formWidth.value + paddingWidth) * (1 + Math.random() * 0.1) + 'px'
    // formWidth.value = formWidth.value * (1 + Math.random() * 0.1)    
    let width = '600px'
    return width
}

const direction = ref<DrawerProps['direction']>('rtl')

const handleClose = (done: () => void) => {
    done()
}

/**
 * 点击取消按钮，关闭弹窗
 */
const cancelClick = () => {
    showDrawer.value = false
}

</script>

<style scoped lang="scss">
.ala-ai-info-wrapper {

    :deep(.el-input__suffix) {
        cursor: pointer;
    }

}
</style>