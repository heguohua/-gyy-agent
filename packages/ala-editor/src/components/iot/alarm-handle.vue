<template>
    <div class="ala-list-pop-wrapper" v-if="dialogShow">

        <div class="ala-el-dialog-wrapper">
            <el-dialog v-model="dialogShow" :width="dialogWidth" :append-to-body="true" :showClose="false">

                <template #header="{ titleId, titleClass }">
                    <div class="ala-list-pop-header">
                        <h4 :id="titleId" :class="titleClass"> {{ cameraTitle }} </h4>
                    </div>
                </template>

                <div class="dialog-content">
                    <!-- 分页列表 -->
                    <AlaImageViewer :images="images" />
                    <div class="alarm-info">
                        <div class="header">
                            <p class="title">基础信息</p>
                            <div class="buttons">
                                <p class="alarmVideo" @click="showAlarmVideo">告警视频</p>
                                <p class="realVideo" @click="showRealVideo">实时视频</p>
                            </div>
                        </div>
                        <div class="infos">
                            <div class="info">
                                <p class="label">告警类型：</p>
                                <p class="value">{{ aiAlarmRecord.alarmType[0].dictLabel }}</p>
                            </div>
                            <div class="info">
                                <p class="label">告警等级：</p>
                                <p class="value">
                                    <DetailRadioColumn :formItem="formConfigItems.value['level']"
                                        :value="aiAlarmRecord.level" />
                                </p>
                            </div>
                            <div class="info">
                                <p class="label">告警时间：</p>
                                <p class="value">
                                    {{ date.formatDateTime(aiAlarmRecord.time, date.F_YYYY_MM_DD_HH_mm_ss) }}
                                </p>
                            </div>
                            <div class="info">
                                <p class="label">告警距今时间：</p>
                                <p class="value">{{ u.timeConsuming(u.now(), aiAlarmRecord.time) }}</p>
                            </div>

                            <div class="info">
                                <p class="label">告警摄像头：</p>
                                <p class="value">{{ aiAlarmRecord.device[0].deviceName }}</p>
                            </div>

                        </div>

                        <div class="header">
                            <p class="title">判定信息</p>
                        </div>
                        <div class="infos">
                            <AlaDetailNoDrawerFormCustomerization :fields="addFormFields"
                                v-if="!props.aiAlarmRecord.confirmStatus && addFormFields.length > 0"
                                :formAttr="formAttr" :formData="formData" url="/l/dynamic/add"
                                updateUrl="/lb/aialarmrecords/confirm" ref="form" moduleName="aiAlarmRecords"
                                :beforeSave="beforeSave" @refresh="refresh" />
                            <template v-else>
                                <div class="info">
                                    <p class="label">判定结果：</p>
                                    <p class="value">
                                        <DetailRadioColumn :formItem="formConfigItems.value['confirmResult']"
                                            :value="aiAlarmRecord.confirmResult" />
                                    </p>
                                </div>
                                <div class="info">
                                    <p class="label">判定说明：</p>
                                    <p class="value">{{ aiAlarmRecord.remark }}</p>
                                </div>
                                <div class="info">
                                    <p class="label">判定时间：</p>
                                    <p class="value">
                                        {{ date.formatDateTime(aiAlarmRecord.confirmTime, date.F_YYYY_MM_DD_HH_mm_ss) }}
                                    </p>
                                </div>
                                <div class="info">
                                    <p class="label">判定耗时：</p>
                                    <p class="value">
                                        {{ u.timeConsuming(aiAlarmRecord.confirmTime, aiAlarmRecord.time) }}
                                    </p>
                                </div>
                                <div class="info">
                                    <p class="label">判定人：</p>
                                    <p class="value">{{ aiAlarmRecord.confirmUser[0].nickName }}</p>
                                </div>
                            </template>
                        </div>

                    </div>

                </div>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                        <el-button type="primary" @click="confirmClick" v-if="!props.aiAlarmRecord.confirmStatus">
                            {{ $t('buttons.confirm') }}
                        </el-button>
                    </span>
                </template>

            </el-dialog>
        </div>


        <Teleport to="body">
            <div class="ala-video-player">

                <el-dialog v-model="show" width="80%">
                    <template #header>
                        <p class="ala-video-player-title">摄像头【 {{ cameraTitle }} 】实时画面，当前时间：{{ time }}</p>
                    </template>

                    <ala-video-flv v-if="show" :url="videoStreamUrl" />

                </el-dialog>
            </div>

        </Teleport>



        <Teleport to="body">
            <div class="ala-video-player">

                <el-dialog v-model="showAlarm" width="80%">
                    <template #header>
                        <p class="ala-video-player-title">摄像头【 {{ cameraTitle }} 】实时画面，当前时间：{{ time }}</p>
                    </template>

                    <AlaVideo v-if="showAlarm" :url="alarmVideoStreamUrl"/>


                </el-dialog>
            </div>

        </Teleport>


    </div>
</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import u from '@/utils/u';
import { getLowcodingConfigByClassName } from '@/config/formConfigs';
import req, { alaPost } from '@/utils/req';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// State
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    dialogWidth: {
        type: String,
        default: "70%",
    },
    aiAlarmRecord: {
        type: Object,
        default: () => { }
    },
    images: {
        type: Array<string>,
        default: () => []
    },
    formConfigItems: {
        type: Object,
        default: () => { }
    }
})


const model = defineModel({
    type: Array<any>,
    default: () => { return [] }
})

// 分页列表中列属性配置
const dialogShow = ref(false)
const openDialog = () => {
    dialogShow.value = true;
}

/**
 * 点击取消按钮，关闭弹窗
 */
function cancelClick() {
    dialogShow.value = false
    selectedData.value = []
}

const form = ref()
function confirmClick() {
    form.value.save()

    // notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.title + ' 】')
}

const selectedData = ref<Array<any>>([])

const emit = defineEmits(["refresh"])

const formData = ref({})
const formAttr = reactive({
    formWidth: 1000,
    columnNum: 2,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false
})
const addFormFields = ref<Array<any>>([])


watch(() => dialogShow.value, async (v) => {
    if (v && !props.aiAlarmRecord.confirmStatus) {

        const config = await getLowcodingConfigByClassName('aiAlarmRecords')
        const clsNames = new Set<string>(['confirmResult', 'remark'])
        const cls: Array<any> = []

        config.addFormFields.forEach(addFormField => {
            if (clsNames.has(addFormField.fieldName)) {
                cls.push(addFormField)
            }
        })
        addFormFields.value = cls
    }
})


const beforeSave = (fields: any) => {
    // 转换
    const params: { [key: string]: any } = {
        "tableName": "aiAlarmRecords",
        "id": props.aiAlarmRecord.id,
        ...fields
    }
    return params
}


const refresh = () => {
    emit('refresh')
}

const time = ref("")
const timerId = window.setInterval(() => {
    time.value = date.YYYY_MM_DD__HH_mm_ss(new Date())
}, 1 * 1000);

onUnmounted(() => {
    if (timerId) {
        clearInterval(timerId);
    }
})


const show = ref(false)
const videoStreamUrl = ref<string>('')
const cameraTitle = ref<string>('')
const deviceUrl = '/iot/device/get'
const showRealVideo = async () => {
    console.log('row:', props.aiAlarmRecord);

    if (!props.aiAlarmRecord.device[0]?.id) {
        logger.error(`【错误，错误，错误】，摄像头id不存在，无法获取摄像头视频信息，摄像头设备信息如下：`, props.aiAlarmRecord)
        return
    }

    // 根据摄像头id加载 摄像头编码
    const params = { 'id': props.aiAlarmRecord.device[0]?.id }

    const deviceCode = await req.get(u.url(deviceUrl || ''), params).then((response: any) => {
        const { data: { deviceCode } } = response.data;
        return deviceCode
    });

    if (!deviceCode) {
        const msg = `当前告警绑定的摄像头“摄像头编码”(deviceCode)不存在！`
        logger.error(`${msg}，摄像头ID[${params.id}]`, props.aiAlarmRecord)
        notify.error(t('pop.warm_title'), msg)
    } else {

        videoStreamUrl.value = `${u.videoUrl()}/live?url=${deviceCode}&&&isLocal=true&&&ffmpeg=true&&&autoClose=true`
        cameraTitle.value = props.aiAlarmRecord.device[0]?.deviceName

        show.value = true

    }



}


const showAlarm = ref(false)

const videoUrl = '/f/ossfile/preview'
const times = 600 // 单位秒

const alarmVideoStreamUrl = ref<string>('')
const alarmCameraTitle = ref<string>('')
const showAlarmVideo = async () => {
    console.log('row:', props.aiAlarmRecord.video);
    if (!props.aiAlarmRecord?.video) {
        notify.error(t('pop.warm_title'), `当前告警信息没有告警视频！`)
    }
    const videos = u.parseJson(props.aiAlarmRecord?.video)
    const fid = videos[0].fid
    console.log('fid:', fid);


    const params = { fid, times }

    const url = await req.get(u.url(videoUrl || ''), params).then((response: any) => {
        const url = response.data.data;
        return url
    });

    if (!url) {
        const msg = `没有获取到当前告警监控视频`
        notify.error(t('pop.warm_title'), msg)
    } else {


        console.log('url:', url);
        alarmCameraTitle.value = '123'
        alarmVideoStreamUrl.value = url

        showAlarm.value = true
        // videoStreamUrl.value = `${u.videoUrl()}/live?url=${deviceCode}&&&isLocal=true&&&ffmpeg=true&&&autoClose=true`
        // cameraTitle.value = props.aiAlarmRecord.device[0]?.deviceName

        // show.value = true

    }


    // 
}




defineExpose({ openDialog })

</script>

<style scoped lang="scss">
.ala-list-pop-wrapper {

    .ala-select-customer {

        .placeholder {
            color: var(--el-text-color-placeholder);
        }

        .show-values {
            display: flex;
            gap: 4px;
        }

    }

    .ala-select-customer-icon {

        color: #a8abb2;
        width: 30px;
        right: 6px;
        position: absolute;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
            color: var(--el-color-primary-light-3);
        }

        :deep(svg) {
            position: absolute;
            right: 6px;
        }

    }


}


// 由于 el-dialog 设置了 append-to-body="true"，那么样式更改也要放在顶层层级才能生效
.dialog-content {
    display: flex;
    align-items: top;
    justify-content: center;
    flex-direction: column;

    gap: 2%;

    .left-panel {
        width: 48%;
        padding: 0px 1px 10px 1px;
        background-color: var(--el-fill-color-blank);
        border-radius: var(--el-border-radius-base);
        box-shadow: 0 0 0 1px var(--el-border-color) inset;
    }

    .right-panel {
        width: 48%;
        padding: 0px 1px 10px 1px;
        background-color: var(--el-fill-color-blank);
        border-radius: var(--el-border-radius-base);
        box-shadow: 0 0 0 1px var(--el-border-color) inset;

        .table-title {
            height: 68px;
            line-height: 68px;
            padding-left: 12px;
            font-size: 1rem;
            font-weight: 600;
        }
    }

    .alarm-info {
        width: 98%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0px 1%;

        .header {

            width: 100%;
            display: flex;
            flex-direction: row;
            padding: 8px 8px;
            justify-content: space-between;
            background: var(--al-title-color);

            p {
                margin: 0px;
                user-select: none;
            }

            .title {
                font-size: 1rem;
                font-weight: bold;
                align-items: center;
                justify-content: center;

            }

            .buttons {
                display: flex;
                flex-direction: row;
                column-gap: 12px;

                .alarmVideo {
                    background: rgb(230, 162, 60, 0.7);
                    color: #fff;
                    padding: 4px 12px;
                    border-radius: 14px;

                    &:hover {
                        cursor: pointer;
                        background: rgb(230, 162, 60);
                    }

                }

                .realVideo {
                    background: rgb(64, 158, 255, 0.7);
                    color: #fff;
                    padding: 4px 12px;
                    border-radius: 14px;

                    &:hover {
                        cursor: pointer;
                        background: rgb(64, 158, 255);
                    }

                }
            }

        }

        .infos {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            column-gap: 16px;
            row-gap: 6px;
            padding: 8px 0px;

            p {
                margin: 0px;
            }

            .info {
                display: inline-flex;
                width: 19%;

                .label {
                    // background: rgb(249, 249, 250);
                    padding: 4px 2px 4px 4px;
                    font-weight: 500;
                }

                .value {
                    background: #f3f7fa;
                    padding: 4px 14px 4px 10px;

                    :deep(p) {
                        margin: 0px;
                    }

                    width: 50%;
                }
            }
        }

    }


}
</style>
<style>
.el-dialog__header {
    padding-bottom: 0px !important;
}

.el-dialog__title {
    line-height: inherit !important;
    margin: 0px 0px 10px 0px !important;
}

.el-table th.el-table__cell {
    background-color: #F9F9FA;
    padding: 8px 0px;
}

.ala-list-pop-header {
    padding-left: 12px;
}

.ala-list-pop-value {
    background-color: var(--el-fill-color);
    padding: 0px 6px;
    border-radius: 2px;
    display: inline-flex;
}
</style>