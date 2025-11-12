<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-12 19:08:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailImageColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <template v-if="isDetailColumn">
        <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <div class="ala-image value">
            <img class="image" :src="image" :style="{ maxWidth: imageWidth }" v-for="(image, index) in localValues"
                :key="index" @click="showDetail" />
        </div>
    </template>
    <template v-else>
        <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <div class="value ala-image">
            <img class="image" :src="image" :style="{ maxWidth: imageWidth }" v-for="(image, index) in localValues"
                :key="index" />
        </div>
    </template>

</template>

<script setup lang="ts">
import { alaDownload } from '@/utils/req';
import u from '@/utils/u';
import { number } from 'echarts';


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
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

// Methods

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

const emit = defineEmits(['showDetail','refresh'])
const showDetail = () => {
    emit('showDetail', props.data)
}


// Methods

const imageWidth = computed(() => {
    // (props.formItem.formData?.imageWidth?.desktop || 50) + 'px'
    const num = localValues.value.length
    const width = (Math.round(100 / num) - 2) + '%'
    return width
})

// Methods
interface AFile {
    id: number,
    fid: string,
    fileName: string
    classify: string
    url: string
}

const localValues = ref<Array<string>>([])

watch(() => props.value, () => {

    localValues.value = []

    if (props.value) {

        const images = u.parseJson(props.value)

        images.forEach(async (image: AFile) => {

            const result = await alaDownload(u.url('/f/ossfile/download'), { fid: image.fid }).then((data: any) => {
                const response = data;
                return response
            })

            const blob = new Blob([result.data])
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64 = reader.result
                let imageType = u.fileExtension(image.fileName)
                if (imageType === 'svg') {
                    imageType = 'svg+xml'
                }
                if (typeof base64 === 'string') {
                    localValues.value.push(base64.replace('data:application/octet-stream', `data:image/${imageType}`))
                }
            }

            reader.onerror = (e) => {
                console.log('e:', e)
            }

            reader.readAsDataURL(blob) // 转成 base64

        })

    }

}, {
    immediate: true,
    deep: true
})


</script>

<style scoped lang="scss">
.ala-image {
    justify-content: space-between !important;
    padding-right: 8px !important;

    .image {
        border: 1px solid #e9e9e9;
        padding: 1%;
        border-radius: 4px;

        &:hover {
            border: none;
        }
    }
}
</style>
