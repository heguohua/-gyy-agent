<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-04 22:41:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailVideoHLSColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <div class="ala-video" @click="showVideo">
        <img class="image" src="/iot/video-online.svg" />
    </div>

    <Teleport to="body">
        <div class="ala-video-player">
            <el-dialog v-model="show" width="1600px">
                <template #title>
                    <p class="ala-video-player-title">摄像头【 {{ title }} 】实时画面，当前时间：{{ time }}</p>
                </template>

                <ala-video-hls v-if="show" :url="url" />
            </el-dialog>
        </div>

    </Teleport>

</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import { alaDownload } from '@/utils/req';
import u from '@/utils/u';


// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: String,
        default: () => ''
    },
    titleColumnName: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    }
})

const show = ref(false)
const url = ref('')
const title = ref('')

const showVideo = () => {

    if (!props.value) {
        return
    }

    url.value = `${u.videoUrl()}/hls/${props.value.toLocaleLowerCase()}/index.m3u8`
    title.value = props.data[props.formItem.formData.titleColumnName.desktop]
    show.value = true
}

const time = ref("")
setInterval(() => {
    time.value = date.YYYY_MM_DD__HH_mm_ss(new Date())
}, 1 * 1000)

</script>

<style scoped lang="scss">
.ala-video {
    justify-content: space-between !important;
    padding-right: 8px !important;

    &:hover {
        cursor: pointer;
    }

    .image {
        max-width: 30px;
    }
}


.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    min-width: 300px;
    top: -20%;
}
</style>

<style>
.ala-video-player {
    .el-dialog {
        background: #EAF1FE;
        border-radius: 4px;
    }

    .el-dialog__title {
        width: 100%;
        display: flex;
    }

    .ala-video-player-title {
        padding: 0px !important;
        margin: 0px !important;
    }

}

.el-dialog__headerbtn:focus {
    outline: none;
    box-shadow: none;
    border: none;
}
</style>
