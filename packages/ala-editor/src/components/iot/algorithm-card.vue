<template>
    <div class="ala-algorithm-card">

        <div class="images" @click="handle">
            <img class="image" :src="image.src" v-for="(image, index) in localValues" :key="index" :image="image.fid" />
        </div>

        <div class="footer">

            <div class="cnName">
                {{ cnName }}
            </div>

            <div class="alarmType">
                {{ alarmType }}
            </div>

            <div class="info">
                {{ info }}
            </div>


        </div>

    </div>
</template>

<script setup lang="ts">
import { alaDownload } from '@/utils/req'
import u from '@/utils/u'

const props = defineProps({
    images: {
        type: String,
        default: () => ''
    },
    alarmType: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    cnName: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: ''
    },
    formConfigItems: {
        type: Object,
        default: () => { }
    },
})
// State

// Methods

interface AFile {
    id: number,
    fid: string,
    fileName: string
    classify: string
    url: string
}
interface Image {
    src: string,
    fid: string
}

const localValues = ref<Array<Image>>([])

watch(() => props.images, async () => {

    localValues.value = []

    if (props.images) {

        const images = u.parseJson(props.images)

        const image: AFile = images[0]

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
                localValues.value.push({ src: base64.replace('data:application/octet-stream', `data:image/${imageType}`), fid: image.fid })
            }
        }

        reader.onerror = (e) => {
            console.log('e:', e)
        }

        reader.readAsDataURL(blob)


        // images.forEach(async (image: AFile) => {

        //             const result = await alaDownload(u.url('/f/ossfile/download'), { fid: image.fid }).then((data: any) => {
        //                 const response = data;
        //                 return response
        //             })

        //             const blob = new Blob([result.data])
        //             const reader = new FileReader()

        //             reader.onloadend = () => {
        //                 const base64 = reader.result
        //                 let imageType = u.fileExtension(image.fileName)
        //                 if (imageType === 'svg') {
        //                     imageType = 'svg+xml'
        //                 }
        //                 if (typeof base64 === 'string') {
        //                     localValues.value.push({ src: base64.replace('data:application/octet-stream', `data:image/${imageType}`), fid: image.fid })
        //                 }
        //             }

        //             reader.onerror = (e) => {
        //                 console.log('e:', e)
        //             }

        //             reader.readAsDataURL(blob) // 转成 base64

        //         })

    }

}, {
    immediate: true,
    deep: true
})


const emit = defineEmits(['handle'])
const handle = () => {
    emit('handle')
}

</script>

<style scoped lang="scss">
.ala-algorithm-card {

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 24%;
    background: #fff;
    border-radius: 4px;


    .images {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        &:hover {
            cursor: pointer;
        }

        .image {
            box-shadow: 0 0 0 1px #ececec inset;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            width: 100%;
        }
    }

    .footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 8px 8px;

        // font-weight: bold;
        .cnName {
            width: 50%;
            text-align: left;
            font-size: 1.1rem;
            font-weight: bold;
        }

        .alarmType {
            padding: 2px 22px;
            text-align: left;
            font-size: 0.9rem;
            border-radius: 16px;
            background: #fef0f0;
        }

        .info {
            margin: 8px 0px;
            text-align: left;
        }

    }
}
</style>