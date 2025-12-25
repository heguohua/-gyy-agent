<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-13 08:47:35
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

            <div class="chat-layout">
                <!-- <div class="chat-header">
        你是谁
      </div> -->
                <div class="chat-messages" ref="chatMessagesWrapper">
                    <div class="message" :class="message.userId != 0 ? 'self' : ''" v-for="message in messages"
                        :key="message.id">
                        <div class="message-content">

                            <div class="ala-message" :class="message.userId != 0 ? 'isUserMessage' : ''">
                                <div class="icon">
                                    <img :src="userPhoto(message.userId)" class="icon-image" mode="widthFix"></img>
                                </div>
                                <div class="info" :class="message.userId != 0 ? 'self' : ''" v-html="message.text">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <textarea type="text" placeholder="给 白露 发送消息吧（ 按 Alt + Enter 发送消息 ）" v-model="inputText"
                        @keydown="sendMessage" />
                </div>
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
import { AiMessage } from '@/config/types';
import { useAlaStore } from '@/store/ala-store';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaPost } from '@/utils/req';
import u from '@/utils/u';
import { DrawerProps } from 'element-plus';
const alaStore = useAlaStore()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

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
    },
    type: {
        type: String,
        default: () => 'input'
    },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
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

const title = computed(() => {
    return `智慧查询`
})

const question = ref<string>('')
const handleType = (v: string) => {
    question.value = v
}


const search = () => {
    showDrawer.value = true
}

const showDrawer = ref(false)

// 计算css宽度
// 1、动态计算 drawer 宽度
const drawerWidth = (): string => {
    const paddingWidth = 66
    // let width = (formWidth.value + paddingWidth) * (1 + Math.random() * 0.1) + 'px'
    // formWidth.value = formWidth.value * (1 + Math.random() * 0.1)    
    let width = '1000px'
    return width
}

const direction = ref<DrawerProps['direction']>('rtl')

const handleClose = (done: () => void) => {
    messages.value = [messages.value[0]]
    done()
}

/**
 * 点击取消按钮，关闭弹窗
 */
const cancelClick = () => {
    // messages.value = ''
    showDrawer.value = false
}

type Message = {
    id: string
    text: string
    rawText?: string
    userId: number
}

const messages = ref<Array<Message>>([
    { id: '1', text: 'Hi，我是白露~\n很高兴遇见你！我是你的私人助手，您可以随时问我问题。', userId: 0 },
]);

const inputText = ref('');

const sendMessage = (event: any) => {

    // 检查是否按下了 Alt + Enter
    if (event.altKey && event.key === 'Enter') {
        if (inputText.value.trim()) {


            // Methods
            const url = '/l/chat/user'
            const params = { 'user': inputText.value }
            alaPost(u.url(url), params, false, '').then((data: any) => {
                const response = data;
                if (response.code === 200) {
                    messages.value.push({ id: messages.value.length + 1 + '', text: inputText.value, userId: 1 });
                    inputText.value = '';
                }
            });

        } else {
            notify.warn(t('pop.warm_title'), "请先输入消息")

        }
    } else if (event.key === 'Enter') {

        const textarea = event.target;
        const height = textarea.scrollHeight

        if (height < 400) {
            textarea.style.height = 'auto'; // 重置高度
            textarea.style.height = `${textarea.scrollHeight}px`; // 设置高度为内容的实际高度

        }

    }

};

const chatMessagesWrapper = ref()
let lastMessageId = ''

watch(() => alaStore.get('ai_info'), (message: AiMessage) => {

    if (message.finishReason) {
        // 说明当前回复终止了
        lastMessageId = ''
    } else {
        if (lastMessageId && lastMessageId === message.messageId) {
            // 说明当前消息是最后一条回复的中间过程消息片段
            const lastMessage = messages.value[messages.value.length - 1]
            lastMessage.rawText = (lastMessage.rawText || '') + message.content
            lastMessage.text = md.render(lastMessage.rawText)
        } else {
            lastMessageId = message.messageId
            messages.value.push({ id: message.messageId, text: message.content, userId: 0 });
        }
    }

    // 获取最后一个子元素并滚动到它的位置
    nextTick(() => {
        // 在 DOM 更新后执行滚动
        chatMessagesWrapper.value.scrollTop = chatMessagesWrapper.value.scrollHeight;
    })
})


// message.userId === 0 ? '/ai/assist.svg' : '/ai/user.svg'
const currentUserPhoto = alaStore.get('userPhoto')
const userPhoto = (userId: number) => {
    if (userId === 0) {
        return '/ai/assist.svg'
    } else {
        return currentUserPhoto
    }
}


</script>

<style scoped lang="scss">
.ala-ai-info-wrapper {
    :deep(.el-input__suffix) {
        cursor: pointer;
    }
}

:deep(.chat-layout) {


    display: flex;
    flex-direction: column;
    height: calc(100% - 46px);
    width: 99%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    padding-bottom: 90px;

    .chat-header {
        background-color: #f5f5f5;
        padding: 10px;
        font-weight: bold;
        text-align: center;
    }

    .chat-messages {
        display: flex;
        flex-direction: column;
        padding: 20px;
        overflow-y: auto;


        &::-webkit-scrollbar {
            width: 4px;
            /* 设置滚动条的宽度 */
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #cfcfcf;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #cfcfcf;
        }

        &:first-child {
            margin-top: 20px;
        }

        .message {
            // max-width: 90%;
            margin-bottom: 30px;

            .message-content {
                .ala-message {
                    display: flex;
                    flex-direction: column;
                    align-items: start;

                    .icon {
                        width: 40px;
                        position: relative;
                        top: -6px;

                        img {
                            width: 100%;
                            opacity: 0.8;
                            transform: rotateX(0deg) rotateY(4deg) rotateZ(-3deg);
                        }
                    }
                }

                .info {
                    background: #f9fafb;
                    padding: 22px 30px;
                    border-radius: 8px;
                }

                .isUserMessage {
                    flex-direction: row-reverse;
                    flex-direction: column;
                    align-items: end;
                    font-size: 1.2rem;

                    .icon {
                        padding-top: 8px;
                        background: #E5E7EC;
                        border-radius: 23px;
                        width: 46px;
                        height: 46px;
                        top: -4px;
                        overflow: hidden;


                        img {
                            transform: rotateX(0deg) rotateY(2deg) rotateZ(1deg);
                            width: 90%;
                        }
                    }

                    .info {
                        background: #edf3fe;
                    }
                }
            }
        }

        .self {
            display: flex;
            justify-content: flex-end;
        }

    }

    .chat-input {
        display: flex;
        padding: 10px;
        background-color: #f5f5f580;
        position: absolute;
        bottom: 0;
        width: 100%;

        textarea {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            resize: none;
            /* 禁止调整大小 */

            font-size: 16px;
            line-height: 24px;
            color: #060607;

            &::placeholder {
                color: #222222;
                opacity: 0.5;
            }


            &::-webkit-scrollbar {
                width: 2px;
                /* 设置滚动条的宽度 */
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            &::-webkit-scrollbar-thumb {
                background: #e1e1e1;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #e1e1e1;
            }
        }
    }
}
</style>