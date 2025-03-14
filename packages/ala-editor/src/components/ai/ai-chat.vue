<template>
    <div class="chat-container">
        <div class="chat-header">
           欢迎使用“小智助手”
        </div>
        <div class="chat-body">
            <div v-for="(message, index) in messages" :key="index"
                :class="['message', message.sender === 'user' ? 'user-message' : 'kimi-message']">
                <div class="message-content">
                    <div class="message-text">{{ message.text }}</div>
                    <div class="message-timestamp">{{ message.timestamp }}</div>
                </div>
            </div>
        </div>
        <div class="chat-footer">
            <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Message {
    text: string;
    sender: 'user' | 'kimi';
    timestamp: string;
}

const messages = ref<Message[]>([]);
const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() === '') return;

    const userMessage: Message = {
        text: newMessage.value,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
    };
    messages.value.push(userMessage);

    // Simulate Kimi's response
    setTimeout(() => {
        const kimiResponse: Message = {
            text: `I received: "${newMessage.value}"`,
            sender: 'kimi',
            timestamp: new Date().toLocaleTimeString(),
        };
        messages.value.push(kimiResponse);
    }, 1000);

    newMessage.value = '';
};
</script>

<style scoped lang="scss">
.chat-container {
    width: 100%;
    height: 90%;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Arial, sans-serif;
}

.chat-header {
    color: white;
    padding: 10px;
    text-align: center;
    border-bottom:1px solid red;

}

.chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.message {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;

    &.user-message {
        flex-direction: row-reverse;
    }

    .message-content {
        max-width: 70%;
        padding: 8px;
        border-radius: 5px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .message-text {
            font-size: 14px;
        }

        .message-timestamp {
            font-size: 12px;
            color: #888;
            margin-top: 2px;
        }
    }

    &.kimi-message .message-content {
        background-color: #e0e0e0;
    }
}

.chat-footer {
    display: flex;
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;

    input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
        font-size: 14px;
    }

    button {
        padding: 8px 16px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background-color: #45a049;
        }
    }
}
</style>