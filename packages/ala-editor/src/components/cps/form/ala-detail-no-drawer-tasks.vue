<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-25 09:35:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-no-drawer-tasks.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-timeline">
        <div class="title">
            <p class="ala-chapter-icon"></p>
            审批进度
        </div>
        <DetailTimelineColumn :timelines="timelines" />
    </div>

    <div class="ala-detail-timeline">
        <div class="title">
            <p class="ala-chapter-icon"></p>
            审批记录列表
        </div>
        <el-table :data="tasks" style="width: 100%">

            <el-table-column prop="displayName" label="任务名称"></el-table-column>
            <el-table-column prop="approveType" label="审批结果">
                <template #default="scope">
                    <i v-html="scope.row.approveType" />
                </template>
            </el-table-column>
            <el-table-column prop="nickName" label="审批人"></el-table-column>
            <el-table-column prop="remark" label="审批说明"></el-table-column>
            <el-table-column prop="createdTime" label="任务创建时间"></el-table-column>
            <el-table-column prop="finishTime" label="审批时间"></el-table-column>
            <el-table-column prop="time" label="审批耗时"></el-table-column>

        </el-table>
    </div>

</template>

<script setup lang="ts">
import { alaDetailBuild } from '@/config/alaDetailBuilder';
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'

// State
interface Form {
    id: number,
    tableName: string,
}
const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    moduleName: {
        type: String,
        default: ''
    },
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 400,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'left',
            useFormTitle: false,
        })
    },
    previewParams: {
        type: Object as any
    }
})


const isHidden = (item: { componentName: string, other?: any }) => {

    if (item.componentName === 'AlaHidden') {
        return 'ala-detail-item-hidden'
    } else if (item.other && item.other.fullWidth) {
        return 'ala-detail-item-full-width'
    } else {
        return 'ala-detail-item'
    }
}

const showDrawer = defineModel({
    type: Boolean,
    default: false
})


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const columnWidth = (item: any) => {
    let formWidth = props.formAttr.formWidth
    let labelWidth = props.formAttr.labelWidth
    // let columnNum = 3
    let columnNum = props.formAttr.columnNum

    const paddingWidth = 80

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth - paddingWidth) / columnNum)

    let occupiedColumnNum = item.formItem.formData.columnNum.desktop || 1

    if (occupiedColumnNum > columnNum) {
        occupiedColumnNum = columnNum
    }

    columnWidth = columnWidth * occupiedColumnNum

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth} ]，form labelWidth[ ${labelWidth} ]，form columnNum[ ${columnNum} ]，form paddingWidth[ ${paddingWidth} ]，当前组件[ ${item.formItem.code} ]，当前组件列数[ ${occupiedColumnNum} ]`);

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

const getComponent = ((code: string) => {
    const component = 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column'
    return component
})

const labelWidth = () => {
    return props.formAttr?.labelWidth + 'px' || '120px'
}

interface FormData {
    data: { [key: string]: any },
    fields: Array<any>
}

const fds = reactive<Array<FormData>>([])


const timelines = ref<any>([])
const tasks = ref<any>([])
const properties = alaDetailBuild("timelines", "time", "label", 1, false, {})


const taskUrl = '/p/task/listDetail'
watch(() => props.previewParams.instanceId, (newValue) => {

    // 加载当前流程实例的所有任务
    // 如果当前流程实例处于 donging 状态，则显示为空心、颜色为danger、居中
    alaPost(u.url(taskUrl || ''), { instanceId: newValue }, false, '').then((response: any) => {
        if (response.data && response.data.length > 0) {

            const tks: any = []
            response.data.forEach((task: any) => {

                console.log('task: -->', task);

                // 1、准备 timeline 数据
                if (task.taskState === 10) {
                    // 说明是处理中的任务，则显示为空心、颜色为danger、居中
                    timelines.value.push({
                        title: task.displayName,
                        content: getApproveType(-1),
                        showDetail: task.formKeyEntity?.id ? true : false,
                        detailEntity: task.formKeyEntity,
                        timestamp: 0,
                        properties: alaDetailBuild("timelines", "time", "label", 1, false, getCardProperties(task.taskState))
                    })
                } else {
                    if (task.formKeyEntity) {
                        timelines.value.push({
                            title: task.displayName,
                            content: `${task.formKeyEntity.remark} @${task.operatorEntity.nickName} ${getApproveType(task.approveType)}  于 `,
                            showDetail: task.formKeyEntity?.id ? true : false,
                            detailEntity: task.formKeyEntity,
                            timestamp: task.updatedTime,
                            properties: alaDetailBuild("timelines", "time", "label", 1, false, getCardProperties(task.taskState)),

                        })
                    }

                }

                console.log('task: =====>',task);
                

                const time = u.timeDiff(task.finishTime, task.createdTime)
                let t = ''
                t += time.days ? (time.days + 'd ') : ''
                t += time.hours ? (time.hours + 'h ') : ''
                t += time.minutes ? (time.minutes + 'm ') : '0m'
                // 2、准备列表数据
                if (task.formKeyEntity) {
                    tks.push({
                        displayName: task.displayName,
                        approveType: getApproveType(task.approveType),
                        nickName: task.operatorEntity?.nickName,
                        remark: task.formKeyEntity.remark,
                        createdTime: date.YYYY_MM_DD__HH_mm_ss(task.createdTime),
                        finishTime: date.YYYY_MM_DD__HH_mm_ss(task.finishTime),
                        time: t,
                    })
                }

            })
            tasks.value = tks
        }

    })

}, { deep: true, immediate: true })


const getCardProperties = (taskState: number) => {
    if (taskState === 10) {
        return { type: { desktop: 'warning' }, hollow: { desktop: true }, center: { desktop: true } }
    } else if (taskState === 20) {
        return { type: { desktop: 'primary' } }
    } else if (taskState === 30) {
        return { type: { desktop: 'info' } }
    } else if (taskState === 45) {
        return { type: { desktop: 'danger' } }
    }
    return { type: { desktop: 'primary' } }
}

// APPLY(0, "发起申请"), //  发起申请
// AGREE(1, "同意申请"), //    同意申请
// REJECT(2, "拒绝申请"), //   拒绝申请
// ROLLBACK(3, "退回上一步"), //    退回上一步
// JUMP(4, "跳转"), //    跳转
// RE_APPLY(5, "重新提交"), //  重新提交
// ROLLBACK_TO_APPLICANT(6, "退回发起人"), //  退回发起人
// AUTO_EXECUTE(7, "自动执行"), //  自动执行
// COUNTERSIGN_DISAGREE(20, "会签拒绝申请");//  拒绝申请

const getApproveType = (approveType: number) => {

    let stName = ''
    if (approveType === -1 || approveType === undefined) {
        approveType = -1
        stName = '处理中...'
    }

    if (approveType === 0) {
        stName = '发起申请'
    } else if (approveType === 1) {
        stName = '同意申请'
    } else if (approveType === 2) {
        stName = '拒绝申请'
    } else if (approveType === 3) {
        stName = '退回上一步'
    } else if (approveType === 4) {
        stName = '跳转申请'
    } else if (approveType === 5) {
        stName = '重新提交'
    } else if (approveType === 6) {
        stName = '退回发起人'
    } else if (approveType === 7) {
        stName = '自动执行'
    } else if (approveType === 20) {
        stName = '会签拒绝申请'
    }

    const className = getApproveTypeClass(approveType)

    return `<i class="${className}">${stName}</i>`

}

const getApproveTypeClass = (approveType: number) => {
    let className = ''
    if (approveType === 0) {
        className = ""
    } else if (approveType === 1) {
        className = "success"
    } else if (approveType === 2) {
        className = "danger"
    } else if (approveType === 3) {
        className = "warning"
    } else if (approveType === 4) {
        className = "info"
    } else if (approveType === 5) {
        className = "primary"
    } else if (approveType === 6) {
        className = "warning"
    } else if (approveType === 7) {
        className = ""
    } else if (approveType === 20) {
        className = ""
    } else if (approveType === -1) {
        className = "warning"
    }

    return className
}

const emit = defineEmits(["close"])


</script>
<style scoped lang="scss">
.ala-detail-timeline {

    .title {
        padding: 8px;
        font-weight: bold;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-items: center;
        background: rgba(64, 158, 255, 0.1);
        box-shadow: 8px 0 0 0 rgba(64, 158, 255, 0.1), -8px 0 0 0 rgba(64, 158, 255, 0.1);
        border-radius: 4px;
        margin-bottom: 10px;
        margin-top: 10px;

        .ala-chapter-icon {
            display: inline-block;
            width: 6px;
            border-radius: 1px;
            background: var(--el-color-primary);
            height: 20px;
            margin-right: 8px;
        }
    }

    :deep(.success) {
        color: var(--el-color-primary);
        font-weight: bold;
    }

    :deep(.danger) {
        color: var(--el-color-danger);
        font-weight: bold;
    }

    :deep(.warning) {
        color: var(--el-color-warning);
        font-weight: bold;
    }

    :deep(.primary) {
        color: var(--el-color-primary);
        font-weight: bold;
    }

    :deep(.info) {
        color: var(--el-color-info);
        font-weight: bold;
    }
}
</style>
