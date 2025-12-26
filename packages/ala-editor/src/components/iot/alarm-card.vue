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
            <p>{{ confirmStatus }}</p>
            <p>{{ confirmResult }}</p>
            <p>{{ pushStatus }}</p>
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
})
// State


// Methods

const parseImages = (images: string) => {
    const imgs = u.parseJson(images)
    const igs: Array<string> = []
    imgs.forEach((image: any) => {
        igs.push(image.fid)
    });
    return igs
}



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

watch(() => props.images, () => {

    localValues.value = []

    if (props.images) {

        const images = u.parseJson(props.images)

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
                    localValues.value.push({ src: base64.replace('data:application/octet-stream', `data:image/${imageType}`), fid: image.fid })
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
.ala-alarm-card {

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 24%;
    background: #fff;
    border-radius: 4px;
    padding: 8px;

    p {
        margin: 0px !important;
        padding: 0px !important;
    }

    .header {
        display: flex;
        // font-size: 0.94rem;
        // font-weight: bold;
        justify-content: space-between;
    }

    .images {
        display: flex;

        p {}
    }

    .footer {
        display: flex;

        p {}
    }
}
</style>