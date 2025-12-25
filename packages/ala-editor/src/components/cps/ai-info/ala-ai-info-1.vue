<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-12 22:46:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/ai-info/ala-ai-info.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-ai-info-wrapper">
        <el-form-item :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <el-input :model-value="model" @input="handleChange" :placeholder="placeholder" :id="fieldName"
                :disabled="isDisabled">

                <template #suffix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" @click="search" />
                </template>

            </el-input>
        </el-form-item>
    </div>


    <AlaDrawer v-model="showDrawer" :title="title" :width="drawerWidth()" :direction="direction"
        @beforeClose="handleClose">
        <template #content>

            <div class="question">
                <el-input type="textarea" :model-value="question" @input="handleType" placeholder="请输入查询问题"
                    class="input"></el-input>
                <AlaButton :showButton="true" name="query" @query="handleQuery()" size="default" buttonType="primary" />
            </div>
            <div v-html="htmlMessage"></div>

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
// import { AiMessage } from '@/config/types';
// import { useAlaStore } from '@/store/ala-store';
// import { logger } from '@/utils/logger';
// import notify from '@/utils/notify';
// import { alaPost } from '@/utils/req';
// import u from '@/utils/u';
// import { DrawerProps } from 'element-plus';
// const alaStore = useAlaStore()
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
// import MarkdownIt from "markdown-it";
// import AlaButton from '../button/ala-button.vue';
// const md = new MarkdownIt();

// // State
// const props = defineProps({
//     label: {
//         type: String,
//         default: ''
//     },
//     position: {
//         type: String as () => '' | 'top' | 'left' | 'right',
//         default: 'left'
//     },
//     placeholder: {
//         type: String,
//         default: ''
//     },
//     fieldName: {
//         type: String,
//         default: ''
//     },
//     currentId: { // 当前被渲染组件ID
//         type: String,
//     },
//     block: { // 当前被渲染组件 block
//         type: Object,
//     },
//     bType: {
//         type: String,
//         default: 'page'
//     },
//     help: {
//         type: String,
//     },
//     icon: {
//         type: String,
//     },
//     iconWidth: {
//         type: Number,
//         default: 30
//     },
//     iconHeight: {
//         type: Number,
//         default: 30
//     },
//     data: {
//         type: Object,
//     },
//     noEditable: {
//         type: Boolean,
//         default: () => false
//     },
//     item: {
//         type: Object,
//         default: () => { }
//     }
// })

// const model = defineModel({
//     type: String || Number || null || undefined
// })



// const emit = defineEmits(['callback', "init", "formItemChangeCallback"])

// const handleChange = (value: string) => {
//     model.value = value
// }

// // Methods

// logger.info(`bType[ ${props.bType} ]，渲染 动态表单 ala-ai-info 组件，props：`, props);


// // // 发送组件初始化消息
// if (props.bType === 'form') {
//     // 组件挂载后再发送初始化消息
//     watch(() => props.currentId, () => {
//         logger.info(`向 editor-render-drag-form 组件【 发送初始化消息 】，当前组件 id[ ${props.currentId} ]`);

//         emit('init', {
//             pid: null,
//             block: props.block,
//         })
//     }, {
//         immediate: true
//     })
// }


// const isDisabled = computed(() => {
//     const idd = false

//     if (props.noEditable) {
//         return true
//     }
//     return idd
// })

// const title = computed(() => {
//     return `智慧查询`
// })

// const question = ref<string>('')
// const handleType = (v: string) => {
//     question.value = v
// }
// const query = () => {

//     messages.value = ''

//     // Methods
//     const url = '/l/chat/user'
//     const params = { 'user': question.value }
//     alaPost(u.url(url), params, false, '').then((data: any) => {
//         const response = data;
//         console.log('response:', response);

//     });
// }


// const search = () => {
//     showDrawer.value = true
// }

// const showDrawer = ref(false)

// // 计算css宽度
// // 1、动态计算 drawer 宽度
// const drawerWidth = (): string => {
//     const paddingWidth = 66
//     // let width = (formWidth.value + paddingWidth) * (1 + Math.random() * 0.1) + 'px'
//     // formWidth.value = formWidth.value * (1 + Math.random() * 0.1)    
//     let width = '1000px'
//     return width
// }

// const direction = ref<DrawerProps['direction']>('rtl')

// const handleClose = (done: () => void) => {
//     messages.value = ''
//     done()
// }

// /**
//  * 点击取消按钮，关闭弹窗
//  */
// const cancelClick = () => {
//     messages.value = ''
//     showDrawer.value = false
// }

// const messages = shallowRef<string>('')
// const htmlMessage = computed(() => md.render(messages.value));

// watch(() => alaStore.get('ai_info'), (message: AiMessage) => {

//     console.log('message.content:', message.content);

//     messages.value += message.content

//     if (message.finishReason) {
//         // 说明当前回复终止了
//         // lastMessageId = ''
//     } else {

//         // if (lastMessageId && lastMessageId === message.messageId) {
//         //     // 说明当前消息是最后一条回复的中间过程消息片段
//         //     const lastMessage = messages.value[messages.value.length - 1]
//         //     lastMessage.text += message.content
//         // } else {
//         //     lastMessageId = message.messageId
//         //     messages.value.push({ id: message.messageId, text: message.content, userId: 0 });
//         // }

//     }

//     // 获取最后一个子元素并滚动到它的位置

//     nextTick(() => {
//         // 在 DOM 更新后执行滚动
//         // chatMessagesWrapper.value.scrollTop = chatMessagesWrapper.value.scrollHeight;
//     })


// })


// const handleQuery = () => {
//     if (!question.value) {
//         notify.warn(t('pop.warm_title'), "请输入查询问题")
//         return
//     }
//     query()
// }

</script>

<style scoped lang="scss">
.ala-ai-info-wrapper {
    .image {}

    :deep(.el-input__suffix) {
        cursor: pointer;
    }

}

.question {
    .input {
        width: 90%;
    }
}

div {}

.is-empty {}
</style>