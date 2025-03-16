<template>
    <div class="ala-message" :class="self ? 'isUserMessage' : ''">
        <div class="icon">
            <img :src="icon" class="icon-image" mode="widthFix"></img>
        </div>
        <div class="info" :class="self ? 'self' : ''" v-html="showValue(content || '')">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { chatMessageTimeFormat } from '@/utils/chatMessageTimeFormat';
import { WebSocketClient } from '@/utils/websocket';
// State


// Methods

type ChatGroup = {
    id: number
    name: string
    icon: string
}
const props = defineProps({
    icon: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    content: {
        type: String
    },
    time: {
        type: Number
    },
    self: {
        type: Boolean,
        default: () => (false)
    }
})


const formatDate = (timestamp: number) => {

    return chatMessageTimeFormat(timestamp)

}

const showValue = (text: string) => {
    const str = text.trim().replace(/\n+/g, '\n').replace(/\n/g, '<p class="blank_line">&nbsp;</p>');
    return str
}




</script>

<style scoped lang="scss">
.ala-message {

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

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

    .info {
        max-width: calc(100% - 56px);
        background-color: #ffffff;
        text-align: left;
        color: #222222;
        font-size: 1rem;
        line-height: 30px;
        border-radius: 8px;
        padding: 0.4rem 1rem;
        margin-left: 16px;


    }

    .self {
        align-self: flex-end;
        background-color: #409eff;
        color: #fff;
        text-align: right;
        margin-right: 16px;
        text-align: left;
    }
}

.isUserMessage {
    flex-direction: row-reverse;

    .icon {
        padding-top: 8px;
        background: #E5E7EC;
        border-radius: 23px;
        width: 46px;
        height: 46px;
        top: -4px;

        img {
            transform: rotateX(0deg) rotateY(2deg) rotateZ(1deg);
            width: 26px;
        }
    }
}
</style>

<style>
.ala-message .info think {
    display: flex;
    font-size: 0.9rem;
    color: #4c4c4c;
    padding: 0.9rem 1rem;
    /* border-left: 2px solid #e1e1e1; */
    align-items: flex-start;
    flex-direction: column;
    margin: 8px 0px;
    background: #F3F5FB;
    border-radius: 0.6rem;
}

.ala-message .info .blank_line {
    /* background: red; */
    height: 0.9rem;

}

.ala-message .info think .blank_line {
    /* background: red; */
    height: 4px;

}
</style>