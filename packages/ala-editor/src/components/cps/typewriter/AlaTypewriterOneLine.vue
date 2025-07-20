<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 10:01:59
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-20 16:48:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/typewriter/AlaTypewriterOneLine.vue
 * @Description: 单行、多条文本、循环输入组件
 * 使用方式：
 * 1）父组件 引入TypewriterOneLine组件；
 * 2）父组件 定义一个textArray，textArray存储多条字符串；
 * 3）我们还可以再父组件中使用 props typeInterval和clearInterval分别控制输入单字符时间间隔和删除单字符时间间隔；
 * 3）我们还可以再父组件中使用 props keepBlankSpace控制是否保留当前空行，防止输入第0个文字前当前元素不存在，下方html元素位置上移引发闪烁；
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="typewriter" ref="typewriter">
        <p class="blank-space" v-if="keepBlankSpace">&nbsp;&nbsp;</p>
        {{ currentText }}
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ref, onMounted } from 'vue';

const props = defineProps({
    textArray: {
        type: Array<string>,
        default: [],
    },
    typeInterval: {
        type: Number,
        default: 400
    },
    clearInterval: {
        type: Number,
        default: 100
    },
    keepBlankSpace: {
        type: Boolean,
        default: false
    },
    waitTime: {
        type: Number,
        default: 0
    }
})

const textArray = props.textArray
const typeInterval = props.typeInterval
const clearInterval = props.clearInterval
const waitTime = props.waitTime

const typewriter = ref<HTMLElement>();
const currentText = ref('');
let textIndex = ref(0);
let charIndex = ref(0);
let timer = null;

const typeWord = (textLines: Array<string>) => {

    // logger.info(`正在【 输入 】第【 ${textIndex.value} 】段第【 ${charIndex.value} 】个字符`);

    if (charIndex.value < textLines[textIndex.value].length) {
        currentText.value += textLines[textIndex.value].charAt(charIndex.value);
        charIndex.value++;
        timer = setTimeout(typeWord, typeInterval, textArray); // 100毫秒间隔，可以根据需要调整
    } else {
        // logger.info(`即将【 清除 】第【 ${textIndex.value} 】段文字`);
        setTimeout(() => {
            clearText();
        }, waitTime);
        
    }
};

const clearText = () => {
    // logger.info(`正在【 清除 】第【 ${textIndex.value} 】段第【 ${currentText.value.length} 】个字符`);
    if (currentText.value.length > 0) {
        currentText.value = currentText.value.slice(0, -1);
        timer = setTimeout(clearText, clearInterval); // 100毫秒间隔，可以根据需要调整
    } else {
        // logger.info(`已输入第【 ${textIndex.value} 】段文字，即将【 输入 】第【 ${textIndex.value + 1} 】段文字`);
        textIndex.value = (textIndex.value + 1) % textArray.length;
        charIndex.value = 0;
        typeWord(textArray);
    }
};

onMounted(() => {
    if (typewriter.value) {
        charIndex.value = 0;
        textIndex.value = 0;
        typeWord(textArray);
    }
});

</script>

<style scoped>
.typewriter {
    font-family: monospace;
    /* white-space: pre; */

    /* 保持空格 */
    .blank-space {
        display: inline-block;
    }
}
</style>