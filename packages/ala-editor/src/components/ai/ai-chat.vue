<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-03-14 17:55:06
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-15 18:31:34
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
    <div class="chat-messages">
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
import { defineComponent, ref } from 'vue';


type Message = {
  id: number
  text: string
  userId: number
}

const messages = ref<Array<Message>>([
  { id: 1, text: 'Hi，我是 Kimi~\n很高兴遇见你！你可以随时把网址🔗或者文件📄发给我，我来帮你看看', userId: 0 },
  { id: 2, text: '嗨！我是Kimi，一个由月之暗面科技有限公司开发的人工智能助手。我擅长用文字交流，无论是中文还是英文都能轻松应对，还能帮你处理文件、搜索信息，甚至帮你整理思路、解答问题。如果你需要帮忙，尽管开口吧！', userId: 0 },
  { id: 3, text: '你是谁', userId: 1 },
]);

const inputText = ref('');

const sendMessage = (event: any) => {

  // 检查是否按下了 Alt + Enter
  if (event.altKey && event.key === 'Enter') {
    if (inputText.value.trim()) {
      messages.value.push({ id: messages.value.length + 1, text: inputText.value, userId: 1 });
      inputText.value = '';
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
  padding-bottom: 80px;

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