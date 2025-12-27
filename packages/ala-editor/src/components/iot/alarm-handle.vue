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
import { PropType } from 'vue';

interface ItemProperty {
    propertyName: string,
    valueName: string
    otherProperty: Array<string>
}
// State
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    params: {
        type: [Object, String] as PropType<object | string>,
        default: () => ({})
    },
    dialogWidth: {
        type: String,
        default: "80%",
    },
    width: {
        type: Number,
        default: 200,
    },
    fieldName: {
        type: String,
        default: ''
    },
    columns: {
        type: Array<any>,
        default: () => []
    },
    itemProperty: {
        type: Object as () => ItemProperty,
        default: () => ({})
    },
    isFormDesign: {
        type: Boolean,
        default: false
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
        default: 'f_user'
    },
    iconWidth: {
        type: Number,
        default: 26
    },
    iconHeight: {
        type: Number,
        default: 26
    },
    singleValue: {
        type: Boolean,
        default: false
    },
    canEmpty: {
        type: Boolean,
        default: false
    },
    valueToString: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array<any>,
        default: () => []
    },
    noEditable: {
        type: Boolean,
        default: () => false
    }
})

const model = defineModel({
    type: Array<any>,
    default: () => { return [] }
})



// 分页列表中列属性配置
const dialogShow = ref(false)
const openDialog = () => {
    if (isDisabled.value) {
        return
    }
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

    const length = selectedData.value.length

    if (!props.canEmpty && (!selectedData.value || length <= 0)) {

        notify.warn(t('pop.warm_title'), t('form.p-select-1') + '【 ' + props.title + ' 】')

    } else {

        // 给 model 赋值
        const mv: any = []
        // const sv: string[] = []
        const pi = props.itemProperty
        selectedData.value.forEach((item) => {

            const selected = { [pi.valueName]: item[pi.valueName], [pi.propertyName]: item[pi.propertyName], }
            if (pi.otherProperty && pi.otherProperty.length > 0) {
                pi.otherProperty.forEach((op: string) => {
                    Object.assign(selected, { [op]: item[op] })
                })
            }
            mv.push(selected)
        })

        // 清空列表选择页面当前状态
        // 关闭弹窗
        dialogShow.value = false

        selectedData.value = []

        emit('selectedChange', mv)

    }
}

const selectedData = ref<Array<any>>([])

const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})

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

.el-dialog {
    width: 60% !important;
}

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