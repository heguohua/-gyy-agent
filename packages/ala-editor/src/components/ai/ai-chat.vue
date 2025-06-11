<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-03-14 17:55:06
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 15:48:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/ai/ai-chat.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="chat-layout">
    <!-- <div class="chat-header">
        你是谁
      </div> -->
    <div class="chat-messages" ref="chatMessagesWrapper">
      <div class="message" :class="message.userId != 0 ? 'self' : ''" v-for="message in messages" :key="message.id">
        <div class="message-content">
          <AlaMessage :icon="message.userId === 0 ? '/ai/assist.svg' : '/ai/user.svg'" :content="message.text"
            :self="message.userId != 0" />
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea type="text" placeholder="给 小智 发送消息吧（ 按 Alt + Enter 发送消息 ）" v-model="inputText" @keydown="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WebSocketClient } from '@/utils/websocket';
import { defineComponent, ref } from 'vue';
import { useAlaStore } from '@/store/ala-store';
const alaStore = useAlaStore()
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import u from '@/utils/u';
import { AiMessage } from '@/config/types';


type Message = {
  id: string
  text: string
  userId: number
}

const messages = ref<Array<Message>>([
  { id: '1', text: 'Hi，我是小智~\n很高兴遇见你！我是你的私人助手，您可以随时问我问题。', userId: 0 },
]);

const inputText = ref('');

const sendMessage = (event: any) => {

  // 检查是否按下了 Alt + Enter
  if (event.altKey && event.key === 'Enter') {
    if (inputText.value.trim()) {


      alaPost(u.url('/ai/chat/chat'), { message: inputText.value }, false, '').then((data: any) => {
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

watch(() => alaStore.get('ai_message'), (message: AiMessage) => {

  if (message.finishReason) {
    // 说明当前回复终止了
    lastMessageId = ''
  } else {

    if (lastMessageId && lastMessageId === message.messageId) {
      // 说明当前消息是最后一条回复的中间过程消息片段
      const lastMessage = messages.value[messages.value.length - 1]
      lastMessage.text += message.content
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



</script>

<style lang="scss" scoped>
.chat-layout {

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