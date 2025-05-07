<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-06 10:15:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-07 10:26:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/iot/pointCard.vue
 * @Description: 

 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-iot-point-card">
        <div class="title">
            <v-icon class="image" icon="iot_point" width="24" height="24" :color="colors.primary" />
            <p>{{ data.pointName }}</p>
        </div>
        <div class="rows">
            <div class="row">
                <v-icon class="image" icon="flag" width="18" :color="colors.info" />
                <p class="label">平台属性名：</p>
                <p class="value">{{ data.platformName }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag" width="18" :color="colors.info" />
                <p class="label">设备属性名：</p>
                <p class="value">{{ data.pointCode }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">点位数据类型：</p>
                <p class="value">
                    {{ u.parseNameByValue(pointTypeFlags, data.pointTypeFlag + '') }}
                </p>
            </div>

            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">数据精度： </p>
                <p class="value">{{ data.valueDecimal }} 位</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">数据单位： </p>
                <p class="value">{{ data.unitDict.dictLabel }} ( {{ data.unitDict.dictCode }} )</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">读写标识： </p>
                <p class="value">{{ u.parseNameByValue(rwFlags, data.rwFlag + '') }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">基础值： </p>
                <p class="value">{{ data.baseValue }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">倍数： </p>
                <p class="value">{{ data.multiple }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="flag_point" width="18" :color="colors.primary" />
                <p class="label">状态： </p>
                <p class="value" v-html="parseStatus(data.deleted)"></p>
            </div>
            <div class="row">
                <v-icon class="image" icon="info" width="18" :color="colors.info" />
                <p class="label">创建人： </p>
                <p class="value">{{ data.createdName }}</p>
            </div>
            <div class="row">
                <v-icon class="image" icon="info" width="18" :color="colors.info" />
                <p class="label">创建时间： </p>
                <p class="value">{{ date.YYYY_MM_DD__HH_mm_ss(data.createdTime) }}</p>
            </div>
            <div class="row" style="width: 100%;">
                <v-icon class="image" icon="flag" width="18" :color="colors.info" />
                <p class="label">备注： </p>
                <p class="value">{{ data.remark }}</p>
            </div>
        </div>
        <div class="buttons">
            <!-- <v-icon class="image" icon="iot_point" width="24" height="24" :color="colors.primary"/> -->
            <AlaButton v-if="data.deleted == 1" :showButton="true" name="disable" @disable="handleDisable(data)"
                buttonType="danger" :plain="true" size="small" />
            <AlaButton v-else :showButton="true" name="enable" @enable="handleEnable(data)" buttonType="primary"
                :plain="true" size="small" />
            <AlaButton :showButton="true" name="edit" @edit="handleEdit(data)" :plain="true" size="small" />
            <!-- <AlaButton :showButton="true" name="delete" @reject="handleReject()" buttonType="danger" :plain="true"
                size="small" /> -->

        </div>
    </div>
</template>

<script setup lang="ts">
import colors from '@/utils/colors'
import { date } from '@/utils/date'
import u from '@/utils/u'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// State
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

// Methods
const pointTypeFlags = [{ '字符串': '0' }, { '浮点数': '5' }, { '双精度浮点数': '6' }, { '短整数': '2' }, { '整数': '3' }, { '长整数': '4' }, { '字节': '1' }, { '布尔': '7' }]
const rwFlags = [{ '只读': '1' }, { '只写': '2' }, { '读写': '3' }]


const emits = defineEmits(["edit", "enable", "disable"])
const handleEnable = (item: any) => {
    emits('enable', item)
}
const handleDisable = (item: any) => {
    emits('disable', item)
}
const handleEdit = (item: any) => {
    emits('edit', item)
}


const parseStatus = (status: number) => {
    let text = '状态未知'
    if (status === 1) {
        text = '<p style="color:#409eff;font-weight:bold;">' + t('buttons.enable') + '中</p>'
    } else if (status === 2) {
        text = '<p style="color:#f56c6c;font-weight:bold;">已' + t('buttons.disable') + '</p>'
    }
    return text
}

</script>

<style scoped lang="scss">
.ala-iot-point-card {

    display: inline-flex;
    flex-wrap: wrap;
    width: 32%;
    margin-right: 1%;
    margin-bottom: 1%;
    // background:red;
    border: 1px solid #dcdfe6;
    padding: 8px;
    border-radius: 4px;

    .title {
        .image {}

        p {}

        width: 99%;
        height: 40px;
        border-bottom: 1px solid #dcdfe6;
        align-items: center;
        display: flex;
        margin-left: 8px;
        font-weight: bold;
        font-size: 120%;

        :deep(svg) {
            margin-right: 8px;
        }


    }

    .rows {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0px;

        .row {
            display: inline-flex;
            width: 50%;
            align-items: center;
            padding: 6px 10px 4px 10px;
            font-size: 90%;

            .image {
                margin-right: 4px;
            }

            .label {
                margin-left: 2px;
                opacity: 0.7;
            }

            .value {
                .enable {
                    color: var(--el-color-primary)
                }

                .disable {
                    color: red
                }
            }

            p {}
        }


    }

    .buttons {
        width: 99%;
        height: 40px;
        border-top: 1px solid #dcdfe6;
        align-items: center;
        display: flex;
        opacity: 0.8;
        justify-content: flex-end;

        :deep(.ala-button-wrapper) {
            font-size: 88%;
        }
    }

}
</style>