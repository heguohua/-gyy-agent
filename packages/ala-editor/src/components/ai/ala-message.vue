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
    const str = text.trim().replace(/\n/g, '<br>');
    console.log('str:', str);

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
        font-size: 18px;
        line-height: 30px;
        border-radius: 8px;
        padding: 8px 18px;
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