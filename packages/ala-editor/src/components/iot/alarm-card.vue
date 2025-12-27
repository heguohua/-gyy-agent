<template>
    <div class="ala-alarm-card">

        <div class="header">
            <p>{{ alarmType }}</p>
            <p>{{ time }}</p>
            <p>{{ camera['deviceName'] }}</p>
        </div>

        <div class="images">
            <img class="image" :src="image.src" v-for="(image, index) in localValues" :key="index" :image="image.fid" />
        </div>

        <div class="footer">
            <div class="confirmResult">
                <DetailRadioColumn :formItem="formConfigItems.value['confirmResult']" :value="confirmResult" />
            </div>
            <div class="confirmStatus">
                <DetailRadioColumn :formItem="formConfigItems.value['confirmStatus']" :value="confirmStatus" />
            </div>
            <div class="pushStatus">
                <DetailRadioColumn :formItem="formConfigItems.value['pushStatus']" :value="pushStatus" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { alaBuildRadio } from '@/config/alaBuilders'
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
    camera: {
        type: Object,
        default: () => { }
    },
    confirmStatus: {
        type: String,
        default: ''
    },
    confirmResult: {
        type: String,
        default: ''
    },
    pushStatus: {
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


</script>

<style scoped lang="scss">
.ala-alarm-card {

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 24%;
    background: #fff;
    border-radius: 4px;
    padding: 0px 12px;

    p {
        margin: 0px !important;
        padding: 8px 0px !important
    }

    .header {
        display: flex;
        // font-size: 0.94rem;
        // font-weight: bold;
        justify-content: space-between;
    }

    .images {
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
        }

        .image {
            // border: 1px solid ;
            box-shadow: 0 0 0 1px #ececec inset;
            border-radius: 4px;
            height: 256px;
        }
    }

    .footer {
        display: flex;
        margin: 8px;
        font-size: 0.9em;
        // font-weight: bold;

        .confirmResult {
            background: #ecf5ff;
            border-radius: 12px;
            padding: 2px 12px;
        }

        .confirmStatus {
            background: #fef0f0;
            border-radius: 12px;
            padding: 2px 12px;
            margin-left: 10px;
        }

        .pushStatus {
            background: #f4f4f5;
            border-radius: 12px;
            padding: 2px 12px;
            margin-left: 10px;

        }

        p {}
    }
}
</style>