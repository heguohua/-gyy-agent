<template>
    <div class="ala-list-pop-wrapper">

        <div class="ala-el-dialog-wrapper" v-if="dialogShow">
            <el-dialog v-model="dialogShow" :width="dialogWidth" :append-to-body="true" :showClose="false">

                <template #header="{ titleId, titleClass }">
                    <div class="ala-list-pop-header">
                        <h4 :id="titleId" :class="titleClass"> {{ title }} </h4>
                    </div>
                </template>

                <div class="dialog-content">
                    <!-- 分页列表 -->
                    <AlaImageViewer :images="images" v-if="dialogShow"/>

                </div>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancelClick">{{ $t('buttons.cancel') }}</el-button>
                        <el-button type="primary" @click="confirmClick">
                            {{ $t('buttons.confirm') }}
                        </el-button>
                    </span>
                </template>

            </el-dialog>
        </div>


    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import notify from '@/utils/notify';

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

function confirmClick() {
    notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.title + ' 】')
}

const selectedData = ref<Array<any>>([])

const emit = defineEmits(["add", "edit", "selectedChange"])


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